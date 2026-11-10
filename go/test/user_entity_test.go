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
const userEntityLiveStrict = true


func TestUserEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.User(nil)
		if ent == nil {
			t.Fatal("expected non-nil UserEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.User(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := userBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "user." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"user.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /user/signup/registration_code\"}")
			t.Log("LIVE STEP {\"id\":\"user.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /users/{userId}/contact-email\"}")
			t.Log("LIVE STEP {\"id\":\"user.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only user.create.0 gives\"}")
			t.Skip("Live coverage incomplete: user.create.0 excluded (GET-only live run: needs POST /user/signup/registration_code); user.update.1 excluded (GET-only live run: needs PUT /users/{userId}/contact-email); user.load.2 excluded (GET-only live run: reads a record only user.create.0 gives)")
			return
		}

		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		userRef01Ent := client.User(nil)
		userRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "user"}), "user_ref01"))

		userRef01DataResult, err := userRef01Ent.Create(userRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		userRef01Data = core.ToMapAny(entityData(userRef01DataResult))
		if userRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if userRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		userRef01DataUp0Up := map[string]any{
			"id": userRef01Data["id"],
		}

		userRef01MarkdefUp0Name := "email"
		userRef01MarkdefUp0Value := fmt.Sprintf("Mark01-user_ref01_%d", setup.now)
		userRef01DataUp0Up[userRef01MarkdefUp0Name] = userRef01MarkdefUp0Value

		userRef01ResdataUp0Result, err := userRef01Ent.Update(userRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		userRef01ResdataUp0 := core.ToMapAny(entityData(userRef01ResdataUp0Result))
		if userRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(userRef01ResdataUp0["id"], userRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if userRef01ResdataUp0[userRef01MarkdefUp0Name] != userRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", userRef01MarkdefUp0Name, userRef01ResdataUp0[userRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		userRef01MatchDt0 := map[string]any{
			"id": userRef01Data["id"],
		}
		userRef01DataDt0Loaded, err := userRef01Ent.Load(userRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		userRef01DataDt0LoadResult := core.ToMapAny(entityData(userRef01DataDt0Loaded))
		if userRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(userRef01DataDt0LoadResult["id"], userRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func userBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "user", "UserTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read user test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse user test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"user01", "user02", "user03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_USER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_USER_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_USER_ENTID"])
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
