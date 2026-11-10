

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { WiseSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('TransferEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Transfer()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('transfer hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WiseSDK.test(offline).Transfer().stream('list')) { }
    }, /offline/)

    for await (const _item of WiseSDK.test(offline).Transfer()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WiseSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Transfer().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WiseSDK.test().Transfer().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WiseSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Transfer().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Transfer().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Transfer().list({"created_date_end":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'transfer.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"business":{"a":true,"fo":"int64","h":"Business","n":"business","r":false,"sh":"Your business profile ID","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"business","index$":0},"created":{"a":true,"fo":"date-time","h":"Created","n":"created","r":false,"sh":"Timestamp when transfer was created","t":"`$STRING`","key$":"created","index$":1},"customerTransactionId":{"a":true,"fo":"uuid","h":"Customer Transaction Id","n":"customerTransactionId","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Unique identifier randomly generated per transfer request by the calling client","t":"`$STRING`","key$":"customerTransactionId","index$":2},"details":{"a":true,"h":"Details","n":"details","r":false,"t":"`$OBJECT`","key$":"details","index$":3},"hasActiveIssues":{"a":true,"h":"Has Active Issues","n":"hasActiveIssues","r":false,"sh":"Are there any pending issues which stop executing the transfer?","t":"`$BOOLEAN`","key$":"hasActiveIssues","index$":4},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"sh":"Transfer ID","t":"`$INTEGER`","key$":"id","index$":5},"payinSessionId":{"a":true,"fo":"uuid","h":"Payin Session Id","n":"payinSessionId","r":false,"sh":"ID of the Payin Session generated for the transfer, which can be used for certain payin methods when funding the transfer","t":"`$STRING`","key$":"payinSessionId","index$":6},"quote":{"a":true,"fo":"int64","h":"Quote","n":"quote","r":false,"sh":"V1 quote ID","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"quote","index$":7},"quoteUuid":{"a":true,"fo":"uuid","h":"Quote Uuid","n":"quoteUuid","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"V2 quote ID","t":"`$STRING`","key$":"quoteUuid","index$":8},"rate":{"a":true,"h":"Rate","n":"rate","r":false,"sh":"Exchange rate value","t":"`$NUMBER`","key$":"rate","index$":9},"reference":{"a":true,"de":true,"h":"Reference","n":"reference","r":false,"sh":"Deprecated, use `details.reference` instead","t":"`$STRING`","key$":"reference","index$":10},"sourceAccount":{"a":true,"fo":"int64","h":"Source Account","n":"sourceAccount","r":false,"sh":"Refund recipient account ID","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"sourceAccount","index$":11},"sourceCurrency":{"a":true,"h":"Source Currency","n":"sourceCurrency","r":false,"sh":"Source currency code","t":"`$STRING`","key$":"sourceCurrency","index$":12},"sourceValue":{"a":true,"h":"Source Value","n":"sourceValue","r":false,"sh":"Transfer amount in source currency","t":"`$NUMBER`","key$":"sourceValue","index$":13},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Transfer current status.","t":"`$STRING`","key$":"status","index$":14},"targetAccount":{"a":true,"fo":"int64","h":"Target Account","n":"targetAccount","op":{"create":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"Recipient account ID","t":"`$INTEGER`","key$":"targetAccount","index$":15},"targetCurrency":{"a":true,"h":"Target Currency","n":"targetCurrency","r":false,"sh":"Target currency code","t":"`$STRING`","key$":"targetCurrency","index$":16},"targetValue":{"a":true,"h":"Target Value","n":"targetValue","r":false,"sh":"Transfer amount in target currency","t":"`$NUMBER`","key$":"targetValue","index$":17},"transferRequest":{"a":true,"de":true,"h":"Transfer Request","n":"transferRequest","r":false,"sh":"Deprecated","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"transferRequest","index$":18},"user":{"a":true,"fo":"int64","h":"User","n":"user","r":false,"sh":"Your user ID","t":"`$INTEGER`","key$":"user","index$":19}},"id":{"field":"id","name":"id"},"name":"transfer","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["customerTransactionId","details","quoteUuid","sourceAccount","targetAccount"],"co":{"id":"POST /transfers","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/transfers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"transfers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /transfers","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"created_date_end","or":"createdDateEnd","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"created_date_start","or":"createdDateStart","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"limit","or":"limit","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"offset","or":"offset","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"explode":true,"k":"query","n":"profile","or":"profile","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"source_currency","or":"sourceCurrency","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"target_currency","or":"targetCurrency","r":false,"style":"form","t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/transfers","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"transfers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /transfers/{transferId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transfers/{transferId}","q":{"exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"transfers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /transfers/{transferId}/documents/noc","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transfers/{transferId}/documents/noc","q":{"$action":"document_noc","exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"binary":true,"kind":"raw","media":"application/pdf"},"s":[{"lit":"transfers"},{"var":"id"},{"lit":"documents"},{"lit":"noc"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /transfers/{transferId}/invoices/bankingpartner","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transfers/{transferId}/invoices/bankingpartner","q":{"$action":"invoice_bankingpartner","exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"transfers"},{"var":"id"},{"lit":"invoices"},{"lit":"bankingpartner"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /transfers/{transferId}/receipt.pdf","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transfers/{transferId}/receipt.pdf","q":{"$action":"receiptpdf","exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"binary":true,"kind":"raw","media":"application/pdf"},"s":[{"lit":"transfers"},{"var":"id"},{"lit":"receipt.pdf"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /transfers/{transferId}/us-combined-receipt.pdf","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/transfers/{transferId}/us-combined-receipt.pdf","q":{"$action":"us_combined_receiptpdf","exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"binary":true,"kind":"raw","media":"application/pdf"},"s":[{"lit":"transfers"},{"var":"id"},{"lit":"us-combined-receipt.pdf"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /transfers/{transferId}/cancel","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"PUT","o":"/transfers/{transferId}/cancel","q":{"$action":"cancel","exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"transfers"},{"var":"id"},{"lit":"cancel"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"transfer","name__orig":"transfer","Name":"Transfer","name_":"transfer","name-":"transfer","NAME":"TRANSFER","index$":70}, {"active":true,"entity":"transfer","key$":"BasicTransferFlow","kind":"basic","name":"BasicTransferFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"transfer_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"transfer_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"transfer_ref01","srcdatavar":"transfer_ref01_data","suffix":"_up0","textfield":"created"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transfer_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"transfer_ref01","srcdatavar":"transfer_ref01_data","suffix":"_dt0"},"m":{"id":"transfer01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-transfer_ref01"}}],"index$":3,"route":"GET /transfers/{transferId}","record":{}}]}, 'Transfer', {"POST /transfers":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["targetAccount","quoteUuid","customerTransactionId"],"properties":{"sourceAccount":{"type":"integer","format":"int64","description":"Refund recipient account ID","key$":"sourceAccount"},"targetAccount":{"type":"integer","format":"int64","description":"Recipient account ID. You can create multiple transfers to same recipient account","key$":"targetAccount"},"quoteUuid":{"type":"string","format":"uuid","description":"V2 quote ID. You can only create one transfer per one quote. You cannot use same quote ID to create multiple transfers","key$":"quoteUuid"},"customerTransactionId":{"type":"string","format":"uuid","description":"Required to perform idempotency check to avoid duplicate transfers in case of network failures or timeouts","key$":"customerTransactionId"},"details":{"type":"object","properties":{"reference":{"type":"string","description":"Recipient will see this reference text in their bank statement. Maximum allowed characters depends on the currency route. See [Business Payments Tips](https://wise.com/help/articles/2932870/tips-for-paying-invoices) for a full list"},"transferPurpose":{"type":"string","description":"Conditionally required. For example when target currency is THB. See [Transfer Requirements](/api-reference/transfer/transferrequirementsvalidate) for conditions"},"transferPurposeSubTransferPurpose":{"type":"string","description":"Conditionally required. For example when target currency is CNY. See [Transfer Requirements](/api-reference/transfer/transferrequirementsvalidate) for conditions"},"transferPurposeInvoiceNumber":{"type":"string","description":"Conditionally required. For example when target currency is INR. See [Transfer Requirements](/api-reference/transfer/transferrequirementsvalidate) for conditions"},"sourceOfFunds":{"type":"string","description":"Conditionally required. For example when target currency is USD and transfer amount exceeds 80k. See [Transfer Requirements](/api-reference/transfer/transferrequirementsvalidate) for conditions"}},"key$":"details"}},"index$":1},"examples":{"basic":{"summary":"Basic transfer","value":{"targetAccount":8692237,"quoteUuid":"8fa9be20-ba43-4b15-abbb-9424e1481050","customerTransactionId":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","details":{"reference":"Invoice 2026-001"}}},"with-transfer-requirements":{"summary":"With conditionally required fields","value":{"targetAccount":8692237,"quoteUuid":"8fa9be20-ba43-4b15-abbb-9424e1481050","customerTransactionId":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","details":{"reference":"Invoice 2026-001","transferPurpose":"verification.transfers.purpose.pay.bills","transferPurposeSubTransferPurpose":"INTERPRETATION_SERVICE","sourceOfFunds":"verification.source.of.funds.salary"}}}}}}},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]},"GET /transfers":{"protocol":"http","parameters":[{"name":"profile","in":"query","required":false,"description":"User profile ID. If parameter is omitted, defaults to user's personal profile","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"status","in":"query","required":false,"description":"Comma separated list of one or more status codes to filter transfers.\nSee [Transfer statuses](/guides/product/send-money/tracking/transfer-statuses) for complete list of statuses.","schema":{"type":"string"},"index$":1},{"name":"sourceCurrency","in":"query","required":false,"description":"Source currency code","schema":{"type":"string"},"index$":2},{"name":"targetCurrency","in":"query","required":false,"description":"Target currency code","schema":{"type":"string"},"index$":3},{"name":"createdDateStart","in":"query","required":false,"description":"Starting date to filter transfers, inclusive of the provided date","schema":{"type":"string","format":"date-time"},"index$":4},{"name":"createdDateEnd","in":"query","required":false,"description":"Ending date to filter transfers, inclusive of the provided date","schema":{"type":"string","format":"date-time"},"index$":5},{"name":"limit","in":"query","required":false,"description":"Maximum number of records to be returned in response","schema":{"type":"integer","format":"int32"},"index$":6},{"name":"offset","in":"query","required":false,"description":"Starting record number","schema":{"type":"integer","format":"int32"},"index$":7},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":8}]},"GET /transfers/{transferId}":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /transfers/{transferId}/documents/noc":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /transfers/{transferId}/invoices/bankingpartner":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /transfers/{transferId}/receipt.pdf":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /transfers/{transferId}/us-combined-receipt.pdf":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"PUT /transfers/{transferId}/cancel":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The transfer ID","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"transfer.create.0":"GET-only live run: needs POST /transfers","transfer.update.2":"GET-only live run: needs PUT /transfers/{transferId}/cancel"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const transfer_ref01_ent = client.Transfer()
    let transfer_ref01_data = setup.data.new.transfer['transfer_ref01']

    transfer_ref01_data = (await transfer_ref01_ent.create(transfer_ref01_data)).data()
    assert(null != transfer_ref01_data.id)


    // LIST
    const transfer_ref01_match: any = {}

    const transfer_ref01_list = (await transfer_ref01_ent.list(transfer_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(transfer_ref01_list, { id: transfer_ref01_data.id })))


    // UPDATE
    const transfer_ref01_data_up0: any = {}
    transfer_ref01_data_up0.id = transfer_ref01_data.id

    const transfer_ref01_markdef_up0 = { name: 'created', value: 'Mark01-transfer_ref01_' + setup.now }
    ;(transfer_ref01_data_up0 as any)[transfer_ref01_markdef_up0.name] = transfer_ref01_markdef_up0.value

    const transfer_ref01_resdata_up0 = (await transfer_ref01_ent.update(transfer_ref01_data_up0)).data()
    assert(transfer_ref01_resdata_up0.id === transfer_ref01_data_up0.id)

    assert((transfer_ref01_resdata_up0 as any)[transfer_ref01_markdef_up0.name] === transfer_ref01_markdef_up0.value)


    // LOAD
    const transfer_ref01_match_dt0: any = {}
    transfer_ref01_match_dt0.id = transfer_ref01_data.id
    const transfer_ref01_data_dt0 = (await transfer_ref01_ent.load(transfer_ref01_match_dt0)).data()
    assert(transfer_ref01_data_dt0.id === transfer_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/transfer/TransferTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = WiseSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['transfer01','transfer02','transfer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_TRANSFER_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_TRANSFER_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_TRANSFER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new WiseSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.WISE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.WISE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
