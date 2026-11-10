# Wise SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'Wise_types'


class WiseSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = WiseUtility.new
    @_utility = utility

    config = WiseConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = WiseHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = WiseHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, WiseFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    WiseUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  # The options and the root context both hold the credential, so the
  # client's printed form is its name alone; `options_map` is the
  # documented way to read them back.
  def to_s
    "Wise " + VoxgigStruct.jsonify({ "name" => "Wise" })
  end

  def inspect
    to_s
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = WiseHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String) && "" != method_val
    method_val = method_val.upcase
    allow_method = VoxgigStruct.getpath(opts, "allow.method")
    unless WiseUtilities.allowed(allow_method, method_val)
      raise ctx.make_error("spec_method_allow",
        "Method \"#{method_val}\" not allowed by SDK option allow.method value: \"#{allow_method}\"")
    end
    params = WiseHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = WiseHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = WiseSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    # A raw request has no point to declare its response type, so it asks
    # for the JSON it reads: an API that negotiates on Accept otherwise
    # answers in its own default format. A caller's own accept wins.
    unless ctx.spec.headers.keys.any? { |k| k.to_s.downcase == "accept" }
      ctx.spec.headers["accept"] = "application/json"
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    WiseUtilities.allowed(VoxgigStruct.getpath(@options, "allow.op"), op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => WiseError.new(
        "WiseSDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\"",
        code: "#{op}_allow"),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue WiseError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = WiseHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => utility.clean.call(ctx, fetch_err) } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = WiseHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      body_err = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
        if true == VoxgigStruct.getprop(fetched, "unreadable")
          failed = status >= 200 && status < 300 ? nil : ctx.make_error("request_status",
            "request: #{status}: #{VoxgigStruct.getprop(fetched, 'statusText')}")
          body_err = WiseUtilities::UnreadableBody.call(ctx, status, headers,
            VoxgigStruct.getprop(fetched, "body"), fetchdef["headers"], failed)
        end
      end

      out = {
        "ok" => body_err.nil? && status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
      out["err"] = utility.clean.call(ctx, body_err) unless body_err.nil?
      return out
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = WiseError.new(
        "WiseSDK: graphql: #{msg}", code: "graphql_error")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.AccountDetail.list / client.AccountDetail.load({ "id" => ... })
  def AccountDetail(data = nil)
    require_relative 'entity/account_detail_entity'
    AccountDetailEntity.new(self, data)
  end


  # Canonical facade: client.AccountRequirement.list / client.AccountRequirement.load({ "id" => ... })
  def AccountRequirement(data = nil)
    require_relative 'entity/account_requirement_entity'
    AccountRequirementEntity.new(self, data)
  end


  # Canonical facade: client.Activity.list / client.Activity.load({ "id" => ... })
  def Activity(data = nil)
    require_relative 'entity/activity_entity'
    ActivityEntity.new(self, data)
  end


  # Canonical facade: client.Address.list / client.Address.load({ "id" => ... })
  def Address(data = nil)
    require_relative 'entity/address_entity'
    AddressEntity.new(self, data)
  end


  # Canonical facade: client.AddressRequirement.list / client.AddressRequirement.load({ "id" => ... })
  def AddressRequirement(data = nil)
    require_relative 'entity/address_requirement_entity'
    AddressRequirementEntity.new(self, data)
  end


  # Canonical facade: client.Balance.list / client.Balance.load({ "id" => ... })
  def Balance(data = nil)
    require_relative 'entity/balance_entity'
    BalanceEntity.new(self, data)
  end


  # Canonical facade: client.BalanceStatement.list / client.BalanceStatement.load({ "id" => ... })
  def BalanceStatement(data = nil)
    require_relative 'entity/balance_statement_entity'
    BalanceStatementEntity.new(self, data)
  end


  # Canonical facade: client.BankAccountDetail.list / client.BankAccountDetail.load({ "id" => ... })
  def BankAccountDetail(data = nil)
    require_relative 'entity/bank_account_detail_entity'
    BankAccountDetailEntity.new(self, data)
  end


  # Canonical facade: client.BankAccountDetailsOrder.list / client.BankAccountDetailsOrder.load({ "id" => ... })
  def BankAccountDetailsOrder(data = nil)
    require_relative 'entity/bank_account_details_order_entity'
    BankAccountDetailsOrderEntity.new(self, data)
  end


  # Canonical facade: client.BatchGroup.list / client.BatchGroup.load({ "id" => ... })
  def BatchGroup(data = nil)
    require_relative 'entity/batch_group_entity'
    BatchGroupEntity.new(self, data)
  end


  # Canonical facade: client.BulkSettlement.list / client.BulkSettlement.load({ "id" => ... })
  def BulkSettlement(data = nil)
    require_relative 'entity/bulk_settlement_entity'
    BulkSettlementEntity.new(self, data)
  end


  # Canonical facade: client.BusinessProfile.list / client.BusinessProfile.load({ "id" => ... })
  def BusinessProfile(data = nil)
    require_relative 'entity/business_profile_entity'
    BusinessProfileEntity.new(self, data)
  end


  # Canonical facade: client.Card.list / client.Card.load({ "id" => ... })
  def Card(data = nil)
    require_relative 'entity/card_entity'
    CardEntity.new(self, data)
  end


  # Canonical facade: client.CardHolderLimit.list / client.CardHolderLimit.load({ "id" => ... })
  def CardHolderLimit(data = nil)
    require_relative 'entity/card_holder_limit_entity'
    CardHolderLimitEntity.new(self, data)
  end


  # Canonical facade: client.CardLimit.list / client.CardLimit.load({ "id" => ... })
  def CardLimit(data = nil)
    require_relative 'entity/card_limit_entity'
    CardLimitEntity.new(self, data)
  end


  # Canonical facade: client.CardOrder.list / client.CardOrder.load({ "id" => ... })
  def CardOrder(data = nil)
    require_relative 'entity/card_order_entity'
    CardOrderEntity.new(self, data)
  end


  # Canonical facade: client.CardSensitiveDetail.list / client.CardSensitiveDetail.load({ "id" => ... })
  def CardSensitiveDetail(data = nil)
    require_relative 'entity/card_sensitive_detail_entity'
    CardSensitiveDetailEntity.new(self, data)
  end


  # Canonical facade: client.CardTransaction.list / client.CardTransaction.load({ "id" => ... })
  def CardTransaction(data = nil)
    require_relative 'entity/card_transaction_entity'
    CardTransactionEntity.new(self, data)
  end


  # Canonical facade: client.Case.list / client.Case.load({ "id" => ... })
  def Case(data = nil)
    require_relative 'entity/case_entity'
    CaseEntity.new(self, data)
  end


  # Canonical facade: client.ClaimAccount.list / client.ClaimAccount.load({ "id" => ... })
  def ClaimAccount(data = nil)
    require_relative 'entity/claim_account_entity'
    ClaimAccountEntity.new(self, data)
  end


  # Canonical facade: client.Comparison.list / client.Comparison.load({ "id" => ... })
  def Comparison(data = nil)
    require_relative 'entity/comparison_entity'
    ComparisonEntity.new(self, data)
  end


  # Canonical facade: client.Contact.list / client.Contact.load({ "id" => ... })
  def Contact(data = nil)
    require_relative 'entity/contact_entity'
    ContactEntity.new(self, data)
  end


  # Canonical facade: client.Currency.list / client.Currency.load({ "id" => ... })
  def Currency(data = nil)
    require_relative 'entity/currency_entity'
    CurrencyEntity.new(self, data)
  end


  # Canonical facade: client.DeliveryEstimate.list / client.DeliveryEstimate.load({ "id" => ... })
  def DeliveryEstimate(data = nil)
    require_relative 'entity/delivery_estimate_entity'
    DeliveryEstimateEntity.new(self, data)
  end


  # Canonical facade: client.DeliveryUpdate.list / client.DeliveryUpdate.load({ "id" => ... })
  def DeliveryUpdate(data = nil)
    require_relative 'entity/delivery_update_entity'
    DeliveryUpdateEntity.new(self, data)
  end


  # Canonical facade: client.DigitalWallet.list / client.DigitalWallet.load({ "id" => ... })
  def DigitalWallet(data = nil)
    require_relative 'entity/digital_wallet_entity'
    DigitalWalletEntity.new(self, data)
  end


  # Canonical facade: client.DirectDebitAccount.list / client.DirectDebitAccount.load({ "id" => ... })
  def DirectDebitAccount(data = nil)
    require_relative 'entity/direct_debit_account_entity'
    DirectDebitAccountEntity.new(self, data)
  end


  # Canonical facade: client.Director.list / client.Director.load({ "id" => ... })
  def Director(data = nil)
    require_relative 'entity/director_entity'
    DirectorEntity.new(self, data)
  end


  # Canonical facade: client.Dispute.list / client.Dispute.load({ "id" => ... })
  def Dispute(data = nil)
    require_relative 'entity/dispute_entity'
    DisputeEntity.new(self, data)
  end


  # Canonical facade: client.DisputeReason.list / client.DisputeReason.load({ "id" => ... })
  def DisputeReason(data = nil)
    require_relative 'entity/dispute_reason_entity'
    DisputeReasonEntity.new(self, data)
  end


  # Canonical facade: client.Facetec.list / client.Facetec.load({ "id" => ... })
  def Facetec(data = nil)
    require_relative 'entity/facetec_entity'
    FacetecEntity.new(self, data)
  end


  # Canonical facade: client.File.list / client.File.load({ "id" => ... })
  def File(data = nil)
    require_relative 'entity/file_entity'
    FileEntity.new(self, data)
  end


  # Canonical facade: client.Funding.list / client.Funding.load({ "id" => ... })
  def Funding(data = nil)
    require_relative 'entity/funding_entity'
    FundingEntity.new(self, data)
  end


  # Canonical facade: client.GpiTracking.list / client.GpiTracking.load({ "id" => ... })
  def GpiTracking(data = nil)
    require_relative 'entity/gpi_tracking_entity'
    GpiTrackingEntity.new(self, data)
  end


  # Canonical facade: client.HoldLimitBreach.list / client.HoldLimitBreach.load({ "id" => ... })
  def HoldLimitBreach(data = nil)
    require_relative 'entity/hold_limit_breach_entity'
    HoldLimitBreachEntity.new(self, data)
  end


  # Canonical facade: client.IncomingTransfer.list / client.IncomingTransfer.load({ "id" => ... })
  def IncomingTransfer(data = nil)
    require_relative 'entity/incoming_transfer_entity'
    IncomingTransferEntity.new(self, data)
  end


  # Canonical facade: client.Jose.list / client.Jose.load({ "id" => ... })
  def Jose(data = nil)
    require_relative 'entity/jose_entity'
    JoseEntity.new(self, data)
  end


  # Canonical facade: client.KycReview.list / client.KycReview.load({ "id" => ... })
  def KycReview(data = nil)
    require_relative 'entity/kyc_review_entity'
    KycReviewEntity.new(self, data)
  end


  # Canonical facade: client.LinkRequest.list / client.LinkRequest.load({ "id" => ... })
  def LinkRequest(data = nil)
    require_relative 'entity/link_request_entity'
    LinkRequestEntity.new(self, data)
  end


  # Canonical facade: client.Message.list / client.Message.load({ "id" => ... })
  def Message(data = nil)
    require_relative 'entity/message_entity'
    MessageEntity.new(self, data)
  end


  # Canonical facade: client.MultiCurrencyAccount.list / client.MultiCurrencyAccount.load({ "id" => ... })
  def MultiCurrencyAccount(data = nil)
    require_relative 'entity/multi_currency_account_entity'
    MultiCurrencyAccountEntity.new(self, data)
  end


  # Canonical facade: client.OneTimeToken.list / client.OneTimeToken.load({ "id" => ... })
  def OneTimeToken(data = nil)
    require_relative 'entity/one_time_token_entity'
    OneTimeTokenEntity.new(self, data)
  end


  # Canonical facade: client.Ott.list / client.Ott.load({ "id" => ... })
  def Ott(data = nil)
    require_relative 'entity/ott_entity'
    OttEntity.new(self, data)
  end


  # Canonical facade: client.Payin.list / client.Payin.load({ "id" => ... })
  def Payin(data = nil)
    require_relative 'entity/payin_entity'
    PayinEntity.new(self, data)
  end


  # Canonical facade: client.PayinDepositDetail.list / client.PayinDepositDetail.load({ "id" => ... })
  def PayinDepositDetail(data = nil)
    require_relative 'entity/payin_deposit_detail_entity'
    PayinDepositDetailEntity.new(self, data)
  end


  # Canonical facade: client.Payment.list / client.Payment.load({ "id" => ... })
  def Payment(data = nil)
    require_relative 'entity/payment_entity'
    PaymentEntity.new(self, data)
  end


  # Canonical facade: client.PaymentInitiation.list / client.PaymentInitiation.load({ "id" => ... })
  def PaymentInitiation(data = nil)
    require_relative 'entity/payment_initiation_entity'
    PaymentInitiationEntity.new(self, data)
  end


  # Canonical facade: client.PaymentInstrument.list / client.PaymentInstrument.load({ "id" => ... })
  def PaymentInstrument(data = nil)
    require_relative 'entity/payment_instrument_entity'
    PaymentInstrumentEntity.new(self, data)
  end


  # Canonical facade: client.PaymentIntent.list / client.PaymentIntent.load({ "id" => ... })
  def PaymentIntent(data = nil)
    require_relative 'entity/payment_intent_entity'
    PaymentIntentEntity.new(self, data)
  end


  # Canonical facade: client.PhoneNumber.list / client.PhoneNumber.load({ "id" => ... })
  def PhoneNumber(data = nil)
    require_relative 'entity/phone_number_entity'
    PhoneNumberEntity.new(self, data)
  end


  # Canonical facade: client.Production.list / client.Production.load({ "id" => ... })
  def Production(data = nil)
    require_relative 'entity/production_entity'
    ProductionEntity.new(self, data)
  end


  # Canonical facade: client.Profile.list / client.Profile.load({ "id" => ... })
  def Profile(data = nil)
    require_relative 'entity/profile_entity'
    ProfileEntity.new(self, data)
  end


  # Canonical facade: client.Quote.list / client.Quote.load({ "id" => ... })
  def Quote(data = nil)
    require_relative 'entity/quote_entity'
    QuoteEntity.new(self, data)
  end


  # Canonical facade: client.Rate.list / client.Rate.load({ "id" => ... })
  def Rate(data = nil)
    require_relative 'entity/rate_entity'
    RateEntity.new(self, data)
  end


  # Canonical facade: client.Recipient.list / client.Recipient.load({ "id" => ... })
  def Recipient(data = nil)
    require_relative 'entity/recipient_entity'
    RecipientEntity.new(self, data)
  end


  # Canonical facade: client.Rule.list / client.Rule.load({ "id" => ... })
  def Rule(data = nil)
    require_relative 'entity/rule_entity'
    RuleEntity.new(self, data)
  end


  # Canonical facade: client.Saml.list / client.Saml.load({ "id" => ... })
  def Saml(data = nil)
    require_relative 'entity/saml_entity'
    SamlEntity.new(self, data)
  end


  # Canonical facade: client.ScaDeviceFingerprint.list / client.ScaDeviceFingerprint.load({ "id" => ... })
  def ScaDeviceFingerprint(data = nil)
    require_relative 'entity/sca_device_fingerprint_entity'
    ScaDeviceFingerprintEntity.new(self, data)
  end


  # Canonical facade: client.ScaFacemap.list / client.ScaFacemap.load({ "id" => ... })
  def ScaFacemap(data = nil)
    require_relative 'entity/sca_facemap_entity'
    ScaFacemapEntity.new(self, data)
  end


  # Canonical facade: client.ScaOtp.list / client.ScaOtp.load({ "id" => ... })
  def ScaOtp(data = nil)
    require_relative 'entity/sca_otp_entity'
    ScaOtpEntity.new(self, data)
  end


  # Canonical facade: client.ScaSession.list / client.ScaSession.load({ "id" => ... })
  def ScaSession(data = nil)
    require_relative 'entity/sca_session_entity'
    ScaSessionEntity.new(self, data)
  end


  # Canonical facade: client.SettlementAllocation.list / client.SettlementAllocation.load({ "id" => ... })
  def SettlementAllocation(data = nil)
    require_relative 'entity/settlement_allocation_entity'
    SettlementAllocationEntity.new(self, data)
  end


  # Canonical facade: client.Simulation.list / client.Simulation.load({ "id" => ... })
  def Simulation(data = nil)
    require_relative 'entity/simulation_entity'
    SimulationEntity.new(self, data)
  end


  # Canonical facade: client.SpendControl.list / client.SpendControl.load({ "id" => ... })
  def SpendControl(data = nil)
    require_relative 'entity/spend_control_entity'
    SpendControlEntity.new(self, data)
  end


  # Canonical facade: client.SpendLimit.list / client.SpendLimit.load({ "id" => ... })
  def SpendLimit(data = nil)
    require_relative 'entity/spend_limit_entity'
    SpendLimitEntity.new(self, data)
  end


  # Canonical facade: client.Subscription.list / client.Subscription.load({ "id" => ... })
  def Subscription(data = nil)
    require_relative 'entity/subscription_entity'
    SubscriptionEntity.new(self, data)
  end


  # Canonical facade: client.TestNotification.list / client.TestNotification.load({ "id" => ... })
  def TestNotification(data = nil)
    require_relative 'entity/test_notification_entity'
    TestNotificationEntity.new(self, data)
  end


  # Canonical facade: client.ThirdPartyTransfer.list / client.ThirdPartyTransfer.load({ "id" => ... })
  def ThirdPartyTransfer(data = nil)
    require_relative 'entity/third_party_transfer_entity'
    ThirdPartyTransferEntity.new(self, data)
  end


  # Canonical facade: client.ThreeDSecure.list / client.ThreeDSecure.load({ "id" => ... })
  def ThreeDSecure(data = nil)
    require_relative 'entity/three_d_secure_entity'
    ThreeDSecureEntity.new(self, data)
  end


  # Canonical facade: client.Token.list / client.Token.load({ "id" => ... })
  def Token(data = nil)
    require_relative 'entity/token_entity'
    TokenEntity.new(self, data)
  end


  # Canonical facade: client.Transfer.list / client.Transfer.load({ "id" => ... })
  def Transfer(data = nil)
    require_relative 'entity/transfer_entity'
    TransferEntity.new(self, data)
  end


  # Canonical facade: client.TransferRequirement.list / client.TransferRequirement.load({ "id" => ... })
  def TransferRequirement(data = nil)
    require_relative 'entity/transfer_requirement_entity'
    TransferRequirementEntity.new(self, data)
  end


  # Canonical facade: client.Ubo.list / client.Ubo.load({ "id" => ... })
  def Ubo(data = nil)
    require_relative 'entity/ubo_entity'
    UboEntity.new(self, data)
  end


  # Canonical facade: client.User.list / client.User.load({ "id" => ... })
  def User(data = nil)
    require_relative 'entity/user_entity'
    UserEntity.new(self, data)
  end


  # Canonical facade: client.Verification.list / client.Verification.load({ "id" => ... })
  def Verification(data = nil)
    require_relative 'entity/verification_entity'
    VerificationEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = WiseSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
