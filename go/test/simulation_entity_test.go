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
const simulationEntityLiveStrict = true


func TestSimulationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Simulation(nil)
		if ent == nil {
			t.Fatal("expected non-nil SimulationEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Simulation(nil).List(map[string]any{"card_token": 1, "profile_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := simulationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "simulation." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"simulation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation\"}")
		if setup.live {
			for _, _liveKey := range []string{"kyc_review01", "profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, simulationEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_SIMULATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["simulation01"]
			}
			livePace()
			liveExisting(t, simulationEntityLiveStrict, setup.data, "simulation", "id", _liveId,
				func() (any, error) {
					return client.Simulation(nil).List(map[string]any{"kyc_review_id": setup.idmap["kyc_review01"], "profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		simulationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.simulation")))
		var simulationRef01Data map[string]any
		if len(simulationRef01DataRaw) > 0 {
			simulationRef01Data = core.ToMapAny(simulationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = simulationRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		simulationRef01Ent := client.Simulation(nil)
		simulationRef01Match := map[string]any{
			"kyc_review_id": setup.idmap["kyc_review01"],
			"profile_id": setup.idmap["profile01"],
		}

		simulationRef01ListResult, err := simulationRef01Ent.List(simulationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, simulationRef01ListOk := simulationRef01ListResult.([]any)
		if !simulationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", simulationRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		simulationRef01MatchDt0 := map[string]any{
			"id": simulationRef01Data["id"],
		}
		if v := setup.idmap["transfer_id"]; v != nil {
			simulationRef01MatchDt0["transfer_id"] = v
		} else {
			simulationRef01MatchDt0["transfer_id"] = setup.idmap["transfer01"]
		}
		simulationRef01DataDt0Loaded, err := simulationRef01Ent.Load(simulationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		simulationRef01DataDt0LoadResult := core.ToMapAny(entityData(simulationRef01DataDt0Loaded))
		if simulationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(simulationRef01DataDt0LoadResult["id"], simulationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"card_token01", "kyc_review01", "profile01", "transfer01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, simulationEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_SIMULATION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		simulationRef01Ent := client.Simulation(nil)
		simulationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "simulation"}), "simulation_ref01"))
		simulationRef01Data["card_token"] = setup.idmap["card_token01"]
		simulationRef01Data["kyc_review_id"] = setup.idmap["kyc_review01"]
		simulationRef01Data["profile_id"] = setup.idmap["profile01"]
		simulationRef01Data["transfer_id"] = setup.idmap["transfer01"]

		simulationRef01DataResult, err := simulationRef01Ent.Create(simulationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		simulationRef01Data = core.ToMapAny(entityData(simulationRef01DataResult))
		if simulationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if simulationRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		simulationRef01Match := map[string]any{
			"kyc_review_id": setup.idmap["kyc_review01"],
			"profile_id": setup.idmap["profile01"],
		}

		simulationRef01ListResult, err := simulationRef01Ent.List(simulationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		simulationRef01List, simulationRef01ListOk := simulationRef01ListResult.([]any)
		if !simulationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", simulationRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(simulationRef01List), map[string]any{"id": simulationRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		simulationRef01MatchDt0 := map[string]any{
			"id": simulationRef01Data["id"],
		}
		if v := setup.idmap["transfer_id"]; v != nil {
			simulationRef01MatchDt0["transfer_id"] = v
		} else {
			simulationRef01MatchDt0["transfer_id"] = setup.idmap["transfer01"]
		}
		simulationRef01DataDt0Loaded, err := simulationRef01Ent.Load(simulationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		simulationRef01DataDt0LoadResult := core.ToMapAny(entityData(simulationRef01DataDt0Loaded))
		if simulationRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(simulationRef01DataDt0LoadResult["id"], simulationRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func simulationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "simulation", "SimulationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read simulation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse simulation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"simulation01", "simulation02", "simulation03", "profile01", "profile02", "profile03", "transfer01", "transfer02", "transfer03", "kyc_review01", "kyc_review02", "kyc_review03", "card01", "card02", "card03", "card_token01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_SIMULATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_SIMULATION_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_SIMULATION_ENTID"])
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
