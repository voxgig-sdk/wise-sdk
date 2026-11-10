# DigitalWallet entity test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class DigitalWalletEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = WiseSDK.test(nil, nil)
    ent = testsdk.DigitalWallet(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = WiseConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = WiseSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.DigitalWallet(nil).create({ "card_token" => 1, "profile_id" => 1, "activation" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = digital_wallet_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "digital_wallet." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"digital_wallet.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation\"}"
      skip("Live coverage incomplete: digital_wallet.create.0 excluded (GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation)")
    end

    if setup[:live]
      skip("Live coverage incomplete: the flow has no step to run")
    end

    client = setup[:client]

    # Bootstrap entity data from existing test data.
    digital_wallet_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.digital_wallet")))
    digital_wallet_ref01_data = nil
    if digital_wallet_ref01_data_raw.length > 0
      digital_wallet_ref01_data = Helpers.to_map(digital_wallet_ref01_data_raw[0][1])
    end

  end
end

def digital_wallet_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "digital_wallet", "DigitalWalletTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = WiseSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["digital_wallet01", "digital_wallet02", "digital_wallet03", "profile01", "profile02", "profile03", "card01", "card02", "card03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["WISE_TEST_DIGITAL_WALLET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "WISE_TEST_DIGITAL_WALLET_ENTID" => idmap,
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_TEST_EXPLAIN" => "FALSE",
    "WISE_APIKEY" => "",
  })

  idmap_resolved = Helpers.to_map(
    env["WISE_TEST_DIGITAL_WALLET_ENTID"])
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
