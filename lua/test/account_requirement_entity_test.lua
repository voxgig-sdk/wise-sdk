-- AccountRequirement entity test

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


describe("AccountRequirementEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:AccountRequirement(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:AccountRequirement(nil):list({ ["quote_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = account_requirement_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"create", "list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "account_requirement." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"account_requirement.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /quotes/{quoteId}/account-requirements\"}")
    if setup.live then
      for _, _live_key in ipairs({"quote01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local account_requirement_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.account_requirement")))
    local account_requirement_ref01_data = nil
    if #account_requirement_ref01_data_raw > 0 then
      account_requirement_ref01_data = helpers.to_map(account_requirement_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local account_requirement_ref01_ent = client:AccountRequirement(nil)
    local account_requirement_ref01_match = {
      ["quote_id"] = setup.idmap["quote01"],
    }

    local account_requirement_ref01_list_result, err = account_requirement_ref01_ent:list(account_requirement_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(account_requirement_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"quote01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
        end
      end
    end
    local client = setup.client

    if setup.live then
      runner.live_pace()
    end
    -- CREATE
    local account_requirement_ref01_ent = client:AccountRequirement(nil)
    local account_requirement_ref01_data = helpers.to_map(vs.getprop(
      vs.getpath(setup.data, "new.account_requirement"), "account_requirement_ref01"))
    account_requirement_ref01_data["quote_id"] = setup.idmap["quote01"]

    local account_requirement_ref01_data_result, err = account_requirement_ref01_ent:create(account_requirement_ref01_data, nil)
    assert.is_nil(err)
    account_requirement_ref01_data = helpers.to_map(type(account_requirement_ref01_data_result) == 'table' and account_requirement_ref01_data_result.data_get and account_requirement_ref01_data_result:data_get() or account_requirement_ref01_data_result)
    assert.is_not_nil(account_requirement_ref01_data)

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local account_requirement_ref01_match = {
      ["quote_id"] = setup.idmap["quote01"],
    }

    local account_requirement_ref01_list_result, err = account_requirement_ref01_ent:list(account_requirement_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(account_requirement_ref01_list_result)

  end)
end)

function account_requirement_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/account_requirement/AccountRequirementTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read account_requirement test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "account_requirement01", "account_requirement02", "account_requirement03", "quote01", "quote02", "quote03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_ACCOUNT_REQUIREMENT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_ACCOUNT_REQUIREMENT_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_ACCOUNT_REQUIREMENT_ENTID"])
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
