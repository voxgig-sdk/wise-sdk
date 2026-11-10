"use strict";
// Wise Ts SDK
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.WiseSDK = exports.WiseEntityBase = exports.BaseFeature = exports.sekreto = exports.config = exports.stdutil = void 0;
const AccountDetailEntity_1 = require("./entity/AccountDetailEntity");
const AccountRequirementEntity_1 = require("./entity/AccountRequirementEntity");
const ActivityEntity_1 = require("./entity/ActivityEntity");
const AddressEntity_1 = require("./entity/AddressEntity");
const AddressRequirementEntity_1 = require("./entity/AddressRequirementEntity");
const BalanceEntity_1 = require("./entity/BalanceEntity");
const BalanceStatementEntity_1 = require("./entity/BalanceStatementEntity");
const BankAccountDetailEntity_1 = require("./entity/BankAccountDetailEntity");
const BatchGroupEntity_1 = require("./entity/BatchGroupEntity");
const BulkSettlementEntity_1 = require("./entity/BulkSettlementEntity");
const BusinessProfileEntity_1 = require("./entity/BusinessProfileEntity");
const CardEntity_1 = require("./entity/CardEntity");
const CardHolderLimitEntity_1 = require("./entity/CardHolderLimitEntity");
const CardLimitEntity_1 = require("./entity/CardLimitEntity");
const CardOrderEntity_1 = require("./entity/CardOrderEntity");
const CardSensitiveDetailEntity_1 = require("./entity/CardSensitiveDetailEntity");
const CardTransactionEntity_1 = require("./entity/CardTransactionEntity");
const CaseEntity_1 = require("./entity/CaseEntity");
const ClaimAccountEntity_1 = require("./entity/ClaimAccountEntity");
const ComparisonEntity_1 = require("./entity/ComparisonEntity");
const ContactEntity_1 = require("./entity/ContactEntity");
const CreateThirdPartyTransferResponseContentEntity_1 = require("./entity/CreateThirdPartyTransferResponseContentEntity");
const CurrencyEntity_1 = require("./entity/CurrencyEntity");
const DeliveryEstimateEntity_1 = require("./entity/DeliveryEstimateEntity");
const DeliveryUpdateEntity_1 = require("./entity/DeliveryUpdateEntity");
const DigitalWalletEntity_1 = require("./entity/DigitalWalletEntity");
const DirectDebitAccountEntity_1 = require("./entity/DirectDebitAccountEntity");
const DirectorEntity_1 = require("./entity/DirectorEntity");
const DisputeEntity_1 = require("./entity/DisputeEntity");
const DisputeReasonEntity_1 = require("./entity/DisputeReasonEntity");
const FacetecEntity_1 = require("./entity/FacetecEntity");
const FileEntity_1 = require("./entity/FileEntity");
const FundingEntity_1 = require("./entity/FundingEntity");
const HoldLimitBreachEntity_1 = require("./entity/HoldLimitBreachEntity");
const IncomingTransferEntity_1 = require("./entity/IncomingTransferEntity");
const JoseEntity_1 = require("./entity/JoseEntity");
const KycReviewEntity_1 = require("./entity/KycReviewEntity");
const LinkRequestEntity_1 = require("./entity/LinkRequestEntity");
const LookupGpiTrackingResponseContentEntity_1 = require("./entity/LookupGpiTrackingResponseContentEntity");
const MessageEntity_1 = require("./entity/MessageEntity");
const MultiCurrencyAccountEntity_1 = require("./entity/MultiCurrencyAccountEntity");
const N3dsEntity_1 = require("./entity/N3dsEntity");
const OneTimeTokenEntity_1 = require("./entity/OneTimeTokenEntity");
const OttEntity_1 = require("./entity/OttEntity");
const PayinEntity_1 = require("./entity/PayinEntity");
const PayinDepositDetailEntity_1 = require("./entity/PayinDepositDetailEntity");
const PaymentEntity_1 = require("./entity/PaymentEntity");
const PaymentInitiationEntity_1 = require("./entity/PaymentInitiationEntity");
const PaymentInstrumentEntity_1 = require("./entity/PaymentInstrumentEntity");
const PaymentInstrumentDetailsResourceEntity_1 = require("./entity/PaymentInstrumentDetailsResourceEntity");
const PaymentIntentEntity_1 = require("./entity/PaymentIntentEntity");
const PhoneNumberEntity_1 = require("./entity/PhoneNumberEntity");
const ProductionEntity_1 = require("./entity/ProductionEntity");
const ProfileEntity_1 = require("./entity/ProfileEntity");
const QuoteEntity_1 = require("./entity/QuoteEntity");
const RateEntity_1 = require("./entity/RateEntity");
const RecipientEntity_1 = require("./entity/RecipientEntity");
const RuleEntity_1 = require("./entity/RuleEntity");
const SamlEntity_1 = require("./entity/SamlEntity");
const ScaDeviceFingerprintEntity_1 = require("./entity/ScaDeviceFingerprintEntity");
const ScaFacemapEntity_1 = require("./entity/ScaFacemapEntity");
const ScaOtpEntity_1 = require("./entity/ScaOtpEntity");
const ScaSessionEntity_1 = require("./entity/ScaSessionEntity");
const SettlementAllocationResponseContentEntity_1 = require("./entity/SettlementAllocationResponseContentEntity");
const SimulationEntity_1 = require("./entity/SimulationEntity");
const SpendControlEntity_1 = require("./entity/SpendControlEntity");
const SpendLimitEntity_1 = require("./entity/SpendLimitEntity");
const SubscriptionEntity_1 = require("./entity/SubscriptionEntity");
const TestNotificationEntity_1 = require("./entity/TestNotificationEntity");
const ThirdPartyTransferEntity_1 = require("./entity/ThirdPartyTransferEntity");
const TokenEntity_1 = require("./entity/TokenEntity");
const TransferEntity_1 = require("./entity/TransferEntity");
const TransferRequirementEntity_1 = require("./entity/TransferRequirementEntity");
const UboEntity_1 = require("./entity/UboEntity");
const UserEntity_1 = require("./entity/UserEntity");
const VerificationEntity_1 = require("./entity/VerificationEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const WiseEntityBase_1 = require("./WiseEntityBase");
Object.defineProperty(exports, "WiseEntityBase", { enumerable: true, get: function () { return WiseEntityBase_1.WiseEntityBase; } });
const Utility_1 = require("./utility/Utility");
const ResultBodyUtility_1 = require("./utility/ResultBodyUtility");
const MakeRequestUtility_1 = require("./utility/MakeRequestUtility");
const PrepareMethodUtility_1 = require("./utility/PrepareMethodUtility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const sekreto = __importStar(require("./feature/secrets/sekreto"));
exports.sekreto = sekreto;
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class WiseSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    _secrets;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        for (const key of ['_options', '_rootctx', '_features']) {
            Object.defineProperty(this, key, {
                value: this[key], enumerable: false, writable: true, configurable: true
            });
        }
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    secrets() {
        return this._secrets && this._secrets.sekreto();
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const method = String(fetchargs.method || 'GET').toUpperCase();
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.method, method)) {
            return ctx.error('spec_method_allow', 'Method "' + method +
                '" not allowed by SDK option allow.method value: "' + options.allow.method + '"');
        }
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method,
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        // A raw request has no point to declare its response type, so it asks
        // for the JSON it reads: an API that negotiates on Accept otherwise
        // answers in its own default format. A caller's own accept wins.
        if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
            spec.headers.accept = 'application/json';
        }
        if (null != this._secrets) {
            try {
                await this._secrets.resolve();
            }
            catch (err) {
                return err instanceof Error ? err : new Error(String(err));
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!(0, PrepareMethodUtility_1.allowed)(this._options.allow.op, 'direct')) {
            return {
                ok: false,
                err: new Error('WiseSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return { ok: false, err: utility.clean(this._rootctx, fetchdef) };
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            if (true === fetchdef.signal?.aborted) {
                throw fetchdef.signal.reason;
            }
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, fetched)) };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            let err = undefined;
            if (!noBody) {
                let text = undefined;
                try {
                    const raw = fetched;
                    if ('function' === typeof raw.text) {
                        text = await raw.text();
                        json = '' === text.trim() ? undefined : JSON.parse(text);
                    }
                    else {
                        json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                    }
                }
                catch (parseErr) {
                    if ('SyntaxError' !== parseErr?.name) {
                        throw parseErr;
                    }
                    err = (0, ResultBodyUtility_1.unreadableBody)(ctx, {
                        status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
                        failed: 200 <= status && status < 300 ? undefined :
                            ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
                    });
                }
            }
            return {
                ok: null == err && status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
                ...(null == err ? {} : { err: utility.clean(ctx, err) }),
            };
        }
        catch (err) {
            return { ok: false, err: utility.clean(ctx, (0, MakeRequestUtility_1.abortError)(ctx, err)) };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!(0, PrepareMethodUtility_1.allowed)(options.allow.op, 'graphql')) {
            return {
                ok: false,
                err: new Error('WiseSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('WiseSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AccountDetail().list()` / `client.AccountDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountDetail(entopts) {
        const self = this;
        return new AccountDetailEntity_1.AccountDetailEntity(self, entopts);
    }
    // Entity access: `client.AccountRequirement().list()` / `client.AccountRequirement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountRequirement(entopts) {
        const self = this;
        return new AccountRequirementEntity_1.AccountRequirementEntity(self, entopts);
    }
    // Entity access: `client.Activity().list()` / `client.Activity().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Activity(entopts) {
        const self = this;
        return new ActivityEntity_1.ActivityEntity(self, entopts);
    }
    // Entity access: `client.Address().list()` / `client.Address().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Address(entopts) {
        const self = this;
        return new AddressEntity_1.AddressEntity(self, entopts);
    }
    // Entity access: `client.AddressRequirement().list()` / `client.AddressRequirement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AddressRequirement(entopts) {
        const self = this;
        return new AddressRequirementEntity_1.AddressRequirementEntity(self, entopts);
    }
    // Entity access: `client.Balance().list()` / `client.Balance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Balance(entopts) {
        const self = this;
        return new BalanceEntity_1.BalanceEntity(self, entopts);
    }
    // Entity access: `client.BalanceStatement().list()` / `client.BalanceStatement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BalanceStatement(entopts) {
        const self = this;
        return new BalanceStatementEntity_1.BalanceStatementEntity(self, entopts);
    }
    // Entity access: `client.BankAccountDetail().list()` / `client.BankAccountDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BankAccountDetail(entopts) {
        const self = this;
        return new BankAccountDetailEntity_1.BankAccountDetailEntity(self, entopts);
    }
    // Entity access: `client.BatchGroup().list()` / `client.BatchGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BatchGroup(entopts) {
        const self = this;
        return new BatchGroupEntity_1.BatchGroupEntity(self, entopts);
    }
    // Entity access: `client.BulkSettlement().list()` / `client.BulkSettlement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BulkSettlement(entopts) {
        const self = this;
        return new BulkSettlementEntity_1.BulkSettlementEntity(self, entopts);
    }
    // Entity access: `client.BusinessProfile().list()` / `client.BusinessProfile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    BusinessProfile(entopts) {
        const self = this;
        return new BusinessProfileEntity_1.BusinessProfileEntity(self, entopts);
    }
    // Entity access: `client.Card().list()` / `client.Card().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Card(entopts) {
        const self = this;
        return new CardEntity_1.CardEntity(self, entopts);
    }
    // Entity access: `client.CardHolderLimit().list()` / `client.CardHolderLimit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardHolderLimit(entopts) {
        const self = this;
        return new CardHolderLimitEntity_1.CardHolderLimitEntity(self, entopts);
    }
    // Entity access: `client.CardLimit().list()` / `client.CardLimit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardLimit(entopts) {
        const self = this;
        return new CardLimitEntity_1.CardLimitEntity(self, entopts);
    }
    // Entity access: `client.CardOrder().list()` / `client.CardOrder().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardOrder(entopts) {
        const self = this;
        return new CardOrderEntity_1.CardOrderEntity(self, entopts);
    }
    // Entity access: `client.CardSensitiveDetail().list()` / `client.CardSensitiveDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardSensitiveDetail(entopts) {
        const self = this;
        return new CardSensitiveDetailEntity_1.CardSensitiveDetailEntity(self, entopts);
    }
    // Entity access: `client.CardTransaction().list()` / `client.CardTransaction().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CardTransaction(entopts) {
        const self = this;
        return new CardTransactionEntity_1.CardTransactionEntity(self, entopts);
    }
    // Entity access: `client.Case().list()` / `client.Case().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Case(entopts) {
        const self = this;
        return new CaseEntity_1.CaseEntity(self, entopts);
    }
    // Entity access: `client.ClaimAccount().list()` / `client.ClaimAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ClaimAccount(entopts) {
        const self = this;
        return new ClaimAccountEntity_1.ClaimAccountEntity(self, entopts);
    }
    // Entity access: `client.Comparison().list()` / `client.Comparison().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Comparison(entopts) {
        const self = this;
        return new ComparisonEntity_1.ComparisonEntity(self, entopts);
    }
    // Entity access: `client.Contact().list()` / `client.Contact().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Contact(entopts) {
        const self = this;
        return new ContactEntity_1.ContactEntity(self, entopts);
    }
    // Entity access: `client.CreateThirdPartyTransferResponseContent().list()` / `client.CreateThirdPartyTransferResponseContent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CreateThirdPartyTransferResponseContent(entopts) {
        const self = this;
        return new CreateThirdPartyTransferResponseContentEntity_1.CreateThirdPartyTransferResponseContentEntity(self, entopts);
    }
    // Entity access: `client.Currency().list()` / `client.Currency().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Currency(entopts) {
        const self = this;
        return new CurrencyEntity_1.CurrencyEntity(self, entopts);
    }
    // Entity access: `client.DeliveryEstimate().list()` / `client.DeliveryEstimate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeliveryEstimate(entopts) {
        const self = this;
        return new DeliveryEstimateEntity_1.DeliveryEstimateEntity(self, entopts);
    }
    // Entity access: `client.DeliveryUpdate().list()` / `client.DeliveryUpdate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DeliveryUpdate(entopts) {
        const self = this;
        return new DeliveryUpdateEntity_1.DeliveryUpdateEntity(self, entopts);
    }
    // Entity access: `client.DigitalWallet().list()` / `client.DigitalWallet().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DigitalWallet(entopts) {
        const self = this;
        return new DigitalWalletEntity_1.DigitalWalletEntity(self, entopts);
    }
    // Entity access: `client.DirectDebitAccount().list()` / `client.DirectDebitAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DirectDebitAccount(entopts) {
        const self = this;
        return new DirectDebitAccountEntity_1.DirectDebitAccountEntity(self, entopts);
    }
    // Entity access: `client.Director().list()` / `client.Director().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Director(entopts) {
        const self = this;
        return new DirectorEntity_1.DirectorEntity(self, entopts);
    }
    // Entity access: `client.Dispute().list()` / `client.Dispute().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dispute(entopts) {
        const self = this;
        return new DisputeEntity_1.DisputeEntity(self, entopts);
    }
    // Entity access: `client.DisputeReason().list()` / `client.DisputeReason().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DisputeReason(entopts) {
        const self = this;
        return new DisputeReasonEntity_1.DisputeReasonEntity(self, entopts);
    }
    // Entity access: `client.Facetec().list()` / `client.Facetec().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Facetec(entopts) {
        const self = this;
        return new FacetecEntity_1.FacetecEntity(self, entopts);
    }
    // Entity access: `client.File().list()` / `client.File().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    File(entopts) {
        const self = this;
        return new FileEntity_1.FileEntity(self, entopts);
    }
    // Entity access: `client.Funding().list()` / `client.Funding().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Funding(entopts) {
        const self = this;
        return new FundingEntity_1.FundingEntity(self, entopts);
    }
    // Entity access: `client.HoldLimitBreach().list()` / `client.HoldLimitBreach().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    HoldLimitBreach(entopts) {
        const self = this;
        return new HoldLimitBreachEntity_1.HoldLimitBreachEntity(self, entopts);
    }
    // Entity access: `client.IncomingTransfer().list()` / `client.IncomingTransfer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    IncomingTransfer(entopts) {
        const self = this;
        return new IncomingTransferEntity_1.IncomingTransferEntity(self, entopts);
    }
    // Entity access: `client.Jose().list()` / `client.Jose().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Jose(entopts) {
        const self = this;
        return new JoseEntity_1.JoseEntity(self, entopts);
    }
    // Entity access: `client.KycReview().list()` / `client.KycReview().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    KycReview(entopts) {
        const self = this;
        return new KycReviewEntity_1.KycReviewEntity(self, entopts);
    }
    // Entity access: `client.LinkRequest().list()` / `client.LinkRequest().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LinkRequest(entopts) {
        const self = this;
        return new LinkRequestEntity_1.LinkRequestEntity(self, entopts);
    }
    // Entity access: `client.LookupGpiTrackingResponseContent().list()` / `client.LookupGpiTrackingResponseContent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    LookupGpiTrackingResponseContent(entopts) {
        const self = this;
        return new LookupGpiTrackingResponseContentEntity_1.LookupGpiTrackingResponseContentEntity(self, entopts);
    }
    // Entity access: `client.Message().list()` / `client.Message().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Message(entopts) {
        const self = this;
        return new MessageEntity_1.MessageEntity(self, entopts);
    }
    // Entity access: `client.MultiCurrencyAccount().list()` / `client.MultiCurrencyAccount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MultiCurrencyAccount(entopts) {
        const self = this;
        return new MultiCurrencyAccountEntity_1.MultiCurrencyAccountEntity(self, entopts);
    }
    // Entity access: `client.N3ds().list()` / `client.N3ds().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    N3ds(entopts) {
        const self = this;
        return new N3dsEntity_1.N3dsEntity(self, entopts);
    }
    // Entity access: `client.OneTimeToken().list()` / `client.OneTimeToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OneTimeToken(entopts) {
        const self = this;
        return new OneTimeTokenEntity_1.OneTimeTokenEntity(self, entopts);
    }
    // Entity access: `client.Ott().list()` / `client.Ott().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Ott(entopts) {
        const self = this;
        return new OttEntity_1.OttEntity(self, entopts);
    }
    // Entity access: `client.Payin().list()` / `client.Payin().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Payin(entopts) {
        const self = this;
        return new PayinEntity_1.PayinEntity(self, entopts);
    }
    // Entity access: `client.PayinDepositDetail().list()` / `client.PayinDepositDetail().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PayinDepositDetail(entopts) {
        const self = this;
        return new PayinDepositDetailEntity_1.PayinDepositDetailEntity(self, entopts);
    }
    // Entity access: `client.Payment().list()` / `client.Payment().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Payment(entopts) {
        const self = this;
        return new PaymentEntity_1.PaymentEntity(self, entopts);
    }
    // Entity access: `client.PaymentInitiation().list()` / `client.PaymentInitiation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaymentInitiation(entopts) {
        const self = this;
        return new PaymentInitiationEntity_1.PaymentInitiationEntity(self, entopts);
    }
    // Entity access: `client.PaymentInstrument().list()` / `client.PaymentInstrument().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaymentInstrument(entopts) {
        const self = this;
        return new PaymentInstrumentEntity_1.PaymentInstrumentEntity(self, entopts);
    }
    // Entity access: `client.PaymentInstrumentDetailsResource().list()` / `client.PaymentInstrumentDetailsResource().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaymentInstrumentDetailsResource(entopts) {
        const self = this;
        return new PaymentInstrumentDetailsResourceEntity_1.PaymentInstrumentDetailsResourceEntity(self, entopts);
    }
    // Entity access: `client.PaymentIntent().list()` / `client.PaymentIntent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PaymentIntent(entopts) {
        const self = this;
        return new PaymentIntentEntity_1.PaymentIntentEntity(self, entopts);
    }
    // Entity access: `client.PhoneNumber().list()` / `client.PhoneNumber().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhoneNumber(entopts) {
        const self = this;
        return new PhoneNumberEntity_1.PhoneNumberEntity(self, entopts);
    }
    // Entity access: `client.Production().list()` / `client.Production().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Production(entopts) {
        const self = this;
        return new ProductionEntity_1.ProductionEntity(self, entopts);
    }
    // Entity access: `client.Profile().list()` / `client.Profile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Profile(entopts) {
        const self = this;
        return new ProfileEntity_1.ProfileEntity(self, entopts);
    }
    // Entity access: `client.Quote().list()` / `client.Quote().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Quote(entopts) {
        const self = this;
        return new QuoteEntity_1.QuoteEntity(self, entopts);
    }
    // Entity access: `client.Rate().list()` / `client.Rate().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Rate(entopts) {
        const self = this;
        return new RateEntity_1.RateEntity(self, entopts);
    }
    // Entity access: `client.Recipient().list()` / `client.Recipient().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recipient(entopts) {
        const self = this;
        return new RecipientEntity_1.RecipientEntity(self, entopts);
    }
    // Entity access: `client.Rule().list()` / `client.Rule().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Rule(entopts) {
        const self = this;
        return new RuleEntity_1.RuleEntity(self, entopts);
    }
    // Entity access: `client.Saml().list()` / `client.Saml().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Saml(entopts) {
        const self = this;
        return new SamlEntity_1.SamlEntity(self, entopts);
    }
    // Entity access: `client.ScaDeviceFingerprint().list()` / `client.ScaDeviceFingerprint().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScaDeviceFingerprint(entopts) {
        const self = this;
        return new ScaDeviceFingerprintEntity_1.ScaDeviceFingerprintEntity(self, entopts);
    }
    // Entity access: `client.ScaFacemap().list()` / `client.ScaFacemap().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScaFacemap(entopts) {
        const self = this;
        return new ScaFacemapEntity_1.ScaFacemapEntity(self, entopts);
    }
    // Entity access: `client.ScaOtp().list()` / `client.ScaOtp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScaOtp(entopts) {
        const self = this;
        return new ScaOtpEntity_1.ScaOtpEntity(self, entopts);
    }
    // Entity access: `client.ScaSession().list()` / `client.ScaSession().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ScaSession(entopts) {
        const self = this;
        return new ScaSessionEntity_1.ScaSessionEntity(self, entopts);
    }
    // Entity access: `client.SettlementAllocationResponseContent().list()` / `client.SettlementAllocationResponseContent().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SettlementAllocationResponseContent(entopts) {
        const self = this;
        return new SettlementAllocationResponseContentEntity_1.SettlementAllocationResponseContentEntity(self, entopts);
    }
    // Entity access: `client.Simulation().list()` / `client.Simulation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Simulation(entopts) {
        const self = this;
        return new SimulationEntity_1.SimulationEntity(self, entopts);
    }
    // Entity access: `client.SpendControl().list()` / `client.SpendControl().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpendControl(entopts) {
        const self = this;
        return new SpendControlEntity_1.SpendControlEntity(self, entopts);
    }
    // Entity access: `client.SpendLimit().list()` / `client.SpendLimit().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    SpendLimit(entopts) {
        const self = this;
        return new SpendLimitEntity_1.SpendLimitEntity(self, entopts);
    }
    // Entity access: `client.Subscription().list()` / `client.Subscription().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Subscription(entopts) {
        const self = this;
        return new SubscriptionEntity_1.SubscriptionEntity(self, entopts);
    }
    // Entity access: `client.TestNotification().list()` / `client.TestNotification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TestNotification(entopts) {
        const self = this;
        return new TestNotificationEntity_1.TestNotificationEntity(self, entopts);
    }
    // Entity access: `client.ThirdPartyTransfer().list()` / `client.ThirdPartyTransfer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ThirdPartyTransfer(entopts) {
        const self = this;
        return new ThirdPartyTransferEntity_1.ThirdPartyTransferEntity(self, entopts);
    }
    // Entity access: `client.Token().list()` / `client.Token().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Token(entopts) {
        const self = this;
        return new TokenEntity_1.TokenEntity(self, entopts);
    }
    // Entity access: `client.Transfer().list()` / `client.Transfer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Transfer(entopts) {
        const self = this;
        return new TransferEntity_1.TransferEntity(self, entopts);
    }
    // Entity access: `client.TransferRequirement().list()` / `client.TransferRequirement().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TransferRequirement(entopts) {
        const self = this;
        return new TransferRequirementEntity_1.TransferRequirementEntity(self, entopts);
    }
    // Entity access: `client.Ubo().list()` / `client.Ubo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Ubo(entopts) {
        const self = this;
        return new UboEntity_1.UboEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.Verification().list()` / `client.Verification().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Verification(entopts) {
        const self = this;
        return new VerificationEntity_1.VerificationEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new WiseSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return WiseSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Wise' };
    }
    toString() {
        return 'Wise ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.WiseSDK = WiseSDK;
const SDK = WiseSDK;
exports.SDK = SDK;
//# sourceMappingURL=WiseSDK.js.map