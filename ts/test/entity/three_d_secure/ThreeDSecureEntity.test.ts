

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


describe('ThreeDSecureEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.ThreeDSecure()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ThreeDSecure().create({"profile_id":"x","challengeStatus":"x","transactionReference":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'three_d_secure.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"challengeStatus":{"a":true,"h":"Challenge Status","n":"challengeStatus","r":true,"sh":"The customer's response to the 3DS challenge.","t":"`$STRING`","key$":"challengeStatus","index$":0},"transactionReference":{"a":true,"h":"Transaction Reference","n":"transactionReference","r":true,"sh":"Transaction reference as received in the 3DS challenge webhook event.","t":"`$STRING`","key$":"transactionReference","index$":1}},"name":"three_d_secure","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["challengeStatus","transactionReference"],"co":{"id":"POST /spend/profiles/{profileId}/3dsecure/challenge-result","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/spend/profiles/{profileId}/3dsecure/challenge-result","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"3dsecure"},{"lit":"challenge-result"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"three_d_secure","name__orig":"three_d_secure","Name":"ThreeDSecure","name_":"three_d_secure","name-":"three-d-secure","NAME":"THREE_D_SECURE","index$":68}, {"active":true,"entity":"three_d_secure","key$":"BasicThreeDSecureFlow","kind":"basic","name":"BasicThreeDSecureFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"three_d_secure_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0}]}, 'ThreeDSecure', {"POST /spend/profiles/{profileId}/3dsecure/challenge-result":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["transactionReference","challengeStatus"],"properties":{"transactionReference":{"type":"string","description":"Transaction reference as received in the 3DS challenge webhook event.","example":"148579538","key$":"transactionReference"},"challengeStatus":{"type":"string","description":"The customer's response to the 3DS challenge.","enum":["APPROVED","REJECTED"],"example":"APPROVED","key$":"challengeStatus"}},"x-ref":"#/components/schemas/ChallengeResultRequest","index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"description":"The profile ID (personal or business) associated with the 3DS challenge.","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"three_d_secure.create.0":"GET-only live run: needs POST /spend/profiles/{profileId}/3dsecure/challenge-result"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const three_d_secure_ref01_ent = client.ThreeDSecure()
    let three_d_secure_ref01_data = setup.data.new.three_d_secure['three_d_secure_ref01']
    three_d_secure_ref01_data['profile_id'] = setup.idmap['profile01']

    three_d_secure_ref01_data = (await three_d_secure_ref01_ent.create(three_d_secure_ref01_data)).data()
    assert(null != three_d_secure_ref01_data)


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
      '../../../../.sdk/test/entity/three_d_secure/ThreeDSecureTestData.json')

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
    ['three_d_secure01','three_d_secure02','three_d_secure03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_THREE_D_SECURE_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_THREE_D_SECURE_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_THREE_D_SECURE_ENTID']
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
  
