-- User entity test

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


describe("UserEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:User(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:User(nil):load({ ["id"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = user_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "update", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "user." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"user.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /user/signup/registration_code\"}")
      print("LIVE STEP {\"id\":\"user.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /users/{userId}/contact-email\"}")
      print("LIVE STEP {\"id\":\"user.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only user.create.0 gives\"}")
      pending("Live coverage incomplete: user.create.0 excluded (GET-only live run: needs POST /user/signup/registration_code); user.update.1 excluded (GET-only live run: needs PUT /users/{userId}/contact-email); user.load.2 excluded (GET-only live run: reads a record only user.create.0 gives)")
      return
    end

    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local user_ref01_ent = client:User(nil)
    local user_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.user"), "user_ref01"))

    local user_ref01_data_result, err = user_ref01_ent:create(user_ref01_data, nil)
    assert.is_nil(err)
    user_ref01_data = helpers.to_map(type(user_ref01_data_result) == 'table' and user_ref01_data_result.data_get and user_ref01_data_result:data_get() or user_ref01_data_result)
    assert.is_not_nil(user_ref01_data)
    assert.is_not_nil(user_ref01_data["id"])

    if setup.live then
      runner.live_pace()
    end
    -- UPDATE
    local user_ref01_data_up0_up = {
      id = user_ref01_data["id"],
    }

    local user_ref01_markdef_up0_name = "email"
    local user_ref01_markdef_up0_value = "Mark01-user_ref01_" .. tostring(setup.now)
    user_ref01_data_up0_up[user_ref01_markdef_up0_name] = user_ref01_markdef_up0_value

    local user_ref01_resdata_up0_result, err = user_ref01_ent:update(user_ref01_data_up0_up, nil)
    assert.is_nil(err)
    local user_ref01_resdata_up0 = helpers.to_map(type(user_ref01_resdata_up0_result) == 'table' and user_ref01_resdata_up0_result.data_get and user_ref01_resdata_up0_result:data_get() or user_ref01_resdata_up0_result)
    assert.is_not_nil(user_ref01_resdata_up0)
    assert.is_true(runner.live_same_id(user_ref01_resdata_up0["id"], user_ref01_data_up0_up["id"]))
    assert.are.equal(user_ref01_resdata_up0[user_ref01_markdef_up0_name], user_ref01_markdef_up0_value)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local user_ref01_match_dt0 = {
      id = user_ref01_data["id"],
    }
    local user_ref01_data_dt0_loaded, err = user_ref01_ent:load(user_ref01_match_dt0, nil)
    assert.is_nil(err)
    local user_ref01_data_dt0_load_result = helpers.to_map(type(user_ref01_data_dt0_loaded) == 'table' and user_ref01_data_dt0_loaded.data_get and user_ref01_data_dt0_loaded:data_get() or user_ref01_data_dt0_loaded)
    assert.is_not_nil(user_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(user_ref01_data_dt0_load_result["id"], user_ref01_data["id"]))

  end)
end)

function user_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/user/UserTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read user test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "user01", "user02", "user03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_USER_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_USER_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_USER_ENTID"])
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
