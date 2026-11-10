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
const uboEntityLiveStrict = true


func TestUboEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Ubo(nil)
		if ent == nil {
			t.Fatal("expected non-nil UboEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Ubo(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := uboBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ubo." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"ubo.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/ubos\"}")
			t.Log("LIVE STEP {\"id\":\"ubo.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /profiles/{profileId}/ubos\"}")
		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, uboEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_UBO_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		uboRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.ubo")))
		var uboRef01Data map[string]any
		if len(uboRef01DataRaw) > 0 {
			uboRef01Data = core.ToMapAny(uboRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = uboRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		uboRef01Ent := client.Ubo(nil)
		uboRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		uboRef01ListResult, err := uboRef01Ent.List(uboRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, uboRef01ListOk := uboRef01ListResult.([]any)
		if !uboRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", uboRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, uboEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_UBO_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		uboRef01Ent := client.Ubo(nil)
		uboRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "ubo"}), "ubo_ref01"))
		uboRef01Data["profile_id"] = setup.idmap["profile01"]

		uboRef01DataResult, err := uboRef01Ent.Create(uboRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		uboRef01Data = core.ToMapAny(entityData(uboRef01DataResult))
		if uboRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if uboRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		uboRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		uboRef01ListResult, err := uboRef01Ent.List(uboRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		uboRef01List, uboRef01ListOk := uboRef01ListResult.([]any)
		if !uboRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", uboRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(uboRef01List), map[string]any{"id": uboRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		uboRef01DataUp0Up := map[string]any{
			"id": uboRef01Data["id"],
		}

		uboRef01MarkdefUp0Name := "addressFirstLine"
		uboRef01MarkdefUp0Value := fmt.Sprintf("Mark01-ubo_ref01_%d", setup.now)
		uboRef01DataUp0Up[uboRef01MarkdefUp0Name] = uboRef01MarkdefUp0Value

		uboRef01ResdataUp0Result, err := uboRef01Ent.Update(uboRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		uboRef01ResdataUp0 := core.ToMapAny(entityData(uboRef01ResdataUp0Result))
		if uboRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(uboRef01ResdataUp0["id"], uboRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if uboRef01ResdataUp0[uboRef01MarkdefUp0Name] != uboRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", uboRef01MarkdefUp0Name, uboRef01ResdataUp0[uboRef01MarkdefUp0Name])
		}

	})
}

func uboBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ubo", "UboTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ubo test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ubo test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"ubo01", "ubo02", "ubo03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_UBO_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_UBO_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_UBO_ENTID"])
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
