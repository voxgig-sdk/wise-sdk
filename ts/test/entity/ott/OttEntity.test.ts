

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


describe('OttEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Ott()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Ott().load({"actionType":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ott.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actionType":{"a":true,"h":"Action Type","n":"actionType","r":false,"sh":"The action bound to the one time token.","t":"`$STRING`","key$":"actionType","index$":0},"challenges":{"a":true,"h":"Challenges","n":"challenges","r":false,"sh":"Array of challenge objects.","t":"`$ARRAY`","key$":"challenges","index$":1},"oneTimeToken":{"a":true,"h":"One Time Token","n":"oneTimeToken","r":false,"sh":"Unique identifier of a one time token.","t":"`$STRING`","key$":"oneTimeToken","index$":2},"userId":{"a":true,"fo":"int64","h":"User Id","n":"userId","r":false,"sh":"Creator of this one time token.","t":"`$INTEGER`","key$":"userId","index$":3},"validity":{"a":true,"fo":"int64","h":"Validity","n":"validity","r":false,"sh":"Seconds until the one time token becomes expired.","t":"`$INTEGER`","key$":"validity","index$":4}},"name":"ott","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["otpCode"],"co":{"id":"POST /one-time-token/sms/verify","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/sms/verify","q":{"$action":"sms","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"sms"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.oneTimeTokenProperties`"},"index$":0},{"a":true,"bf":["otpCode"],"co":{"id":"POST /one-time-token/voice/verify","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/voice/verify","q":{"$action":"voice","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"voice"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.oneTimeTokenProperties`"},"index$":1},{"a":true,"bf":["otpCode"],"co":{"id":"POST /one-time-token/whatsapp/verify","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/whatsapp/verify","q":{"$action":"whatsapp","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"whatsapp"},{"lit":"verify"}],"t":{"req":"`reqdata`","res":"`body.oneTimeTokenProperties`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /one-time-token/status","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/one-time-token/status","q":{"exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body.oneTimeTokenProperties`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ott","name__orig":"ott","Name":"Ott","name_":"ott","name-":"ott","NAME":"OTT","index$":42}, {"active":true,"entity":"ott","key$":"BasicOttFlow","kind":"basic","name":"BasicOttFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"ott_ref01"},"m":{},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{"ref":"ott_ref01","srcdatavar":"ott_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ott_ref01"}}],"index$":0}]}, 'Ott', {"POST /one-time-token/sms/verify":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"otpCode":{"type":"string","description":"6 digit OTP code in text format.","example":"111111"}}}}}},"parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /one-time-token/voice/verify":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"otpCode":{"type":"string","description":"6 digit OTP code in text format.","example":"111111"}}}}}},"parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /one-time-token/whatsapp/verify":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"otpCode":{"type":"string","description":"6 digit OTP code in text format.","example":"111111"}}}}}},"parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /one-time-token/status":{"protocol":"http","parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"ott.create.0":"GET-only live run: needs POST /one-time-token/sms/verify"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ott_ref01_data = Object.values(setup.data.existing.ott)[0] as any

    // LOAD
    const ott_ref01_ent = client.Ott()
    const ott_ref01_match_dt0: any = {}
    const ott_ref01_data_dt0 = (await ott_ref01_ent.load(ott_ref01_match_dt0)).data()
    assert(null != ott_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/ott/OttTestData.json')

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
    ['ott01','ott02','ott03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_OTT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_OTT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_OTT_ENTID']
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
  
