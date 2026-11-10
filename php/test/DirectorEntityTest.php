<?php
declare(strict_types=1);

// Director entity test

require_once __DIR__ . '/../wise_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DirectorEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = WiseSDK::test(null, null);
        $ent = $testsdk->Director(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = WiseConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = WiseSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Director(null)->list(["profile_id" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = director_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "director." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"director.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /profiles/{profileId}/directors"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"director.update.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs PUT /profiles/{profileId}/directors"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"director.remove.3","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /profiles/{profileId}/directors"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"director.list.4","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["profile01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WISE_TEST_DIRECTOR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $director_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.director")));
        $director_ref01_data = null;
        if (count($director_ref01_data_raw) > 0) {
            $director_ref01_data = Helpers::to_map($director_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $director_ref01_ent = $client->Director(null);
        $director_ref01_match = [
            "profile_id" => $setup["idmap"]["profile01"],
        ];

        $director_ref01_list_result = $director_ref01_ent->list($director_ref01_match, null);
        $this->assertIsArray($director_ref01_list_result);

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["profile01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WISE_TEST_DIRECTOR_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $director_ref01_ent = $client->Director(null);
        $director_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.director"), "director_ref01"));
        $director_ref01_data["profile_id"] = $setup["idmap"]["profile01"];

        $director_ref01_data_result = $director_ref01_ent->create($director_ref01_data, null);
        $director_ref01_data = Helpers::to_map(is_object($director_ref01_data_result) && method_exists($director_ref01_data_result, 'data_get') ? $director_ref01_data_result->data_get() : $director_ref01_data_result);
        $this->assertNotNull($director_ref01_data);
        $this->assertNotNull($director_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $director_ref01_match = [
            "profile_id" => $setup["idmap"]["profile01"],
        ];

        $director_ref01_list_result = $director_ref01_ent->list($director_ref01_match, null);
        $this->assertIsArray($director_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($director_ref01_list_result),
            ["id" => $director_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // UPDATE
        $director_ref01_data_up0_up = [
            "id" => $director_ref01_data["id"],
        ];

        $director_ref01_markdef_up0_name = "countryOfResidenceIso3Code";
        $director_ref01_markdef_up0_value = "Mark01-director_ref01_" . $setup["now"];
        $director_ref01_data_up0_up[$director_ref01_markdef_up0_name] = $director_ref01_markdef_up0_value;

        $director_ref01_resdata_up0_result = $director_ref01_ent->update($director_ref01_data_up0_up, null);
        $director_ref01_resdata_up0 = Helpers::to_map(is_object($director_ref01_resdata_up0_result) && method_exists($director_ref01_resdata_up0_result, 'data_get') ? $director_ref01_resdata_up0_result->data_get() : $director_ref01_resdata_up0_result);
        $this->assertNotNull($director_ref01_resdata_up0);
        $this->assertTrue(Runner::live_same_id($director_ref01_resdata_up0["id"] ?? null, $director_ref01_data_up0_up["id"]));
        $this->assertEquals($director_ref01_resdata_up0[$director_ref01_markdef_up0_name], $director_ref01_markdef_up0_value);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // REMOVE
        $director_ref01_match_rm0 = [
            "id" => $director_ref01_data["id"],
        ];
        $director_ref01_ent->remove($director_ref01_match_rm0, null);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $director_ref01_match_rt0 = [
            "profile_id" => $setup["idmap"]["profile01"],
        ];

        $director_ref01_list_rt0_result = $director_ref01_ent->list($director_ref01_match_rt0, null);
        $this->assertIsArray($director_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($director_ref01_list_rt0_result),
            ["id" => $director_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function director_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/director/DirectorTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = WiseSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["director01", "director02", "director03", "profile01", "profile02", "profile03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("WISE_TEST_DIRECTOR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "WISE_TEST_DIRECTOR_ENTID" => $idmap,
        "WISE_TEST_LIVE" => "FALSE",
        "WISE_TEST_EXPLAIN" => "FALSE",
        "WISE_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["WISE_TEST_DIRECTOR_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["WISE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["WISE_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new WiseSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["WISE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["WISE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
