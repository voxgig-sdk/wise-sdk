

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


describe('DirectDebitAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.DirectDebitAccount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DirectDebitAccount().list({"profile_id":"x","currency":"x","type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'direct_debit_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency of the bank account.","t":"`$STRING`","key$":"currency","index$":0},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Bank account details","t":"`$OBJECT`","key$":"details","index$":1},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"sh":"Direct debit account ID","t":"`$INTEGER`","key$":"id","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Payment type for which the account is used.","t":"`$STRING`","key$":"type","index$":3}},"id":{"field":"id","name":"id"},"name":"direct_debit_account","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["currency","details","type"],"co":{"id":"POST /profiles/{profileId}/direct-debit-accounts","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/direct-debit-accounts","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"direct-debit-accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/direct-debit-accounts","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"USD","explode":true,"k":"query","n":"currency","or":"currency","r":true,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":"ACH","explode":true,"k":"query","n":"type","or":"type","r":true,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/direct-debit-accounts","q":{"exist":["currency","profile_id","type"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"direct-debit-accounts"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"direct_debit_account","name__orig":"direct_debit_account","Name":"DirectDebitAccount","name_":"direct_debit_account","name-":"direct-debit-account","NAME":"DIRECT_DEBIT_ACCOUNT","index$":26}, {"active":true,"entity":"direct_debit_account","key$":"BasicDirectDebitAccountFlow","kind":"basic","name":"BasicDirectDebitAccountFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"direct_debit_account_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"direct_debit_account_ref01"}}],"index$":1}]}, 'DirectDebitAccount', {"POST /profiles/{profileId}/direct-debit-accounts":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"currency":{"type":"string","description":"Currency of the bank account. 3-character currency code — `USD` for ACH direct debits, `CAD` for EFT direct debits.","example":"USD","key$":"currency"},"type":{"type":"string","description":"Payment type for which the account is used.\n\n- `ACH` — US direct debit (USD)\n- `EFT` — CA direct debit (CAD)\n","enum":["ACH","EFT"],"example":"ACH","key$":"type"},"details":{"type":"object","description":"Bank account details.","properties":{"routingNumber":{"type":"string","description":"A valid ABA routing number. For CAD direct debits, the routing number is a combination of an institution number + transit number.","example":"000000000"},"accountNumber":{"type":"string","description":"A valid bank account number.","example":"0000000000"},"accountType":{"type":"string","description":"Bank account type.\n\n- `CHECKING` — Checking account (USD, CAD)\n- `SAVINGS` — Savings account (USD, CAD)\n","enum":["CHECKING","SAVINGS"],"example":"CHECKING"}},"key$":"details"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"description":"Your profile ID.","schema":{"type":"integer","format":"int64"},"example":12345678,"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /profiles/{profileId}/direct-debit-accounts":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"Your profile ID.","schema":{"type":"integer","format":"int64"},"example":12345678,"index$":0},{"name":"type","in":"query","required":true,"description":"Payment type for which the account is used.\n\n- `ACH` — US direct debit (USD)\n- `EFT` — CA direct debit (CAD)\n","schema":{"type":"string","enum":["ACH","EFT"]},"example":"ACH","index$":1},{"name":"currency","in":"query","required":true,"description":"Currency of the bank account. 3-character currency code — `USD` for ACH direct debits, `CAD` for EFT direct debits.","schema":{"type":"string"},"example":"USD","index$":2},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":3}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"direct_debit_account.create.0":"GET-only live run: needs POST /profiles/{profileId}/direct-debit-accounts"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const direct_debit_account_ref01_ent = client.DirectDebitAccount()
    let direct_debit_account_ref01_data = setup.data.new.direct_debit_account['direct_debit_account_ref01']
    direct_debit_account_ref01_data['profile_id'] = setup.idmap['profile01']

    direct_debit_account_ref01_data = (await direct_debit_account_ref01_ent.create(direct_debit_account_ref01_data)).data()
    assert(null != direct_debit_account_ref01_data.id)


    // LIST
    const direct_debit_account_ref01_match: any = {}
    direct_debit_account_ref01_match['profile_id'] = setup.idmap['profile01']

    const direct_debit_account_ref01_list = (await direct_debit_account_ref01_ent.list(direct_debit_account_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(direct_debit_account_ref01_list, { id: direct_debit_account_ref01_data.id })))


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
      '../../../../.sdk/test/entity/direct_debit_account/DirectDebitAccountTestData.json')

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
    ['direct_debit_account01','direct_debit_account02','direct_debit_account03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_DIRECT_DEBIT_ACCOUNT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_DIRECT_DEBIT_ACCOUNT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_DIRECT_DEBIT_ACCOUNT_ENTID']
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
  
