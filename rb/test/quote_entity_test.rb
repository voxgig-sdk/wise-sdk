# Quote entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class QuoteEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.Quote(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Quote(nil).load({ "id" => 1, "profile_id" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = quote_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "update", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "quote." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"quote.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/quotes\"}"
      puts "LIVE STEP {\"id\":\"quote.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/quotes/{quoteId}\"}"
      puts "LIVE STEP {\"id\":\"quote.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only quote.create.0 gives\"}"
      skip("Live coverage incomplete: quote.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/quotes); quote.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/quotes/{quoteId}); quote.load.2 excluded (GET-only live run: reads a record only quote.create.0 gives)")
    end

    if setup[:live]
      ["profile01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via WISE_TEST_QUOTE_ENTID")
        end
      end
    end
    client = setup[:client]

    Runner.live_pace if setup[:live]
    # CREATE
    quote_ref01_ent = client.Quote(nil)
    quote_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.quote"), "quote_ref01"))
    quote_ref01_data["profile_id"] = setup[:idmap]["profile01"]

    quote_ref01_data_result = quote_ref01_ent.create(quote_ref01_data, nil)
    quote_ref01_data = Helpers.to_map(quote_ref01_data_result.respond_to?(:data_get) ? quote_ref01_data_result.data_get : quote_ref01_data_result)
    assert !quote_ref01_data.nil?
    assert !quote_ref01_data["id"].nil?

    Runner.live_pace if setup[:live]
    # UPDATE
    quote_ref01_data_up0_up = {
      "id" => quote_ref01_data["id"],
      "profile_id" => setup[:idmap]["profile_id"],
    }

    quote_ref01_markdef_up0_name = "createdTime"
    quote_ref01_markdef_up0_value = "Mark01-quote_ref01_#{setup[:now]}"
    quote_ref01_data_up0_up[quote_ref01_markdef_up0_name] = quote_ref01_markdef_up0_value

    quote_ref01_resdata_up0_result = quote_ref01_ent.update(quote_ref01_data_up0_up, nil)
    quote_ref01_resdata_up0 = Helpers.to_map(quote_ref01_resdata_up0_result.respond_to?(:data_get) ? quote_ref01_resdata_up0_result.data_get : quote_ref01_resdata_up0_result)
    assert !quote_ref01_resdata_up0.nil?
    assert Runner.live_same_id(quote_ref01_resdata_up0["id"], quote_ref01_data_up0_up["id"])
    assert_equal quote_ref01_resdata_up0[quote_ref01_markdef_up0_name], quote_ref01_markdef_up0_value

    Runner.live_pace if setup[:live]
    # LOAD
    quote_ref01_match_dt0 = {
      "id" => quote_ref01_data["id"],
    }
    quote_ref01_match_dt0["profile_id"] = setup[:idmap]["profile_id"] || setup[:idmap]["profile01"]
    quote_ref01_data_dt0_loaded = quote_ref01_ent.load(quote_ref01_match_dt0, nil)
    quote_ref01_data_dt0_load_result = Helpers.to_map(quote_ref01_data_dt0_loaded.respond_to?(:data_get) ? quote_ref01_data_dt0_loaded.data_get : quote_ref01_data_dt0_loaded)
    assert !quote_ref01_data_dt0_load_result.nil?
    assert Runner.live_same_id(quote_ref01_data_dt0_load_result["id"], quote_ref01_data["id"])

  end
end

def quote_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "quote", "QuoteTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["quote01", "quote02", "quote03", "profile01", "profile02", "profile03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_QUOTE_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_QUOTE_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_QUOTE_ENTID"])
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
