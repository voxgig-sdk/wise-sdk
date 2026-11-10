-- Wise SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("wise_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local WiseSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

WiseSDK.__index = function(self, key)
  local member = rawget(WiseSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

WiseSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function WiseSDK:to_record()
  return { sdk = "Wise", mode = self.mode }
end

WiseSDK.__tostring = function(self)
  return "WiseSDK mode=" .. tostring(self.mode)
end

WiseSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

WiseSDK._make_feature = _make_feature


function WiseSDK.new(options)
  local self = setmetatable({}, WiseSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: secrets
  -- feature: test
  -- feature: timeout


  return self
end


function WiseSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function WiseSDK:get_utility()
  return Utility.copy(self._utility)
end


function WiseSDK:get_root_ctx()
  return self._rootctx
end


function WiseSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  -- A raw request has no point to declare its response type, so it asks
  -- for the JSON it reads: an API that negotiates on Accept otherwise
  -- answers in its own default format. A caller's own accept wins.
  local has_accept = false
  for k, _ in pairs(ctx.spec.headers) do
    if string.lower(tostring(k)) == "accept" then
      has_accept = true
      break
    end
  end
  if not has_accept then
    ctx.spec.headers["accept"] = "application/json"
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function WiseSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function WiseSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function WiseSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "WiseSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function WiseSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function WiseSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "WiseSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:AccountDetail():list() / client:AccountDetail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:AccountDetail(data)
  local EntityMod = require("entity.account_detail_entity")
  if data == nil then
    if self._account_detail == nil then
      self._account_detail = EntityMod.new(self, nil)
    end
    return self._account_detail
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AccountRequirement():list() / client:AccountRequirement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:AccountRequirement(data)
  local EntityMod = require("entity.account_requirement_entity")
  if data == nil then
    if self._account_requirement == nil then
      self._account_requirement = EntityMod.new(self, nil)
    end
    return self._account_requirement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Activity():list() / client:Activity():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Activity(data)
  local EntityMod = require("entity.activity_entity")
  if data == nil then
    if self._activity == nil then
      self._activity = EntityMod.new(self, nil)
    end
    return self._activity
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Address():list() / client:Address():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Address(data)
  local EntityMod = require("entity.address_entity")
  if data == nil then
    if self._address == nil then
      self._address = EntityMod.new(self, nil)
    end
    return self._address
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AddressRequirement():list() / client:AddressRequirement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:AddressRequirement(data)
  local EntityMod = require("entity.address_requirement_entity")
  if data == nil then
    if self._address_requirement == nil then
      self._address_requirement = EntityMod.new(self, nil)
    end
    return self._address_requirement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Balance():list() / client:Balance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Balance(data)
  local EntityMod = require("entity.balance_entity")
  if data == nil then
    if self._balance == nil then
      self._balance = EntityMod.new(self, nil)
    end
    return self._balance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BalanceStatement():list() / client:BalanceStatement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BalanceStatement(data)
  local EntityMod = require("entity.balance_statement_entity")
  if data == nil then
    if self._balance_statement == nil then
      self._balance_statement = EntityMod.new(self, nil)
    end
    return self._balance_statement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BankAccountDetail():list() / client:BankAccountDetail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BankAccountDetail(data)
  local EntityMod = require("entity.bank_account_detail_entity")
  if data == nil then
    if self._bank_account_detail == nil then
      self._bank_account_detail = EntityMod.new(self, nil)
    end
    return self._bank_account_detail
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BankAccountDetailsOrder():list() / client:BankAccountDetailsOrder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BankAccountDetailsOrder(data)
  local EntityMod = require("entity.bank_account_details_order_entity")
  if data == nil then
    if self._bank_account_details_order == nil then
      self._bank_account_details_order = EntityMod.new(self, nil)
    end
    return self._bank_account_details_order
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BatchGroup():list() / client:BatchGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BatchGroup(data)
  local EntityMod = require("entity.batch_group_entity")
  if data == nil then
    if self._batch_group == nil then
      self._batch_group = EntityMod.new(self, nil)
    end
    return self._batch_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BulkSettlement():list() / client:BulkSettlement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BulkSettlement(data)
  local EntityMod = require("entity.bulk_settlement_entity")
  if data == nil then
    if self._bulk_settlement == nil then
      self._bulk_settlement = EntityMod.new(self, nil)
    end
    return self._bulk_settlement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:BusinessProfile():list() / client:BusinessProfile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:BusinessProfile(data)
  local EntityMod = require("entity.business_profile_entity")
  if data == nil then
    if self._business_profile == nil then
      self._business_profile = EntityMod.new(self, nil)
    end
    return self._business_profile
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Card():list() / client:Card():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Card(data)
  local EntityMod = require("entity.card_entity")
  if data == nil then
    if self._card == nil then
      self._card = EntityMod.new(self, nil)
    end
    return self._card
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardHolderLimit():list() / client:CardHolderLimit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:CardHolderLimit(data)
  local EntityMod = require("entity.card_holder_limit_entity")
  if data == nil then
    if self._card_holder_limit == nil then
      self._card_holder_limit = EntityMod.new(self, nil)
    end
    return self._card_holder_limit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardLimit():list() / client:CardLimit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:CardLimit(data)
  local EntityMod = require("entity.card_limit_entity")
  if data == nil then
    if self._card_limit == nil then
      self._card_limit = EntityMod.new(self, nil)
    end
    return self._card_limit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardOrder():list() / client:CardOrder():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:CardOrder(data)
  local EntityMod = require("entity.card_order_entity")
  if data == nil then
    if self._card_order == nil then
      self._card_order = EntityMod.new(self, nil)
    end
    return self._card_order
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardSensitiveDetail():list() / client:CardSensitiveDetail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:CardSensitiveDetail(data)
  local EntityMod = require("entity.card_sensitive_detail_entity")
  if data == nil then
    if self._card_sensitive_detail == nil then
      self._card_sensitive_detail = EntityMod.new(self, nil)
    end
    return self._card_sensitive_detail
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CardTransaction():list() / client:CardTransaction():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:CardTransaction(data)
  local EntityMod = require("entity.card_transaction_entity")
  if data == nil then
    if self._card_transaction == nil then
      self._card_transaction = EntityMod.new(self, nil)
    end
    return self._card_transaction
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Case():list() / client:Case():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Case(data)
  local EntityMod = require("entity.case_entity")
  if data == nil then
    if self._case == nil then
      self._case = EntityMod.new(self, nil)
    end
    return self._case
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ClaimAccount():list() / client:ClaimAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ClaimAccount(data)
  local EntityMod = require("entity.claim_account_entity")
  if data == nil then
    if self._claim_account == nil then
      self._claim_account = EntityMod.new(self, nil)
    end
    return self._claim_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Comparison():list() / client:Comparison():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Comparison(data)
  local EntityMod = require("entity.comparison_entity")
  if data == nil then
    if self._comparison == nil then
      self._comparison = EntityMod.new(self, nil)
    end
    return self._comparison
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Contact():list() / client:Contact():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Contact(data)
  local EntityMod = require("entity.contact_entity")
  if data == nil then
    if self._contact == nil then
      self._contact = EntityMod.new(self, nil)
    end
    return self._contact
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Currency():list() / client:Currency():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Currency(data)
  local EntityMod = require("entity.currency_entity")
  if data == nil then
    if self._currency == nil then
      self._currency = EntityMod.new(self, nil)
    end
    return self._currency
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeliveryEstimate():list() / client:DeliveryEstimate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:DeliveryEstimate(data)
  local EntityMod = require("entity.delivery_estimate_entity")
  if data == nil then
    if self._delivery_estimate == nil then
      self._delivery_estimate = EntityMod.new(self, nil)
    end
    return self._delivery_estimate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DeliveryUpdate():list() / client:DeliveryUpdate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:DeliveryUpdate(data)
  local EntityMod = require("entity.delivery_update_entity")
  if data == nil then
    if self._delivery_update == nil then
      self._delivery_update = EntityMod.new(self, nil)
    end
    return self._delivery_update
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DigitalWallet():list() / client:DigitalWallet():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:DigitalWallet(data)
  local EntityMod = require("entity.digital_wallet_entity")
  if data == nil then
    if self._digital_wallet == nil then
      self._digital_wallet = EntityMod.new(self, nil)
    end
    return self._digital_wallet
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DirectDebitAccount():list() / client:DirectDebitAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:DirectDebitAccount(data)
  local EntityMod = require("entity.direct_debit_account_entity")
  if data == nil then
    if self._direct_debit_account == nil then
      self._direct_debit_account = EntityMod.new(self, nil)
    end
    return self._direct_debit_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Director():list() / client:Director():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Director(data)
  local EntityMod = require("entity.director_entity")
  if data == nil then
    if self._director == nil then
      self._director = EntityMod.new(self, nil)
    end
    return self._director
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Dispute():list() / client:Dispute():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Dispute(data)
  local EntityMod = require("entity.dispute_entity")
  if data == nil then
    if self._dispute == nil then
      self._dispute = EntityMod.new(self, nil)
    end
    return self._dispute
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DisputeReason():list() / client:DisputeReason():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:DisputeReason(data)
  local EntityMod = require("entity.dispute_reason_entity")
  if data == nil then
    if self._dispute_reason == nil then
      self._dispute_reason = EntityMod.new(self, nil)
    end
    return self._dispute_reason
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Facetec():list() / client:Facetec():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Facetec(data)
  local EntityMod = require("entity.facetec_entity")
  if data == nil then
    if self._facetec == nil then
      self._facetec = EntityMod.new(self, nil)
    end
    return self._facetec
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:File():list() / client:File():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:File(data)
  local EntityMod = require("entity.file_entity")
  if data == nil then
    if self._file == nil then
      self._file = EntityMod.new(self, nil)
    end
    return self._file
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Funding():list() / client:Funding():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Funding(data)
  local EntityMod = require("entity.funding_entity")
  if data == nil then
    if self._funding == nil then
      self._funding = EntityMod.new(self, nil)
    end
    return self._funding
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GpiTracking():list() / client:GpiTracking():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:GpiTracking(data)
  local EntityMod = require("entity.gpi_tracking_entity")
  if data == nil then
    if self._gpi_tracking == nil then
      self._gpi_tracking = EntityMod.new(self, nil)
    end
    return self._gpi_tracking
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:HoldLimitBreach():list() / client:HoldLimitBreach():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:HoldLimitBreach(data)
  local EntityMod = require("entity.hold_limit_breach_entity")
  if data == nil then
    if self._hold_limit_breach == nil then
      self._hold_limit_breach = EntityMod.new(self, nil)
    end
    return self._hold_limit_breach
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:IncomingTransfer():list() / client:IncomingTransfer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:IncomingTransfer(data)
  local EntityMod = require("entity.incoming_transfer_entity")
  if data == nil then
    if self._incoming_transfer == nil then
      self._incoming_transfer = EntityMod.new(self, nil)
    end
    return self._incoming_transfer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Jose():list() / client:Jose():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Jose(data)
  local EntityMod = require("entity.jose_entity")
  if data == nil then
    if self._jose == nil then
      self._jose = EntityMod.new(self, nil)
    end
    return self._jose
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:KycReview():list() / client:KycReview():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:KycReview(data)
  local EntityMod = require("entity.kyc_review_entity")
  if data == nil then
    if self._kyc_review == nil then
      self._kyc_review = EntityMod.new(self, nil)
    end
    return self._kyc_review
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LinkRequest():list() / client:LinkRequest():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:LinkRequest(data)
  local EntityMod = require("entity.link_request_entity")
  if data == nil then
    if self._link_request == nil then
      self._link_request = EntityMod.new(self, nil)
    end
    return self._link_request
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Message():list() / client:Message():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Message(data)
  local EntityMod = require("entity.message_entity")
  if data == nil then
    if self._message == nil then
      self._message = EntityMod.new(self, nil)
    end
    return self._message
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MultiCurrencyAccount():list() / client:MultiCurrencyAccount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:MultiCurrencyAccount(data)
  local EntityMod = require("entity.multi_currency_account_entity")
  if data == nil then
    if self._multi_currency_account == nil then
      self._multi_currency_account = EntityMod.new(self, nil)
    end
    return self._multi_currency_account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OneTimeToken():list() / client:OneTimeToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:OneTimeToken(data)
  local EntityMod = require("entity.one_time_token_entity")
  if data == nil then
    if self._one_time_token == nil then
      self._one_time_token = EntityMod.new(self, nil)
    end
    return self._one_time_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ott():list() / client:Ott():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Ott(data)
  local EntityMod = require("entity.ott_entity")
  if data == nil then
    if self._ott == nil then
      self._ott = EntityMod.new(self, nil)
    end
    return self._ott
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Payin():list() / client:Payin():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Payin(data)
  local EntityMod = require("entity.payin_entity")
  if data == nil then
    if self._payin == nil then
      self._payin = EntityMod.new(self, nil)
    end
    return self._payin
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PayinDepositDetail():list() / client:PayinDepositDetail():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:PayinDepositDetail(data)
  local EntityMod = require("entity.payin_deposit_detail_entity")
  if data == nil then
    if self._payin_deposit_detail == nil then
      self._payin_deposit_detail = EntityMod.new(self, nil)
    end
    return self._payin_deposit_detail
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Payment():list() / client:Payment():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Payment(data)
  local EntityMod = require("entity.payment_entity")
  if data == nil then
    if self._payment == nil then
      self._payment = EntityMod.new(self, nil)
    end
    return self._payment
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PaymentInitiation():list() / client:PaymentInitiation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:PaymentInitiation(data)
  local EntityMod = require("entity.payment_initiation_entity")
  if data == nil then
    if self._payment_initiation == nil then
      self._payment_initiation = EntityMod.new(self, nil)
    end
    return self._payment_initiation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PaymentInstrument():list() / client:PaymentInstrument():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:PaymentInstrument(data)
  local EntityMod = require("entity.payment_instrument_entity")
  if data == nil then
    if self._payment_instrument == nil then
      self._payment_instrument = EntityMod.new(self, nil)
    end
    return self._payment_instrument
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PaymentIntent():list() / client:PaymentIntent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:PaymentIntent(data)
  local EntityMod = require("entity.payment_intent_entity")
  if data == nil then
    if self._payment_intent == nil then
      self._payment_intent = EntityMod.new(self, nil)
    end
    return self._payment_intent
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PhoneNumber():list() / client:PhoneNumber():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:PhoneNumber(data)
  local EntityMod = require("entity.phone_number_entity")
  if data == nil then
    if self._phone_number == nil then
      self._phone_number = EntityMod.new(self, nil)
    end
    return self._phone_number
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Production():list() / client:Production():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Production(data)
  local EntityMod = require("entity.production_entity")
  if data == nil then
    if self._production == nil then
      self._production = EntityMod.new(self, nil)
    end
    return self._production
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Profile():list() / client:Profile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Profile(data)
  local EntityMod = require("entity.profile_entity")
  if data == nil then
    if self._profile == nil then
      self._profile = EntityMod.new(self, nil)
    end
    return self._profile
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Quote():list() / client:Quote():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Quote(data)
  local EntityMod = require("entity.quote_entity")
  if data == nil then
    if self._quote == nil then
      self._quote = EntityMod.new(self, nil)
    end
    return self._quote
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Rate():list() / client:Rate():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Rate(data)
  local EntityMod = require("entity.rate_entity")
  if data == nil then
    if self._rate == nil then
      self._rate = EntityMod.new(self, nil)
    end
    return self._rate
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Recipient():list() / client:Recipient():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Recipient(data)
  local EntityMod = require("entity.recipient_entity")
  if data == nil then
    if self._recipient == nil then
      self._recipient = EntityMod.new(self, nil)
    end
    return self._recipient
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Rule():list() / client:Rule():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Rule(data)
  local EntityMod = require("entity.rule_entity")
  if data == nil then
    if self._rule == nil then
      self._rule = EntityMod.new(self, nil)
    end
    return self._rule
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Saml():list() / client:Saml():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Saml(data)
  local EntityMod = require("entity.saml_entity")
  if data == nil then
    if self._saml == nil then
      self._saml = EntityMod.new(self, nil)
    end
    return self._saml
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaDeviceFingerprint():list() / client:ScaDeviceFingerprint():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ScaDeviceFingerprint(data)
  local EntityMod = require("entity.sca_device_fingerprint_entity")
  if data == nil then
    if self._sca_device_fingerprint == nil then
      self._sca_device_fingerprint = EntityMod.new(self, nil)
    end
    return self._sca_device_fingerprint
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaFacemap():list() / client:ScaFacemap():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ScaFacemap(data)
  local EntityMod = require("entity.sca_facemap_entity")
  if data == nil then
    if self._sca_facemap == nil then
      self._sca_facemap = EntityMod.new(self, nil)
    end
    return self._sca_facemap
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaOtp():list() / client:ScaOtp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ScaOtp(data)
  local EntityMod = require("entity.sca_otp_entity")
  if data == nil then
    if self._sca_otp == nil then
      self._sca_otp = EntityMod.new(self, nil)
    end
    return self._sca_otp
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ScaSession():list() / client:ScaSession():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ScaSession(data)
  local EntityMod = require("entity.sca_session_entity")
  if data == nil then
    if self._sca_session == nil then
      self._sca_session = EntityMod.new(self, nil)
    end
    return self._sca_session
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SettlementAllocation():list() / client:SettlementAllocation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:SettlementAllocation(data)
  local EntityMod = require("entity.settlement_allocation_entity")
  if data == nil then
    if self._settlement_allocation == nil then
      self._settlement_allocation = EntityMod.new(self, nil)
    end
    return self._settlement_allocation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Simulation():list() / client:Simulation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Simulation(data)
  local EntityMod = require("entity.simulation_entity")
  if data == nil then
    if self._simulation == nil then
      self._simulation = EntityMod.new(self, nil)
    end
    return self._simulation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpendControl():list() / client:SpendControl():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:SpendControl(data)
  local EntityMod = require("entity.spend_control_entity")
  if data == nil then
    if self._spend_control == nil then
      self._spend_control = EntityMod.new(self, nil)
    end
    return self._spend_control
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpendLimit():list() / client:SpendLimit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:SpendLimit(data)
  local EntityMod = require("entity.spend_limit_entity")
  if data == nil then
    if self._spend_limit == nil then
      self._spend_limit = EntityMod.new(self, nil)
    end
    return self._spend_limit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Subscription():list() / client:Subscription():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Subscription(data)
  local EntityMod = require("entity.subscription_entity")
  if data == nil then
    if self._subscription == nil then
      self._subscription = EntityMod.new(self, nil)
    end
    return self._subscription
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TestNotification():list() / client:TestNotification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:TestNotification(data)
  local EntityMod = require("entity.test_notification_entity")
  if data == nil then
    if self._test_notification == nil then
      self._test_notification = EntityMod.new(self, nil)
    end
    return self._test_notification
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ThirdPartyTransfer():list() / client:ThirdPartyTransfer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ThirdPartyTransfer(data)
  local EntityMod = require("entity.third_party_transfer_entity")
  if data == nil then
    if self._third_party_transfer == nil then
      self._third_party_transfer = EntityMod.new(self, nil)
    end
    return self._third_party_transfer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ThreeDSecure():list() / client:ThreeDSecure():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:ThreeDSecure(data)
  local EntityMod = require("entity.three_d_secure_entity")
  if data == nil then
    if self._three_d_secure == nil then
      self._three_d_secure = EntityMod.new(self, nil)
    end
    return self._three_d_secure
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Token():list() / client:Token():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Token(data)
  local EntityMod = require("entity.token_entity")
  if data == nil then
    if self._token == nil then
      self._token = EntityMod.new(self, nil)
    end
    return self._token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Transfer():list() / client:Transfer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Transfer(data)
  local EntityMod = require("entity.transfer_entity")
  if data == nil then
    if self._transfer == nil then
      self._transfer = EntityMod.new(self, nil)
    end
    return self._transfer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TransferRequirement():list() / client:TransferRequirement():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:TransferRequirement(data)
  local EntityMod = require("entity.transfer_requirement_entity")
  if data == nil then
    if self._transfer_requirement == nil then
      self._transfer_requirement = EntityMod.new(self, nil)
    end
    return self._transfer_requirement
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Ubo():list() / client:Ubo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Ubo(data)
  local EntityMod = require("entity.ubo_entity")
  if data == nil then
    if self._ubo == nil then
      self._ubo = EntityMod.new(self, nil)
    end
    return self._ubo
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:User():list() / client:User():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:User(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Verification():list() / client:Verification():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function WiseSDK:Verification(data)
  local EntityMod = require("entity.verification_entity")
  if data == nil then
    if self._verification == nil then
      self._verification = EntityMod.new(self, nil)
    end
    return self._verification
  end
  return EntityMod.new(self, data)
end




function WiseSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = WiseSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return WiseSDK
