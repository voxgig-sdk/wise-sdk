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
const balanceEntityLiveStrict = true


func TestBalanceEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Balance(nil)
		if ent == nil {
			t.Fatal("expected non-nil BalanceEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Balance(nil).List(map[string]any{"profile_id": "x", "type": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := balanceBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "balance." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"balance.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}\"}")
			t.Log("LIVE STEP {\"id\":\"balance.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/balances/{balanceId}\"}")
			t.Log("LIVE STEP {\"id\":\"balance.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, balanceEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_BALANCE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["balance01"]
			}
			livePace()
			liveExisting(t, balanceEntityLiveStrict, setup.data, "balance", "id", _liveId,
				func() (any, error) {
					return client.Balance(nil).List(map[string]any{"profile_id": setup.idmap["profile01"], "type": "STANDARD"}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		balanceRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.balance")))
		var balanceRef01Data map[string]any
		if len(balanceRef01DataRaw) > 0 {
			balanceRef01Data = core.ToMapAny(balanceRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = balanceRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		balanceRef01Ent := client.Balance(nil)
		balanceRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			balanceRef01Match["type"] = "STANDARD"
		}

		balanceRef01ListResult, err := balanceRef01Ent.List(balanceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, balanceRef01ListOk := balanceRef01ListResult.([]any)
		if !balanceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", balanceRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		balanceRef01MatchDt0 := map[string]any{
			"id": balanceRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			balanceRef01MatchDt0["profile_id"] = v
		} else {
			balanceRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		balanceRef01DataDt0Loaded, err := balanceRef01Ent.Load(balanceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		balanceRef01DataDt0LoadResult := core.ToMapAny(entityData(balanceRef01DataDt0Loaded))
		if balanceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(balanceRef01DataDt0LoadResult["id"], balanceRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, balanceEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_BALANCE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		balanceRef01Ent := client.Balance(nil)
		balanceRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "balance"}), "balance_ref01"))
		balanceRef01Data["profile_id"] = setup.idmap["profile01"]

		balanceRef01DataResult, err := balanceRef01Ent.Create(balanceRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		balanceRef01Data = core.ToMapAny(entityData(balanceRef01DataResult))
		if balanceRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if balanceRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		balanceRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			balanceRef01Match["type"] = "STANDARD"
		}

		balanceRef01ListResult, err := balanceRef01Ent.List(balanceRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		balanceRef01List, balanceRef01ListOk := balanceRef01ListResult.([]any)
		if !balanceRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", balanceRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(balanceRef01List), map[string]any{"id": balanceRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		balanceRef01MatchDt0 := map[string]any{
			"id": balanceRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			balanceRef01MatchDt0["profile_id"] = v
		} else {
			balanceRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		balanceRef01DataDt0Loaded, err := balanceRef01Ent.Load(balanceRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		balanceRef01DataDt0LoadResult := core.ToMapAny(entityData(balanceRef01DataDt0Loaded))
		if balanceRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(balanceRef01DataDt0LoadResult["id"], balanceRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		balanceRef01MatchRm0 := map[string]any{
			"id": balanceRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			balanceRef01MatchRm0["profile_id"] = v
		} else {
			balanceRef01MatchRm0["profile_id"] = setup.idmap["profile01"]
		}
		_, err = balanceRef01Ent.Remove(balanceRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		balanceRef01MatchRt0 := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}
		if setup.live {
			balanceRef01MatchRt0["type"] = "STANDARD"
		}

		balanceRef01ListRt0Result, err := balanceRef01Ent.List(balanceRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		balanceRef01ListRt0, balanceRef01ListRt0Ok := balanceRef01ListRt0Result.([]any)
		if !balanceRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", balanceRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(balanceRef01ListRt0), map[string]any{"id": balanceRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func balanceBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "balance", "BalanceTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read balance test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse balance test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"balance01", "balance02", "balance03", "profile01", "profile02", "profile03", "hold_limit_breach01", "hold_limit_breach02", "hold_limit_breach03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_BALANCE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_BALANCE_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_BALANCE_ENTID"])
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
