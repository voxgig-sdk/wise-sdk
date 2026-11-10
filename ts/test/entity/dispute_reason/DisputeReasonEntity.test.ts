

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


describe('DisputeReasonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.DisputeReason()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DisputeReason().list({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dispute_reason.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"The type of reasons available for the dispute.","t":"`$STRING`","key$":"code","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The description of the dispute reason.","t":"`$STRING`","key$":"description","index$":1},"isFraud":{"a":true,"h":"Is Fraud","n":"isFraud","r":false,"sh":"Flag indicating that the dispute reason is fraud-related.","t":"`$BOOLEAN`","key$":"isFraud","index$":2},"subOptions":{"a":true,"h":"Sub Options","n":"subOptions","r":false,"sh":"Optional list of sub-reasons that should be used as the dispute reason.","t":"`$ARRAY`","key$":"subOptions","index$":3},"supportsMultipleTransactions":{"a":true,"h":"Supports Multiple Transactions","n":"supportsMultipleTransactions","r":false,"sh":"Whether the dispute supports multiple transactions.","t":"`$BOOLEAN`","key$":"supportsMultipleTransactions","index$":4},"tooltip":{"a":true,"h":"Tooltip","n":"tooltip","r":false,"sh":"Text to display when showing the dispute form to your users.","t":"`$STRING`","key$":"tooltip","index$":5}},"name":"dispute_reason","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/dispute-form/reasons","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":14547572,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/dispute-form/reasons","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"dispute-form"},{"lit":"reasons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"dispute_reason","name__orig":"dispute_reason","Name":"DisputeReason","name_":"dispute_reason","name-":"dispute-reason","NAME":"DISPUTE_REASON","index$":29}, {"active":true,"entity":"dispute_reason","key$":"BasicDisputeReasonFlow","kind":"basic","name":"BasicDisputeReasonFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dispute_reason_ref01"}}],"index$":0}]}, 'DisputeReason', {"GET /spend/profiles/{profileId}/dispute-form/reasons":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"Your profile ID.","schema":{"type":"integer","format":"int64"},"example":14547572,"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dispute_reason_ref01_data = Object.values(setup.data.existing.dispute_reason)[0] as any

    // LIST
    const dispute_reason_ref01_ent = client.DisputeReason()
    const dispute_reason_ref01_match: any = {}
    dispute_reason_ref01_match['profile_id'] = setup.idmap['profile01']

    const dispute_reason_ref01_list = (await dispute_reason_ref01_ent.list(dispute_reason_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/dispute_reason/DisputeReasonTestData.json')

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
    ['dispute_reason01','dispute_reason02','dispute_reason03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_DISPUTE_REASON_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_DISPUTE_REASON_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_DISPUTE_REASON_ENTID']
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
  
