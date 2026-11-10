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
const card_transactionEntityLiveStrict = true


func TestCardTransactionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CardTransaction(nil)
		if ent == nil {
			t.Fatal("expected non-nil CardTransactionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CardTransaction(nil).List(map[string]any{"card_token": 1, "profile_id": 1, "from_creation_time": "x", "to_creation_time": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := card_transactionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "card_transaction." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"card_token01": "59123122-223d-45f9-b840-0ad4a4f80937", "profile01": float64(123456)} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["card_transaction01"]
			}
			if _liveId == nil {
				_liveId = float64(342671)
			}
			livePace()
			liveExisting(t, card_transactionEntityLiveStrict, setup.data, "card_transaction", "id", _liveId,
				func() (any, error) {
					return client.CardTransaction(nil).List(map[string]any{"card_token": setup.idmap["card_token01"], "profile_id": setup.idmap["profile01"], "from_creation_time": "2025-12-15T00:00:00Z", "to_creation_time": "2026-01-15T00:00:10Z"}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cardTransactionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.card_transaction")))
		var cardTransactionRef01Data map[string]any
		if len(cardTransactionRef01DataRaw) > 0 {
			cardTransactionRef01Data = core.ToMapAny(cardTransactionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cardTransactionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cardTransactionRef01Ent := client.CardTransaction(nil)
		cardTransactionRef01Match := map[string]any{
			"card_token": setup.idmap["card_token01"],
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			cardTransactionRef01Match["from_creation_time"] = "2025-12-15T00:00:00Z"
			cardTransactionRef01Match["to_creation_time"] = "2026-01-15T00:00:10Z"
		}

		cardTransactionRef01ListResult, err := cardTransactionRef01Ent.List(cardTransactionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cardTransactionRef01ListOk := cardTransactionRef01ListResult.([]any)
		if !cardTransactionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardTransactionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cardTransactionRef01MatchDt0 := map[string]any{
			"id": cardTransactionRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			cardTransactionRef01MatchDt0["profile_id"] = v
		} else {
			cardTransactionRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		cardTransactionRef01DataDt0Loaded, err := cardTransactionRef01Ent.Load(cardTransactionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cardTransactionRef01DataDt0LoadResult := core.ToMapAny(entityData(cardTransactionRef01DataDt0Loaded))
		if cardTransactionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(cardTransactionRef01DataDt0LoadResult["id"], cardTransactionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func card_transactionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "card_transaction", "CardTransactionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read card_transaction test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse card_transaction test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"card_transaction01", "card_transaction02", "card_transaction03", "profile01", "profile02", "profile03", "card01", "card02", "card03", "card_token01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_CARD_TRANSACTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_CARD_TRANSACTION_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_CARD_TRANSACTION_ENTID"])
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
