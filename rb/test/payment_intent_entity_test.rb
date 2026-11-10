# PaymentIntent entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class PaymentIntentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.PaymentIntent(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PaymentIntent(nil).load({ "allocation_id" => 1, "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = payment_intent_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "payment_intent." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "allocation01" => "f47ac10b-58cc-4372-a567-0e02b2c3d479", "payment_intent01" => "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "payment_intent", "id", setup[:idmap]["payment_intent01"]) do
        [{ "id" => setup[:idmap]["payment_intent01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    payment_intent_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.payment_intent")))
    payment_intent_ref01_data = nil
    if payment_intent_ref01_data_raw.length > 0
      payment_intent_ref01_data = Helpers.to_map(payment_intent_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    payment_intent_ref01_ent = client.PaymentIntent(nil)
    payment_intent_ref01_match_dt0 = {
      "id" => payment_intent_ref01_data["id"],
    }
    payment_intent_ref01_match_dt0["allocation_id"] = setup[:idmap]["allocation_id"] || setup[:idmap]["allocation01"]
    payment_intent_ref01_data_dt0_loaded = payment_intent_ref01_ent.load(payment_intent_ref01_match_dt0, nil)
    payment_intent_ref01_data_dt0_load_result = Helpers.to_map(payment_intent_ref01_data_dt0_loaded.respond_to?(:data_get) ? payment_intent_ref01_data_dt0_loaded.data_get : payment_intent_ref01_data_dt0_loaded)
    assert !payment_intent_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(payment_intent_ref01_data_dt0_load_result["id"], payment_intent_ref01_data["id"])

  end
end

def payment_intent_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "payment_intent", "PaymentIntentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["payment_intent01", "payment_intent02", "payment_intent03", "allocation01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_PAYMENT_INTENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_PAYMENT_INTENT_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_PAYMENT_INTENT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["WISE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
        "apikey" => env["WISE_APIKEY"],
      },
      extra || {},
    ])
    client = WiseSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["WISE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["WISE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
