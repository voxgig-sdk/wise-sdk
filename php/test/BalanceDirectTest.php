<?php
declare(strict_types=1);

// Balance direct test

require_once __DIR__ . '/../wise_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;

class BalanceDirectTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    private static function liveOk(array $result): bool
    {
        $status = Helpers::to_int($result["status"] ?? 0);
        return empty($result["err"]) && !empty($result["ok"]) && $status >= 200 && $status < 300;
    }

    public function test_direct_list_balance(): void
    {
        $setup = balance_direct_setup([
            ["id" => "direct01"],
            ["id" => "direct02"],
        ]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-list-balance", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        if ($setup["live"]) {
            foreach (["profile01"] as $_liveKey) {
                if (null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live test blocked: needs " . $_liveKey . " via WISE_TEST_BALANCE_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        if ($setup["live"]) {
            $query["types"] = 'STANDARD';
        }
        $params["profile_id"] = $setup["live"] ? ($setup["idmap"]["profile01"] ?? null) : "direct01";

        $result = $client->direct([
            "path" => "profiles/{profile_id}/balances",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list failed: " . Runner::live_describe($result));
            }
            if (null === Runner::live_list($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list returned no list: " . Runner::live_describe($result));
            }
            $this->assertIsArray(Runner::live_list($result["data"]));
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertIsArray($result["data"]);
            $this->assertCount(2, $result["data"]);
            $this->assertCount(1, $setup["calls"]);
        }
    }

    public function test_direct_load_balance(): void
    {
        $setup = balance_direct_setup(["id" => "direct01"]);
        [$_shouldSkip, $_reason] = Runner::is_control_skipped("direct", "direct-load-balance", $setup["live"] ? "live" : "unit");
        if ($_shouldSkip) {
            $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
            return;
        }
        if ($setup["live"]) {
            foreach (["profile01"] as $_liveKey) {
                if (null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live test blocked: needs " . $_liveKey . " via WISE_TEST_BALANCE_ENTID");
                }
            }
        }
        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        $client = $setup["client"];

        $params = [];
        $query = [];
        if ($setup["live"]) {
            $list_result = $client->direct([
                "path" => "profiles/{profile_id}/balances",
                "method" => "GET",
                "params" => ["profile_id" => $setup["idmap"]["profile01"] ?? null],
                "query" => ['types' => 'STANDARD'],
            ]);
            if (!self::liveOk($list_result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live list discovery failed: " . Runner::live_describe($list_result));
            }
            $records = Runner::live_list($list_result["data"] ?? null);
            if (null === $records) {
                Runner::live_miss(self::LIVE_STRICT, "Live list discovery returned no list: " . Runner::live_describe($list_result));
            }
            if (0 === count($records)) {
                Runner::live_empty("The account has no balance record to load");
            }
            $first = is_array($records[0]) ? $records[0] : [];
            $found = $first["currency"] ?? null;
            if (null === $found) {
                Runner::live_miss(self::LIVE_STRICT, "Live load blocked: discovery returned no usable identity");
            }
            $params["currency"] = $found;
            $params["profile_id"] = $setup["idmap"]["profile01"] ?? null;
        } else {
            $params["currency"] = "direct01";
            $params["profile_id"] = "direct02";
        }

        $result = $client->direct([
            "path" => "profiles/{profile_id}/total-funds/{currency}",
            "method" => "GET",
            "params" => $params,
            "query" => $query,
        ]);
        if ($setup["live"]) {
            if (!self::liveOk($result)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load failed: " . Runner::live_describe($result));
            }
            if (null === ($result["data"] ?? null)) {
                Runner::live_miss(self::LIVE_STRICT, "Live load returned no data: " . Runner::live_describe($result));
            }
            $this->assertNotNull($result["data"]);
        } else {
            $this->assertArrayNotHasKey("err", $result);
            $this->assertTrue($result["ok"]);
            $this->assertEquals(200, Helpers::to_int($result["status"]));
            $this->assertNotNull($result["data"]);
            if (is_array($result["data"]) && isset($result["data"]["id"])) {
                $this->assertEquals("direct01", $result["data"]["id"]);
            }
            $this->assertCount(1, $setup["calls"]);
        }
    }

}


function balance_direct_setup($mockres)
{
    Runner::load_env_local();

    $calls = new \ArrayObject();

    $env = Runner::env_override([
        "WISE_TEST_BALANCE_ENTID" => [],
        "WISE_TEST_LIVE" => "FALSE",
        "WISE_APIKEY" => "",
    ]);

    $live = $env["WISE_TEST_LIVE"] === "TRUE";

    if ($live) {
        // Merged so the generated fields win: sdk-test-control.json's
        // test.client.options adds to the live client, it does not redirect it.
        $merged_opts = array_merge(Runner::live_client_options(), [
            "apikey" => $env["WISE_APIKEY"],
        ]);
        $client = new WiseSDK($merged_opts);
        $idmap = $env["WISE_TEST_BALANCE_ENTID"] ?? [];
        // A path parameter's example stands in for an id *_ENTID does not give.
        $idmap = array_merge(["currency01" => 'EUR'],
            is_array($idmap) ? $idmap : []);
        return [
            "client" => $client,
            "calls" => $calls,
            "live" => true,
            "idmap" => is_array($idmap) ? $idmap : [],
        ];
    }

    $mock_fetch = function ($url, $init) use ($calls, $mockres) {
        $calls[] = ["url" => $url, "init" => $init];
        return [
            [
                "status" => 200,
                "statusText" => "OK",
                "headers" => [],
                "json" => function () use ($mockres) {
                    if ($mockres !== null) {
                        return $mockres;
                    }
                    return ["id" => "direct01"];
                },
                "body" => "mock",
            ],
            null,
        ];
    };

    $client = new WiseSDK([
        "base" => "http://localhost:8080",
        "system" => [
            "fetch" => $mock_fetch,
        ],
    ]);

    return [
        "client" => $client,
        "calls" => $calls,
        "live" => false,
        "idmap" => [],
    ];
}
