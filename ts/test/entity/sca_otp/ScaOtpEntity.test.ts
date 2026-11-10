

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


describe('ScaOtpEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.ScaOtp()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ScaOtp().remove({"phone_number_id":"x","user_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sca_otp.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"sca_otp","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /one-time-token/sms/trigger","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/sms/trigger","q":{"$action":"sms","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"sms"},{"lit":"trigger"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /one-time-token/voice/trigger","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/voice/trigger","q":{"$action":"voice","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"voice"},{"lit":"trigger"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"POST /one-time-token/whatsapp/trigger","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"one_time_token","or":"One-Time-Token","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/one-time-token/whatsapp/trigger","q":{"$action":"whatsapp","exist":["one_time_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"one-time-token"},{"lit":"whatsapp"},{"lit":"trigger"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /application/users/{userId}/phone-numbers/{phoneNumberId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"phone_number_id","or":"phoneNumberId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"user_id","or":"userId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"DELETE","o":"/application/users/{userId}/phone-numbers/{phoneNumberId}","q":{"exist":["phone_number_id","user_id"]},"r":{"param":{"phoneNumberId":"phone_number_id","userId":"user_id"}},"s":[{"lit":"application"},{"lit":"users"},{"var":"user_id"},{"lit":"phone-numbers"},{"var":"phone_number_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.user","$.main.kit.entity.phone_number"]]},"key$":"sca_otp","name__orig":"sca_otp","Name":"ScaOtp","name_":"sca_otp","name-":"sca-otp","NAME":"SCA_OTP","index$":59}, {"active":true,"entity":"sca_otp","key$":"BasicScaOtpFlow","kind":"basic","name":"BasicScaOtpFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"sca_otp_ref01"},"m":{"user_id":"user01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"sca_otp_ref01","suffix":"_rm0"},"m":{"id":"sca_otp01","user_id":"user01"},"o":"remove","s":[],"v":[],"unreachable":true}]}, 'ScaOtp', {"POST /one-time-token/sms/trigger":{"protocol":"http","parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /one-time-token/voice/trigger":{"protocol":"http","parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /one-time-token/whatsapp/trigger":{"protocol":"http","parameters":[{"name":"One-Time-Token","in":"header","required":true,"description":"Text value of a OTT.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"DELETE /application/users/{userId}/phone-numbers/{phoneNumberId}":{"protocol":"http","parameters":[{"name":"userId","in":"path","required":true,"description":"User ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"phoneNumberId","in":"path","required":true,"description":"ID of a phone number.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"sca_otp.create.0":"GET-only live run: needs POST /one-time-token/sms/trigger","sca_otp.remove.1":"GET-only live run: needs DELETE /application/users/{userId}/phone-numbers/{phoneNumberId}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let sca_otp_ref01_data = Object.values(setup.data.existing.sca_otp)[0] as any

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
      '../../../../.sdk/test/entity/sca_otp/ScaOtpTestData.json')

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
    ['sca_otp01','sca_otp02','sca_otp03','user01','user02','user03','phone_number01','phone_number02','phone_number03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_SCA_OTP_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_SCA_OTP_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_SCA_OTP_ENTID']
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
  
