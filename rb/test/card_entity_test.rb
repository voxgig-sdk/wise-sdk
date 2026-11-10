# Card entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class CardEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Card(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Card(nil).list({ "profile_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = card_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "card." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"card.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count\"}"
      puts "LIVE STEP {\"id\":\"card.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions\"}"
    if setup[:live]
      { "profile01" => 123456 }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["card01"]
      _live_id = "ca0c8154-1e14-4464-a1ce-dcea7dc3de52" if _live_id.nil?
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "card", "id", _live_id) do
        client.Card(nil).list({"profile_id" => setup[:idmap]["profile01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    card_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.card")))
    card_ref01_data = nil
    if card_ref01_data_raw.length > 0
      card_ref01_data = Helpers.to_map(card_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    card_ref01_ent = client.Card(nil)
    card_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    card_ref01_list_result = card_ref01_ent.list(card_ref01_match, nil)
    assert card_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    card_ref01_match_dt0 = {
      "id" => card_ref01_data["id"],
    }
    card_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    card_ref01_data_dt0_loaded = card_ref01_ent.load(card_ref01_match_dt0, nil)
    card_ref01_data_dt0_load_result = Helpers.to_map(card_ref01_data_dt0_loaded.respond_to?(:data_get) ? card_ref01_data_dt0_loaded.data_get : card_ref01_data_dt0_loaded)
    assert !card_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(card_ref01_data_dt0_load_result["id"], card_ref01_data["id"]) unless setup[:live]

      return
    end

    if setup[:live]
      ["card_token01", "profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_CARD_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    card_ref01_ent = client.Card(nil)
    card_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.card"), "card_ref01"))
    card_ref01_data["card_token"] = setup[:idmap]["card_token01"]
    card_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    card_ref01_data_result = card_ref01_ent.create(card_ref01_data, nil)
    card_ref01_data = Helpers.to_map(card_ref01_data_result.respond_to?(:data_get) ? card_ref01_data_result.data_get : card_ref01_data_result)
    assert !card_ref01_data.nil?
    assert !card_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    card_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    card_ref01_list_result = card_ref01_ent.list(card_ref01_match, nil)
    assert card_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(card_ref01_list_result),
      { "id" => card_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # LOAD
    card_ref01_match_dt0 = {
      "id" => card_ref01_data["id"],
    }
    card_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    card_ref01_data_dt0_loaded = card_ref01_ent.load(card_ref01_match_dt0, nil)
    card_ref01_data_dt0_load_result = Helpers.to_map(card_ref01_data_dt0_loaded.respond_to?(:data_get) ? card_ref01_data_dt0_loaded.data_get : card_ref01_data_dt0_loaded)
    assert !card_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(card_ref01_data_dt0_load_result["id"], card_ref01_data["id"]) unless setup[:live]

  end
end

def card_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "card", "CardTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["card01", "card02", "card03", "profile01", "profile02", "profile03", "card_token01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_CARD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_CARD_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_CARD_ENTID"])
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
