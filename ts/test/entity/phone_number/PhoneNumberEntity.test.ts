

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


describe('PhoneNumberEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.PhoneNumber()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PhoneNumber().create({"user_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'phone_number.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"clientId":{"a":true,"h":"Client Id","n":"clientId","r":false,"sh":"Client ID of which this phone number belongs to.","t":"`$STRING`","key$":"clientId","index$":0},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"sh":"ID of the phone number.","t":"`$INTEGER`","key$":"id","index$":1},"phoneNumber":{"a":true,"h":"Phone Number","n":"phoneNumber","r":false,"sh":"A text representation of phone number.","t":"`$STRING`","key$":"phoneNumber","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of phone number when used in authentication.","t":"`$STRING`","key$":"type","index$":3},"verified":{"a":true,"h":"Verified","n":"verified","r":false,"sh":"Indicator if phone number is verified.","t":"`$BOOLEAN`","key$":"verified","index$":4}},"id":{"field":"id","name":"id"},"name":"phone_number","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["phoneNumber"],"co":{"id":"POST /application/users/{userId}/phone-numbers","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"user_id","or":"userId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/application/users/{userId}/phone-numbers","q":{"exist":["user_id"]},"r":{"param":{"userId":"user_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"application"},{"lit":"users"},{"var":"user_id"},{"lit":"phone-numbers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.user"]]},"key$":"phone_number","name__orig":"phone_number","Name":"PhoneNumber","name_":"phone_number","name-":"phone-number","NAME":"PHONE_NUMBER","index$":49}, {"active":true,"entity":"phone_number","key$":"BasicPhoneNumberFlow","kind":"basic","name":"BasicPhoneNumberFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"phone_number_ref01"},"m":{"user_id":"user01"},"o":"create","s":[],"v":[],"index$":0}]}, 'PhoneNumber', {"POST /application/users/{userId}/phone-numbers":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"phoneNumber":{"type":"string","description":"A valid phone number in string.","key$":"phoneNumber"}},"index$":1}}}},"parameters":[{"name":"userId","in":"path","required":true,"description":"User ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"phone_number.create.0":"GET-only live run: needs POST /application/users/{userId}/phone-numbers"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const phone_number_ref01_ent = client.PhoneNumber()
    let phone_number_ref01_data = setup.data.new.phone_number['phone_number_ref01']
    phone_number_ref01_data['user_id'] = setup.idmap['user01']

    phone_number_ref01_data = (await phone_number_ref01_ent.create(phone_number_ref01_data)).data()
    assert(null != phone_number_ref01_data.id)


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
      '../../../../.sdk/test/entity/phone_number/PhoneNumberTestData.json')

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
    ['phone_number01','phone_number02','phone_number03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_PHONE_NUMBER_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_PHONE_NUMBER_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_PHONE_NUMBER_ENTID']
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
  
