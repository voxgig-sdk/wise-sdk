// Wise Ts SDK

import { AccountDetailEntity } from './entity/AccountDetailEntity'
import { AccountRequirementEntity } from './entity/AccountRequirementEntity'
import { ActivityEntity } from './entity/ActivityEntity'
import { AddressEntity } from './entity/AddressEntity'
import { AddressRequirementEntity } from './entity/AddressRequirementEntity'
import { BalanceEntity } from './entity/BalanceEntity'
import { BalanceStatementEntity } from './entity/BalanceStatementEntity'
import { BankAccountDetailEntity } from './entity/BankAccountDetailEntity'
import { BankAccountDetailsOrderEntity } from './entity/BankAccountDetailsOrderEntity'
import { BatchGroupEntity } from './entity/BatchGroupEntity'
import { BulkSettlementEntity } from './entity/BulkSettlementEntity'
import { BusinessProfileEntity } from './entity/BusinessProfileEntity'
import { CardEntity } from './entity/CardEntity'
import { CardHolderLimitEntity } from './entity/CardHolderLimitEntity'
import { CardLimitEntity } from './entity/CardLimitEntity'
import { CardOrderEntity } from './entity/CardOrderEntity'
import { CardSensitiveDetailEntity } from './entity/CardSensitiveDetailEntity'
import { CardTransactionEntity } from './entity/CardTransactionEntity'
import { CaseEntity } from './entity/CaseEntity'
import { ClaimAccountEntity } from './entity/ClaimAccountEntity'
import { ComparisonEntity } from './entity/ComparisonEntity'
import { ContactEntity } from './entity/ContactEntity'
import { CurrencyEntity } from './entity/CurrencyEntity'
import { DeliveryEstimateEntity } from './entity/DeliveryEstimateEntity'
import { DeliveryUpdateEntity } from './entity/DeliveryUpdateEntity'
import { DigitalWalletEntity } from './entity/DigitalWalletEntity'
import { DirectDebitAccountEntity } from './entity/DirectDebitAccountEntity'
import { DirectorEntity } from './entity/DirectorEntity'
import { DisputeEntity } from './entity/DisputeEntity'
import { DisputeReasonEntity } from './entity/DisputeReasonEntity'
import { FacetecEntity } from './entity/FacetecEntity'
import { FileEntity } from './entity/FileEntity'
import { FundingEntity } from './entity/FundingEntity'
import { GpiTrackingEntity } from './entity/GpiTrackingEntity'
import { HoldLimitBreachEntity } from './entity/HoldLimitBreachEntity'
import { IncomingTransferEntity } from './entity/IncomingTransferEntity'
import { JoseEntity } from './entity/JoseEntity'
import { KycReviewEntity } from './entity/KycReviewEntity'
import { LinkRequestEntity } from './entity/LinkRequestEntity'
import { MessageEntity } from './entity/MessageEntity'
import { MultiCurrencyAccountEntity } from './entity/MultiCurrencyAccountEntity'
import { OneTimeTokenEntity } from './entity/OneTimeTokenEntity'
import { OttEntity } from './entity/OttEntity'
import { PayinEntity } from './entity/PayinEntity'
import { PayinDepositDetailEntity } from './entity/PayinDepositDetailEntity'
import { PaymentEntity } from './entity/PaymentEntity'
import { PaymentInitiationEntity } from './entity/PaymentInitiationEntity'
import { PaymentInstrumentEntity } from './entity/PaymentInstrumentEntity'
import { PaymentIntentEntity } from './entity/PaymentIntentEntity'
import { PhoneNumberEntity } from './entity/PhoneNumberEntity'
import { ProductionEntity } from './entity/ProductionEntity'
import { ProfileEntity } from './entity/ProfileEntity'
import { QuoteEntity } from './entity/QuoteEntity'
import { RateEntity } from './entity/RateEntity'
import { RecipientEntity } from './entity/RecipientEntity'
import { RuleEntity } from './entity/RuleEntity'
import { SamlEntity } from './entity/SamlEntity'
import { ScaDeviceFingerprintEntity } from './entity/ScaDeviceFingerprintEntity'
import { ScaFacemapEntity } from './entity/ScaFacemapEntity'
import { ScaOtpEntity } from './entity/ScaOtpEntity'
import { ScaSessionEntity } from './entity/ScaSessionEntity'
import { SettlementAllocationEntity } from './entity/SettlementAllocationEntity'
import { SimulationEntity } from './entity/SimulationEntity'
import { SpendControlEntity } from './entity/SpendControlEntity'
import { SpendLimitEntity } from './entity/SpendLimitEntity'
import { SubscriptionEntity } from './entity/SubscriptionEntity'
import { TestNotificationEntity } from './entity/TestNotificationEntity'
import { ThirdPartyTransferEntity } from './entity/ThirdPartyTransferEntity'
import { ThreeDSecureEntity } from './entity/ThreeDSecureEntity'
import { TokenEntity } from './entity/TokenEntity'
import { TransferEntity } from './entity/TransferEntity'
import { TransferRequirementEntity } from './entity/TransferRequirementEntity'
import { UboEntity } from './entity/UboEntity'
import { UserEntity } from './entity/UserEntity'
import { VerificationEntity } from './entity/VerificationEntity'

export type * from './WiseTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { WiseEntityBase } from './WiseEntityBase'
import { Utility } from './utility/Utility'
import { unreadableBody } from './utility/ResultBodyUtility'
import { abortError } from './utility/MakeRequestUtility'
import { allowed } from './utility/PrepareMethodUtility'


import { BaseFeature } from './feature/base/BaseFeature'
import * as sekreto from './feature/secrets/sekreto'



const stdutil = new Utility()


// A request's outcome: ok is false alone on an error with no response, so a
// caller narrowing on it reaches the status and the data.
type DirectResult =
  | { ok: false, err: any, status?: undefined, headers?: undefined, data?: undefined }
  | { ok: boolean, status: number, headers: any, data: any, err?: any }


class WiseSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  _secrets?: any


  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  
secrets() {
  return this._secrets && this._secrets.sekreto()
}



  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options
    const method = String(fetchargs.method || 'GET').toUpperCase()

    if (!allowed(options.allow.method, method)) {
      return ctx.error('spec_method_allow', 'Method "' + method +
        '" not allowed by SDK option allow.method value: "' + options.allow.method + '"')
    }

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // A raw request has no point to declare its response type, so it asks
    // for the JSON it reads: an API that negotiates on Accept otherwise
    // answers in its own default format. A caller's own accept wins.
    if (!Object.keys(spec.headers).some((key) => 'accept' === key.toLowerCase())) {
      spec.headers.accept = 'application/json'
    }

    
if (null != this._secrets) {
  try {
    await this._secrets.resolve()
  }
  catch (err: any) {
    return err instanceof Error ? err : new Error(String(err))
  }
}


    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any): Promise<DirectResult> {
    if (!allowed(this._options.allow.op, 'direct')) {
      return {
        ok: false,
        err: new Error('WiseSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any): Promise<DirectResult> {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return { ok: false, err: utility.clean(this._rootctx, fetchdef) }
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      if (true === fetchdef.signal?.aborted) {
        throw fetchdef.signal.reason
      }

      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, abortError(ctx, fetched)) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      let err: any = undefined
      if (!noBody) {
        let text: any = undefined
        try {
          const raw: any = fetched
          if ('function' === typeof raw.text) {
            text = await raw.text()
            json = '' === text.trim() ? undefined : JSON.parse(text)
          }
          else {
            json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
          }
        }
        catch (parseErr: any) {
          if ('SyntaxError' !== parseErr?.name) {
            throw parseErr
          }
          err = unreadableBody(ctx, {
            status, headers, text: text ?? parseErr.text, sent: fetchdef.headers,
            failed: 200 <= status && status < 300 ? undefined :
              ctx.error('request_status', 'request: ' + status + ': ' + fetched.statusText),
          })
        }
      }

      return {
        ok: null == err && status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
        ...(null == err ? {} : { err: utility.clean(ctx, err) }),
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, abortError(ctx, err)) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!allowed(options.allow.op, 'graphql')) {
      return {
        ok: false,
        err: new Error('WiseSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('WiseSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.AccountDetail().list()` / `client.AccountDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountDetail(entopts?: Record<string, any>) {
    const self = this
    return new AccountDetailEntity(self, entopts)
  }


  // Entity access: `client.AccountRequirement().list()` / `client.AccountRequirement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountRequirement(entopts?: Record<string, any>) {
    const self = this
    return new AccountRequirementEntity(self, entopts)
  }


  // Entity access: `client.Activity().list()` / `client.Activity().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Activity(entopts?: Record<string, any>) {
    const self = this
    return new ActivityEntity(self, entopts)
  }


  // Entity access: `client.Address().list()` / `client.Address().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Address(entopts?: Record<string, any>) {
    const self = this
    return new AddressEntity(self, entopts)
  }


  // Entity access: `client.AddressRequirement().list()` / `client.AddressRequirement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AddressRequirement(entopts?: Record<string, any>) {
    const self = this
    return new AddressRequirementEntity(self, entopts)
  }


  // Entity access: `client.Balance().list()` / `client.Balance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Balance(entopts?: Record<string, any>) {
    const self = this
    return new BalanceEntity(self, entopts)
  }


  // Entity access: `client.BalanceStatement().list()` / `client.BalanceStatement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BalanceStatement(entopts?: Record<string, any>) {
    const self = this
    return new BalanceStatementEntity(self, entopts)
  }


  // Entity access: `client.BankAccountDetail().list()` / `client.BankAccountDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BankAccountDetail(entopts?: Record<string, any>) {
    const self = this
    return new BankAccountDetailEntity(self, entopts)
  }


  // Entity access: `client.BankAccountDetailsOrder().list()` / `client.BankAccountDetailsOrder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BankAccountDetailsOrder(entopts?: Record<string, any>) {
    const self = this
    return new BankAccountDetailsOrderEntity(self, entopts)
  }


  // Entity access: `client.BatchGroup().list()` / `client.BatchGroup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BatchGroup(entopts?: Record<string, any>) {
    const self = this
    return new BatchGroupEntity(self, entopts)
  }


  // Entity access: `client.BulkSettlement().list()` / `client.BulkSettlement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BulkSettlement(entopts?: Record<string, any>) {
    const self = this
    return new BulkSettlementEntity(self, entopts)
  }


  // Entity access: `client.BusinessProfile().list()` / `client.BusinessProfile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  BusinessProfile(entopts?: Record<string, any>) {
    const self = this
    return new BusinessProfileEntity(self, entopts)
  }


  // Entity access: `client.Card().list()` / `client.Card().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Card(entopts?: Record<string, any>) {
    const self = this
    return new CardEntity(self, entopts)
  }


  // Entity access: `client.CardHolderLimit().list()` / `client.CardHolderLimit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardHolderLimit(entopts?: Record<string, any>) {
    const self = this
    return new CardHolderLimitEntity(self, entopts)
  }


  // Entity access: `client.CardLimit().list()` / `client.CardLimit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardLimit(entopts?: Record<string, any>) {
    const self = this
    return new CardLimitEntity(self, entopts)
  }


  // Entity access: `client.CardOrder().list()` / `client.CardOrder().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardOrder(entopts?: Record<string, any>) {
    const self = this
    return new CardOrderEntity(self, entopts)
  }


  // Entity access: `client.CardSensitiveDetail().list()` / `client.CardSensitiveDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardSensitiveDetail(entopts?: Record<string, any>) {
    const self = this
    return new CardSensitiveDetailEntity(self, entopts)
  }


  // Entity access: `client.CardTransaction().list()` / `client.CardTransaction().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CardTransaction(entopts?: Record<string, any>) {
    const self = this
    return new CardTransactionEntity(self, entopts)
  }


  // Entity access: `client.Case().list()` / `client.Case().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Case(entopts?: Record<string, any>) {
    const self = this
    return new CaseEntity(self, entopts)
  }


  // Entity access: `client.ClaimAccount().list()` / `client.ClaimAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ClaimAccount(entopts?: Record<string, any>) {
    const self = this
    return new ClaimAccountEntity(self, entopts)
  }


  // Entity access: `client.Comparison().list()` / `client.Comparison().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Comparison(entopts?: Record<string, any>) {
    const self = this
    return new ComparisonEntity(self, entopts)
  }


  // Entity access: `client.Contact().list()` / `client.Contact().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Contact(entopts?: Record<string, any>) {
    const self = this
    return new ContactEntity(self, entopts)
  }


  // Entity access: `client.Currency().list()` / `client.Currency().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Currency(entopts?: Record<string, any>) {
    const self = this
    return new CurrencyEntity(self, entopts)
  }


  // Entity access: `client.DeliveryEstimate().list()` / `client.DeliveryEstimate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeliveryEstimate(entopts?: Record<string, any>) {
    const self = this
    return new DeliveryEstimateEntity(self, entopts)
  }


  // Entity access: `client.DeliveryUpdate().list()` / `client.DeliveryUpdate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DeliveryUpdate(entopts?: Record<string, any>) {
    const self = this
    return new DeliveryUpdateEntity(self, entopts)
  }


  // Entity access: `client.DigitalWallet().list()` / `client.DigitalWallet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DigitalWallet(entopts?: Record<string, any>) {
    const self = this
    return new DigitalWalletEntity(self, entopts)
  }


  // Entity access: `client.DirectDebitAccount().list()` / `client.DirectDebitAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DirectDebitAccount(entopts?: Record<string, any>) {
    const self = this
    return new DirectDebitAccountEntity(self, entopts)
  }


  // Entity access: `client.Director().list()` / `client.Director().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Director(entopts?: Record<string, any>) {
    const self = this
    return new DirectorEntity(self, entopts)
  }


  // Entity access: `client.Dispute().list()` / `client.Dispute().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Dispute(entopts?: Record<string, any>) {
    const self = this
    return new DisputeEntity(self, entopts)
  }


  // Entity access: `client.DisputeReason().list()` / `client.DisputeReason().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DisputeReason(entopts?: Record<string, any>) {
    const self = this
    return new DisputeReasonEntity(self, entopts)
  }


  // Entity access: `client.Facetec().list()` / `client.Facetec().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Facetec(entopts?: Record<string, any>) {
    const self = this
    return new FacetecEntity(self, entopts)
  }


  // Entity access: `client.File().list()` / `client.File().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  File(entopts?: Record<string, any>) {
    const self = this
    return new FileEntity(self, entopts)
  }


  // Entity access: `client.Funding().list()` / `client.Funding().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Funding(entopts?: Record<string, any>) {
    const self = this
    return new FundingEntity(self, entopts)
  }


  // Entity access: `client.GpiTracking().list()` / `client.GpiTracking().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GpiTracking(entopts?: Record<string, any>) {
    const self = this
    return new GpiTrackingEntity(self, entopts)
  }


  // Entity access: `client.HoldLimitBreach().list()` / `client.HoldLimitBreach().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  HoldLimitBreach(entopts?: Record<string, any>) {
    const self = this
    return new HoldLimitBreachEntity(self, entopts)
  }


  // Entity access: `client.IncomingTransfer().list()` / `client.IncomingTransfer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  IncomingTransfer(entopts?: Record<string, any>) {
    const self = this
    return new IncomingTransferEntity(self, entopts)
  }


  // Entity access: `client.Jose().list()` / `client.Jose().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Jose(entopts?: Record<string, any>) {
    const self = this
    return new JoseEntity(self, entopts)
  }


  // Entity access: `client.KycReview().list()` / `client.KycReview().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  KycReview(entopts?: Record<string, any>) {
    const self = this
    return new KycReviewEntity(self, entopts)
  }


  // Entity access: `client.LinkRequest().list()` / `client.LinkRequest().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  LinkRequest(entopts?: Record<string, any>) {
    const self = this
    return new LinkRequestEntity(self, entopts)
  }


  // Entity access: `client.Message().list()` / `client.Message().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Message(entopts?: Record<string, any>) {
    const self = this
    return new MessageEntity(self, entopts)
  }


  // Entity access: `client.MultiCurrencyAccount().list()` / `client.MultiCurrencyAccount().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MultiCurrencyAccount(entopts?: Record<string, any>) {
    const self = this
    return new MultiCurrencyAccountEntity(self, entopts)
  }


  // Entity access: `client.OneTimeToken().list()` / `client.OneTimeToken().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  OneTimeToken(entopts?: Record<string, any>) {
    const self = this
    return new OneTimeTokenEntity(self, entopts)
  }


  // Entity access: `client.Ott().list()` / `client.Ott().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Ott(entopts?: Record<string, any>) {
    const self = this
    return new OttEntity(self, entopts)
  }


  // Entity access: `client.Payin().list()` / `client.Payin().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Payin(entopts?: Record<string, any>) {
    const self = this
    return new PayinEntity(self, entopts)
  }


  // Entity access: `client.PayinDepositDetail().list()` / `client.PayinDepositDetail().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PayinDepositDetail(entopts?: Record<string, any>) {
    const self = this
    return new PayinDepositDetailEntity(self, entopts)
  }


  // Entity access: `client.Payment().list()` / `client.Payment().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Payment(entopts?: Record<string, any>) {
    const self = this
    return new PaymentEntity(self, entopts)
  }


  // Entity access: `client.PaymentInitiation().list()` / `client.PaymentInitiation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaymentInitiation(entopts?: Record<string, any>) {
    const self = this
    return new PaymentInitiationEntity(self, entopts)
  }


  // Entity access: `client.PaymentInstrument().list()` / `client.PaymentInstrument().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaymentInstrument(entopts?: Record<string, any>) {
    const self = this
    return new PaymentInstrumentEntity(self, entopts)
  }


  // Entity access: `client.PaymentIntent().list()` / `client.PaymentIntent().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PaymentIntent(entopts?: Record<string, any>) {
    const self = this
    return new PaymentIntentEntity(self, entopts)
  }


  // Entity access: `client.PhoneNumber().list()` / `client.PhoneNumber().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PhoneNumber(entopts?: Record<string, any>) {
    const self = this
    return new PhoneNumberEntity(self, entopts)
  }


  // Entity access: `client.Production().list()` / `client.Production().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Production(entopts?: Record<string, any>) {
    const self = this
    return new ProductionEntity(self, entopts)
  }


  // Entity access: `client.Profile().list()` / `client.Profile().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Profile(entopts?: Record<string, any>) {
    const self = this
    return new ProfileEntity(self, entopts)
  }


  // Entity access: `client.Quote().list()` / `client.Quote().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Quote(entopts?: Record<string, any>) {
    const self = this
    return new QuoteEntity(self, entopts)
  }


  // Entity access: `client.Rate().list()` / `client.Rate().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Rate(entopts?: Record<string, any>) {
    const self = this
    return new RateEntity(self, entopts)
  }


  // Entity access: `client.Recipient().list()` / `client.Recipient().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Recipient(entopts?: Record<string, any>) {
    const self = this
    return new RecipientEntity(self, entopts)
  }


  // Entity access: `client.Rule().list()` / `client.Rule().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Rule(entopts?: Record<string, any>) {
    const self = this
    return new RuleEntity(self, entopts)
  }


  // Entity access: `client.Saml().list()` / `client.Saml().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Saml(entopts?: Record<string, any>) {
    const self = this
    return new SamlEntity(self, entopts)
  }


  // Entity access: `client.ScaDeviceFingerprint().list()` / `client.ScaDeviceFingerprint().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScaDeviceFingerprint(entopts?: Record<string, any>) {
    const self = this
    return new ScaDeviceFingerprintEntity(self, entopts)
  }


  // Entity access: `client.ScaFacemap().list()` / `client.ScaFacemap().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScaFacemap(entopts?: Record<string, any>) {
    const self = this
    return new ScaFacemapEntity(self, entopts)
  }


  // Entity access: `client.ScaOtp().list()` / `client.ScaOtp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScaOtp(entopts?: Record<string, any>) {
    const self = this
    return new ScaOtpEntity(self, entopts)
  }


  // Entity access: `client.ScaSession().list()` / `client.ScaSession().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ScaSession(entopts?: Record<string, any>) {
    const self = this
    return new ScaSessionEntity(self, entopts)
  }


  // Entity access: `client.SettlementAllocation().list()` / `client.SettlementAllocation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SettlementAllocation(entopts?: Record<string, any>) {
    const self = this
    return new SettlementAllocationEntity(self, entopts)
  }


  // Entity access: `client.Simulation().list()` / `client.Simulation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Simulation(entopts?: Record<string, any>) {
    const self = this
    return new SimulationEntity(self, entopts)
  }


  // Entity access: `client.SpendControl().list()` / `client.SpendControl().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SpendControl(entopts?: Record<string, any>) {
    const self = this
    return new SpendControlEntity(self, entopts)
  }


  // Entity access: `client.SpendLimit().list()` / `client.SpendLimit().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SpendLimit(entopts?: Record<string, any>) {
    const self = this
    return new SpendLimitEntity(self, entopts)
  }


  // Entity access: `client.Subscription().list()` / `client.Subscription().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Subscription(entopts?: Record<string, any>) {
    const self = this
    return new SubscriptionEntity(self, entopts)
  }


  // Entity access: `client.TestNotification().list()` / `client.TestNotification().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TestNotification(entopts?: Record<string, any>) {
    const self = this
    return new TestNotificationEntity(self, entopts)
  }


  // Entity access: `client.ThirdPartyTransfer().list()` / `client.ThirdPartyTransfer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ThirdPartyTransfer(entopts?: Record<string, any>) {
    const self = this
    return new ThirdPartyTransferEntity(self, entopts)
  }


  // Entity access: `client.ThreeDSecure().list()` / `client.ThreeDSecure().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ThreeDSecure(entopts?: Record<string, any>) {
    const self = this
    return new ThreeDSecureEntity(self, entopts)
  }


  // Entity access: `client.Token().list()` / `client.Token().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Token(entopts?: Record<string, any>) {
    const self = this
    return new TokenEntity(self, entopts)
  }


  // Entity access: `client.Transfer().list()` / `client.Transfer().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Transfer(entopts?: Record<string, any>) {
    const self = this
    return new TransferEntity(self, entopts)
  }


  // Entity access: `client.TransferRequirement().list()` / `client.TransferRequirement().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TransferRequirement(entopts?: Record<string, any>) {
    const self = this
    return new TransferRequirementEntity(self, entopts)
  }


  // Entity access: `client.Ubo().list()` / `client.Ubo().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Ubo(entopts?: Record<string, any>) {
    const self = this
    return new UboEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }


  // Entity access: `client.Verification().list()` / `client.Verification().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Verification(entopts?: Record<string, any>) {
    const self = this
    return new VerificationEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new WiseSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return WiseSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Wise' }
  }

  toString() {
    return 'Wise ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = WiseSDK


export {
  stdutil,
  config,
  sekreto,


  BaseFeature,
  WiseEntityBase,

  WiseSDK,
  SDK,
}


export type { DirectResult }
