# BalanceStatement entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class BalanceStatementEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.BalanceStatement(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BalanceStatement(nil).load({ "id" => "x", "profile_id" => 1, "currency" => "x", "interval_end" => "x", "interval_start" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = balance_statement_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "balance_statement." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      { "balance_statement01" => 64, "profile01" => 12345 }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "balance_statement", "id", setup[:idmap]["balance_statement01"]) do
        [{ "id" => setup[:idmap]["balance_statement01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    balance_statement_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.balance_statement")))
    balance_statement_ref01_data = nil
    if balance_statement_ref01_data_raw.length > 0
      balance_statement_ref01_data = Helpers.to_map(balance_statement_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    balance_statement_ref01_ent = client.BalanceStatement(nil)
    balance_statement_ref01_match_dt0 = {
      "id" => balance_statement_ref01_data["id"],
    }
    balance_statement_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    if setup[:live]
      balance_statement_ref01_match_dt0["currency"] = "EUR"
      balance_statement_ref01_match_dt0["interval_end"] = "2025-04-30T23:59:59.999Z"
      balance_statement_ref01_match_dt0["interval_start"] = "2025-03-01T00:00:00.000Z"
    end
    balance_statement_ref01_data_dt0_loaded = balance_statement_ref01_ent.load(balance_statement_ref01_match_dt0, nil)
    balance_statement_ref01_data_dt0_load_result = Helpers.to_map(balance_statement_ref01_data_dt0_loaded.respond_to?(:data_get) ? balance_statement_ref01_data_dt0_loaded.data_get : balance_statement_ref01_data_dt0_loaded)
    assert !balance_statement_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(balance_statement_ref01_data_dt0_load_result["id"], balance_statement_ref01_data["id"]) unless setup[:live]

  end
end

def balance_statement_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "balance_statement", "BalanceStatementTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["balance_statement01", "balance_statement02", "balance_statement03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_BALANCE_STATEMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_BALANCE_STATEMENT_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_BALANCE_STATEMENT_ENTID"])
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
