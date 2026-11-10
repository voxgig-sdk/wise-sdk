-- Simulation entity test

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


describe("SimulationEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Simulation(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Simulation(nil):list({ ["card_token"] = 1, ["profile_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = simulation_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "simulation." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"simulation.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /simulation/spend/profiles/{profileId}/cards/{cardToken}/transactions/authorisation\"}")
    if setup.live then
      for _, _live_key in ipairs({"kyc_review01", "profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_SIMULATION_ENTID")
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["simulation01"]
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "simulation", function()
        return client:Simulation(nil):list({["kyc_review_id"] = setup.idmap["kyc_review01"], ["profile_id"] = setup.idmap["profile01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local simulation_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.simulation")))
    local simulation_ref01_data = nil
    if #simulation_ref01_data_raw > 0 then
      simulation_ref01_data = helpers.to_map(simulation_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local simulation_ref01_ent = client:Simulation(nil)
    local simulation_ref01_match = {
      ["kyc_review_id"] = setup.idmap["kyc_review01"],
      ["profile_id"] = setup.idmap["profile01"],
    }

    local simulation_ref01_list_result, err = simulation_ref01_ent:list(simulation_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(simulation_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local simulation_ref01_match_dt0 = {
      id = simulation_ref01_data["id"],
    }
    simulation_ref01_match_dt0["transfer_id"] = setup.idmap["transfer_id"] or setup.idmap["transfer01"]
    local simulation_ref01_data_dt0_loaded, err = simulation_ref01_ent:load(simulation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local simulation_ref01_data_dt0_load_result = helpers.to_map(type(simulation_ref01_data_dt0_loaded) == 'table' and simulation_ref01_data_dt0_loaded.data_get and simulation_ref01_data_dt0_loaded:data_get() or simulation_ref01_data_dt0_loaded)
    assert.is_not_nil(simulation_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(simulation_ref01_data_dt0_load_result["id"], simulation_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"card_token01", "kyc_review01", "profile01", "transfer01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_SIMULATION_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local simulation_ref01_ent = client:Simulation(nil)
    local simulation_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.simulation"), "simulation_ref01"))
    simulation_ref01_data["card_token"] = setup.idmap["card_token01"]
    simulation_ref01_data["kyc_review_id"] = setup.idmap["kyc_review01"]
    simulation_ref01_data["profile_id"] = setup.idmap["profile01"]
    simulation_ref01_data["transfer_id"] = setup.idmap["transfer01"]

    local simulation_ref01_data_result, err = simulation_ref01_ent:create(simulation_ref01_data, nil)
    assert.is_nil(err)
    simulation_ref01_data = helpers.to_map(type(simulation_ref01_data_result) == 'table' and simulation_ref01_data_result.data_get and simulation_ref01_data_result:data_get() or simulation_ref01_data_result)
    assert.is_not_nil(simulation_ref01_data)
    assert.is_not_nil(simulation_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local simulation_ref01_match = {
      ["kyc_review_id"] = setup.idmap["kyc_review01"],
      ["profile_id"] = setup.idmap["profile01"],
    }

    local simulation_ref01_list_result, err = simulation_ref01_ent:list(simulation_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(simulation_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(simulation_ref01_list_result),
      { id = simulation_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local simulation_ref01_match_dt0 = {
      id = simulation_ref01_data["id"],
    }
    simulation_ref01_match_dt0["transfer_id"] = setup.idmap["transfer_id"] or setup.idmap["transfer01"]
    local simulation_ref01_data_dt0_loaded, err = simulation_ref01_ent:load(simulation_ref01_match_dt0, nil)
    assert.is_nil(err)
    local simulation_ref01_data_dt0_load_result = helpers.to_map(type(simulation_ref01_data_dt0_loaded) == 'table' and simulation_ref01_data_dt0_loaded.data_get and simulation_ref01_data_dt0_loaded:data_get() or simulation_ref01_data_dt0_loaded)
    assert.is_not_nil(simulation_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(simulation_ref01_data_dt0_load_result["id"], simulation_ref01_data["id"]))

  end)
end)

function simulation_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/simulation/SimulationTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read simulation test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "simulation01", "simulation02", "simulation03", "profile01", "profile02", "profile03", "transfer01", "transfer02", "transfer03", "kyc_review01", "kyc_review02", "kyc_review03", "card01", "card02", "card03", "card_token01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_SIMULATION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_SIMULATION_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_SIMULATION_ENTID"])
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
