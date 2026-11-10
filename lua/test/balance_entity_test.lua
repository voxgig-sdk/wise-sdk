-- Balance entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("wise_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

-- main.kit.test.live.strict is true (the default is true): a live
-- request that fails, or a live test missing an input it needs,
-- fails the test.
-- An account with no record for a test to read skips it either way.
local LIVE_STRICT = true


describe("BalanceEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Balance(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Balance(nil):list({ ["profile_id"] = "x", ["type"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = balance_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load", "remove"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "balance." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"balance.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}\"}")
      print("LIVE STEP {\"id\":\"balance.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/balances/{balanceId}\"}")
      print("LIVE STEP {\"id\":\"balance.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
    if setup.live then
      for _, _live_key in ipairs({"profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_BALANCE_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["balance01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "balance", function()
        return client:Balance(nil):list({["profile_id"] = setup.idmap["profile01"], ["type"] = "STANDARD"}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local balance_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.balance")))
    local balance_ref01_data = nil
    if #balance_ref01_data_raw > 0 then
      balance_ref01_data = helpers.to_map(balance_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local balance_ref01_ent = client:Balance(nil)
    local balance_ref01_match = {
      ["profile_id"] = setup.idmap["profile01"],
    }
    if setup.live then
      balance_ref01_match["type"] = "STANDARD"
    end

    local balance_ref01_list_result, err = balance_ref01_ent:list(balance_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(balance_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local balance_ref01_match_dt0 = {
      id = balance_ref01_data["id"],
    }
    balance_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local balance_ref01_data_dt0_loaded, err = balance_ref01_ent:load(balance_ref01_match_dt0, nil)
    assert.is_nil(err)
    local balance_ref01_data_dt0_load_result = helpers.to_map(type(balance_ref01_data_dt0_loaded) == 'table' and balance_ref01_data_dt0_loaded.data_get and balance_ref01_data_dt0_loaded:data_get() or balance_ref01_data_dt0_loaded)
    assert.is_not_nil(balance_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(balance_ref01_data_dt0_load_result["id"], balance_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_BALANCE_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local balance_ref01_ent = client:Balance(nil)
    local balance_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.balance"), "balance_ref01"))
    balance_ref01_data["profile_id"] = setup.idmap["profile01"]

    local balance_ref01_data_result, err = balance_ref01_ent:create(balance_ref01_data, nil)
    assert.is_nil(err)
    balance_ref01_data = helpers.to_map(type(balance_ref01_data_result) == 'table' and balance_ref01_data_result.data_get and balance_ref01_data_result:data_get() or balance_ref01_data_result)
    assert.is_not_nil(balance_ref01_data)
    assert.is_not_nil(balance_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local balance_ref01_match = {
      ["profile_id"] = setup.idmap["profile01"],
    }
    if setup.live then
      balance_ref01_match["type"] = "STANDARD"
    end

    local balance_ref01_list_result, err = balance_ref01_ent:list(balance_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(balance_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(balance_ref01_list_result),
      { id = balance_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local balance_ref01_match_dt0 = {
      id = balance_ref01_data["id"],
    }
    balance_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local balance_ref01_data_dt0_loaded, err = balance_ref01_ent:load(balance_ref01_match_dt0, nil)
    assert.is_nil(err)
    local balance_ref01_data_dt0_load_result = helpers.to_map(type(balance_ref01_data_dt0_loaded) == 'table' and balance_ref01_data_dt0_loaded.data_get and balance_ref01_data_dt0_loaded:data_get() or balance_ref01_data_dt0_loaded)
    assert.is_not_nil(balance_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(balance_ref01_data_dt0_load_result["id"], balance_ref01_data["id"]))

    if setup.live then
      runner.live_pace()
    end
    -- REMOVE
    local balance_ref01_match_rm0 = {
      id = balance_ref01_data["id"],
    }
    balance_ref01_match_rm0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local _, err = balance_ref01_ent:remove(balance_ref01_match_rm0, nil)
    assert.is_nil(err)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local balance_ref01_match_rt0 = {
      ["profile_id"] = setup.idmap["profile01"],
    }
    if setup.live then
      balance_ref01_match_rt0["type"] = "STANDARD"
    end

    local balance_ref01_list_rt0_result, err = balance_ref01_ent:list(balance_ref01_match_rt0, nil)
    assert.is_nil(err)
    assert.is_table(balance_ref01_list_rt0_result)

    local not_found_item = vs.select(
      runner.entity_list_to_data(balance_ref01_list_rt0_result),
      { id = balance_ref01_data["id"] })
    assert.is_true(vs.isempty(not_found_item))

  end)
end)

function balance_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/balance/BalanceTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read balance test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "balance01", "balance02", "balance03", "profile01", "profile02", "profile03", "hold_limit_breach01", "hold_limit_breach02", "hold_limit_breach03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_BALANCE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_BALANCE_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_BALANCE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["WISE_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      -- FIRST, so the generated fields below win: sdk-test-control.json's
      -- test.client.options adds to the live client, it does not redirect it.
      runner.live_client_options(),
      {
        apikey = env["WISE_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["WISE_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["WISE_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
