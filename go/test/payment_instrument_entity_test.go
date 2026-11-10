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
const payment_instrumentEntityLiveStrict = true


func TestPaymentInstrumentEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PaymentInstrument(nil)
		if ent == nil {
			t.Fatal("expected non-nil PaymentInstrumentEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PaymentInstrument(nil).List(map[string]any{"id": 1, "profile_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := payment_instrumentBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "payment_instrument." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"payment_instrument.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation\"}")
		if setup.live {
			for _, _liveKey := range []string{"payment_instrument01", "profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, payment_instrumentEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_PAYMENT_INSTRUMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["payment_instrument01"]
			}
			livePace()
			liveExisting(t, payment_instrumentEntityLiveStrict, setup.data, "payment_instrument", "id", _liveId,
				func() (any, error) {
					return client.PaymentInstrument(nil).List(map[string]any{"payment_instrument_id": setup.idmap["payment_instrument01"], "profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		paymentInstrumentRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.payment_instrument")))
		var paymentInstrumentRef01Data map[string]any
		if len(paymentInstrumentRef01DataRaw) > 0 {
			paymentInstrumentRef01Data = core.ToMapAny(paymentInstrumentRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = paymentInstrumentRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		paymentInstrumentRef01Ent := client.PaymentInstrument(nil)
		paymentInstrumentRef01Match := map[string]any{
			"payment_instrument_id": setup.idmap["payment_instrument01"],
			"profile_id": setup.idmap["profile01"],
		}

		paymentInstrumentRef01ListResult, err := paymentInstrumentRef01Ent.List(paymentInstrumentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, paymentInstrumentRef01ListOk := paymentInstrumentRef01ListResult.([]any)
		if !paymentInstrumentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", paymentInstrumentRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		paymentInstrumentRef01MatchDt0 := map[string]any{
			"id": paymentInstrumentRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			paymentInstrumentRef01MatchDt0["profile_id"] = v
		} else {
			paymentInstrumentRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		paymentInstrumentRef01DataDt0Loaded, err := paymentInstrumentRef01Ent.Load(paymentInstrumentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		paymentInstrumentRef01DataDt0LoadResult := core.ToMapAny(entityData(paymentInstrumentRef01DataDt0Loaded))
		if paymentInstrumentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(paymentInstrumentRef01DataDt0LoadResult["id"], paymentInstrumentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01", "payment_instrument01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, payment_instrumentEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_PAYMENT_INSTRUMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		paymentInstrumentRef01Ent := client.PaymentInstrument(nil)
		paymentInstrumentRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "payment_instrument"}), "payment_instrument_ref01"))
		paymentInstrumentRef01Data["profile_id"] = setup.idmap["profile01"]

		paymentInstrumentRef01DataResult, err := paymentInstrumentRef01Ent.Create(paymentInstrumentRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		paymentInstrumentRef01Data = core.ToMapAny(entityData(paymentInstrumentRef01DataResult))
		if paymentInstrumentRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if paymentInstrumentRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		paymentInstrumentRef01Match := map[string]any{
			"payment_instrument_id": setup.idmap["payment_instrument01"],
			"profile_id": setup.idmap["profile01"],
		}

		paymentInstrumentRef01ListResult, err := paymentInstrumentRef01Ent.List(paymentInstrumentRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		paymentInstrumentRef01List, paymentInstrumentRef01ListOk := paymentInstrumentRef01ListResult.([]any)
		if !paymentInstrumentRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", paymentInstrumentRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(paymentInstrumentRef01List), map[string]any{"id": paymentInstrumentRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		paymentInstrumentRef01MatchDt0 := map[string]any{
			"id": paymentInstrumentRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			paymentInstrumentRef01MatchDt0["profile_id"] = v
		} else {
			paymentInstrumentRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		paymentInstrumentRef01DataDt0Loaded, err := paymentInstrumentRef01Ent.Load(paymentInstrumentRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		paymentInstrumentRef01DataDt0LoadResult := core.ToMapAny(entityData(paymentInstrumentRef01DataDt0Loaded))
		if paymentInstrumentRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(paymentInstrumentRef01DataDt0LoadResult["id"], paymentInstrumentRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func payment_instrumentBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "payment_instrument", "PaymentInstrumentTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read payment_instrument test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse payment_instrument test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"payment_instrument01", "payment_instrument02", "payment_instrument03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_PAYMENT_INSTRUMENT_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_PAYMENT_INSTRUMENT_ENTID"])
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
