

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


describe('PayinDepositDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.PayinDepositDetail()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PayinDepositDetail().load({"profile_id":"x","transfer_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'payin_deposit_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"payinBank":{"a":true,"h":"Payin Bank","n":"payinBank","r":false,"sh":"Information about the receiving bank.","t":"`$OBJECT`","key$":"payinBank","index$":0},"payinBankAccount":{"a":true,"h":"Payin Bank Account","n":"payinBankAccount","r":false,"sh":"Bank account details to use to send the payment to.","t":"`$OBJECT`","key$":"payinBankAccount","index$":1},"wiseInformation":{"a":true,"h":"Wise Information","n":"wiseInformation","r":false,"sh":"Information about the receiving Wise entity, the owner of the bank account.","t":"`$OBJECT`","key$":"wiseInformation","index$":2}},"name":"payin_deposit_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"transfer_id","or":"transferId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer","q":{"exist":["profile_id","transfer_id"]},"r":{"param":{"profileId":"profile_id","transferId":"transfer_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"transfers"},{"var":"transfer_id"},{"lit":"deposit-details"},{"lit":"bank-transfer"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.profile","$.main.kit.entity.transfer"]]},"key$":"payin_deposit_detail","name__orig":"payin_deposit_detail","Name":"PayinDepositDetail","name_":"payin_deposit_detail","name-":"payin-deposit-detail","NAME":"PAYIN_DEPOSIT_DETAIL","index$":44}, {"active":true,"entity":"payin_deposit_detail","key$":"BasicPayinDepositDetailFlow","kind":"basic","name":"BasicPayinDepositDetailFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"payin_deposit_detail_ref01","srcdatavar":"payin_deposit_detail_ref01_data","suffix":"_dt0"},"m":{"id":"payin_deposit_detail01","profile_id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-payin_deposit_detail_ref01"}}],"unreachable":true}]}, 'PayinDepositDetail', {"GET /profiles/{profileId}/transfers/{transferId}/deposit-details/bank-transfer":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"Profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"transferId","in":"path","required":true,"description":"Transfer ID.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let payin_deposit_detail_ref01_data = Object.values(setup.data.existing.payin_deposit_detail)[0] as any

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
      '../../../../.sdk/test/entity/payin_deposit_detail/PayinDepositDetailTestData.json')

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
    ['payin_deposit_detail01','payin_deposit_detail02','payin_deposit_detail03','profile01','profile02','profile03','transfer01','transfer02','transfer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_PAYIN_DEPOSIT_DETAIL_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_PAYIN_DEPOSIT_DETAIL_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_PAYIN_DEPOSIT_DETAIL_ENTID']
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
  
