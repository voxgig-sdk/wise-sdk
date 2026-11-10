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
const directorEntityLiveStrict = true


func TestDirectorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Director(nil)
		if ent == nil {
			t.Fatal("expected non-nil DirectorEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Director(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := directorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "director." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"director.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/directors\"}")
			t.Log("LIVE STEP {\"id\":\"director.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /profiles/{profileId}/directors\"}")
			t.Log("LIVE STEP {\"id\":\"director.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/directors\"}")
			t.Log("LIVE STEP {\"id\":\"director.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, directorEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_DIRECTOR_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		directorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.director")))
		var directorRef01Data map[string]any
		if len(directorRef01DataRaw) > 0 {
			directorRef01Data = core.ToMapAny(directorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = directorRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		directorRef01Ent := client.Director(nil)
		directorRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		directorRef01ListResult, err := directorRef01Ent.List(directorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, directorRef01ListOk := directorRef01ListResult.([]any)
		if !directorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", directorRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, directorEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_DIRECTOR_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		directorRef01Ent := client.Director(nil)
		directorRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "director"}), "director_ref01"))
		directorRef01Data["profile_id"] = setup.idmap["profile01"]

		directorRef01DataResult, err := directorRef01Ent.Create(directorRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		directorRef01Data = core.ToMapAny(entityData(directorRef01DataResult))
		if directorRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if directorRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		directorRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		directorRef01ListResult, err := directorRef01Ent.List(directorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		directorRef01List, directorRef01ListOk := directorRef01ListResult.([]any)
		if !directorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", directorRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(directorRef01List), map[string]any{"id": directorRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		directorRef01DataUp0Up := map[string]any{
			"id": directorRef01Data["id"],
		}

		directorRef01MarkdefUp0Name := "countryOfResidenceIso3Code"
		directorRef01MarkdefUp0Value := fmt.Sprintf("Mark01-director_ref01_%d", setup.now)
		directorRef01DataUp0Up[directorRef01MarkdefUp0Name] = directorRef01MarkdefUp0Value

		directorRef01ResdataUp0Result, err := directorRef01Ent.Update(directorRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		directorRef01ResdataUp0 := core.ToMapAny(entityData(directorRef01ResdataUp0Result))
		if directorRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(directorRef01ResdataUp0["id"], directorRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if directorRef01ResdataUp0[directorRef01MarkdefUp0Name] != directorRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", directorRef01MarkdefUp0Name, directorRef01ResdataUp0[directorRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		directorRef01MatchRm0 := map[string]any{
			"id": directorRef01Data["id"],
		}
		_, err = directorRef01Ent.Remove(directorRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		directorRef01MatchRt0 := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		directorRef01ListRt0Result, err := directorRef01Ent.List(directorRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		directorRef01ListRt0, directorRef01ListRt0Ok := directorRef01ListRt0Result.([]any)
		if !directorRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", directorRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(directorRef01ListRt0), map[string]any{"id": directorRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func directorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "director", "DirectorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read director test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse director test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"director01", "director02", "director03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_DIRECTOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_DIRECTOR_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_DIRECTOR_ENTID"])
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
