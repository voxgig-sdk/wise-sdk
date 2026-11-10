

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


describe('FundingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Funding()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Funding().create({"profile_id":"x","transfer_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'funding.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"balanceTransactionId":{"a":true,"h":"Balance Transaction Id","n":"balanceTransactionId","r":false,"t":"`$INTEGER`","key$":"balanceTransactionId","index$":0},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":1},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":2}},"name":"funding","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["balanceId","partnerReference","status","type"],"co":{"id":"POST /profiles/{profileId}/transfers/{transferId}/payments","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":123456789,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":16521632,"k":"param","n":"transfer_id","or":"transferId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/profiles/{profileId}/transfers/{transferId}/payments","q":{"exist":["profile_id","transfer_id"]},"r":{"param":{"profileId":"profile_id","transferId":"transfer_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"transfers"},{"var":"transfer_id"},{"lit":"payments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.profile","$.main.kit.entity.transfer"]]},"key$":"funding","name__orig":"funding","Name":"Funding","name_":"funding","name-":"funding","NAME":"FUNDING","index$":32}, {"active":true,"entity":"funding","key$":"BasicFundingFlow","kind":"basic","name":"BasicFundingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"funding_ref01"},"m":{"profile_id":"profile01","transfer_id":"transfer01"},"o":"create","s":[],"v":[],"index$":0}]}, 'Funding', {"POST /profiles/{profileId}/transfers/{transferId}/payments":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"oneOf":[{"allOf":[{"type":"object","properties":{"balanceId":{}},"x-ref":"#/components/schemas/BalanceRequest"},{"type":"object","properties":{"type":{}},"required":["type"],"x-ref":"#/components/schemas/FundingRequestMixin"}],"x-ref":"#/components/schemas/FundingRequestBalance"},{"allOf":[{"type":"object","properties":{"partnerReference":{},"status":{}},"x-ref":"#/components/schemas/TrustedPreFundRequest"},{"type":"object","properties":{"type":{}},"required":["type"],"x-ref":"#/components/schemas/FundingRequestMixin"}],"x-ref":"#/components/schemas/FundingRequestTrustedPreFundBulk"},{"allOf":[{"type":"object","properties":{"partnerReference":{},"status":{}},"x-ref":"#/components/schemas/TrustedPreFundRequest"},{"type":"object","properties":{"type":{}},"required":["type"],"x-ref":"#/components/schemas/FundingRequestMixin"}],"x-ref":"#/components/schemas/FundingRequestTrustedPreFund"}],"discriminator":{"propertyName":"type","mapping":{"BALANCE":"#/components/schemas/FundingRequestBalance","TRUSTED_PRE_FUND_BULK":"#/components/schemas/FundingRequestTrustedPreFundBulk","TRUSTED_PRE_FUND_TX":"#/components/schemas/FundingRequestTrustedPreFund"}},"x-ref":"#/components/schemas/FundingRequest","index$":1},"examples":{"fund-transfer-balance":{"summary":"BALANCE - Fund from a Wise balance (Pre-Funded Wise Balance)","value":{"type":"BALANCE","balanceId":45678901}},"fund-transfer-trusted-pre-fund-bulk":{"summary":"TRUSTED_PRE_FUND_BULK - Cross Currency Bulk Settlement","value":{"type":"TRUSTED_PRE_FUND_BULK","partnerReference":"PARTNER-REF-4711"}},"fund-transfer-trusted-pre-fund-tx":{"summary":"TRUSTED_PRE_FUND_TX - Per-transaction trusted pre-fund","value":{"type":"TRUSTED_PRE_FUND_TX","partnerReference":"PARTNER-REF-4711"}}}}}},"parameters":[{"name":"profileId","in":"path","description":"Profile Id","schema":{"type":"integer","description":"Profile Id","format":"int64","example":123456789},"required":true,"index$":0},{"name":"transferId","in":"path","description":"Transfer Id","schema":{"type":"integer","description":"Transfer Id","format":"int64","example":16521632},"required":true,"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"funding.create.0":"GET-only live run: needs POST /profiles/{profileId}/transfers/{transferId}/payments"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const funding_ref01_ent = client.Funding()
    let funding_ref01_data = setup.data.new.funding['funding_ref01']
    funding_ref01_data['profile_id'] = setup.idmap['profile01']
    funding_ref01_data['transfer_id'] = setup.idmap['transfer01']

    funding_ref01_data = (await funding_ref01_ent.create(funding_ref01_data)).data()
    assert(null != funding_ref01_data)


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
      '../../../../.sdk/test/entity/funding/FundingTestData.json')

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
    ['funding01','funding02','funding03','profile01','profile02','profile03','transfer01','transfer02','transfer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_FUNDING_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_FUNDING_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_FUNDING_ENTID']
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
  
