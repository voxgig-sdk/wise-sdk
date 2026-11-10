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
const payment_initiationEntityLiveStrict = true


func TestPaymentInitiationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PaymentInitiation(nil)
		if ent == nil {
			t.Fatal("expected non-nil PaymentInitiationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PaymentInitiation(nil).Load(map[string]any{"batch_group_id": 1, "id": 1, "profile_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := payment_initiationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "payment_initiation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"payment_initiation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations\"}")
			t.Log("LIVE STEP {\"id\":\"payment_initiation.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only payment_initiation.create.0 gives\"}")
			t.Skip("Live coverage incomplete: payment_initiation.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations); payment_initiation.load.1 excluded (GET-only live run: reads a record only payment_initiation.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"batch_group01", "profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, payment_initiationEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_PAYMENT_INITIATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		paymentInitiationRef01Ent := client.PaymentInitiation(nil)
		paymentInitiationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "payment_initiation"}), "payment_initiation_ref01"))
		paymentInitiationRef01Data["batch_group_id"] = setup.idmap["batch_group01"]
		paymentInitiationRef01Data["profile_id"] = setup.idmap["profile01"]

		paymentInitiationRef01DataResult, err := paymentInitiationRef01Ent.Create(paymentInitiationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		paymentInitiationRef01Data = core.ToMapAny(entityData(paymentInitiationRef01DataResult))
		if paymentInitiationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if paymentInitiationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		paymentInitiationRef01MatchDt0 := map[string]any{
			"id": paymentInitiationRef01Data["id"],
		}
		if v := setup.idmap["batch_group_id"]; v != nil {
			paymentInitiationRef01MatchDt0["batch_group_id"] = v
		} else {
			paymentInitiationRef01MatchDt0["batch_group_id"] = setup.idmap["batch_group01"]
		}
		if v := setup.idmap["profile_id"]; v != nil {
			paymentInitiationRef01MatchDt0["profile_id"] = v
		} else {
			paymentInitiationRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		paymentInitiationRef01DataDt0Loaded, err := paymentInitiationRef01Ent.Load(paymentInitiationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		paymentInitiationRef01DataDt0LoadResult := core.ToMapAny(entityData(paymentInitiationRef01DataDt0Loaded))
		if paymentInitiationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(paymentInitiationRef01DataDt0LoadResult["id"], paymentInitiationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func payment_initiationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "payment_initiation", "PaymentInitiationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read payment_initiation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse payment_initiation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"payment_initiation01", "payment_initiation02", "payment_initiation03", "profile01", "profile02", "profile03", "batch_group01", "batch_group02", "batch_group03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_PAYMENT_INITIATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_PAYMENT_INITIATION_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_PAYMENT_INITIATION_ENTID"])
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
