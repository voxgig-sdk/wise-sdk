<?php
declare(strict_types=1);

// PaymentInitiation entity test

require_once __DIR__ . '/../wise_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PaymentInitiationEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = WiseSDK::test(null, null);
        $ent = $testsdk->PaymentInitiation(null);
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
            $client->PaymentInitiation(null)->load(["batch_group_id" => 1, "id" => 1, "profile_id" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = payment_initiation_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "payment_initiation." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"payment_initiation.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"payment_initiation.load.1","state":"excluded","attempted":false,"reason":"GET-only live run: reads a record only payment_initiation.create.0 gives"}' . "\n");
            $this->markTestSkipped('Live coverage incomplete: payment_initiation.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations); payment_initiation.load.1 excluded (GET-only live run: reads a record only payment_initiation.create.0 gives)');
        }

        if (!empty($setup["live"])) {
            foreach (["batch_group01", "profile01"] as $_liveKey) {
                if (!empty($setup["synthetic_only"]) || null === ($setup["idmap"][$_liveKey] ?? null)) {
                    Runner::live_miss(self::LIVE_STRICT, "Live entity test blocked: needs " . $_liveKey . " via WISE_TEST_PAYMENT_INITIATION_ENTID");
                }
            }
        }
        $client = $setup["client"];

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // CREATE
        $payment_initiation_ref01_ent = $client->PaymentInitiation(null);
        $payment_initiation_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.payment_initiation"), "payment_initiation_ref01"));
        $payment_initiation_ref01_data["batch_group_id"] = $setup["idmap"]["batch_group01"];
        $payment_initiation_ref01_data["profile_id"] = $setup["idmap"]["profile01"];

        $payment_initiation_ref01_data_result = $payment_initiation_ref01_ent->create($payment_initiation_ref01_data, null);
        $payment_initiation_ref01_data = Helpers::to_map(is_object($payment_initiation_ref01_data_result) && method_exists($payment_initiation_ref01_data_result, 'data_get') ? $payment_initiation_ref01_data_result->data_get() : $payment_initiation_ref01_data_result);
        $this->assertNotNull($payment_initiation_ref01_data);
        $this->assertNotNull($payment_initiation_ref01_data["id"]);

        if (!empty($setup["live"])) {
            Runner::live_pace();
        }
        // LOAD
        $payment_initiation_ref01_match_dt0 = [
            "id" => $payment_initiation_ref01_data["id"],
        ];
        $payment_initiation_ref01_match_dt0["batch_group_id"] = $setup["idmap"]["batch_group_id"] ?? $setup["idmap"]["batch_group01"] ?? null;
        $payment_initiation_ref01_match_dt0["profile_id"] = $setup["idmap"]["profile_id"] ?? $setup["idmap"]["profile01"] ?? null;
        $payment_initiation_ref01_data_dt0_loaded = $payment_initiation_ref01_ent->load($payment_initiation_ref01_match_dt0, null);
        $payment_initiation_ref01_data_dt0_load_result = Helpers::to_map(is_object($payment_initiation_ref01_data_dt0_loaded) && method_exists($payment_initiation_ref01_data_dt0_loaded, 'data_get') ? $payment_initiation_ref01_data_dt0_loaded->data_get() : $payment_initiation_ref01_data_dt0_loaded);
        $this->assertNotNull($payment_initiation_ref01_data_dt0_load_result);
        if (empty($setup["live"])) {
            $this->assertTrue(Runner::live_same_id($payment_initiation_ref01_data_dt0_load_result["id"] ?? null, $payment_initiation_ref01_data["id"]));
        }

    }
}

function payment_initiation_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/payment_initiation/PaymentInitiationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = WiseSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["payment_initiation01", "payment_initiation02", "payment_initiation03", "profile01", "profile02", "profile03", "batch_group01", "batch_group02", "batch_group03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("WISE_TEST_PAYMENT_INITIATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "WISE_TEST_PAYMENT_INITIATION_ENTID" => $idmap,
        "WISE_TEST_LIVE" => "FALSE",
        "WISE_TEST_EXPLAIN" => "FALSE",
        "WISE_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["WISE_TEST_PAYMENT_INITIATION_ENTID"]);
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
