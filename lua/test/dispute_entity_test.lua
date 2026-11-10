-- Dispute entity test

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


describe("DisputeEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Dispute(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:Dispute(nil):list({ ["profile_id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = dispute_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "dispute." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"dispute.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}\"}")
      print("LIVE STEP {\"id\":\"dispute.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /spend/profiles/{profileId}/disputes/{disputeId}/status\"}")
    if setup.live then
      for _live_key, _live_ex in pairs({["profile01"] = 16605997}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["dispute01"]
      end
      if _live_id == nil then
        _live_id = "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb"
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "dispute", function()
        return client:Dispute(nil):list({["profile_id"] = setup.idmap["profile01"]}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local dispute_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.dispute")))
    local dispute_ref01_data = nil
    if #dispute_ref01_data_raw > 0 then
      dispute_ref01_data = helpers.to_map(dispute_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local dispute_ref01_ent = client:Dispute(nil)
    local dispute_ref01_match = {
      ["profile_id"] = setup.idmap["profile01"],
    }

    local dispute_ref01_list_result, err = dispute_ref01_ent:list(dispute_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(dispute_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local dispute_ref01_match_dt0 = {
      id = dispute_ref01_data["id"],
    }
    dispute_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local dispute_ref01_data_dt0_loaded, err = dispute_ref01_ent:load(dispute_ref01_match_dt0, nil)
    assert.is_nil(err)
    local dispute_ref01_data_dt0_load_result = helpers.to_map(type(dispute_ref01_data_dt0_loaded) == 'table' and dispute_ref01_data_dt0_loaded.data_get and dispute_ref01_data_dt0_loaded:data_get() or dispute_ref01_data_dt0_loaded)
    assert.is_not_nil(dispute_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(dispute_ref01_data_dt0_load_result["id"], dispute_ref01_data["id"]))

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_DISPUTE_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local dispute_ref01_ent = client:Dispute(nil)
    local dispute_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.dispute"), "dispute_ref01"))
    dispute_ref01_data["profile_id"] = setup.idmap["profile01"]

    local dispute_ref01_data_result, err = dispute_ref01_ent:create(dispute_ref01_data, nil)
    assert.is_nil(err)
    dispute_ref01_data = helpers.to_map(type(dispute_ref01_data_result) == 'table' and dispute_ref01_data_result.data_get and dispute_ref01_data_result:data_get() or dispute_ref01_data_result)
    assert.is_not_nil(dispute_ref01_data)
    assert.is_not_nil(dispute_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local dispute_ref01_match = {
      ["profile_id"] = setup.idmap["profile01"],
    }

    local dispute_ref01_list_result, err = dispute_ref01_ent:list(dispute_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(dispute_ref01_list_result)

    local found_item = vs.select(
      runner.entity_list_to_data(dispute_ref01_list_result),
      { id = dispute_ref01_data["id"] })
    assert.is_false(vs.isempty(found_item))

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local dispute_ref01_data_up0_up = {
      id = dispute_ref01_data["id"],
      ["profile_id"] = setup.idmap["profile_id"],
    }

    local dispute_ref01_markdef_up0_name = "createdAt"
    local dispute_ref01_markdef_up0_value = "Mark01-dispute_ref01_" .. tostring(setup.now)
    dispute_ref01_data_up0_up[dispute_ref01_markdef_up0_name] = dispute_ref01_markdef_up0_value

    local dispute_ref01_resdata_up0_result, err = dispute_ref01_ent:update(dispute_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local dispute_ref01_resdata_up0 = helpers.to_map(type(dispute_ref01_resdata_up0_result) == 'table' and dispute_ref01_resdata_up0_result.data_get and dispute_ref01_resdata_up0_result:data_get() or dispute_ref01_resdata_up0_result)
    assert.is_not_nil(dispute_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(dispute_ref01_resdata_up0["id"], dispute_ref01_data_up0_up["id"]))
    assert.are.equal(dispute_ref01_resdata_up0[dispute_ref01_markdef_up0_name], dispute_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local dispute_ref01_match_dt0 = {
      id = dispute_ref01_data["id"],
    }
    dispute_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local dispute_ref01_data_dt0_loaded, err = dispute_ref01_ent:load(dispute_ref01_match_dt0, nil)
    assert.is_nil(err)
    local dispute_ref01_data_dt0_load_result = helpers.to_map(type(dispute_ref01_data_dt0_loaded) == 'table' and dispute_ref01_data_dt0_loaded.data_get and dispute_ref01_data_dt0_loaded:data_get() or dispute_ref01_data_dt0_loaded)
    assert.is_not_nil(dispute_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(dispute_ref01_data_dt0_load_result["id"], dispute_ref01_data["id"]))

  end)
end)

function dispute_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/dispute/DisputeTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read dispute test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "dispute01", "dispute02", "dispute03", "profile01", "profile02", "profile03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_DISPUTE_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_DISPUTE_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_DISPUTE_ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end
  if idmap_resolved["profile_id"] == nil then
    idmap_resolved["profile_id"] = idmap_resolved["profile01"]
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
