# AccountRequirement entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class AccountRequirementEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.AccountRequirement(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.AccountRequirement(nil).list({ "quote_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = account_requirement_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "account_requirement." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"account_requirement.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /quotes/{quoteId}/account-requirements\"}"
    if setup[:live]
      ["quote01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    account_requirement_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.account_requirement")))
    account_requirement_ref01_data = nil
    if account_requirement_ref01_data_raw.length > 0
      account_requirement_ref01_data = Helpers.to_map(account_requirement_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    account_requirement_ref01_ent = client.AccountRequirement(nil)
    account_requirement_ref01_match = {
      "quote_id" => setup[:idmap]["quote01"],
    }

    account_requirement_ref01_list_result = account_requirement_ref01_ent.list(account_requirement_ref01_match, nil)
    assert account_requirement_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["quote01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    account_requirement_ref01_ent = client.AccountRequirement(nil)
    account_requirement_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.account_requirement"), "account_requirement_ref01"))
    account_requirement_ref01_data["quote_id"] = setup[:idmap]["quote01"]

    account_requirement_ref01_data_result = account_requirement_ref01_ent.create(account_requirement_ref01_data, nil)
    account_requirement_ref01_data = Helpers.to_map(account_requirement_ref01_data_result.respond_to?(:data_get) ? account_requirement_ref01_data_result.data_get : account_requirement_ref01_data_result)
    assert !account_requirement_ref01_data.nil?

    Runner.live_pace if setup[:live]
    # LIST
    account_requirement_ref01_match = {
      "quote_id" => setup[:idmap]["quote01"],
    }

    account_requirement_ref01_list_result = account_requirement_ref01_ent.list(account_requirement_ref01_match, nil)
    assert account_requirement_ref01_list_result.is_a?(Array)

  end
end

def account_requirement_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "account_requirement", "AccountRequirementTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["account_requirement01", "account_requirement02", "account_requirement03", "quote01", "quote02", "quote03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_ACCOUNT_REQUIREMENT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_ACCOUNT_REQUIREMENT_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_ACCOUNT_REQUIREMENT_ENTID"])
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
