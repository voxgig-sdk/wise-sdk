# Simulation entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class SimulationEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Simulation(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Simulation(nil).list({ "card_token" => 1, "profile_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = simulation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "simulation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"simulation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation\"}"
    if setup[:live]
      ["kyc_review01", "profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_SIMULATION_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["simulation01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "simulation", "id", _live_id) do
        client.Simulation(nil).list({"kyc_review_id" => setup[:idmap]["kyc_review01"], "profile_id" => setup[:idmap]["profile01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    simulation_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.simulation")))
    simulation_ref01_data = nil
    if simulation_ref01_data_raw.length > 0
      simulation_ref01_data = Helpers.to_map(simulation_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    simulation_ref01_ent = client.Simulation(nil)
    simulation_ref01_match = {
      "kyc_review_id" => setup[:idmap]["kyc_review01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    simulation_ref01_list_result = simulation_ref01_ent.list(simulation_ref01_match, nil)
    assert simulation_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    simulation_ref01_match_dt0 = {
      "id" => simulation_ref01_data["id"],
    }
    simulation_ref01_match_dt0["transfer_id"] = setup[:idmap]["transfer_id"] || setup[:idmap]["transfer01"]
    simulation_ref01_data_dt0_loaded = simulation_ref01_ent.load(simulation_ref01_match_dt0, nil)
    simulation_ref01_data_dt0_load_result = Helpers.to_map(simulation_ref01_data_dt0_loaded.respond_to?(:data_get) ? simulation_ref01_data_dt0_loaded.data_get : simulation_ref01_data_dt0_loaded)
    assert !simulation_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(simulation_ref01_data_dt0_load_result["id"], simulation_ref01_data["id"])

      return
    end

    if setup[:live]
      ["card_token01", "kyc_review01", "profile01", "transfer01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_SIMULATION_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    simulation_ref01_ent = client.Simulation(nil)
    simulation_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.simulation"), "simulation_ref01"))
    simulation_ref01_data["card_token"] = setup[:idmap]["card_token01"]
    simulation_ref01_data["kyc_review_id"] = setup[:idmap]["kyc_review01"]
    simulation_ref01_data["profile_id"] = setup[:idmap]["profile01"]
    simulation_ref01_data["transfer_id"] = setup[:idmap]["transfer01"]

    simulation_ref01_data_result = simulation_ref01_ent.create(simulation_ref01_data, nil)
    simulation_ref01_data = Helpers.to_map(simulation_ref01_data_result.respond_to?(:data_get) ? simulation_ref01_data_result.data_get : simulation_ref01_data_result)
    assert !simulation_ref01_data.nil?
    assert !simulation_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    simulation_ref01_match = {
      "kyc_review_id" => setup[:idmap]["kyc_review01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    simulation_ref01_list_result = simulation_ref01_ent.list(simulation_ref01_match, nil)
    assert simulation_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(simulation_ref01_list_result),
      { "id" => simulation_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    simulation_ref01_match_dt0 = {
      "id" => simulation_ref01_data["id"],
    }
    simulation_ref01_match_dt0["transfer_id"] = setup[:idmap]["transfer_id"] || setup[:idmap]["transfer01"]
    simulation_ref01_data_dt0_loaded = simulation_ref01_ent.load(simulation_ref01_match_dt0, nil)
    simulation_ref01_data_dt0_load_result = Helpers.to_map(simulation_ref01_data_dt0_loaded.respond_to?(:data_get) ? simulation_ref01_data_dt0_loaded.data_get : simulation_ref01_data_dt0_loaded)
    assert !simulation_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(simulation_ref01_data_dt0_load_result["id"], simulation_ref01_data["id"])

  end
end

def simulation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "simulation", "SimulationTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["simulation01", "simulation02", "simulation03", "profile01", "profile02", "profile03", "transfer01", "transfer02", "transfer03", "kyc_review01", "kyc_review02", "kyc_review03", "card01", "card02", "card03", "card_token01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_SIMULATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_SIMULATION_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_SIMULATION_ENTID"])
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
