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
const business_profileEntityLiveStrict = true


func TestBusinessProfileEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.BusinessProfile(nil)
		if ent == nil {
			t.Fatal("expected non-nil BusinessProfileEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.BusinessProfile(nil).Create(map[string]any{"abn": 1, "contactDetails": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := business_profileBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "business_profile." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"business_profile.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/business-profile\"}")
			t.Log("LIVE STEP {\"id\":\"business_profile.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /profiles/{profileId}/business-profile\"}")
			t.Skip("Live coverage incomplete: business_profile.create.0 excluded (GET-only live run: needs POST /profiles/business-profile); business_profile.update.1 excluded (GET-only live run: needs PUT /profiles/{profileId}/business-profile)")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		businessProfileRef01Ent := client.BusinessProfile(nil)
		businessProfileRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "business_profile"}), "business_profile_ref01"))

		businessProfileRef01DataResult, err := businessProfileRef01Ent.Create(businessProfileRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		businessProfileRef01Data = core.ToMapAny(entityData(businessProfileRef01DataResult))
		if businessProfileRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if businessProfileRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

	})
}

func business_profileBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "business_profile", "BusinessProfileTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read business_profile test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse business_profile test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"business_profile01", "business_profile02", "business_profile03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_BUSINESS_PROFILE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_BUSINESS_PROFILE_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_BUSINESS_PROFILE_ENTID"])
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
