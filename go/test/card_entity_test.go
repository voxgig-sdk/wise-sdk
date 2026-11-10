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
const cardEntityLiveStrict = true


func TestCardEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Card(nil)
		if ent == nil {
			t.Fatal("expected non-nil CardEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Card(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := cardBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "card." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"card.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count\"}")
			t.Log("LIVE STEP {\"id\":\"card.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions\"}")
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
				_liveId = setup.idmap["card01"]
			}
			if _liveId == nil {
				_liveId = "ca0c8154-1e14-4464-a1ce-dcea7dc3de52"
			}
			livePace()
			liveExisting(t, cardEntityLiveStrict, setup.data, "card", "id", _liveId,
				func() (any, error) {
					return client.Card(nil).List(map[string]any{"profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		cardRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.card")))
		var cardRef01Data map[string]any
		if len(cardRef01DataRaw) > 0 {
			cardRef01Data = core.ToMapAny(cardRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cardRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		cardRef01Ent := client.Card(nil)
		cardRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		cardRef01ListResult, err := cardRef01Ent.List(cardRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, cardRef01ListOk := cardRef01ListResult.([]any)
		if !cardRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cardRef01MatchDt0 := map[string]any{
			"id": cardRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			cardRef01MatchDt0["profile_id"] = v
		} else {
			cardRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		cardRef01DataDt0Loaded, err := cardRef01Ent.Load(cardRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cardRef01DataDt0LoadResult := core.ToMapAny(entityData(cardRef01DataDt0Loaded))
		if cardRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cardRef01DataDt0LoadResult["id"], cardRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"card_token01", "profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, cardEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_CARD_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		cardRef01Ent := client.Card(nil)
		cardRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "card"}), "card_ref01"))
		cardRef01Data["card_token"] = setup.idmap["card_token01"]
		cardRef01Data["profile_id"] = setup.idmap["profile01"]

		cardRef01DataResult, err := cardRef01Ent.Create(cardRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		cardRef01Data = core.ToMapAny(entityData(cardRef01DataResult))
		if cardRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if cardRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		cardRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		cardRef01ListResult, err := cardRef01Ent.List(cardRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		cardRef01List, cardRef01ListOk := cardRef01ListResult.([]any)
		if !cardRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", cardRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(cardRef01List), map[string]any{"id": cardRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		cardRef01MatchDt0 := map[string]any{
			"id": cardRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			cardRef01MatchDt0["profile_id"] = v
		} else {
			cardRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		cardRef01DataDt0Loaded, err := cardRef01Ent.Load(cardRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cardRef01DataDt0LoadResult := core.ToMapAny(entityData(cardRef01DataDt0Loaded))
		if cardRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !setup.live && !liveSameId(cardRef01DataDt0LoadResult["id"], cardRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func cardBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "card", "CardTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read card test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse card test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"card01", "card02", "card03", "profile01", "profile02", "profile03", "card_token01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_CARD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_CARD_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_CARD_ENTID"])
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
