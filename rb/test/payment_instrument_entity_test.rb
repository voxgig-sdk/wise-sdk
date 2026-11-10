# PaymentInstrument entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class PaymentInstrumentEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.PaymentInstrument(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PaymentInstrument(nil).list({ "id" => 1, "profile_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = payment_instrument_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "payment_instrument." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"payment_instrument.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation\"}"
    if setup[:live]
      ["payment_instrument01", "profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["payment_instrument01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "payment_instrument", "id", _live_id) do
        client.PaymentInstrument(nil).list({"payment_instrument_id" => setup[:idmap]["payment_instrument01"], "profile_id" => setup[:idmap]["profile01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    payment_instrument_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.payment_instrument")))
    payment_instrument_ref01_data = nil
    if payment_instrument_ref01_data_raw.length > 0
      payment_instrument_ref01_data = Helpers.to_map(payment_instrument_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    payment_instrument_ref01_ent = client.PaymentInstrument(nil)
    payment_instrument_ref01_match = {
      "payment_instrument_id" => setup[:idmap]["payment_instrument01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    payment_instrument_ref01_list_result = payment_instrument_ref01_ent.list(payment_instrument_ref01_match, nil)
    assert payment_instrument_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    payment_instrument_ref01_match_dt0 = {
      "id" => payment_instrument_ref01_data["id"],
    }
    payment_instrument_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    payment_instrument_ref01_data_dt0_loaded = payment_instrument_ref01_ent.load(payment_instrument_ref01_match_dt0, nil)
    payment_instrument_ref01_data_dt0_load_result = Helpers.to_map(payment_instrument_ref01_data_dt0_loaded.respond_to?(:data_get) ? payment_instrument_ref01_data_dt0_loaded.data_get : payment_instrument_ref01_data_dt0_loaded)
    assert !payment_instrument_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(payment_instrument_ref01_data_dt0_load_result["id"], payment_instrument_ref01_data["id"])

      return
    end

    if setup[:live]
      ["profile01", "payment_instrument01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    payment_instrument_ref01_ent = client.PaymentInstrument(nil)
    payment_instrument_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.payment_instrument"), "payment_instrument_ref01"))
    payment_instrument_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    payment_instrument_ref01_data_result = payment_instrument_ref01_ent.create(payment_instrument_ref01_data, nil)
    payment_instrument_ref01_data = Helpers.to_map(payment_instrument_ref01_data_result.respond_to?(:data_get) ? payment_instrument_ref01_data_result.data_get : payment_instrument_ref01_data_result)
    assert !payment_instrument_ref01_data.nil?
    assert !payment_instrument_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    payment_instrument_ref01_match = {
      "payment_instrument_id" => setup[:idmap]["payment_instrument01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    payment_instrument_ref01_list_result = payment_instrument_ref01_ent.list(payment_instrument_ref01_match, nil)
    assert payment_instrument_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(payment_instrument_ref01_list_result),
      { "id" => payment_instrument_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    payment_instrument_ref01_match_dt0 = {
      "id" => payment_instrument_ref01_data["id"],
    }
    payment_instrument_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    payment_instrument_ref01_data_dt0_loaded = payment_instrument_ref01_ent.load(payment_instrument_ref01_match_dt0, nil)
    payment_instrument_ref01_data_dt0_load_result = Helpers.to_map(payment_instrument_ref01_data_dt0_loaded.respond_to?(:data_get) ? payment_instrument_ref01_data_dt0_loaded.data_get : payment_instrument_ref01_data_dt0_loaded)
    assert !payment_instrument_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(payment_instrument_ref01_data_dt0_load_result["id"], payment_instrument_ref01_data["id"])

  end
end

def payment_instrument_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "payment_instrument", "PaymentInstrumentTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["payment_instrument01", "payment_instrument02", "payment_instrument03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_PAYMENT_INSTRUMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_PAYMENT_INSTRUMENT_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_PAYMENT_INSTRUMENT_ENTID"])
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
