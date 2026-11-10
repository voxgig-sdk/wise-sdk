# Dispute entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class DisputeEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Dispute(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Dispute(nil).list({ "profile_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = dispute_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "dispute." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"dispute.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}\"}"
      puts "LIVE STEP {\"id\":\"dispute.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /spend/profiles/{profileId}/disputes/{disputeId}/status\"}"
    if setup[:live]
      { "profile01" => 16605997 }.each do |_live_key, _live_ex|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          setup[:idmap][_live_key] = _live_ex
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      _live_id = setup[:synthetic_only] ? nil : setup[:idmap]["dispute01"]
      _live_id = "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb" if _live_id.nil?
      Runner.live_pace
      Runner.live_existing(setup, LIVE_STRICT, "dispute", "id", _live_id) do
        client.Dispute(nil).list({"profile_id" => setup[:idmap]["profile01"]}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    dispute_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.dispute")))
    dispute_ref01_data = nil
    if dispute_ref01_data_raw.length > 0
      dispute_ref01_data = Helpers.to_map(dispute_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    dispute_ref01_ent = client.Dispute(nil)
    dispute_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    dispute_ref01_list_result = dispute_ref01_ent.list(dispute_ref01_match, nil)
    assert dispute_ref01_list_result.is_a?(Array)

    Runner.live_pace if setup[:live]
    # LOAD
    dispute_ref01_match_dt0 = {
      "id" => dispute_ref01_data["id"],
    }
    dispute_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    dispute_ref01_data_dt0_loaded = dispute_ref01_ent.load(dispute_ref01_match_dt0, nil)
    dispute_ref01_data_dt0_load_result = Helpers.to_map(dispute_ref01_data_dt0_loaded.respond_to?(:data_get) ? dispute_ref01_data_dt0_loaded.data_get : dispute_ref01_data_dt0_loaded)
    assert !dispute_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(dispute_ref01_data_dt0_load_result["id"], dispute_ref01_data["id"])

      return
    end

    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_DISPUTE_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    dispute_ref01_ent = client.Dispute(nil)
    dispute_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.dispute"), "dispute_ref01"))
    dispute_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    dispute_ref01_data_result = dispute_ref01_ent.create(dispute_ref01_data, nil)
    dispute_ref01_data = Helpers.to_map(dispute_ref01_data_result.respond_to?(:data_get) ? dispute_ref01_data_result.data_get : dispute_ref01_data_result)
    assert !dispute_ref01_data.nil?
    assert !dispute_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    dispute_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    dispute_ref01_list_result = dispute_ref01_ent.list(dispute_ref01_match, nil)
    assert dispute_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(dispute_ref01_list_result),
      { "id" => dispute_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    dispute_ref01_data_up0_up = {
      "id" => dispute_ref01_data["id"],
      "profile_id" => setup[:idmap]["profile_id"],
    }

    dispute_ref01_markdef_up0_name = "createdAt"
    dispute_ref01_markdef_up0_value = "Mark01-dispute_ref01_#{setup[:now]}"
    dispute_ref01_data_up0_up[dispute_ref01_markdef_up0_name] = dispute_ref01_markdef_up0_value

    dispute_ref01_resdata_up0_result = dispute_ref01_ent.update(dispute_ref01_data_up0_up, nil)
    dispute_ref01_resdata_up0 = Helpers.to_map(dispute_ref01_resdata_up0_result.respond_to?(:data_get) ? dispute_ref01_resdata_up0_result.data_get : dispute_ref01_resdata_up0_result)
    assert !dispute_ref01_resdata_up0.nil?
    assert Runner.live_same_id(dispute_ref01_resdata_up0["id"], dispute_ref01_data_up0_up["id"])
    assert_equal dispute_ref01_resdata_up0[dispute_ref01_markdef_up0_name], dispute_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    dispute_ref01_match_dt0 = {
      "id" => dispute_ref01_data["id"],
    }
    dispute_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    dispute_ref01_data_dt0_loaded = dispute_ref01_ent.load(dispute_ref01_match_dt0, nil)
    dispute_ref01_data_dt0_load_result = Helpers.to_map(dispute_ref01_data_dt0_loaded.respond_to?(:data_get) ? dispute_ref01_data_dt0_loaded.data_get : dispute_ref01_data_dt0_loaded)
    assert !dispute_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(dispute_ref01_data_dt0_load_result["id"], dispute_ref01_data["id"])

  end
end

def dispute_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "dispute", "DisputeTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["dispute01", "dispute02", "dispute03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_DISPUTE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_DISPUTE_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_DISPUTE_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end
  if idmap_resolved["profile_id"].nil?
    idmap_resolved["profile_id"] = idmap_resolved["profile01"]
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
