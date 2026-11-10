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
const kyc_reviewEntityLiveStrict = true


func TestKycReviewEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.KycReview(nil)
		if ent == nil {
			t.Fatal("expected non-nil KycReviewEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.KycReview(nil).List(map[string]any{"profile_id": "x"}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := kyc_reviewBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "kyc_review." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"kyc_review.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/kyc-requirements/{requirementKey}\"}")
			t.Log("LIVE STEP {\"id\":\"kyc_review.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/kyc-reviews/{kycReviewId}\"}")
		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, kyc_reviewEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_KYC_REVIEW_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			var _liveId any
			if !setup.syntheticOnly {
				_liveId = setup.idmap["kyc_review01"]
			}
			livePace()
			liveExisting(t, kyc_reviewEntityLiveStrict, setup.data, "kyc_review", "id", _liveId,
				func() (any, error) {
					return client.KycReview(nil).List(map[string]any{"profile_id": setup.idmap["profile01"]}, nil)
				})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		kycReviewRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.kyc_review")))
		var kycReviewRef01Data map[string]any
		if len(kycReviewRef01DataRaw) > 0 {
			kycReviewRef01Data = core.ToMapAny(kycReviewRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = kycReviewRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		kycReviewRef01Ent := client.KycReview(nil)
		kycReviewRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		kycReviewRef01ListResult, err := kycReviewRef01Ent.List(kycReviewRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, kycReviewRef01ListOk := kycReviewRef01ListResult.([]any)
		if !kycReviewRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", kycReviewRef01ListResult)
		}

		if setup.live {
			livePace()
		}
		// LOAD
		kycReviewRef01MatchDt0 := map[string]any{
			"id": kycReviewRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			kycReviewRef01MatchDt0["profile_id"] = v
		} else {
			kycReviewRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		kycReviewRef01DataDt0Loaded, err := kycReviewRef01Ent.Load(kycReviewRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		kycReviewRef01DataDt0LoadResult := core.ToMapAny(entityData(kycReviewRef01DataDt0Loaded))
		if kycReviewRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(kycReviewRef01DataDt0LoadResult["id"], kycReviewRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"profile01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, kyc_reviewEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_KYC_REVIEW_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		kycReviewRef01Ent := client.KycReview(nil)
		kycReviewRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "kyc_review"}), "kyc_review_ref01"))
		kycReviewRef01Data["profile_id"] = setup.idmap["profile01"]

		kycReviewRef01DataResult, err := kycReviewRef01Ent.Create(kycReviewRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		kycReviewRef01Data = core.ToMapAny(entityData(kycReviewRef01DataResult))
		if kycReviewRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if kycReviewRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		if setup.live {
			livePace()
		}
		// LIST
		kycReviewRef01Match := map[string]any{
			"profile_id": setup.idmap["profile01"],
		}

		kycReviewRef01ListResult, err := kycReviewRef01Ent.List(kycReviewRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		kycReviewRef01List, kycReviewRef01ListOk := kycReviewRef01ListResult.([]any)
		if !kycReviewRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", kycReviewRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(kycReviewRef01List), map[string]any{"id": kycReviewRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		if setup.live {
			livePace()
		}
		// UPDATE
		kycReviewRef01DataUp0Up := map[string]any{
			"id": kycReviewRef01Data["id"],
			"profile_id": setup.idmap["profile_id"],
		}

		kycReviewRef01MarkdefUp0Name := "createdAt"
		kycReviewRef01MarkdefUp0Value := fmt.Sprintf("Mark01-kyc_review_ref01_%d", setup.now)
		kycReviewRef01DataUp0Up[kycReviewRef01MarkdefUp0Name] = kycReviewRef01MarkdefUp0Value

		kycReviewRef01ResdataUp0Result, err := kycReviewRef01Ent.Update(kycReviewRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		kycReviewRef01ResdataUp0 := core.ToMapAny(entityData(kycReviewRef01ResdataUp0Result))
		if kycReviewRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if !liveSameId(kycReviewRef01ResdataUp0["id"], kycReviewRef01DataUp0Up["id"]) {
			t.Fatal("expected update result id to match")
		}
		if kycReviewRef01ResdataUp0[kycReviewRef01MarkdefUp0Name] != kycReviewRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", kycReviewRef01MarkdefUp0Name, kycReviewRef01ResdataUp0[kycReviewRef01MarkdefUp0Name])
		}

		if setup.live {
			livePace()
		}
		// LOAD
		kycReviewRef01MatchDt0 := map[string]any{
			"id": kycReviewRef01Data["id"],
		}
		if v := setup.idmap["profile_id"]; v != nil {
			kycReviewRef01MatchDt0["profile_id"] = v
		} else {
			kycReviewRef01MatchDt0["profile_id"] = setup.idmap["profile01"]
		}
		kycReviewRef01DataDt0Loaded, err := kycReviewRef01Ent.Load(kycReviewRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		kycReviewRef01DataDt0LoadResult := core.ToMapAny(entityData(kycReviewRef01DataDt0Loaded))
		if kycReviewRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if !liveSameId(kycReviewRef01DataDt0LoadResult["id"], kycReviewRef01Data["id"]) {
			t.Fatal("expected load result id to match")
		}

	})
}

func kyc_reviewBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "kyc_review", "KycReviewTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read kyc_review test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse kyc_review test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"kyc_review01", "kyc_review02", "kyc_review03", "profile01", "profile02", "profile03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_KYC_REVIEW_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_KYC_REVIEW_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_KYC_REVIEW_ENTID"])
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
