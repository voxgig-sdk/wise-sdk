# SettlementAllocation entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class SettlementAllocationEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.SettlementAllocation(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.SettlementAllocation(nil).load({ "id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = settlement_allocation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "settlement_allocation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"settlement_allocation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /settlement/allocations\"}"
      puts "LIVE STEP {\"id\":\"settlement_allocation.load.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only settlement_allocation.create.0 gives\"}"
      skip("Live coverage incomplete: settlement_allocation.create.0 excluded (GET-only live run: needs POST /settlement/allocations); settlement_allocation.load.1 excluded (GET-only live run: reads a record only settlement_allocation.create.0 gives)")
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    settlement_allocation_ref01_ent = client.SettlementAllocation(nil)
    settlement_allocation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.settlement_allocation"), "settlement_allocation_ref01"))

    settlement_allocation_ref01_data_result = settlement_allocation_ref01_ent.create(settlement_allocation_ref01_data, nil)
    settlement_allocation_ref01_data = Helpers.to_map(settlement_allocation_ref01_data_result.respond_to?(:data_get) ? settlement_allocation_ref01_data_result.data_get : settlement_allocation_ref01_data_result)
    assert !settlement_allocation_ref01_data.nil?
    assert !settlement_allocation_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LOAD
    settlement_allocation_ref01_match_dt0 = {
      "id" => settlement_allocation_ref01_data["id"],
    }
    settlement_allocation_ref01_data_dt0_loaded = settlement_allocation_ref01_ent.load(settlement_allocation_ref01_match_dt0, nil)
    settlement_allocation_ref01_data_dt0_load_result = Helpers.to_map(settlement_allocation_ref01_data_dt0_loaded.respond_to?(:data_get) ? settlement_allocation_ref01_data_dt0_loaded.data_get : settlement_allocation_ref01_data_dt0_loaded)
    assert !settlement_allocation_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(settlement_allocation_ref01_data_dt0_load_result["id"], settlement_allocation_ref01_data["id"])

  end
end

def settlement_allocation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "settlement_allocation", "SettlementAllocationTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["settlement_allocation01", "settlement_allocation02", "settlement_allocation03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_SETTLEMENT_ALLOCATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_SETTLEMENT_ALLOCATION_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_SETTLEMENT_ALLOCATION_ENTID"])
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
