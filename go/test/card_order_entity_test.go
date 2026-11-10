package sdktest

import (
	"encoding/json"
	"fmt"
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
const card_orderEntityLiveStrict = true


func TestCardOrderEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CardOrder(nil)
		if ent == nil {
			t.Fatal("expected non-nil CardOrderEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.CardOrder(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := card_orderBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "card_order." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"card_order.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/card-orders\"}")
			t.Log("LIVE STEP {\"id\":\"card_order.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /spend/profiles/{profileId}/card-orders/{cardOrderId}/status\"}")
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"profile01": float64(123456)} {
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
				_liveId = setup.idmap["card_order01"]
			}
			if _liveId == nil {
				_liveId = float64(142)
			}
			livePace()
			liveExisting(t, card_orderEntityLiveStrict, setup.data, "card_order", "id", _liveId,
				func() (any, error) {
					return client.CardOrder(nil).List(map[string]any{"profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cardOrderRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.card_order")))
		var cardOrderRef01Data map[string]any
		if len(cardOrderRef01DataRaw) > 0 {
			cardOrderRef01Data = core.ToMapAny(cardOrderRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cardOrderRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cardOrderRef01Ent := client.CardOrder(nil)
		cardOrderRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		cardOrderRef01ListResult, err := cardOrderRef01Ent.List(cardOrderRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cardOrderRef01ListOk := cardOrderRef01ListResult.([]any)
		if !cardOrderRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardOrderRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cardOrderRef01MatchDt0 := map[string]any{
			"id": cardOrderRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			cardOrderRef01MatchDt0["profile_id"] = v
		} else {
			cardOrderRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		cardOrderRef01DataDt0Loaded, err := cardOrderRef01Ent.Load(cardOrderRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cardOrderRef01DataDt0LoadResult := core.ToMapAny(entityData(cardOrderRef01DataDt0Loaded))
		if cardOrderRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(cardOrderRef01DataDt0LoadResult["id"], cardOrderRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, card_orderEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_CARD_ORDER_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		cardOrderRef01Ent := client.CardOrder(nil)
		cardOrderRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "card_order"}), "card_order_ref01"))
		cardOrderRef01Data["profile_id"] = setup.idmap["profile01"]

		cardOrderRef01DataResult, err := cardOrderRef01Ent.Create(cardOrderRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cardOrderRef01Data = core.ToMapAny(entityData(cardOrderRef01DataResult))
		if cardOrderRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if cardOrderRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		cardOrderRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		cardOrderRef01ListResult, err := cardOrderRef01Ent.List(cardOrderRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		cardOrderRef01List, cardOrderRef01ListOk := cardOrderRef01ListResult.([]any)
		if !cardOrderRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardOrderRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(cardOrderRef01List), map[string]any{"id": cardOrderRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		cardOrderRef01DataUp0Up := map[string]any{
			"id": cardOrderRef01Data["id"],
			"profile_id": setup.idmap["profile_id"],
		}

		cardOrderRef01MarkdefUp0Name := "cardHolderName"
		cardOrderRef01MarkdefUp0Value := fmt.Sprintf("Mark01-card_order_ref01_%d", setup.now)
		cardOrderRef01DataUp0Up[cardOrderRef01MarkdefUp0Name] = cardOrderRef01MarkdefUp0Value

		cardOrderRef01ResdataUp0Result, err := cardOrderRef01Ent.Update(cardOrderRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		cardOrderRef01ResdataUp0 := core.ToMapAny(entityData(cardOrderRef01ResdataUp0Result))
		if cardOrderRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(cardOrderRef01ResdataUp0["id"], cardOrderRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if cardOrderRef01ResdataUp0[cardOrderRef01MarkdefUp0Name] != cardOrderRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", cardOrderRef01MarkdefUp0Name, cardOrderRef01ResdataUp0[cardOrderRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cardOrderRef01MatchDt0 := map[string]any{
			"id": cardOrderRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			cardOrderRef01MatchDt0["profile_id"] = v
		} else {
			cardOrderRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		cardOrderRef01DataDt0Loaded, err := cardOrderRef01Ent.Load(cardOrderRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cardOrderRef01DataDt0LoadResult := core.ToMapAny(entityData(cardOrderRef01DataDt0Loaded))
		if cardOrderRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(cardOrderRef01DataDt0LoadResult["id"], cardOrderRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func card_orderBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "card_order", "CardOrderTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read card_order test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse card_order test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"card_order01", "card_order02", "card_order03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_CARD_ORDER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_CARD_ORDER_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_CARD_ORDER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}
	// Add profile_id alias for update test.
	if idmapResolved["profile_id"] == nil {
		idmapResolved["profile_id"] = idmapResolved["profile01"]
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
