# IncomingTransfer entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class IncomingTransferEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.IncomingTransfer(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.IncomingTransfer(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = incoming_transfer_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "incoming_transfer." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "incoming_transfer01" => "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "incoming_transfer", "id", setup[:idmap]["incoming_transfer01"]) do
        [{ "id" => setup[:idmap]["incoming_transfer01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    incoming_transfer_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.incoming_transfer")))
    incoming_transfer_ref01_data = nil
    if incoming_transfer_ref01_data_raw.length > 0
      incoming_transfer_ref01_data = Helpers.to_map(incoming_transfer_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    incoming_transfer_ref01_ent = client.IncomingTransfer(nil)
    incoming_transfer_ref01_match_dt0 = {
      "id" => incoming_transfer_ref01_data["id"],
    }
    incoming_transfer_ref01_data_dt0_loaded = incoming_transfer_ref01_ent.load(incoming_transfer_ref01_match_dt0, nil)
    incoming_transfer_ref01_data_dt0_load_result = Helpers.to_map(incoming_transfer_ref01_data_dt0_loaded.respond_to?(:data_get) ? incoming_transfer_ref01_data_dt0_loaded.data_get : incoming_transfer_ref01_data_dt0_loaded)
    assert !incoming_transfer_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(incoming_transfer_ref01_data_dt0_load_result["id"], incoming_transfer_ref01_data["id"])

  end
end

def incoming_transfer_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "incoming_transfer", "IncomingTransferTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["incoming_transfer01", "incoming_transfer02", "incoming_transfer03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_INCOMING_TRANSFER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_INCOMING_TRANSFER_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_INCOMING_TRANSFER_ENTID"])
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
