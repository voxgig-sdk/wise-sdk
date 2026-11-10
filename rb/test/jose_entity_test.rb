# Jose entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class JoseEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Jose(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Jose(nil).load({ "algorithm" => 1, "scope" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = jose_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "jose." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"jose.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /auth/jose/playground/jwsjwe\"}"
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    jose_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.jose")))
    jose_ref01_data = nil
    if jose_ref01_data_raw.length > 0
      jose_ref01_data = Helpers.to_map(jose_ref01_data_raw[0][1])
    end

    Runner.live_pace if setup[:live]
    # LOAD
    jose_ref01_ent = client.Jose(nil)
    jose_ref01_match_dt0 = {}
    if setup[:live]
      jose_ref01_match_dt0["algorithm"] = "ES512"
      jose_ref01_match_dt0["scope"] = "PAYLOAD_SIGNING"
    end
    jose_ref01_data_dt0_loaded = jose_ref01_ent.load(jose_ref01_match_dt0, nil)
    assert !jose_ref01_data_dt0_loaded.nil?

      return
    end

    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    jose_ref01_ent = client.Jose(nil)
    jose_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.jose"), "jose_ref01"))

    jose_ref01_data_result = jose_ref01_ent.create(jose_ref01_data, nil)
    jose_ref01_data = Helpers.to_map(jose_ref01_data_result.respond_to?(:data_get) ? jose_ref01_data_result.data_get : jose_ref01_data_result)
    assert !jose_ref01_data.nil?

    Runner.live_pace if setup[:live]
    # LOAD
    jose_ref01_match_dt0 = {}
    if setup[:live]
      jose_ref01_match_dt0["algorithm"] = "ES512"
      jose_ref01_match_dt0["scope"] = "PAYLOAD_SIGNING"
    end
    jose_ref01_data_dt0_loaded = jose_ref01_ent.load(jose_ref01_match_dt0, nil)
    assert !jose_ref01_data_dt0_loaded.nil?

  end
end

def jose_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "jose", "JoseTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["jose01", "jose02", "jose03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_JOSE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_JOSE_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_JOSE_ENTID"])
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
