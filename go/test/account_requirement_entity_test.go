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
const account_requirementEntityLiveStrict = true


func TestAccountRequirementEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AccountRequirement(nil)
		if ent == nil {
			t.Fatal("expected non-nil AccountRequirementEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.AccountRequirement(nil).List(map[string]any{"quote_id": 1}, nil)
		if sdkerr, ok := err.(*core.WiseError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := account_requirementBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "account_requirement." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"account_requirement.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /quotes/{quoteId}/account-requirements\"}")
		if setup.live {
			for _, _liveKey := range []string{"quote01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, account_requirementEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		accountRequirementRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.account_requirement")))
		var accountRequirementRef01Data map[string]any
		if len(accountRequirementRef01DataRaw) > 0 {
			accountRequirementRef01Data = core.ToMapAny(accountRequirementRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = accountRequirementRef01Data

		if setup.live {
			livePace()
		}
		// LIST
		accountRequirementRef01Ent := client.AccountRequirement(nil)
		accountRequirementRef01Match := map[string]any{
			"quote_id": setup.idmap["quote01"],
		}

		accountRequirementRef01ListResult, err := accountRequirementRef01Ent.List(accountRequirementRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, accountRequirementRef01ListOk := accountRequirementRef01ListResult.([]any)
		if !accountRequirementRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", accountRequirementRef01ListResult)
		}

		return
		}

		if setup.live {
			for _, _liveKey := range []string{"quote01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, account_requirementEntityLiveStrict, "Live entity test blocked: needs %s via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		if setup.live {
			livePace()
		}
		// CREATE
		accountRequirementRef01Ent := client.AccountRequirement(nil)
		accountRequirementRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "account_requirement"}), "account_requirement_ref01"))
		accountRequirementRef01Data["quote_id"] = setup.idmap["quote01"]

		accountRequirementRef01DataResult, err := accountRequirementRef01Ent.Create(accountRequirementRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		accountRequirementRef01Data = core.ToMapAny(entityData(accountRequirementRef01DataResult))
		if accountRequirementRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		if setup.live {
			livePace()
		}
		// LIST
		accountRequirementRef01Match := map[string]any{
			"quote_id": setup.idmap["quote01"],
		}

		accountRequirementRef01ListResult, err := accountRequirementRef01Ent.List(accountRequirementRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, accountRequirementRef01ListOk := accountRequirementRef01ListResult.([]any)
		if !accountRequirementRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", accountRequirementRef01ListResult)
		}

	})
}

func account_requirementBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "account_requirement", "AccountRequirementTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read account_requirement test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse account_requirement test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"account_requirement01", "account_requirement02", "account_requirement03", "quote01", "quote02", "quote03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"WISE_TEST_ACCOUNT_REQUIREMENT_ENTID": idmap,
		"WISE_TEST_LIVE":      "FALSE",
		"WISE_TEST_EXPLAIN":   "FALSE",
		"WISE_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["WISE_TEST_ACCOUNT_REQUIREMENT_ENTID"])
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
