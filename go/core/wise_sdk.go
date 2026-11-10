package core

import (
	"encoding/json"
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/wise-sdk/go/utility/struct"
)

type WiseSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewWiseSDK(options map[string]any) *WiseSDK {
	sdk := &WiseSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

// The client holds the credential in its options, so a print or a JSON dump
// carries the name alone. Value receivers: a dereferenced client prints the
// same way.
func (sdk WiseSDK) String() string {
	return "Wise " + vs.Jsonify(map[string]any{"name": "Wise"},
		map[string]any{"indent": 0})
}

func (sdk WiseSDK) GoString() string {
	return sdk.String()
}

func (sdk WiseSDK) MarshalJSON() ([]byte, error) {
	return json.Marshal(map[string]any{"name": "Wise"})
}

func (sdk *WiseSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *WiseSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *WiseSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *WiseSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}
	method = strings.ToUpper(method)

	allowMethodVal := vs.GetPath(options, []any{"allow", "method"})
	if !Allowed(allowMethodVal, method) {
		allowMethod, _ := allowMethodVal.(string)
		return nil, ctx.MakeError("spec_method_allow",
			"Method \""+method+"\" not allowed by SDK option allow.method value: \""+allowMethod+"\"")
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	// A raw request has no point to declare its response type, so it asks
	// for the JSON it reads: an API that negotiates on Accept otherwise
	// answers in its own default format. A caller's own accept wins.
	hasAccept := false
	for k := range ctx.Spec.Headers {
		if strings.ToLower(k) == "accept" {
			hasAccept = true
			break
		}
	}
	if !hasAccept {
		ctx.Spec.Headers["accept"] = "application/json"
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *WiseSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *WiseSDK) opAllowed(op string) bool {
	return Allowed(vs.GetPath(sdk.options, []any{"allow", "op"}), op)
}

func (sdk *WiseSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("WiseSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *WiseSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(sdk.rootctx, err)}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": sdk.cleanErr(ctx, fetchErr)}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		var bodyErr error
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
			if unreadable, _ := vs.GetProp(fm, "unreadable").(bool); unreadable {
				var failed error
				if status < 200 || status >= 300 {
					failed = ctx.MakeError("request_status",
						fmt.Sprintf("request: %d: %v", status, vs.GetProp(fm, "statusText")))
				}
				bodyErr = UnreadableBody(ctx, status, headers, vs.GetProp(fm, "body"),
					fetchdef["headers"], failed)
			}
		}

		out := map[string]any{
			"ok":      bodyErr == nil && status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}
		if bodyErr != nil {
			out["err"] = sdk.cleanErr(ctx, bodyErr)
		}
		return out, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// A raw request returns its error rather than passing it through MakeError.
func (sdk *WiseSDK) cleanErr(ctx *Context, err error) error {
	if cleaned, ok := sdk.utility.Clean(ctx, err).(error); ok {
		return cleaned
	}
	return err
}

func (sdk *WiseSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("WiseSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// AccountDetail returns a AccountDetail entity bound to this client.
// Idiomatic usage: client.AccountDetail(nil).List(nil, nil) or
// client.AccountDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) AccountDetail(data map[string]any) WiseEntityBase {
	return NewAccountDetailEntityFunc(sdk, data)
}


// AccountRequirement returns a AccountRequirement entity bound to this client.
// Idiomatic usage: client.AccountRequirement(nil).List(nil, nil) or
// client.AccountRequirement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) AccountRequirement(data map[string]any) WiseEntityBase {
	return NewAccountRequirementEntityFunc(sdk, data)
}


// Activity returns a Activity entity bound to this client.
// Idiomatic usage: client.Activity(nil).List(nil, nil) or
// client.Activity(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Activity(data map[string]any) WiseEntityBase {
	return NewActivityEntityFunc(sdk, data)
}


// Address returns a Address entity bound to this client.
// Idiomatic usage: client.Address(nil).List(nil, nil) or
// client.Address(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Address(data map[string]any) WiseEntityBase {
	return NewAddressEntityFunc(sdk, data)
}


// AddressRequirement returns a AddressRequirement entity bound to this client.
// Idiomatic usage: client.AddressRequirement(nil).List(nil, nil) or
// client.AddressRequirement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) AddressRequirement(data map[string]any) WiseEntityBase {
	return NewAddressRequirementEntityFunc(sdk, data)
}


// Balance returns a Balance entity bound to this client.
// Idiomatic usage: client.Balance(nil).List(nil, nil) or
// client.Balance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Balance(data map[string]any) WiseEntityBase {
	return NewBalanceEntityFunc(sdk, data)
}


// BalanceStatement returns a BalanceStatement entity bound to this client.
// Idiomatic usage: client.BalanceStatement(nil).List(nil, nil) or
// client.BalanceStatement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BalanceStatement(data map[string]any) WiseEntityBase {
	return NewBalanceStatementEntityFunc(sdk, data)
}


// BankAccountDetail returns a BankAccountDetail entity bound to this client.
// Idiomatic usage: client.BankAccountDetail(nil).List(nil, nil) or
// client.BankAccountDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BankAccountDetail(data map[string]any) WiseEntityBase {
	return NewBankAccountDetailEntityFunc(sdk, data)
}


// BankAccountDetailsOrder returns a BankAccountDetailsOrder entity bound to this client.
// Idiomatic usage: client.BankAccountDetailsOrder(nil).List(nil, nil) or
// client.BankAccountDetailsOrder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BankAccountDetailsOrder(data map[string]any) WiseEntityBase {
	return NewBankAccountDetailsOrderEntityFunc(sdk, data)
}


// BatchGroup returns a BatchGroup entity bound to this client.
// Idiomatic usage: client.BatchGroup(nil).List(nil, nil) or
// client.BatchGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BatchGroup(data map[string]any) WiseEntityBase {
	return NewBatchGroupEntityFunc(sdk, data)
}


// BulkSettlement returns a BulkSettlement entity bound to this client.
// Idiomatic usage: client.BulkSettlement(nil).List(nil, nil) or
// client.BulkSettlement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BulkSettlement(data map[string]any) WiseEntityBase {
	return NewBulkSettlementEntityFunc(sdk, data)
}


// BusinessProfile returns a BusinessProfile entity bound to this client.
// Idiomatic usage: client.BusinessProfile(nil).List(nil, nil) or
// client.BusinessProfile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) BusinessProfile(data map[string]any) WiseEntityBase {
	return NewBusinessProfileEntityFunc(sdk, data)
}


// Card returns a Card entity bound to this client.
// Idiomatic usage: client.Card(nil).List(nil, nil) or
// client.Card(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Card(data map[string]any) WiseEntityBase {
	return NewCardEntityFunc(sdk, data)
}


// CardHolderLimit returns a CardHolderLimit entity bound to this client.
// Idiomatic usage: client.CardHolderLimit(nil).List(nil, nil) or
// client.CardHolderLimit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) CardHolderLimit(data map[string]any) WiseEntityBase {
	return NewCardHolderLimitEntityFunc(sdk, data)
}


// CardLimit returns a CardLimit entity bound to this client.
// Idiomatic usage: client.CardLimit(nil).List(nil, nil) or
// client.CardLimit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) CardLimit(data map[string]any) WiseEntityBase {
	return NewCardLimitEntityFunc(sdk, data)
}


// CardOrder returns a CardOrder entity bound to this client.
// Idiomatic usage: client.CardOrder(nil).List(nil, nil) or
// client.CardOrder(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) CardOrder(data map[string]any) WiseEntityBase {
	return NewCardOrderEntityFunc(sdk, data)
}


// CardSensitiveDetail returns a CardSensitiveDetail entity bound to this client.
// Idiomatic usage: client.CardSensitiveDetail(nil).List(nil, nil) or
// client.CardSensitiveDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) CardSensitiveDetail(data map[string]any) WiseEntityBase {
	return NewCardSensitiveDetailEntityFunc(sdk, data)
}


// CardTransaction returns a CardTransaction entity bound to this client.
// Idiomatic usage: client.CardTransaction(nil).List(nil, nil) or
// client.CardTransaction(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) CardTransaction(data map[string]any) WiseEntityBase {
	return NewCardTransactionEntityFunc(sdk, data)
}


// Case returns a Case entity bound to this client.
// Idiomatic usage: client.Case(nil).List(nil, nil) or
// client.Case(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Case(data map[string]any) WiseEntityBase {
	return NewCaseEntityFunc(sdk, data)
}


// ClaimAccount returns a ClaimAccount entity bound to this client.
// Idiomatic usage: client.ClaimAccount(nil).List(nil, nil) or
// client.ClaimAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ClaimAccount(data map[string]any) WiseEntityBase {
	return NewClaimAccountEntityFunc(sdk, data)
}


// Comparison returns a Comparison entity bound to this client.
// Idiomatic usage: client.Comparison(nil).List(nil, nil) or
// client.Comparison(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Comparison(data map[string]any) WiseEntityBase {
	return NewComparisonEntityFunc(sdk, data)
}


// Contact returns a Contact entity bound to this client.
// Idiomatic usage: client.Contact(nil).List(nil, nil) or
// client.Contact(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Contact(data map[string]any) WiseEntityBase {
	return NewContactEntityFunc(sdk, data)
}


// Currency returns a Currency entity bound to this client.
// Idiomatic usage: client.Currency(nil).List(nil, nil) or
// client.Currency(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Currency(data map[string]any) WiseEntityBase {
	return NewCurrencyEntityFunc(sdk, data)
}


// DeliveryEstimate returns a DeliveryEstimate entity bound to this client.
// Idiomatic usage: client.DeliveryEstimate(nil).List(nil, nil) or
// client.DeliveryEstimate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) DeliveryEstimate(data map[string]any) WiseEntityBase {
	return NewDeliveryEstimateEntityFunc(sdk, data)
}


// DeliveryUpdate returns a DeliveryUpdate entity bound to this client.
// Idiomatic usage: client.DeliveryUpdate(nil).List(nil, nil) or
// client.DeliveryUpdate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) DeliveryUpdate(data map[string]any) WiseEntityBase {
	return NewDeliveryUpdateEntityFunc(sdk, data)
}


// DigitalWallet returns a DigitalWallet entity bound to this client.
// Idiomatic usage: client.DigitalWallet(nil).List(nil, nil) or
// client.DigitalWallet(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) DigitalWallet(data map[string]any) WiseEntityBase {
	return NewDigitalWalletEntityFunc(sdk, data)
}


// DirectDebitAccount returns a DirectDebitAccount entity bound to this client.
// Idiomatic usage: client.DirectDebitAccount(nil).List(nil, nil) or
// client.DirectDebitAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) DirectDebitAccount(data map[string]any) WiseEntityBase {
	return NewDirectDebitAccountEntityFunc(sdk, data)
}


// Director returns a Director entity bound to this client.
// Idiomatic usage: client.Director(nil).List(nil, nil) or
// client.Director(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Director(data map[string]any) WiseEntityBase {
	return NewDirectorEntityFunc(sdk, data)
}


// Dispute returns a Dispute entity bound to this client.
// Idiomatic usage: client.Dispute(nil).List(nil, nil) or
// client.Dispute(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Dispute(data map[string]any) WiseEntityBase {
	return NewDisputeEntityFunc(sdk, data)
}


// DisputeReason returns a DisputeReason entity bound to this client.
// Idiomatic usage: client.DisputeReason(nil).List(nil, nil) or
// client.DisputeReason(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) DisputeReason(data map[string]any) WiseEntityBase {
	return NewDisputeReasonEntityFunc(sdk, data)
}


// Facetec returns a Facetec entity bound to this client.
// Idiomatic usage: client.Facetec(nil).List(nil, nil) or
// client.Facetec(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Facetec(data map[string]any) WiseEntityBase {
	return NewFacetecEntityFunc(sdk, data)
}


// File returns a File entity bound to this client.
// Idiomatic usage: client.File(nil).List(nil, nil) or
// client.File(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) File(data map[string]any) WiseEntityBase {
	return NewFileEntityFunc(sdk, data)
}


// Funding returns a Funding entity bound to this client.
// Idiomatic usage: client.Funding(nil).List(nil, nil) or
// client.Funding(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Funding(data map[string]any) WiseEntityBase {
	return NewFundingEntityFunc(sdk, data)
}


// GpiTracking returns a GpiTracking entity bound to this client.
// Idiomatic usage: client.GpiTracking(nil).List(nil, nil) or
// client.GpiTracking(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) GpiTracking(data map[string]any) WiseEntityBase {
	return NewGpiTrackingEntityFunc(sdk, data)
}


// HoldLimitBreach returns a HoldLimitBreach entity bound to this client.
// Idiomatic usage: client.HoldLimitBreach(nil).List(nil, nil) or
// client.HoldLimitBreach(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) HoldLimitBreach(data map[string]any) WiseEntityBase {
	return NewHoldLimitBreachEntityFunc(sdk, data)
}


// IncomingTransfer returns a IncomingTransfer entity bound to this client.
// Idiomatic usage: client.IncomingTransfer(nil).List(nil, nil) or
// client.IncomingTransfer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) IncomingTransfer(data map[string]any) WiseEntityBase {
	return NewIncomingTransferEntityFunc(sdk, data)
}


// Jose returns a Jose entity bound to this client.
// Idiomatic usage: client.Jose(nil).List(nil, nil) or
// client.Jose(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Jose(data map[string]any) WiseEntityBase {
	return NewJoseEntityFunc(sdk, data)
}


// KycReview returns a KycReview entity bound to this client.
// Idiomatic usage: client.KycReview(nil).List(nil, nil) or
// client.KycReview(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) KycReview(data map[string]any) WiseEntityBase {
	return NewKycReviewEntityFunc(sdk, data)
}


// LinkRequest returns a LinkRequest entity bound to this client.
// Idiomatic usage: client.LinkRequest(nil).List(nil, nil) or
// client.LinkRequest(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) LinkRequest(data map[string]any) WiseEntityBase {
	return NewLinkRequestEntityFunc(sdk, data)
}


// Message returns a Message entity bound to this client.
// Idiomatic usage: client.Message(nil).List(nil, nil) or
// client.Message(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Message(data map[string]any) WiseEntityBase {
	return NewMessageEntityFunc(sdk, data)
}


// MultiCurrencyAccount returns a MultiCurrencyAccount entity bound to this client.
// Idiomatic usage: client.MultiCurrencyAccount(nil).List(nil, nil) or
// client.MultiCurrencyAccount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) MultiCurrencyAccount(data map[string]any) WiseEntityBase {
	return NewMultiCurrencyAccountEntityFunc(sdk, data)
}


// OneTimeToken returns a OneTimeToken entity bound to this client.
// Idiomatic usage: client.OneTimeToken(nil).List(nil, nil) or
// client.OneTimeToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) OneTimeToken(data map[string]any) WiseEntityBase {
	return NewOneTimeTokenEntityFunc(sdk, data)
}


// Ott returns a Ott entity bound to this client.
// Idiomatic usage: client.Ott(nil).List(nil, nil) or
// client.Ott(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Ott(data map[string]any) WiseEntityBase {
	return NewOttEntityFunc(sdk, data)
}


// Payin returns a Payin entity bound to this client.
// Idiomatic usage: client.Payin(nil).List(nil, nil) or
// client.Payin(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Payin(data map[string]any) WiseEntityBase {
	return NewPayinEntityFunc(sdk, data)
}


// PayinDepositDetail returns a PayinDepositDetail entity bound to this client.
// Idiomatic usage: client.PayinDepositDetail(nil).List(nil, nil) or
// client.PayinDepositDetail(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) PayinDepositDetail(data map[string]any) WiseEntityBase {
	return NewPayinDepositDetailEntityFunc(sdk, data)
}


// Payment returns a Payment entity bound to this client.
// Idiomatic usage: client.Payment(nil).List(nil, nil) or
// client.Payment(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Payment(data map[string]any) WiseEntityBase {
	return NewPaymentEntityFunc(sdk, data)
}


// PaymentInitiation returns a PaymentInitiation entity bound to this client.
// Idiomatic usage: client.PaymentInitiation(nil).List(nil, nil) or
// client.PaymentInitiation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) PaymentInitiation(data map[string]any) WiseEntityBase {
	return NewPaymentInitiationEntityFunc(sdk, data)
}


// PaymentInstrument returns a PaymentInstrument entity bound to this client.
// Idiomatic usage: client.PaymentInstrument(nil).List(nil, nil) or
// client.PaymentInstrument(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) PaymentInstrument(data map[string]any) WiseEntityBase {
	return NewPaymentInstrumentEntityFunc(sdk, data)
}


// PaymentIntent returns a PaymentIntent entity bound to this client.
// Idiomatic usage: client.PaymentIntent(nil).List(nil, nil) or
// client.PaymentIntent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) PaymentIntent(data map[string]any) WiseEntityBase {
	return NewPaymentIntentEntityFunc(sdk, data)
}


// PhoneNumber returns a PhoneNumber entity bound to this client.
// Idiomatic usage: client.PhoneNumber(nil).List(nil, nil) or
// client.PhoneNumber(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) PhoneNumber(data map[string]any) WiseEntityBase {
	return NewPhoneNumberEntityFunc(sdk, data)
}


// Production returns a Production entity bound to this client.
// Idiomatic usage: client.Production(nil).List(nil, nil) or
// client.Production(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Production(data map[string]any) WiseEntityBase {
	return NewProductionEntityFunc(sdk, data)
}


// Profile returns a Profile entity bound to this client.
// Idiomatic usage: client.Profile(nil).List(nil, nil) or
// client.Profile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Profile(data map[string]any) WiseEntityBase {
	return NewProfileEntityFunc(sdk, data)
}


// Quote returns a Quote entity bound to this client.
// Idiomatic usage: client.Quote(nil).List(nil, nil) or
// client.Quote(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Quote(data map[string]any) WiseEntityBase {
	return NewQuoteEntityFunc(sdk, data)
}


// Rate returns a Rate entity bound to this client.
// Idiomatic usage: client.Rate(nil).List(nil, nil) or
// client.Rate(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Rate(data map[string]any) WiseEntityBase {
	return NewRateEntityFunc(sdk, data)
}


// Recipient returns a Recipient entity bound to this client.
// Idiomatic usage: client.Recipient(nil).List(nil, nil) or
// client.Recipient(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Recipient(data map[string]any) WiseEntityBase {
	return NewRecipientEntityFunc(sdk, data)
}


// Rule returns a Rule entity bound to this client.
// Idiomatic usage: client.Rule(nil).List(nil, nil) or
// client.Rule(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Rule(data map[string]any) WiseEntityBase {
	return NewRuleEntityFunc(sdk, data)
}


// Saml returns a Saml entity bound to this client.
// Idiomatic usage: client.Saml(nil).List(nil, nil) or
// client.Saml(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Saml(data map[string]any) WiseEntityBase {
	return NewSamlEntityFunc(sdk, data)
}


// ScaDeviceFingerprint returns a ScaDeviceFingerprint entity bound to this client.
// Idiomatic usage: client.ScaDeviceFingerprint(nil).List(nil, nil) or
// client.ScaDeviceFingerprint(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ScaDeviceFingerprint(data map[string]any) WiseEntityBase {
	return NewScaDeviceFingerprintEntityFunc(sdk, data)
}


// ScaFacemap returns a ScaFacemap entity bound to this client.
// Idiomatic usage: client.ScaFacemap(nil).List(nil, nil) or
// client.ScaFacemap(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ScaFacemap(data map[string]any) WiseEntityBase {
	return NewScaFacemapEntityFunc(sdk, data)
}


// ScaOtp returns a ScaOtp entity bound to this client.
// Idiomatic usage: client.ScaOtp(nil).List(nil, nil) or
// client.ScaOtp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ScaOtp(data map[string]any) WiseEntityBase {
	return NewScaOtpEntityFunc(sdk, data)
}


// ScaSession returns a ScaSession entity bound to this client.
// Idiomatic usage: client.ScaSession(nil).List(nil, nil) or
// client.ScaSession(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ScaSession(data map[string]any) WiseEntityBase {
	return NewScaSessionEntityFunc(sdk, data)
}


// SettlementAllocation returns a SettlementAllocation entity bound to this client.
// Idiomatic usage: client.SettlementAllocation(nil).List(nil, nil) or
// client.SettlementAllocation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) SettlementAllocation(data map[string]any) WiseEntityBase {
	return NewSettlementAllocationEntityFunc(sdk, data)
}


// Simulation returns a Simulation entity bound to this client.
// Idiomatic usage: client.Simulation(nil).List(nil, nil) or
// client.Simulation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Simulation(data map[string]any) WiseEntityBase {
	return NewSimulationEntityFunc(sdk, data)
}


// SpendControl returns a SpendControl entity bound to this client.
// Idiomatic usage: client.SpendControl(nil).List(nil, nil) or
// client.SpendControl(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) SpendControl(data map[string]any) WiseEntityBase {
	return NewSpendControlEntityFunc(sdk, data)
}


// SpendLimit returns a SpendLimit entity bound to this client.
// Idiomatic usage: client.SpendLimit(nil).List(nil, nil) or
// client.SpendLimit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) SpendLimit(data map[string]any) WiseEntityBase {
	return NewSpendLimitEntityFunc(sdk, data)
}


// Subscription returns a Subscription entity bound to this client.
// Idiomatic usage: client.Subscription(nil).List(nil, nil) or
// client.Subscription(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Subscription(data map[string]any) WiseEntityBase {
	return NewSubscriptionEntityFunc(sdk, data)
}


// TestNotification returns a TestNotification entity bound to this client.
// Idiomatic usage: client.TestNotification(nil).List(nil, nil) or
// client.TestNotification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) TestNotification(data map[string]any) WiseEntityBase {
	return NewTestNotificationEntityFunc(sdk, data)
}


// ThirdPartyTransfer returns a ThirdPartyTransfer entity bound to this client.
// Idiomatic usage: client.ThirdPartyTransfer(nil).List(nil, nil) or
// client.ThirdPartyTransfer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ThirdPartyTransfer(data map[string]any) WiseEntityBase {
	return NewThirdPartyTransferEntityFunc(sdk, data)
}


// ThreeDSecure returns a ThreeDSecure entity bound to this client.
// Idiomatic usage: client.ThreeDSecure(nil).List(nil, nil) or
// client.ThreeDSecure(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) ThreeDSecure(data map[string]any) WiseEntityBase {
	return NewThreeDSecureEntityFunc(sdk, data)
}


// Token returns a Token entity bound to this client.
// Idiomatic usage: client.Token(nil).List(nil, nil) or
// client.Token(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Token(data map[string]any) WiseEntityBase {
	return NewTokenEntityFunc(sdk, data)
}


// Transfer returns a Transfer entity bound to this client.
// Idiomatic usage: client.Transfer(nil).List(nil, nil) or
// client.Transfer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Transfer(data map[string]any) WiseEntityBase {
	return NewTransferEntityFunc(sdk, data)
}


// TransferRequirement returns a TransferRequirement entity bound to this client.
// Idiomatic usage: client.TransferRequirement(nil).List(nil, nil) or
// client.TransferRequirement(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) TransferRequirement(data map[string]any) WiseEntityBase {
	return NewTransferRequirementEntityFunc(sdk, data)
}


// Ubo returns a Ubo entity bound to this client.
// Idiomatic usage: client.Ubo(nil).List(nil, nil) or
// client.Ubo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Ubo(data map[string]any) WiseEntityBase {
	return NewUboEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) User(data map[string]any) WiseEntityBase {
	return NewUserEntityFunc(sdk, data)
}


// Verification returns a Verification entity bound to this client.
// Idiomatic usage: client.Verification(nil).List(nil, nil) or
// client.Verification(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *WiseSDK) Verification(data map[string]any) WiseEntityBase {
	return NewVerificationEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *WiseSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewWiseSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
