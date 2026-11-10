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
const batch_groupEntityLiveStrict = true


func TestBatchGroupEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BatchGroup(nil)
		if ent == nil {
			t.Fatal("expected non-nil BatchGroupEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BatchGroup(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := batch_groupBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "batch_group." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"batch_group.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments\"}")
			t.Log("LIVE STEP {\"id\":\"batch_group.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}\"}")
			t.Log("LIVE STEP {\"id\":\"batch_group.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only batch_group.create.0 gives\"}")
			t.Skip("Live coverage incomplete: batch_group.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments); batch_group.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}); batch_group.load.2 excluded (GET-only live run: reads a record only batch_group.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, batch_groupEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_BATCH_GROUP_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		batchGroupRef01Ent := client.BatchGroup(nil)
		batchGroupRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "batch_group"}), "batch_group_ref01"))
		batchGroupRef01Data["profile_id"] = setup.idmap["profile01"]

		batchGroupRef01DataResult, err := batchGroupRef01Ent.Create(batchGroupRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		batchGroupRef01Data = core.ToMapAny(entityData(batchGroupRef01DataResult))
		if batchGroupRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if batchGroupRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		batchGroupRef01DataUp0Up := map[string]any{
			"id": batchGroupRef01Data["id"],
			"profile_id": setup.idmap["profile_id"],
		}

		batchGroupRef01MarkdefUp0Name := "fileName"
		batchGroupRef01MarkdefUp0Value := fmt.Sprintf("Mark01-batch_group_ref01_%d", setup.now)
		batchGroupRef01DataUp0Up[batchGroupRef01MarkdefUp0Name] = batchGroupRef01MarkdefUp0Value

		batchGroupRef01ResdataUp0Result, err := batchGroupRef01Ent.Update(batchGroupRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		batchGroupRef01ResdataUp0 := core.ToMapAny(entityData(batchGroupRef01ResdataUp0Result))
		if batchGroupRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(batchGroupRef01ResdataUp0["id"], batchGroupRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if batchGroupRef01ResdataUp0[batchGroupRef01MarkdefUp0Name] != batchGroupRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", batchGroupRef01MarkdefUp0Name, batchGroupRef01ResdataUp0[batchGroupRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		batchGroupRef01MatchDt0 := map[string]any{
			"id": batchGroupRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			batchGroupRef01MatchDt0["profile_id"] = v
		} else {
			batchGroupRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		batchGroupRef01DataDt0Loaded, err := batchGroupRef01Ent.Load(batchGroupRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		batchGroupRef01DataDt0LoadResult := core.ToMapAny(entityData(batchGroupRef01DataDt0Loaded))
		if batchGroupRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(batchGroupRef01DataDt0LoadResult["id"], batchGroupRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func batch_groupBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "batch_group", "BatchGroupTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read batch_group test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse batch_group test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"batch_group01", "batch_group02", "batch_group03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_BATCH_GROUP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_BATCH_GROUP_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_BATCH_GROUP_ENTID"])
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
