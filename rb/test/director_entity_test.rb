# Director entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class DirectorEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Director(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Director(nil).list({ "profile_id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = director_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "update", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "director." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"director.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/directors\"}"
      puts "LIVE STEP {\"id\":\"director.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /profiles/{profileId}/directors\"}"
      puts "LIVE STEP {\"id\":\"director.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/directors\"}"
      puts "LIVE STEP {\"id\":\"director.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_DIRECTOR_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    director_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.director")))
    director_ref01_data = nil
    if director_ref01_data_raw.length > 0
      director_ref01_data = Helpers.to_map(director_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LIST
    director_ref01_ent = client.Director(nil)
    director_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    director_ref01_list_result = director_ref01_ent.list(director_ref01_match, nil)
    assert director_ref01_list_result.is_a?(Array)

      return
    end

    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_DIRECTOR_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    director_ref01_ent = client.Director(nil)
    director_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.director"), "director_ref01"))
    director_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    director_ref01_data_result = director_ref01_ent.create(director_ref01_data, nil)
    director_ref01_data = Helpers.to_map(director_ref01_data_result.respond_to?(:data_get) ? director_ref01_data_result.data_get : director_ref01_data_result)
    assert !director_ref01_data.nil?
    assert !director_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # LIST
    director_ref01_match = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    director_ref01_list_result = director_ref01_ent.list(director_ref01_match, nil)
    assert director_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(director_ref01_list_result),
      { "id" => director_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    Runner.live_pace if setup[:live]
    # UPDATE
    director_ref01_data_up0_up = {
      "id" => director_ref01_data["id"],
    }

    director_ref01_markdef_up0_name = "countryOfResidenceIso3Code"
    director_ref01_markdef_up0_value = "Mark01-director_ref01_#{setup[:now]}"
    director_ref01_data_up0_up[director_ref01_markdef_up0_name] = director_ref01_markdef_up0_value

    director_ref01_resdata_up0_result = director_ref01_ent.update(director_ref01_data_up0_up, nil)
    director_ref01_resdata_up0 = Helpers.to_map(director_ref01_resdata_up0_result.respond_to?(:data_get) ? director_ref01_resdata_up0_result.data_get : director_ref01_resdata_up0_result)
    assert !director_ref01_resdata_up0.nil?
    assert Runner.live_same_id(director_ref01_resdata_up0["id"], director_ref01_data_up0_up["id"])
    assert_equal director_ref01_resdata_up0[director_ref01_markdef_up0_name], director_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # REMOVE
    director_ref01_match_rm0 = {
      "id" => director_ref01_data["id"],
    }
    director_ref01_ent.remove(director_ref01_match_rm0, nil)

    Runner.live_pace if setup[:live]
    # LIST
    director_ref01_match_rt0 = {
      "profile_id" => setup[:idmap]["profile01"],
    }

    director_ref01_list_rt0_result = director_ref01_ent.list(director_ref01_match_rt0, nil)
    assert director_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(director_ref01_list_rt0_result),
      { "id" => director_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def director_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "director", "DirectorTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["director01", "director02", "director03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_DIRECTOR_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_DIRECTOR_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_DIRECTOR_ENTID"])
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
