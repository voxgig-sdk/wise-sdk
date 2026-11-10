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
const disputeEntityLiveStrict = true


func TestDisputeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Dispute(nil)
		if ent == nil {
			t.Fatal("expected non-nil DisputeEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Dispute(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := disputeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "dispute." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"dispute.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}\"}")
			t.Log("LIVE STEP {\"id\":\"dispute.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /spend/profiles/{profileId}/disputes/{disputeId}/status\"}")
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"profile01": float64(16605997)} {
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
				_liveId = setup.idmap["dispute01"]
			}
			if _liveId == nil {
				_liveId = "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb"
			}
			livePace()
			liveExisting(t, disputeEntityLiveStrict, setup.data, "dispute", "id", _liveId,
				func() (any, error) {
					return client.Dispute(nil).List(map[string]any{"profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		disputeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.dispute")))
		var disputeRef01Data map[string]any
		if len(disputeRef01DataRaw) > 0 {
			disputeRef01Data = core.ToMapAny(disputeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = disputeRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		disputeRef01Ent := client.Dispute(nil)
		disputeRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		disputeRef01ListResult, err := disputeRef01Ent.List(disputeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, disputeRef01ListOk := disputeRef01ListResult.([]any)
		if !disputeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", disputeRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		disputeRef01MatchDt0 := map[string]any{
			"id": disputeRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			disputeRef01MatchDt0["profile_id"] = v
		} else {
			disputeRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		disputeRef01DataDt0Loaded, err := disputeRef01Ent.Load(disputeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		disputeRef01DataDt0LoadResult := core.ToMapAny(entityData(disputeRef01DataDt0Loaded))
		if disputeRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(disputeRef01DataDt0LoadResult["id"], disputeRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, disputeEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_DISPUTE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		disputeRef01Ent := client.Dispute(nil)
		disputeRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "dispute"}), "dispute_ref01"))
		disputeRef01Data["profile_id"] = setup.idmap["profile01"]

		disputeRef01DataResult, err := disputeRef01Ent.Create(disputeRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		disputeRef01Data = core.ToMapAny(entityData(disputeRef01DataResult))
		if disputeRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if disputeRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		disputeRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		disputeRef01ListResult, err := disputeRef01Ent.List(disputeRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		disputeRef01List, disputeRef01ListOk := disputeRef01ListResult.([]any)
		if !disputeRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", disputeRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(disputeRef01List), map[string]any{"id": disputeRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		disputeRef01DataUp0Up := map[string]any{
			"id": disputeRef01Data["id"],
			"profile_id": setup.idmap["profile_id"],
		}

		disputeRef01MarkdefUp0Name := "createdAt"
		disputeRef01MarkdefUp0Value := fmt.Sprintf("Mark01-dispute_ref01_%d", setup.now)
		disputeRef01DataUp0Up[disputeRef01MarkdefUp0Name] = disputeRef01MarkdefUp0Value

		disputeRef01ResdataUp0Result, err := disputeRef01Ent.Update(disputeRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		disputeRef01ResdataUp0 := core.ToMapAny(entityData(disputeRef01ResdataUp0Result))
		if disputeRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(disputeRef01ResdataUp0["id"], disputeRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if disputeRef01ResdataUp0[disputeRef01MarkdefUp0Name] != disputeRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", disputeRef01MarkdefUp0Name, disputeRef01ResdataUp0[disputeRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		disputeRef01MatchDt0 := map[string]any{
			"id": disputeRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			disputeRef01MatchDt0["profile_id"] = v
		} else {
			disputeRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		disputeRef01DataDt0Loaded, err := disputeRef01Ent.Load(disputeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		disputeRef01DataDt0LoadResult := core.ToMapAny(entityData(disputeRef01DataDt0Loaded))
		if disputeRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(disputeRef01DataDt0LoadResult["id"], disputeRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func disputeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "dispute", "DisputeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read dispute test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse dispute test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"dispute01", "dispute02", "dispute03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_DISPUTE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_DISPUTE_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_DISPUTE_ENTID"])
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
