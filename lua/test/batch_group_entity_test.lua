-- BatchGroup entity test

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


describe("BatchGroupEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:BatchGroup(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:BatchGroup(nil):load({ ["id"] = 1, ["profile_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = batch_group_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "batch_group." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"batch_group.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments\"}")
      print("LIVE STEP {\"id\":\"batch_group.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}\"}")
      print("LIVE STEP {\"id\":\"batch_group.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only batch_group.create.0 gives\"}")
      pending("Live coverage incomplete: batch_group.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments); batch_group.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}); batch_group.load.2 excluded (GET-only live run: reads a record only batch_group.create.0 gives)")
      return
    end

    if setup.live then
      for _, _live_key in ipairs({"profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_BATCH_GROUP_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local batch_group_ref01_ent = client:BatchGroup(nil)
    local batch_group_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.batch_group"), "batch_group_ref01"))
    batch_group_ref01_data["profile_id"] = setup.idmap["profile01"]

    local batch_group_ref01_data_result, err = batch_group_ref01_ent:create(batch_group_ref01_data, nil)
    assert.is_nil(err)
    batch_group_ref01_data = helpers.to_map(type(batch_group_ref01_data_result) == 'table' and batch_group_ref01_data_result.data_get and batch_group_ref01_data_result:data_get() or batch_group_ref01_data_result)
    assert.is_not_nil(batch_group_ref01_data)
    assert.is_not_nil(batch_group_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local batch_group_ref01_data_up0_up = {
      id = batch_group_ref01_data["id"],
      ["profile_id"] = setup.idmap["profile_id"],
    }

    local batch_group_ref01_markdef_up0_name = "fileName"
    local batch_group_ref01_markdef_up0_value = "Mark01-batch_group_ref01_" .. tostring(setup.now)
    batch_group_ref01_data_up0_up[batch_group_ref01_markdef_up0_name] = batch_group_ref01_markdef_up0_value

    local batch_group_ref01_resdata_up0_result, err = batch_group_ref01_ent:update(batch_group_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local batch_group_ref01_resdata_up0 = helpers.to_map(type(batch_group_ref01_resdata_up0_result) == 'table' and batch_group_ref01_resdata_up0_result.data_get and batch_group_ref01_resdata_up0_result:data_get() or batch_group_ref01_resdata_up0_result)
    assert.is_not_nil(batch_group_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(batch_group_ref01_resdata_up0["id"], batch_group_ref01_data_up0_up["id"]))
    assert.are.equal(batch_group_ref01_resdata_up0[batch_group_ref01_markdef_up0_name], batch_group_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local batch_group_ref01_match_dt0 = {
      id = batch_group_ref01_data["id"],
    }
    batch_group_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local batch_group_ref01_data_dt0_loaded, err = batch_group_ref01_ent:load(batch_group_ref01_match_dt0, nil)
    assert.is_nil(err)
    local batch_group_ref01_data_dt0_load_result = helpers.to_map(type(batch_group_ref01_data_dt0_loaded) == 'table' and batch_group_ref01_data_dt0_loaded.data_get and batch_group_ref01_data_dt0_loaded:data_get() or batch_group_ref01_data_dt0_loaded)
    assert.is_not_nil(batch_group_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(batch_group_ref01_data_dt0_load_result["id"], batch_group_ref01_data["id"]))

  end)
end)

function batch_group_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/batch_group/BatchGroupTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read batch_group test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "batch_group01", "batch_group02", "batch_group03", "profile01", "profile02", "profile03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_BATCH_GROUP_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_BATCH_GROUP_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_BATCH_GROUP_ENTID"])
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
