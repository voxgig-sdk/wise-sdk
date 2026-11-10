# BalanceStatement direct test

require "minitest/autorun"
require "json"
require_relative "../Wise_sdk"
require_relative "runner"

class BalanceStatementDirectTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def live_ok(result)
    status = Helpers.to_int(result["status"])
    result["err"].nil? && result["ok"] && status >= 200 && status < 300
  end

  def test_direct_load_balance_statement
    setup = balance_statement_direct_setup({ "id" => "direct01" })
    _should_skip, _reason = Runner.is_control_skipped("direct", "direct-load-balance_statement", setup[:live] ? "live" : "unit")
    if _should_skip
      skip(_reason || "skipped via sdk-test-control.json")
      return
    end
    Runner.live_pace if setup[:live]
    client = setup[:client]

    params = {}
    query = {}
    if setup[:live]
      query["currency"] = "EUR"
      query["intervalEnd"] = "2025-04-30T23:59:59.999Z"
      query["intervalStart"] = "2025-03-01T00:00:00.000Z"
      params["id"] = 64
      params["profile_id"] = 12345
    else
      params["id"] = "direct01"
      params["profile_id"] = "direct02"
    end

    result = client.direct({
      "path" => "profiles/{profile_id}/balance-statements/{id}/statement.json",
      "method" => "GET",
      "params" => params,
      "query" => query,
    })
    if setup[:live]
      unless live_ok(result)
        Runner.live_miss(LIVE_STRICT, "Live load failed: " + Runner.live_describe(result))
      end
      if result["data"].nil?
        Runner.live_miss(LIVE_STRICT, "Live load returned no data: " + Runner.live_describe(result))
      end
      assert !result["data"].nil?
    else
      assert_nil result["err"]
      assert result["ok"]
      assert_equal 200, Helpers.to_int(result["status"])
      assert !result["data"].nil?
      if result["data"].is_a?(Hash)
        assert_equal "direct01", result["data"]["id"]
      end
      assert_equal 1, setup[:calls].length
    end
  end

end


def balance_statement_direct_setup(mockres)
  Runner.load_env_local

  calls = []

  env = Runner.env_override({
    "WISE_TEST_BALANCE_STATEMENT_ENTID" => {},
    "WISE_TEST_LIVE" => "FALSE",
    "WISE_APIKEY" => "",
  })

  live = env["WISE_TEST_LIVE"] == "TRUE"

  if live
    # Merged so the generated fields win: sdk-test-control.json's
    # test.client.options adds to the live client, it does not redirect it.
    merged_opts = Runner.live_client_options.merge({
      "apikey" => env["WISE_APIKEY"],
    })
    client = WiseSDK.new(merged_opts)
    idmap = env["WISE_TEST_BALANCE_STATEMENT_ENTID"]
    # A path parameter's example stands in for an id *_ENTID does not give.
    idmap = { "balance_statement01" => 64, "profile01" => 12345 }
      .merge(idmap.is_a?(Hash) ? idmap : {})
    return {
      client: client,
      calls: calls,
      live: true,
      idmap: idmap.is_a?(Hash) ? idmap : {},
    }
  end

  mock_fetch = ->(url, init) {
    calls.push({ "url" => url, "init" => init })
    return {
      "status" => 200,
      "statusText" => "OK",
      "headers" => {},
      "json" => ->() {
        if !mockres.nil?
          return mockres
        end
        return { "id" => "direct01" }
      },
      "body" => "mock",
    }, nil
  }

  client = WiseSDK.new({
    "base" => "http://localhost:8080",
    "system" => {
      "fetch" => mock_fetch,
    },
  })

  {
    client: client,
    calls: calls,
    live: false,
    idmap: {},
  }
end
