package sdktest

import (
	"encoding/json"
	"os"
	"strings"
	"testing"

	sdk "github.com/voxgig-sdk/wise-sdk/go"
	"github.com/voxgig-sdk/wise-sdk/go/core"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const subscriptionDirectLiveStrict = true

func TestSubscriptionDirect(t *testing.T) {
	t.Run("direct-list-subscription", func(t *testing.T) {
		setup := subscriptionDirectSetup([]any{
			map[string]any{"id": "direct01"},
			map[string]any{"id": "direct02"},
		})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-list-subscription", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"client_key01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, subscriptionDirectLiveStrict, "Live test blocked: needs %s via WISE_TEST_SUBSCRIPTION_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			params["client_key"] = setup.idmap["client_key01"]
		} else {
			params["client_key"] = "direct01"
		}

		result, err := client.Direct(map[string]any{
			"path":   "applications/{client_key}/subscriptions",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list failed: %s", liveDescribe(result))
			}
			if _, ok := liveList(result["data"]); !ok {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list returned no list: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
		}

		if !setup.live {
			if dataList, ok := result["data"].([]any); ok {
				if len(dataList) != 2 {
					t.Fatalf("expected 2 items, got %d", len(dataList))
				}
			} else {
				t.Fatalf("expected data to be an array, got %T", result["data"])
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
			}
		}
	})

	t.Run("direct-load-subscription", func(t *testing.T) {
		setup := subscriptionDirectSetup(map[string]any{"id": "direct01"})
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		if _shouldSkip, _reason := isControlSkipped("direct", "direct-load-subscription", _mode); _shouldSkip {
			if _reason == "" {
				_reason = "skipped via sdk-test-control.json"
			}
			t.Skip(_reason)
			return
		}
		if setup.live {
			for _, _liveKey := range []string{"client_key01"} {
				if v := setup.idmap[_liveKey]; v == nil {
					liveMiss(t, subscriptionDirectLiveStrict, "Live test blocked: needs %s via WISE_TEST_SUBSCRIPTION_ENTID", _liveKey)
					return
				}
			}
		}
		if setup.live {
			livePace()
		}
		client := setup.client

		params := map[string]any{}
		query := map[string]any{}
		if setup.live {
			listParams := map[string]any{}
			listParams["client_key"] = setup.idmap["client_key01"]
			listResult, listErr := client.Direct(map[string]any{
				"path":   "applications/{client_key}/subscriptions",
				"method": "GET",
				"params": listParams,
			})
			if listErr != nil {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list discovery failed: %v", listErr)
			}
			if listResult["ok"] != true {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list discovery failed: %s", liveDescribe(listResult))
			}
			listData, listOk := liveList(listResult["data"])
			if !listOk {
				liveMiss(t, subscriptionDirectLiveStrict, "Live list discovery returned no list: %s", liveDescribe(listResult))
			}
			if len(listData) == 0 {
				liveEmpty(t, "The account has no subscription record to load")
			}
			firstEnt := core.ToMapAny(listData[0])
			if firstEnt["id"] == nil {
				liveMiss(t, subscriptionDirectLiveStrict, "Live load blocked: discovery returned no usable identity")
			}
			params["id"] = firstEnt["id"]
			params["client_key"] = setup.idmap["client_key01"]
		} else {
			params["client_key"] = "direct01"
			params["id"] = "direct02"
		}

		result, err := client.Direct(map[string]any{
			"path":   "applications/{client_key}/subscriptions/{id}",
			"method": "GET",
			"params": params,
			"query":  query,
		})
		if setup.live {
			if err != nil {
				liveMiss(t, subscriptionDirectLiveStrict, "Live load failed: %v", err)
			}
			if status := core.ToInt(result["status"]); result["ok"] != true || status < 200 || status >= 300 {
				liveMiss(t, subscriptionDirectLiveStrict, "Live load failed: %s", liveDescribe(result))
			}
			if result["data"] == nil {
				liveMiss(t, subscriptionDirectLiveStrict, "Live load returned no data: %s", liveDescribe(result))
			}
		} else {
			if err != nil {
				t.Fatalf("direct failed: %v", err)
			}
			if result["ok"] != true {
				t.Fatalf("expected ok to be true, got %v", result["ok"])
			}
			if core.ToInt(result["status"]) != 200 {
				t.Fatalf("expected status 200, got %v", result["status"])
			}
			if result["data"] == nil {
				t.Fatal("expected data to be non-nil")
			}
		}

		if !setup.live {
			if dataMap, ok := result["data"].(map[string]any); ok {
				if dataMap["id"] != "direct01" {
					t.Fatalf("expected data.id to be direct01, got %v", dataMap["id"])
				}
			}

			if len(*setup.calls) != 1 {
				t.Fatalf("expected 1 call, got %d", len(*setup.calls))
			}
			call := (*setup.calls)[0]
			if initMap, ok := call["init"].(map[string]any); ok {
				if initMap["method"] != "GET" {
					t.Fatalf("expected method GET, got %v", initMap["method"])
				}
			}
			if url, ok := call["url"].(string); ok {
				if !strings.Contains(url, "direct01") {
					t.Fatalf("expected url to contain direct01, got %v", url)
				}
				if !strings.Contains(url, "direct02") {
					t.Fatalf("expected url to contain direct02, got %v", url)
				}
			}
		}
	})

}

type subscriptionDirectSetupResult struct {
	client *sdk.WiseSDK
	calls  *[]map[string]any
	live   bool
	idmap  map[string]any
}

func subscriptionDirectSetup(mockres any) *subscriptionDirectSetupResult {
	loadEnvLocal()

	calls := &[]map[string]any{}

	env := envOverride(map[string]any{
		"WISE_TEST_SUBSCRIPTION_ENTID": map[string]any{},
		"WISE_TEST_LIVE":    "FALSE",
		"WISE_APIKEY":       "",
	})

	live := env["WISE_TEST_LIVE"] == "TRUE"

	if live {
		// sdk-test-control.json's test.client.options seeds the live
		// client; the generated fields below overwrite anything they name.
		mergedOpts := map[string]any{}
		for k, v := range liveClientOptions() {
			mergedOpts[k] = v
		}
		for k, v := range map[string]any{
			"apikey": env["WISE_APIKEY"],
		} {
			mergedOpts[k] = v
		}
		client := sdk.NewWiseSDK(mergedOpts)

		idmap := map[string]any{}
		if entidRaw, ok := env["WISE_TEST_SUBSCRIPTION_ENTID"]; ok {
			if entidStr, ok := entidRaw.(string); ok && strings.HasPrefix(entidStr, "{") {
				json.Unmarshal([]byte(entidStr), &idmap)
			} else if entidMap, ok := entidRaw.(map[string]any); ok {
				idmap = entidMap
			}
		}

		return &subscriptionDirectSetupResult{client: client, calls: calls, live: true, idmap: idmap}
	}

	mockFetch := func(url string, init map[string]any) (map[string]any, error) {
		*calls = append(*calls, map[string]any{"url": url, "init": init})
		return map[string]any{
			"status":     200,
			"statusText": "OK",
			"headers":    map[string]any{},
			"json": (func() any)(func() any {
				if mockres != nil {
					return mockres
				}
				return map[string]any{"id": "direct01"}
			}),
		}, nil
	}

	client := sdk.NewWiseSDK(map[string]any{
		"base": "http://localhost:8080",
		"system": map[string]any{
			"fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
		},
	})

	return &subscriptionDirectSetupResult{client: client, calls: calls, live: false, idmap: map[string]any{}}
}

var _ = os.Getenv
var _ = json.Unmarshal
