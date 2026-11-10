# Wise SDK

from wise_sdk.utility.voxgig_struct import voxgig_struct as vs
from wise_sdk.core.utility_type import WiseUtility
from wise_sdk.core.spec import WiseSpec
from wise_sdk.core import helpers
from wise_sdk.utility.prepare_method import allowed
from wise_sdk.utility.result_body import unreadable_body

# Load utility registration (populates Utility._registrar)
from wise_sdk.utility import register

# Load features
from wise_sdk.feature.base_feature import WiseBaseFeature
from wise_sdk.features import _has_feature, _make_feature


class WiseSDK:
    # The options hold the credential. A slot keeps them reachable as
    # `client.options` and out of `vars(client)` and every attribute dump;
    # the dict entry keeps the instance open for everything else.
    __slots__ = ("_options", "__dict__")

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self._options = None

        utility = WiseUtility()
        self._utility = utility

        from wise_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    @property
    def options(self):
        return self._options

    @options.setter
    def options(self, value):
        self._options = value

    def __repr__(self):
        return "WiseSDK(mode=" + repr(self.mode) + ")"

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return WiseUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def secrets(self):
        _s = getattr(self, "_secrets", None)
        return None if _s is None else _s.sekreto()

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        if getattr(self, "_secrets", None) is not None:
            self._secrets.resolve()

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"
        method = method.upper()

        allow_method = vs.getpath(options, "allow.method")
        if not allowed(allow_method, method):
            raise ctx.make_error("spec_method_allow",
                'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + str(allow_method) + '"')

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = WiseSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        # A raw request has no point to declare its response type, so it asks
        # for the JSON it reads: an API that negotiates on Accept otherwise
        # answers in its own default format. A caller's own accept wins.
        if not any(str(k).lower() == "accept" for k in ctx.spec.headers):
            ctx.spec.headers["accept"] = "application/json"

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        return allowed(vs.getpath(self.options, "allow.op"), op)

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "WiseSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            # That error never passes through make_error, so it is cleaned.
            return {"ok": False, "err": utility.clean(self._rootctx, err)}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": utility.clean(ctx, fetch_err)}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            body_err = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None
                if vs.getprop(fetched, "unreadable") is True:
                    failed = None if 200 <= status < 300 else ctx.make_error(
                        "request_status",
                        "request: " + str(status) + ": " + str(vs.getprop(fetched, "statusText")))
                    body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
                                               fetchdef.get("headers"), failed)

            out = {
                "ok": body_err is None and status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }
            if body_err is not None:
                out["err"] = utility.clean(ctx, body_err)
            return out

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("WiseSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def AccountDetail(self, data=None) -> "AccountDetailEntity":
        """Entity factory: client.AccountDetail().list() / client.AccountDetail().load({"id": ...})."""
        from wise_sdk.entity.account_detail_entity import AccountDetailEntity
        return AccountDetailEntity(self, data)


    def AccountRequirement(self, data=None) -> "AccountRequirementEntity":
        """Entity factory: client.AccountRequirement().list() / client.AccountRequirement().load({"id": ...})."""
        from wise_sdk.entity.account_requirement_entity import AccountRequirementEntity
        return AccountRequirementEntity(self, data)


    def Activity(self, data=None) -> "ActivityEntity":
        """Entity factory: client.Activity().list() / client.Activity().load({"id": ...})."""
        from wise_sdk.entity.activity_entity import ActivityEntity
        return ActivityEntity(self, data)


    def Address(self, data=None) -> "AddressEntity":
        """Entity factory: client.Address().list() / client.Address().load({"id": ...})."""
        from wise_sdk.entity.address_entity import AddressEntity
        return AddressEntity(self, data)


    def AddressRequirement(self, data=None) -> "AddressRequirementEntity":
        """Entity factory: client.AddressRequirement().list() / client.AddressRequirement().load({"id": ...})."""
        from wise_sdk.entity.address_requirement_entity import AddressRequirementEntity
        return AddressRequirementEntity(self, data)


    def Balance(self, data=None) -> "BalanceEntity":
        """Entity factory: client.Balance().list() / client.Balance().load({"id": ...})."""
        from wise_sdk.entity.balance_entity import BalanceEntity
        return BalanceEntity(self, data)


    def BalanceStatement(self, data=None) -> "BalanceStatementEntity":
        """Entity factory: client.BalanceStatement().list() / client.BalanceStatement().load({"id": ...})."""
        from wise_sdk.entity.balance_statement_entity import BalanceStatementEntity
        return BalanceStatementEntity(self, data)


    def BankAccountDetail(self, data=None) -> "BankAccountDetailEntity":
        """Entity factory: client.BankAccountDetail().list() / client.BankAccountDetail().load({"id": ...})."""
        from wise_sdk.entity.bank_account_detail_entity import BankAccountDetailEntity
        return BankAccountDetailEntity(self, data)


    def BankAccountDetailsOrder(self, data=None) -> "BankAccountDetailsOrderEntity":
        """Entity factory: client.BankAccountDetailsOrder().list() / client.BankAccountDetailsOrder().load({"id": ...})."""
        from wise_sdk.entity.bank_account_details_order_entity import BankAccountDetailsOrderEntity
        return BankAccountDetailsOrderEntity(self, data)


    def BatchGroup(self, data=None) -> "BatchGroupEntity":
        """Entity factory: client.BatchGroup().list() / client.BatchGroup().load({"id": ...})."""
        from wise_sdk.entity.batch_group_entity import BatchGroupEntity
        return BatchGroupEntity(self, data)


    def BulkSettlement(self, data=None) -> "BulkSettlementEntity":
        """Entity factory: client.BulkSettlement().list() / client.BulkSettlement().load({"id": ...})."""
        from wise_sdk.entity.bulk_settlement_entity import BulkSettlementEntity
        return BulkSettlementEntity(self, data)


    def BusinessProfile(self, data=None) -> "BusinessProfileEntity":
        """Entity factory: client.BusinessProfile().list() / client.BusinessProfile().load({"id": ...})."""
        from wise_sdk.entity.business_profile_entity import BusinessProfileEntity
        return BusinessProfileEntity(self, data)


    def Card(self, data=None) -> "CardEntity":
        """Entity factory: client.Card().list() / client.Card().load({"id": ...})."""
        from wise_sdk.entity.card_entity import CardEntity
        return CardEntity(self, data)


    def CardHolderLimit(self, data=None) -> "CardHolderLimitEntity":
        """Entity factory: client.CardHolderLimit().list() / client.CardHolderLimit().load({"id": ...})."""
        from wise_sdk.entity.card_holder_limit_entity import CardHolderLimitEntity
        return CardHolderLimitEntity(self, data)


    def CardLimit(self, data=None) -> "CardLimitEntity":
        """Entity factory: client.CardLimit().list() / client.CardLimit().load({"id": ...})."""
        from wise_sdk.entity.card_limit_entity import CardLimitEntity
        return CardLimitEntity(self, data)


    def CardOrder(self, data=None) -> "CardOrderEntity":
        """Entity factory: client.CardOrder().list() / client.CardOrder().load({"id": ...})."""
        from wise_sdk.entity.card_order_entity import CardOrderEntity
        return CardOrderEntity(self, data)


    def CardSensitiveDetail(self, data=None) -> "CardSensitiveDetailEntity":
        """Entity factory: client.CardSensitiveDetail().list() / client.CardSensitiveDetail().load({"id": ...})."""
        from wise_sdk.entity.card_sensitive_detail_entity import CardSensitiveDetailEntity
        return CardSensitiveDetailEntity(self, data)


    def CardTransaction(self, data=None) -> "CardTransactionEntity":
        """Entity factory: client.CardTransaction().list() / client.CardTransaction().load({"id": ...})."""
        from wise_sdk.entity.card_transaction_entity import CardTransactionEntity
        return CardTransactionEntity(self, data)


    def Case(self, data=None) -> "CaseEntity":
        """Entity factory: client.Case().list() / client.Case().load({"id": ...})."""
        from wise_sdk.entity.case_entity import CaseEntity
        return CaseEntity(self, data)


    def ClaimAccount(self, data=None) -> "ClaimAccountEntity":
        """Entity factory: client.ClaimAccount().list() / client.ClaimAccount().load({"id": ...})."""
        from wise_sdk.entity.claim_account_entity import ClaimAccountEntity
        return ClaimAccountEntity(self, data)


    def Comparison(self, data=None) -> "ComparisonEntity":
        """Entity factory: client.Comparison().list() / client.Comparison().load({"id": ...})."""
        from wise_sdk.entity.comparison_entity import ComparisonEntity
        return ComparisonEntity(self, data)


    def Contact(self, data=None) -> "ContactEntity":
        """Entity factory: client.Contact().list() / client.Contact().load({"id": ...})."""
        from wise_sdk.entity.contact_entity import ContactEntity
        return ContactEntity(self, data)


    def Currency(self, data=None) -> "CurrencyEntity":
        """Entity factory: client.Currency().list() / client.Currency().load({"id": ...})."""
        from wise_sdk.entity.currency_entity import CurrencyEntity
        return CurrencyEntity(self, data)


    def DeliveryEstimate(self, data=None) -> "DeliveryEstimateEntity":
        """Entity factory: client.DeliveryEstimate().list() / client.DeliveryEstimate().load({"id": ...})."""
        from wise_sdk.entity.delivery_estimate_entity import DeliveryEstimateEntity
        return DeliveryEstimateEntity(self, data)


    def DeliveryUpdate(self, data=None) -> "DeliveryUpdateEntity":
        """Entity factory: client.DeliveryUpdate().list() / client.DeliveryUpdate().load({"id": ...})."""
        from wise_sdk.entity.delivery_update_entity import DeliveryUpdateEntity
        return DeliveryUpdateEntity(self, data)


    def DigitalWallet(self, data=None) -> "DigitalWalletEntity":
        """Entity factory: client.DigitalWallet().list() / client.DigitalWallet().load({"id": ...})."""
        from wise_sdk.entity.digital_wallet_entity import DigitalWalletEntity
        return DigitalWalletEntity(self, data)


    def DirectDebitAccount(self, data=None) -> "DirectDebitAccountEntity":
        """Entity factory: client.DirectDebitAccount().list() / client.DirectDebitAccount().load({"id": ...})."""
        from wise_sdk.entity.direct_debit_account_entity import DirectDebitAccountEntity
        return DirectDebitAccountEntity(self, data)


    def Director(self, data=None) -> "DirectorEntity":
        """Entity factory: client.Director().list() / client.Director().load({"id": ...})."""
        from wise_sdk.entity.director_entity import DirectorEntity
        return DirectorEntity(self, data)


    def Dispute(self, data=None) -> "DisputeEntity":
        """Entity factory: client.Dispute().list() / client.Dispute().load({"id": ...})."""
        from wise_sdk.entity.dispute_entity import DisputeEntity
        return DisputeEntity(self, data)


    def DisputeReason(self, data=None) -> "DisputeReasonEntity":
        """Entity factory: client.DisputeReason().list() / client.DisputeReason().load({"id": ...})."""
        from wise_sdk.entity.dispute_reason_entity import DisputeReasonEntity
        return DisputeReasonEntity(self, data)


    def Facetec(self, data=None) -> "FacetecEntity":
        """Entity factory: client.Facetec().list() / client.Facetec().load({"id": ...})."""
        from wise_sdk.entity.facetec_entity import FacetecEntity
        return FacetecEntity(self, data)


    def File(self, data=None) -> "FileEntity":
        """Entity factory: client.File().list() / client.File().load({"id": ...})."""
        from wise_sdk.entity.file_entity import FileEntity
        return FileEntity(self, data)


    def Funding(self, data=None) -> "FundingEntity":
        """Entity factory: client.Funding().list() / client.Funding().load({"id": ...})."""
        from wise_sdk.entity.funding_entity import FundingEntity
        return FundingEntity(self, data)


    def GpiTracking(self, data=None) -> "GpiTrackingEntity":
        """Entity factory: client.GpiTracking().list() / client.GpiTracking().load({"id": ...})."""
        from wise_sdk.entity.gpi_tracking_entity import GpiTrackingEntity
        return GpiTrackingEntity(self, data)


    def HoldLimitBreach(self, data=None) -> "HoldLimitBreachEntity":
        """Entity factory: client.HoldLimitBreach().list() / client.HoldLimitBreach().load({"id": ...})."""
        from wise_sdk.entity.hold_limit_breach_entity import HoldLimitBreachEntity
        return HoldLimitBreachEntity(self, data)


    def IncomingTransfer(self, data=None) -> "IncomingTransferEntity":
        """Entity factory: client.IncomingTransfer().list() / client.IncomingTransfer().load({"id": ...})."""
        from wise_sdk.entity.incoming_transfer_entity import IncomingTransferEntity
        return IncomingTransferEntity(self, data)


    def Jose(self, data=None) -> "JoseEntity":
        """Entity factory: client.Jose().list() / client.Jose().load({"id": ...})."""
        from wise_sdk.entity.jose_entity import JoseEntity
        return JoseEntity(self, data)


    def KycReview(self, data=None) -> "KycReviewEntity":
        """Entity factory: client.KycReview().list() / client.KycReview().load({"id": ...})."""
        from wise_sdk.entity.kyc_review_entity import KycReviewEntity
        return KycReviewEntity(self, data)


    def LinkRequest(self, data=None) -> "LinkRequestEntity":
        """Entity factory: client.LinkRequest().list() / client.LinkRequest().load({"id": ...})."""
        from wise_sdk.entity.link_request_entity import LinkRequestEntity
        return LinkRequestEntity(self, data)


    def Message(self, data=None) -> "MessageEntity":
        """Entity factory: client.Message().list() / client.Message().load({"id": ...})."""
        from wise_sdk.entity.message_entity import MessageEntity
        return MessageEntity(self, data)


    def MultiCurrencyAccount(self, data=None) -> "MultiCurrencyAccountEntity":
        """Entity factory: client.MultiCurrencyAccount().list() / client.MultiCurrencyAccount().load({"id": ...})."""
        from wise_sdk.entity.multi_currency_account_entity import MultiCurrencyAccountEntity
        return MultiCurrencyAccountEntity(self, data)


    def OneTimeToken(self, data=None) -> "OneTimeTokenEntity":
        """Entity factory: client.OneTimeToken().list() / client.OneTimeToken().load({"id": ...})."""
        from wise_sdk.entity.one_time_token_entity import OneTimeTokenEntity
        return OneTimeTokenEntity(self, data)


    def Ott(self, data=None) -> "OttEntity":
        """Entity factory: client.Ott().list() / client.Ott().load({"id": ...})."""
        from wise_sdk.entity.ott_entity import OttEntity
        return OttEntity(self, data)


    def Payin(self, data=None) -> "PayinEntity":
        """Entity factory: client.Payin().list() / client.Payin().load({"id": ...})."""
        from wise_sdk.entity.payin_entity import PayinEntity
        return PayinEntity(self, data)


    def PayinDepositDetail(self, data=None) -> "PayinDepositDetailEntity":
        """Entity factory: client.PayinDepositDetail().list() / client.PayinDepositDetail().load({"id": ...})."""
        from wise_sdk.entity.payin_deposit_detail_entity import PayinDepositDetailEntity
        return PayinDepositDetailEntity(self, data)


    def Payment(self, data=None) -> "PaymentEntity":
        """Entity factory: client.Payment().list() / client.Payment().load({"id": ...})."""
        from wise_sdk.entity.payment_entity import PaymentEntity
        return PaymentEntity(self, data)


    def PaymentInitiation(self, data=None) -> "PaymentInitiationEntity":
        """Entity factory: client.PaymentInitiation().list() / client.PaymentInitiation().load({"id": ...})."""
        from wise_sdk.entity.payment_initiation_entity import PaymentInitiationEntity
        return PaymentInitiationEntity(self, data)


    def PaymentInstrument(self, data=None) -> "PaymentInstrumentEntity":
        """Entity factory: client.PaymentInstrument().list() / client.PaymentInstrument().load({"id": ...})."""
        from wise_sdk.entity.payment_instrument_entity import PaymentInstrumentEntity
        return PaymentInstrumentEntity(self, data)


    def PaymentIntent(self, data=None) -> "PaymentIntentEntity":
        """Entity factory: client.PaymentIntent().list() / client.PaymentIntent().load({"id": ...})."""
        from wise_sdk.entity.payment_intent_entity import PaymentIntentEntity
        return PaymentIntentEntity(self, data)


    def PhoneNumber(self, data=None) -> "PhoneNumberEntity":
        """Entity factory: client.PhoneNumber().list() / client.PhoneNumber().load({"id": ...})."""
        from wise_sdk.entity.phone_number_entity import PhoneNumberEntity
        return PhoneNumberEntity(self, data)


    def Production(self, data=None) -> "ProductionEntity":
        """Entity factory: client.Production().list() / client.Production().load({"id": ...})."""
        from wise_sdk.entity.production_entity import ProductionEntity
        return ProductionEntity(self, data)


    def Profile(self, data=None) -> "ProfileEntity":
        """Entity factory: client.Profile().list() / client.Profile().load({"id": ...})."""
        from wise_sdk.entity.profile_entity import ProfileEntity
        return ProfileEntity(self, data)


    def Quote(self, data=None) -> "QuoteEntity":
        """Entity factory: client.Quote().list() / client.Quote().load({"id": ...})."""
        from wise_sdk.entity.quote_entity import QuoteEntity
        return QuoteEntity(self, data)


    def Rate(self, data=None) -> "RateEntity":
        """Entity factory: client.Rate().list() / client.Rate().load({"id": ...})."""
        from wise_sdk.entity.rate_entity import RateEntity
        return RateEntity(self, data)


    def Recipient(self, data=None) -> "RecipientEntity":
        """Entity factory: client.Recipient().list() / client.Recipient().load({"id": ...})."""
        from wise_sdk.entity.recipient_entity import RecipientEntity
        return RecipientEntity(self, data)


    def Rule(self, data=None) -> "RuleEntity":
        """Entity factory: client.Rule().list() / client.Rule().load({"id": ...})."""
        from wise_sdk.entity.rule_entity import RuleEntity
        return RuleEntity(self, data)


    def Saml(self, data=None) -> "SamlEntity":
        """Entity factory: client.Saml().list() / client.Saml().load({"id": ...})."""
        from wise_sdk.entity.saml_entity import SamlEntity
        return SamlEntity(self, data)


    def ScaDeviceFingerprint(self, data=None) -> "ScaDeviceFingerprintEntity":
        """Entity factory: client.ScaDeviceFingerprint().list() / client.ScaDeviceFingerprint().load({"id": ...})."""
        from wise_sdk.entity.sca_device_fingerprint_entity import ScaDeviceFingerprintEntity
        return ScaDeviceFingerprintEntity(self, data)


    def ScaFacemap(self, data=None) -> "ScaFacemapEntity":
        """Entity factory: client.ScaFacemap().list() / client.ScaFacemap().load({"id": ...})."""
        from wise_sdk.entity.sca_facemap_entity import ScaFacemapEntity
        return ScaFacemapEntity(self, data)


    def ScaOtp(self, data=None) -> "ScaOtpEntity":
        """Entity factory: client.ScaOtp().list() / client.ScaOtp().load({"id": ...})."""
        from wise_sdk.entity.sca_otp_entity import ScaOtpEntity
        return ScaOtpEntity(self, data)


    def ScaSession(self, data=None) -> "ScaSessionEntity":
        """Entity factory: client.ScaSession().list() / client.ScaSession().load({"id": ...})."""
        from wise_sdk.entity.sca_session_entity import ScaSessionEntity
        return ScaSessionEntity(self, data)


    def SettlementAllocation(self, data=None) -> "SettlementAllocationEntity":
        """Entity factory: client.SettlementAllocation().list() / client.SettlementAllocation().load({"id": ...})."""
        from wise_sdk.entity.settlement_allocation_entity import SettlementAllocationEntity
        return SettlementAllocationEntity(self, data)


    def Simulation(self, data=None) -> "SimulationEntity":
        """Entity factory: client.Simulation().list() / client.Simulation().load({"id": ...})."""
        from wise_sdk.entity.simulation_entity import SimulationEntity
        return SimulationEntity(self, data)


    def SpendControl(self, data=None) -> "SpendControlEntity":
        """Entity factory: client.SpendControl().list() / client.SpendControl().load({"id": ...})."""
        from wise_sdk.entity.spend_control_entity import SpendControlEntity
        return SpendControlEntity(self, data)


    def SpendLimit(self, data=None) -> "SpendLimitEntity":
        """Entity factory: client.SpendLimit().list() / client.SpendLimit().load({"id": ...})."""
        from wise_sdk.entity.spend_limit_entity import SpendLimitEntity
        return SpendLimitEntity(self, data)


    def Subscription(self, data=None) -> "SubscriptionEntity":
        """Entity factory: client.Subscription().list() / client.Subscription().load({"id": ...})."""
        from wise_sdk.entity.subscription_entity import SubscriptionEntity
        return SubscriptionEntity(self, data)


    def TestNotification(self, data=None) -> "TestNotificationEntity":
        """Entity factory: client.TestNotification().list() / client.TestNotification().load({"id": ...})."""
        from wise_sdk.entity.test_notification_entity import TestNotificationEntity
        return TestNotificationEntity(self, data)


    def ThirdPartyTransfer(self, data=None) -> "ThirdPartyTransferEntity":
        """Entity factory: client.ThirdPartyTransfer().list() / client.ThirdPartyTransfer().load({"id": ...})."""
        from wise_sdk.entity.third_party_transfer_entity import ThirdPartyTransferEntity
        return ThirdPartyTransferEntity(self, data)


    def ThreeDSecure(self, data=None) -> "ThreeDSecureEntity":
        """Entity factory: client.ThreeDSecure().list() / client.ThreeDSecure().load({"id": ...})."""
        from wise_sdk.entity.three_d_secure_entity import ThreeDSecureEntity
        return ThreeDSecureEntity(self, data)


    def Token(self, data=None) -> "TokenEntity":
        """Entity factory: client.Token().list() / client.Token().load({"id": ...})."""
        from wise_sdk.entity.token_entity import TokenEntity
        return TokenEntity(self, data)


    def Transfer(self, data=None) -> "TransferEntity":
        """Entity factory: client.Transfer().list() / client.Transfer().load({"id": ...})."""
        from wise_sdk.entity.transfer_entity import TransferEntity
        return TransferEntity(self, data)


    def TransferRequirement(self, data=None) -> "TransferRequirementEntity":
        """Entity factory: client.TransferRequirement().list() / client.TransferRequirement().load({"id": ...})."""
        from wise_sdk.entity.transfer_requirement_entity import TransferRequirementEntity
        return TransferRequirementEntity(self, data)


    def Ubo(self, data=None) -> "UboEntity":
        """Entity factory: client.Ubo().list() / client.Ubo().load({"id": ...})."""
        from wise_sdk.entity.ubo_entity import UboEntity
        return UboEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from wise_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def Verification(self, data=None) -> "VerificationEntity":
        """Entity factory: client.Verification().list() / client.Verification().load({"id": ...})."""
        from wise_sdk.entity.verification_entity import VerificationEntity
        return VerificationEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "WiseSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from wise_sdk.entity.account_detail_entity import AccountDetailEntity
    from wise_sdk.entity.account_requirement_entity import AccountRequirementEntity
    from wise_sdk.entity.activity_entity import ActivityEntity
    from wise_sdk.entity.address_entity import AddressEntity
    from wise_sdk.entity.address_requirement_entity import AddressRequirementEntity
    from wise_sdk.entity.balance_entity import BalanceEntity
    from wise_sdk.entity.balance_statement_entity import BalanceStatementEntity
    from wise_sdk.entity.bank_account_detail_entity import BankAccountDetailEntity
    from wise_sdk.entity.bank_account_details_order_entity import BankAccountDetailsOrderEntity
    from wise_sdk.entity.batch_group_entity import BatchGroupEntity
    from wise_sdk.entity.bulk_settlement_entity import BulkSettlementEntity
    from wise_sdk.entity.business_profile_entity import BusinessProfileEntity
    from wise_sdk.entity.card_entity import CardEntity
    from wise_sdk.entity.card_holder_limit_entity import CardHolderLimitEntity
    from wise_sdk.entity.card_limit_entity import CardLimitEntity
    from wise_sdk.entity.card_order_entity import CardOrderEntity
    from wise_sdk.entity.card_sensitive_detail_entity import CardSensitiveDetailEntity
    from wise_sdk.entity.card_transaction_entity import CardTransactionEntity
    from wise_sdk.entity.case_entity import CaseEntity
    from wise_sdk.entity.claim_account_entity import ClaimAccountEntity
    from wise_sdk.entity.comparison_entity import ComparisonEntity
    from wise_sdk.entity.contact_entity import ContactEntity
    from wise_sdk.entity.currency_entity import CurrencyEntity
    from wise_sdk.entity.delivery_estimate_entity import DeliveryEstimateEntity
    from wise_sdk.entity.delivery_update_entity import DeliveryUpdateEntity
    from wise_sdk.entity.digital_wallet_entity import DigitalWalletEntity
    from wise_sdk.entity.direct_debit_account_entity import DirectDebitAccountEntity
    from wise_sdk.entity.director_entity import DirectorEntity
    from wise_sdk.entity.dispute_entity import DisputeEntity
    from wise_sdk.entity.dispute_reason_entity import DisputeReasonEntity
    from wise_sdk.entity.facetec_entity import FacetecEntity
    from wise_sdk.entity.file_entity import FileEntity
    from wise_sdk.entity.funding_entity import FundingEntity
    from wise_sdk.entity.gpi_tracking_entity import GpiTrackingEntity
    from wise_sdk.entity.hold_limit_breach_entity import HoldLimitBreachEntity
    from wise_sdk.entity.incoming_transfer_entity import IncomingTransferEntity
    from wise_sdk.entity.jose_entity import JoseEntity
    from wise_sdk.entity.kyc_review_entity import KycReviewEntity
    from wise_sdk.entity.link_request_entity import LinkRequestEntity
    from wise_sdk.entity.message_entity import MessageEntity
    from wise_sdk.entity.multi_currency_account_entity import MultiCurrencyAccountEntity
    from wise_sdk.entity.one_time_token_entity import OneTimeTokenEntity
    from wise_sdk.entity.ott_entity import OttEntity
    from wise_sdk.entity.payin_entity import PayinEntity
    from wise_sdk.entity.payin_deposit_detail_entity import PayinDepositDetailEntity
    from wise_sdk.entity.payment_entity import PaymentEntity
    from wise_sdk.entity.payment_initiation_entity import PaymentInitiationEntity
    from wise_sdk.entity.payment_instrument_entity import PaymentInstrumentEntity
    from wise_sdk.entity.payment_intent_entity import PaymentIntentEntity
    from wise_sdk.entity.phone_number_entity import PhoneNumberEntity
    from wise_sdk.entity.production_entity import ProductionEntity
    from wise_sdk.entity.profile_entity import ProfileEntity
    from wise_sdk.entity.quote_entity import QuoteEntity
    from wise_sdk.entity.rate_entity import RateEntity
    from wise_sdk.entity.recipient_entity import RecipientEntity
    from wise_sdk.entity.rule_entity import RuleEntity
    from wise_sdk.entity.saml_entity import SamlEntity
    from wise_sdk.entity.sca_device_fingerprint_entity import ScaDeviceFingerprintEntity
    from wise_sdk.entity.sca_facemap_entity import ScaFacemapEntity
    from wise_sdk.entity.sca_otp_entity import ScaOtpEntity
    from wise_sdk.entity.sca_session_entity import ScaSessionEntity
    from wise_sdk.entity.settlement_allocation_entity import SettlementAllocationEntity
    from wise_sdk.entity.simulation_entity import SimulationEntity
    from wise_sdk.entity.spend_control_entity import SpendControlEntity
    from wise_sdk.entity.spend_limit_entity import SpendLimitEntity
    from wise_sdk.entity.subscription_entity import SubscriptionEntity
    from wise_sdk.entity.test_notification_entity import TestNotificationEntity
    from wise_sdk.entity.third_party_transfer_entity import ThirdPartyTransferEntity
    from wise_sdk.entity.three_d_secure_entity import ThreeDSecureEntity
    from wise_sdk.entity.token_entity import TokenEntity
    from wise_sdk.entity.transfer_entity import TransferEntity
    from wise_sdk.entity.transfer_requirement_entity import TransferRequirementEntity
    from wise_sdk.entity.ubo_entity import UboEntity
    from wise_sdk.entity.user_entity import UserEntity
    from wise_sdk.entity.verification_entity import VerificationEntity
