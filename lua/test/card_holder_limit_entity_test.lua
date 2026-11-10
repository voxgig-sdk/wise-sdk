-- CardHolderLimit entity test

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


describe("CardHolderLimitEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CardHolderLimit(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CardHolderLimit(nil):list({ ["card_holder_profile_id"] = "x", ["profile_id"] = 1 }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = card_holder_limit_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "card_holder_limit." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live and os.getenv("VOXGIG_GETONLY_GUARD") == "TRUE" then
      print("LIVE STEP {\"id\":\"card_holder_limit.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits\"}")
    if setup.live then
      for _, _live_key in ipairs({"card_holder_profile01", "profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_CARD_HOLDER_LIMIT_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local card_holder_limit_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.card_holder_limit")))
    local card_holder_limit_ref01_data = nil
    if #card_holder_limit_ref01_data_raw > 0 then
      card_holder_limit_ref01_data = helpers.to_map(card_holder_limit_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local card_holder_limit_ref01_ent = client:CardHolderLimit(nil)
    local card_holder_limit_ref01_match = {
      ["card_holder_profile_id"] = setup.idmap["card_holder_profile01"],
      ["profile_id"] = setup.idmap["profile01"],
    }

    local card_holder_limit_ref01_list_result, err = card_holder_limit_ref01_ent:list(card_holder_limit_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(card_holder_limit_ref01_list_result)

      return
    end

    if setup.live then
      for _, _live_key in ipairs({"card_holder_profile01", "profile01"}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          runner.live_miss(pending, LIVE_STRICT, "Live entity test blocked: needs " .. _live_key .. " via WISE_TEST_CARD_HOLDER_LIMIT_ENTID")
        end
      end
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local card_holder_limit_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.card_holder_limit")))
    local card_holder_limit_ref01_data = nil
    if #card_holder_limit_ref01_data_raw > 0 then
      card_holder_limit_ref01_data = helpers.to_map(card_holder_limit_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local card_holder_limit_ref01_ent = client:CardHolderLimit(nil)
    local card_holder_limit_ref01_match = {
      ["card_holder_profile_id"] = setup.idmap["card_holder_profile01"],
      ["profile_id"] = setup.idmap["profile01"],
    }

    local card_holder_limit_ref01_list_result, err = card_holder_limit_ref01_ent:list(card_holder_limit_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(card_holder_limit_ref01_list_result)

  end)
end)

function card_holder_limit_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/card_holder_limit/CardHolderLimitTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read card_holder_limit test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "card_holder_limit01", "card_holder_limit02", "card_holder_limit03", "profile01", "profile02", "profile03", "card_holder_profile01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_CARD_HOLDER_LIMIT_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_CARD_HOLDER_LIMIT_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_CARD_HOLDER_LIMIT_ENTID"])
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
