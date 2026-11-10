<?php
declare(strict_types=1);

// CardHolderLimit entity test

require_once __DIR__ . '/../wise_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class CardHolderLimitEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = WiseSDK::test(null, null);
        $ent = $testsdk->CardHolderLimit(null);
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
            $client->CardHolderLimit(null)->list(["card_holder_profile_id" => 'x', "profile_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = card_holder_limit_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "card_holder_limit." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"card_holder_limit.update.1","state":"excluded","attempted":false,"reason":"GET-only live run: needs PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits"}' . "\n");
        if (!empty($setup["live"])) {
            foreach (["card_holder_profile01", "profile01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WISE_TEST_CARD_HOLDER_LIMIT_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $card_holder_limit_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.card_holder_limit")));
        $card_holder_limit_ref01_data = null;
        if (count($card_holder_limit_ref01_data_raw) > 0) {
            $card_holder_limit_ref01_data = Helpers::to_map($card_holder_limit_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $card_holder_limit_ref01_ent = $client->CardHolderLimit(null);
        $card_holder_limit_ref01_match = [
            "card_holder_profile_id" => $setup["idmap"]["card_holder_profile01"],
            "profile_id" => $setup["idmap"]["profile01"],
        ];

        $card_holder_limit_ref01_list_result = $card_holder_limit_ref01_ent->list($card_holder_limit_ref01_match, null);
        $this->assertIsArray($card_holder_limit_ref01_list_result);

            return;
        }

        if (!empty($setup["live"])) {
            foreach (["card_holder_profile01", "profile01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WISE_TEST_CARD_HOLDER_LIMIT_ENTID");
                }
            }
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $card_holder_limit_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.card_holder_limit")));
        $card_holder_limit_ref01_data = null;
        if (count($card_holder_limit_ref01_data_raw) > 0) {
            $card_holder_limit_ref01_data = Helpers::to_map($card_holder_limit_ref01_data_raw[0][1]);
        }

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LIST
        $card_holder_limit_ref01_ent = $client->CardHolderLimit(null);
        $card_holder_limit_ref01_match = [
            "card_holder_profile_id" => $setup["idmap"]["card_holder_profile01"],
            "profile_id" => $setup["idmap"]["profile01"],
        ];

        $card_holder_limit_ref01_list_result = $card_holder_limit_ref01_ent->list($card_holder_limit_ref01_match, null);
        $this->assertIsArray($card_holder_limit_ref01_list_result);

    }
}

function card_holder_limit_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/card_holder_limit/CardHolderLimitTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = WiseSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["card_holder_limit01", "card_holder_limit02", "card_holder_limit03", "profile01", "profile02", "profile03", "card_holder_profile01"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("WISE_TEST_CARD_HOLDER_LIMIT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "WISE_TEST_CARD_HOLDER_LIMIT_ENTID" => $idmap,
        "WISE_TEST_LIVE" => "FALSE",
        "WISE_TEST_EXPLAIN" => "FALSE",
        "WISE_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["WISE_TEST_CARD_HOLDER_LIMIT_ENTID"]);
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
