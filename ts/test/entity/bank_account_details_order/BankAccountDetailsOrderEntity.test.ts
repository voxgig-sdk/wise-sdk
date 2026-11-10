

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


describe('BankAccountDetailsOrderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.BankAccountDetailsOrder()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BankAccountDetailsOrder().list({"profile_id":"x","currency":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bank_account_details_order.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accountDetailsId":{"a":true,"h":"Account Details Id","n":"accountDetailsId","r":false,"sh":"Unique ID of the issued account details.","t":"`$INTEGER`","key$":"accountDetailsId","index$":0},"balanceId":{"a":true,"h":"Balance Id","n":"balanceId","r":false,"sh":"ID of the balance the order is for.","t":["`$ONE`",["`$INTEGER`","`$NULL`"]],"key$":"balanceId","index$":1},"creationTime":{"a":true,"fo":"date-time","h":"Creation Time","n":"creationTime","r":false,"sh":"Timestamp of when the order was created.","t":"`$STRING`","key$":"creationTime","index$":2},"currency":{"a":true,"h":"Currency","n":"currency","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Currency code (ISO 4217 Alphabetic Code).","t":"`$STRING`","key$":"currency","index$":3},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"sh":"Unique ID of the order.","t":"`$STRING`","key$":"id","index$":4},"modificationTime":{"a":true,"fo":"date-time","h":"Modification Time","n":"modificationTime","r":false,"sh":"Timestamp of the last modification to the order.","t":"`$STRING`","key$":"modificationTime","index$":5},"requirements":{"a":true,"h":"Requirements","n":"requirements","r":false,"sh":"List of requirements to fulfill the order.","t":"`$ARRAY`","key$":"requirements","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Order status.","t":"`$STRING`","key$":"status","index$":7}},"id":{"field":"id","name":"id"},"name":"bank_account_details_order","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["currency"],"co":{"id":"POST /profiles/{profileId}/account-details-orders","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/account-details-orders","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"account-details-orders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/account-details-orders","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"GBP","explode":true,"k":"query","n":"currency","or":"currency","r":true,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/profiles/{profileId}/account-details-orders","q":{"exist":["currency","profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"account-details-orders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"bank_account_details_order","name__orig":"bank_account_details_order","Name":"BankAccountDetailsOrder","name_":"bank_account_details_order","name-":"bank-account-details-order","NAME":"BANK_ACCOUNT_DETAILS_ORDER","index$":8}, {"active":true,"entity":"bank_account_details_order","key$":"BasicBankAccountDetailsOrderFlow","kind":"basic","name":"BasicBankAccountDetailsOrderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bank_account_details_order_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"bank_account_details_order_ref01"}}],"index$":1}]}, 'BankAccountDetailsOrder', {"POST /profiles/{profileId}/account-details-orders":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["currency"],"properties":{"currency":{"type":"string","description":"Balance currency (ISO 4217 Alphabetic Code) for the requested bank account details.","example":"EUR","key$":"currency"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile to create the bank account details order for.","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /profiles/{profileId}/account-details-orders":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile to list bank account detail orders for.","index$":0},{"name":"currency","in":"query","required":true,"schema":{"type":"string","example":"GBP"},"description":"Currency code (ISO 4217 Alphabetic Code).","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"bank_account_details_order.create.0":"GET-only live run: needs POST /profiles/{profileId}/account-details-orders"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bank_account_details_order_ref01_ent = client.BankAccountDetailsOrder()
    let bank_account_details_order_ref01_data = setup.data.new.bank_account_details_order['bank_account_details_order_ref01']
    bank_account_details_order_ref01_data['profile_id'] = setup.idmap['profile01']

    bank_account_details_order_ref01_data = (await bank_account_details_order_ref01_ent.create(bank_account_details_order_ref01_data)).data()
    assert(null != bank_account_details_order_ref01_data.id)


    // LIST
    const bank_account_details_order_ref01_match: any = {}
    bank_account_details_order_ref01_match['profile_id'] = setup.idmap['profile01']

    const bank_account_details_order_ref01_list = (await bank_account_details_order_ref01_ent.list(bank_account_details_order_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(bank_account_details_order_ref01_list, { id: bank_account_details_order_ref01_data.id })))


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
      '../../../../.sdk/test/entity/bank_account_details_order/BankAccountDetailsOrderTestData.json')

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
    ['bank_account_details_order01','bank_account_details_order02','bank_account_details_order03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_BANK_ACCOUNT_DETAILS_ORDER_ENTID']
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
  
