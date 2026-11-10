package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/wise-sdk/go"
	"github.com/voxgig-sdk/wise-sdk/go/core"

	vs "github.com/voxgig-sdk/wise-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const bank_account_details_orderEntityLiveStrict = true


func TestBankAccountDetailsOrderEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BankAccountDetailsOrder(nil)
		if ent == nil {
			t.Fatal("expected non-nil BankAccountDetailsOrderEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BankAccountDetailsOrder(nil).List(map[string]any{"profile_id": "x", "currency": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := bank_account_details_orderBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "bank_account_details_order." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"bank_account_details_order.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/account-details-orders\"}")
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"profile01": float64(12345678)} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		bankAccountDetailsOrderRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.bank_account_details_order")))
		var bankAccountDetailsOrderRef01Data map[string]any
		if len(bankAccountDetailsOrderRef01DataRaw) > 0 {
			bankAccountDetailsOrderRef01Data = core.ToMapAny(bankAccountDetailsOrderRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = bankAccountDetailsOrderRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		bankAccountDetailsOrderRef01Ent := client.BankAccountDetailsOrder(nil)
		bankAccountDetailsOrderRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			bankAccountDetailsOrderRef01Match["currency"] = "GBP"
		}

		bankAccountDetailsOrderRef01ListResult, err := bankAccountDetailsOrderRef01Ent.List(bankAccountDetailsOrderRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, bankAccountDetailsOrderRef01ListOk := bankAccountDetailsOrderRef01ListResult.([]any)
		if !bankAccountDetailsOrderRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bankAccountDetailsOrderRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, bank_account_details_orderEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		bankAccountDetailsOrderRef01Ent := client.BankAccountDetailsOrder(nil)
		bankAccountDetailsOrderRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "bank_account_details_order"}), "bank_account_details_order_ref01"))
		bankAccountDetailsOrderRef01Data["profile_id"] = setup.idmap["profile01"]

		bankAccountDetailsOrderRef01DataResult, err := bankAccountDetailsOrderRef01Ent.Create(bankAccountDetailsOrderRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		bankAccountDetailsOrderRef01Data = core.ToMapAny(entityData(bankAccountDetailsOrderRef01DataResult))
		if bankAccountDetailsOrderRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if bankAccountDetailsOrderRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		bankAccountDetailsOrderRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			bankAccountDetailsOrderRef01Match["currency"] = "GBP"
		}

		bankAccountDetailsOrderRef01ListResult, err := bankAccountDetailsOrderRef01Ent.List(bankAccountDetailsOrderRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		bankAccountDetailsOrderRef01List, bankAccountDetailsOrderRef01ListOk := bankAccountDetailsOrderRef01ListResult.([]any)
		if !bankAccountDetailsOrderRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", bankAccountDetailsOrderRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(bankAccountDetailsOrderRef01List), map[string]any{"id": bankAccountDetailsOrderRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

	})
}

func bank_account_details_orderBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "bank_account_details_order", "BankAccountDetailsOrderTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read bank_account_details_order test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse bank_account_details_order test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"bank_account_details_order01", "bank_account_details_order02", "bank_account_details_order03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["WISE_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["WISE_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewWiseSDK(core.ToMapAny(mergedOpts))
	}

	live := env["WISE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["WISE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
