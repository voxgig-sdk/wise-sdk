# BatchGroup entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class BatchGroupEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.BatchGroup(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.BatchGroup(nil).load({ "id" => 1, "profile_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = batch_group_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "batch_group." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"batch_group.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments\"}"
      puts "LIVE STEP {\"id\":\"batch_group.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}\"}"
      puts "LIVE STEP {\"id\":\"batch_group.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only batch_group.create.0 gives\"}"
      skip("Live coverage incomplete: batch_group.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments); batch_group.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}); batch_group.load.2 excluded (GET-only live run: reads a record only batch_group.create.0 gives)")
    end

    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_BATCH_GROUP_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    batch_group_ref01_ent = client.BatchGroup(nil)
    batch_group_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.batch_group"), "batch_group_ref01"))
    batch_group_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    batch_group_ref01_data_result = batch_group_ref01_ent.create(batch_group_ref01_data, nil)
    batch_group_ref01_data = Helpers.to_map(batch_group_ref01_data_result.respond_to?(:data_get) ? batch_group_ref01_data_result.data_get : batch_group_ref01_data_result)
    assert !batch_group_ref01_data.nil?
    assert !batch_group_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # UPDATE
    batch_group_ref01_data_up0_up = {
      "id" => batch_group_ref01_data["id"],
      "profile_id" => setup[:idmap]["profile_id"],
    }

    batch_group_ref01_markdef_up0_name = "fileName"
    batch_group_ref01_markdef_up0_value = "Mark01-batch_group_ref01_#{setup[:now]}"
    batch_group_ref01_data_up0_up[batch_group_ref01_markdef_up0_name] = batch_group_ref01_markdef_up0_value

    batch_group_ref01_resdata_up0_result = batch_group_ref01_ent.update(batch_group_ref01_data_up0_up, nil)
    batch_group_ref01_resdata_up0 = Helpers.to_map(batch_group_ref01_resdata_up0_result.respond_to?(:data_get) ? batch_group_ref01_resdata_up0_result.data_get : batch_group_ref01_resdata_up0_result)
    assert !batch_group_ref01_resdata_up0.nil?
    assert Runner.live_same_id(batch_group_ref01_resdata_up0["id"], batch_group_ref01_data_up0_up["id"])
    assert_equal batch_group_ref01_resdata_up0[batch_group_ref01_markdef_up0_name], batch_group_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    batch_group_ref01_match_dt0 = {
      "id" => batch_group_ref01_data["id"],
    }
    batch_group_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    batch_group_ref01_data_dt0_loaded = batch_group_ref01_ent.load(batch_group_ref01_match_dt0, nil)
    batch_group_ref01_data_dt0_load_result = Helpers.to_map(batch_group_ref01_data_dt0_loaded.respond_to?(:data_get) ? batch_group_ref01_data_dt0_loaded.data_get : batch_group_ref01_data_dt0_loaded)
    assert !batch_group_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(batch_group_ref01_data_dt0_load_result["id"], batch_group_ref01_data["id"])

  end
end

def batch_group_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "batch_group", "BatchGroupTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["batch_group01", "batch_group02", "batch_group03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_BATCH_GROUP_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_BATCH_GROUP_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_BATCH_GROUP_ENTID"])
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
