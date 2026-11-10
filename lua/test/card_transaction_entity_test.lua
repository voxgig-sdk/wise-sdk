-- CardTransaction entity test

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


describe("CardTransactionEntity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:CardTransaction(nil)
    assert.is_not_nil(ent)
  end)

  it("should refuse an invalid request", function()
    local config = require("config_shared")()
    if type(config.feature) ~= "table" or config.feature.validate == nil then
      pending("feature not present in this SDK: validate")
      return
    end
    local client = sdk.test(nil, { feature = { validate = { active = true } } })
    local _, err = client:CardTransaction(nil):list({ ["card_token"] = 1, ["profile_id"] = 1, ["from_creation_time"] = "x", ["to_creation_time"] = "x" }, nil)
    assert.are.equal("validate_failed", type(err) == "table" and err.code or nil)
  end)

  it("should run basic flow", function()
    local setup = card_transaction_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"list", "load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "card_transaction." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    if setup.live then
      for _live_key, _live_ex in pairs({["card_token01"] = "59123122-223d-45f9-b840-0ad4a4f80937", ["profile01"] = 123456}) do
        if setup.synthetic_only or setup.idmap[_live_key] == nil then
          setup.idmap[_live_key] = _live_ex
        end
      end
    end
    local client = setup.client
    if setup.live then
      local _live_id = nil
      if not setup.synthetic_only then
        _live_id = setup.idmap["card_transaction01"]
      end
      if _live_id == nil then
        _live_id = 342671
      end
      runner.live_pace()
      runner.live_existing(pending, setup, LIVE_STRICT, "card_transaction", function()
        return client:CardTransaction(nil):list({["card_token"] = setup.idmap["card_token01"], ["profile_id"] = setup.idmap["profile01"], ["from_creation_time"] = "2025-12-15T00:00:00Z", ["to_creation_time"] = "2026-01-15T00:00:10Z"}, nil)
      end, "id", _live_id)
    end

    -- Bootstrap entity data from existing test data.
    local card_transaction_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.card_transaction")))
    local card_transaction_ref01_data = nil
    if #card_transaction_ref01_data_raw > 0 then
      card_transaction_ref01_data = helpers.to_map(card_transaction_ref01_data_raw[1][2])
    end

    if setup.live then
      runner.live_pace()
    end
    -- LIST
    local card_transaction_ref01_ent = client:CardTransaction(nil)
    local card_transaction_ref01_match = {
      ["card_token"] = setup.idmap["card_token01"],
      ["profile_id"] = setup.idmap["profile01"],
    }
    if setup.live then
      card_transaction_ref01_match["from_creation_time"] = "2025-12-15T00:00:00Z"
      card_transaction_ref01_match["to_creation_time"] = "2026-01-15T00:00:10Z"
    end

    local card_transaction_ref01_list_result, err = card_transaction_ref01_ent:list(card_transaction_ref01_match, nil)
    assert.is_nil(err)
    assert.is_table(card_transaction_ref01_list_result)

    if setup.live then
      runner.live_pace()
    end
    -- LOAD
    local card_transaction_ref01_match_dt0 = {
      id = card_transaction_ref01_data["id"],
    }
    card_transaction_ref01_match_dt0["profile_id"] = setup.idmap["profile_id"] or setup.idmap["profile01"]
    local card_transaction_ref01_data_dt0_loaded, err = card_transaction_ref01_ent:load(card_transaction_ref01_match_dt0, nil)
    assert.is_nil(err)
    local card_transaction_ref01_data_dt0_load_result = helpers.to_map(type(card_transaction_ref01_data_dt0_loaded) == 'table' and card_transaction_ref01_data_dt0_loaded.data_get and card_transaction_ref01_data_dt0_loaded:data_get() or card_transaction_ref01_data_dt0_loaded)
    assert.is_not_nil(card_transaction_ref01_data_dt0_load_result)
    assert.is_true(runner.live_same_id(card_transaction_ref01_data_dt0_load_result["id"], card_transaction_ref01_data["id"]))

  end)
end)

function card_transaction_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/card_transaction/CardTransactionTestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read card_transaction test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "card_transaction01", "card_transaction02", "card_transaction03", "profile01", "profile02", "profile03", "card01", "card02", "card03", "card_token01" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Whether *_ENTID supplied the idmap, read before env_override consumes
  -- it: without it, the ids a live flow binds are the fixture's synthetic ones.
  local entid_env_raw = os.getenv("WISE_TEST_CARD_TRANSACTION_ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["WISE_TEST_CARD_TRANSACTION_ENTID"] = idmap,
    ["WISE_TEST_LIVE"] = "FALSE",
    ["WISE_TEST_EXPLAIN"] = "FALSE",
    ["WISE_APIKEY"] = "",
  })

  local idmap_resolved = helpers.to_map(
    env["WISE_TEST_CARD_TRANSACTION_ENTID"])
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
