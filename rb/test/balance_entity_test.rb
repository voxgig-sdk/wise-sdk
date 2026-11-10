# Balance entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class BalanceEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Balance(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Balance(nil).list({ "profile_id" => "x", "type" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = balance_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "balance." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"balance.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}\"}"
      puts "LIVE STEP {\"id\":\"balance.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/balances/{balanceId}\"}"
      puts "LIVE STEP {\"id\":\"balance.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_BALANCE_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["balance01"]
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "balance", "id", _live_id) do
        client.Balance(nil).list({"profile_id" => setup[:idmap]["profile01"], "type" => "STANDARD"}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    balance_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.balance")))
    balance_ref01_data = nil
    if balance_ref01_data_raw.length > 0
      balance_ref01_data = Helpers.to_map(balance_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    balance_ref01_ent = client.Balance(nil)
    balance_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }
    if setup[:live]
      balance_ref01_match["type"] = "STANDARD"
    end

    balance_ref01_list_result = balance_ref01_ent.list(balance_ref01_match, nil)
    assert balance_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    balance_ref01_match_dt0 = {
      "id" => balance_ref01_data["id"],
    }
    balance_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    balance_ref01_data_dt0_loaded = balance_ref01_ent.load(balance_ref01_match_dt0, nil)
    balance_ref01_data_dt0_load_result = Helpers.to_map(balance_ref01_data_dt0_loaded.respond_to?(:data_get) ? balance_ref01_data_dt0_loaded.data_get : balance_ref01_data_dt0_loaded)
    assert !balance_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(balance_ref01_data_dt0_load_result["id"], balance_ref01_data["id"])

      return
    end

    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_BALANCE_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    balance_ref01_ent = client.Balance(nil)
    balance_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.balance"), "balance_ref01"))
    balance_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    balance_ref01_data_result = balance_ref01_ent.create(balance_ref01_data, nil)
    balance_ref01_data = Helpers.to_map(balance_ref01_data_result.respond_to?(:data_get) ? balance_ref01_data_result.data_get : balance_ref01_data_result)
    assert !balance_ref01_data.nil?
    assert !balance_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    balance_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }
    if setup[:live]
      balance_ref01_match["type"] = "STANDARD"
    end

    balance_ref01_list_result = balance_ref01_ent.list(balance_ref01_match, nil)
    assert balance_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(balance_ref01_list_result),
      { "id" => balance_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    balance_ref01_match_dt0 = {
      "id" => balance_ref01_data["id"],
    }
    balance_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    balance_ref01_data_dt0_loaded = balance_ref01_ent.load(balance_ref01_match_dt0, nil)
    balance_ref01_data_dt0_load_result = Helpers.to_map(balance_ref01_data_dt0_loaded.respond_to?(:data_get) ? balance_ref01_data_dt0_loaded.data_get : balance_ref01_data_dt0_loaded)
    assert !balance_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(balance_ref01_data_dt0_load_result["id"], balance_ref01_data["id"])

    Runner.live_pace if setup[:live]
    # REMOVE
    balance_ref01_match_rm0 = {
      "id" => balance_ref01_data["id"],
    }
    balance_ref01_match_rm0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    balance_ref01_ent.remove(balance_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    balance_ref01_match_rt0 = {
      "profile_id" => setup[:idmap]["profile01"],
    }
    if setup[:live]
      balance_ref01_match_rt0["type"] = "STANDARD"
    end

    balance_ref01_list_rt0_result = balance_ref01_ent.list(balance_ref01_match_rt0, nil)
    assert balance_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(balance_ref01_list_rt0_result),
      { "id" => balance_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def balance_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "balance", "BalanceTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["balance01", "balance02", "balance03", "profile01", "profile02", "profile03", "hold_limit_breach01", "hold_limit_breach02", "hold_limit_breach03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_BALANCE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_BALANCE_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_BALANCE_ENTID"])
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
