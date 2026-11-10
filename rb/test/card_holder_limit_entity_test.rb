# CardHolderLimit entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class CardHolderLimitEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.CardHolderLimit(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.CardHolderLimit(nil).list({ "card_holder_profile_id" => "x", "profile_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = card_holder_limit_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "card_holder_limit." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"card_holder_limit.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits\"}"
    if setup[:live]
      ["card_holder_profile01", "profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_CARD_HOLDER_LIMIT_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    card_holder_limit_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.card_holder_limit")))
    card_holder_limit_ref01_data = nil
    if card_holder_limit_ref01_data_raw.length > 0
      card_holder_limit_ref01_data = Helpers.to_map(card_holder_limit_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    card_holder_limit_ref01_ent = client.CardHolderLimit(nil)
    card_holder_limit_ref01_match = {
      "card_holder_profile_id" => setup[:idmap]["card_holder_profile01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    card_holder_limit_ref01_list_result = card_holder_limit_ref01_ent.list(card_holder_limit_ref01_match, nil)
    assert card_holder_limit_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["card_holder_profile01", "profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_CARD_HOLDER_LIMIT_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    card_holder_limit_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.card_holder_limit")))
    card_holder_limit_ref01_data = nil
    if card_holder_limit_ref01_data_raw.length > 0
      card_holder_limit_ref01_data = Helpers.to_map(card_holder_limit_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    card_holder_limit_ref01_ent = client.CardHolderLimit(nil)
    card_holder_limit_ref01_match = {
      "card_holder_profile_id" => setup[:idmap]["card_holder_profile01"],
      "profile_id" => setup[:idmap]["profile01"],
    }

    card_holder_limit_ref01_list_result = card_holder_limit_ref01_ent.list(card_holder_limit_ref01_match, nil)
    assert card_holder_limit_ref01_list_result.is_a?(Array)

  end
end

def card_holder_limit_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "card_holder_limit", "CardHolderLimitTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["card_holder_limit01", "card_holder_limit02", "card_holder_limit03", "profile01", "profile02", "profile03", "card_holder_profile01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_CARD_HOLDER_LIMIT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_CARD_HOLDER_LIMIT_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_CARD_HOLDER_LIMIT_ENTID"])
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
