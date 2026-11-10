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
const subscriptionEntityLiveStrict = true


func TestSubscriptionEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Subscription(nil)
		if ent == nil {
			t.Fatal("expected non-nil SubscriptionEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Subscription(nil).List(map[string]any{"client_key": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := subscriptionBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "subscription." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"subscription.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /applications/{clientKey}/subscriptions\"}")
			t.Log("LIVE STEP {\"id\":\"subscription.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /applications/{clientKey}/subscriptions/{subscriptionId}\"}")
			t.Log("LIVE STEP {\"id\":\"subscription.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["subscription01"]
			}
			livePace()
			liveExisting(t, subscriptionEntityLiveStrict, setup.data, "subscription", "id", _liveId,
				func() (any, error) {
					return client.Subscription(nil).List(map[string]any{"profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		subscriptionRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.subscription")))
		var subscriptionRef01Data map[string]any
		if len(subscriptionRef01DataRaw) > 0 {
			subscriptionRef01Data = core.ToMapAny(subscriptionRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = subscriptionRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		subscriptionRef01Ent := client.Subscription(nil)
		subscriptionRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		subscriptionRef01ListResult, err := subscriptionRef01Ent.List(subscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, subscriptionRef01ListOk := subscriptionRef01ListResult.([]any)
		if !subscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", subscriptionRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		subscriptionRef01MatchDt0 := map[string]any{
			"id": subscriptionRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			subscriptionRef01MatchDt0["profile_id"] = v
		} else {
			subscriptionRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		subscriptionRef01DataDt0Loaded, err := subscriptionRef01Ent.Load(subscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		subscriptionRef01DataDt0LoadResult := core.ToMapAny(entityData(subscriptionRef01DataDt0Loaded))
		if subscriptionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(subscriptionRef01DataDt0LoadResult["id"], subscriptionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"client_key01", "profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, subscriptionEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_SUBSCRIPTION_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		subscriptionRef01Ent := client.Subscription(nil)
		subscriptionRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "subscription"}), "subscription_ref01"))
		subscriptionRef01Data["client_key"] = setup.idmap["client_key01"]
		subscriptionRef01Data["profile_id"] = setup.idmap["profile01"]

		subscriptionRef01DataResult, err := subscriptionRef01Ent.Create(subscriptionRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		subscriptionRef01Data = core.ToMapAny(entityData(subscriptionRef01DataResult))
		if subscriptionRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if subscriptionRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		subscriptionRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		subscriptionRef01ListResult, err := subscriptionRef01Ent.List(subscriptionRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		subscriptionRef01List, subscriptionRef01ListOk := subscriptionRef01ListResult.([]any)
		if !subscriptionRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", subscriptionRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(subscriptionRef01List), map[string]any{"id": subscriptionRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// LOAD
		subscriptionRef01MatchDt0 := map[string]any{
			"id": subscriptionRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			subscriptionRef01MatchDt0["profile_id"] = v
		} else {
			subscriptionRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		subscriptionRef01DataDt0Loaded, err := subscriptionRef01Ent.Load(subscriptionRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		subscriptionRef01DataDt0LoadResult := core.ToMapAny(entityData(subscriptionRef01DataDt0Loaded))
		if subscriptionRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(subscriptionRef01DataDt0LoadResult["id"], subscriptionRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		if setup.live {
			livePace()
		}
		// REMOVE
		subscriptionRef01MatchRm0 := map[string]any{
			"id": subscriptionRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			subscriptionRef01MatchRm0["profile_id"] = v
		} else {
			subscriptionRef01MatchRm0["profile_id"] = setup.idmap["profile01"]
		}
		_, err = subscriptionRef01Ent.Remove(subscriptionRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		if setup.live {
			livePace()
		}
		// LIST
		subscriptionRef01MatchRt0 := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		subscriptionRef01ListRt0Result, err := subscriptionRef01Ent.List(subscriptionRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		subscriptionRef01ListRt0, subscriptionRef01ListRt0Ok := subscriptionRef01ListRt0Result.([]any)
		if !subscriptionRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", subscriptionRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(subscriptionRef01ListRt0), map[string]any{"id": subscriptionRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func subscriptionBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "subscription", "SubscriptionTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read subscription test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse subscription test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"subscription01", "subscription02", "subscription03", "profile01", "profile02", "profile03", "client_key01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_SUBSCRIPTION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_SUBSCRIPTION_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_SUBSCRIPTION_ENTID"])
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
