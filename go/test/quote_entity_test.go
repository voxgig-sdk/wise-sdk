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
const quoteEntityLiveStrict = true


func TestQuoteEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Quote(nil)
		if ent == nil {
			t.Fatal("expected non-nil QuoteEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Quote(nil).Load(map[string]any{"id": 1, "profile_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := quoteBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "quote." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"quote.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/quotes\"}")
			t.Log("LIVE STEP {\"id\":\"quote.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/quotes/{quoteId}\"}")
			t.Log("LIVE STEP {\"id\":\"quote.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only quote.create.0 gives\"}")
			t.Skip("Live coverage incomplete: quote.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/quotes); quote.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/quotes/{quoteId}); quote.load.2 excluded (GET-only live run: reads a record only quote.create.0 gives)")
			return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, quoteEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_QUOTE_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		quoteRef01Ent := client.Quote(nil)
		quoteRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "quote"}), "quote_ref01"))
		quoteRef01Data["profile_id"] = setup.idmap["profile01"]

		quoteRef01DataResult, err := quoteRef01Ent.Create(quoteRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		quoteRef01Data = core.ToMapAny(entityData(quoteRef01DataResult))
		if quoteRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if quoteRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		quoteRef01DataUp0Up := map[string]any{
			"id": quoteRef01Data["id"],
			"profile_id": setup.idmap["profile_id"],
		}

		quoteRef01MarkdefUp0Name := "createdTime"
		quoteRef01MarkdefUp0Value := fmt.Sprintf("Mark01-quote_ref01_%d", setup.now)
		quoteRef01DataUp0Up[quoteRef01MarkdefUp0Name] = quoteRef01MarkdefUp0Value

		quoteRef01ResdataUp0Result, err := quoteRef01Ent.Update(quoteRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		quoteRef01ResdataUp0 := core.ToMapAny(entityData(quoteRef01ResdataUp0Result))
		if quoteRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(quoteRef01ResdataUp0["id"], quoteRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if quoteRef01ResdataUp0[quoteRef01MarkdefUp0Name] != quoteRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", quoteRef01MarkdefUp0Name, quoteRef01ResdataUp0[quoteRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		quoteRef01MatchDt0 := map[string]any{
			"id": quoteRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			quoteRef01MatchDt0["profile_id"] = v
		} else {
			quoteRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		quoteRef01DataDt0Loaded, err := quoteRef01Ent.Load(quoteRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		quoteRef01DataDt0LoadResult := core.ToMapAny(entityData(quoteRef01DataDt0Loaded))
		if quoteRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(quoteRef01DataDt0LoadResult["id"], quoteRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func quoteBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "quote", "QuoteTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read quote test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse quote test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"quote01", "quote02", "quote03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_QUOTE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_QUOTE_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_QUOTE_ENTID"])
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
