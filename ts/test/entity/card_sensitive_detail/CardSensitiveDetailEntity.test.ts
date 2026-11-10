

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


describe('CardSensitiveDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.CardSensitiveDetail()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CardSensitiveDetail().load({"encryptedPayload":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_sensitive_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"encryptedPayload":{"a":true,"h":"Encrypted Payload","n":"encryptedPayload","r":true,"sh":"Your [JWE payload](/guides/product/issue-cards/sensitive-card-details).","t":"`$STRING`","key$":"encryptedPayload","index$":0},"key":{"a":true,"h":"Key","n":"key","r":false,"sh":"The RSA public key.","t":"`$STRING`","key$":"key","index$":1},"keyVersion":{"a":true,"h":"Key Version","n":"keyVersion","r":true,"sh":"The version of the key to use.","t":"`$INTEGER`","key$":"keyVersion","index$":2},"version":{"a":true,"fo":"int32","h":"Version","n":"version","r":false,"sh":"Version of the encryption key.","t":"`$INTEGER`","key$":"version","index$":3}},"name":"card_sensitive_detail","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["encryptedPayload","keyVersion"],"co":{"id":"POST /twcard-data/v1/sensitive-card-data/details","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"ca0c8154-1e14-4464-a1ce-dcea7dc3de52","explode":false,"k":"header","n":"x_tw_twcard_card_token","or":"x-tw-twcard-card-token","r":true,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/twcard-data/v1/sensitive-card-data/details","q":{"$action":"details","exist":["x_tw_twcard_card_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"twcard-data"},{"lit":"v1"},{"lit":"sensitive-card-data"},{"lit":"details"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["encryptedPayload","keyVersion"],"co":{"id":"POST /twcard-data/v1/sensitive-card-data/pin","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"ca0c8154-1e14-4464-a1ce-dcea7dc3de52","explode":false,"k":"header","n":"x_tw_twcard_card_token","or":"x-tw-twcard-card-token","r":true,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/twcard-data/v1/sensitive-card-data/pin","q":{"$action":"pin","exist":["x_tw_twcard_card_token"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"twcard-data"},{"lit":"v1"},{"lit":"sensitive-card-data"},{"lit":"pin"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["encryptedPayload","keyVersion"],"co":{"id":"POST /twcard-data/v1/sensitive-card-data/preset-pin","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"142","explode":false,"k":"header","n":"x_tw_twcard_order_id","or":"x-tw-twcard-order-id","r":true,"style":"simple","t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/twcard-data/v1/sensitive-card-data/preset-pin","q":{"exist":["x_tw_twcard_order_id"]},"r":{},"rs":{"kind":"raw","media":"text/plain"},"s":[{"lit":"twcard-data"},{"lit":"v1"},{"lit":"sensitive-card-data"},{"lit":"preset-pin"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /twcard-data/v1/clientSideEncryption/fetchEncryptingKey","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/twcard-data/v1/clientSideEncryption/fetchEncryptingKey","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"twcard-data"},{"lit":"v1"},{"lit":"clientSideEncryption"},{"lit":"fetchEncryptingKey"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"card_sensitive_detail","name__orig":"card_sensitive_detail","Name":"CardSensitiveDetail","name_":"card_sensitive_detail","name-":"card-sensitive-detail","NAME":"CARD_SENSITIVE_DETAIL","index$":16}, {"active":true,"entity":"card_sensitive_detail","key$":"BasicCardSensitiveDetailFlow","kind":"basic","name":"BasicCardSensitiveDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"card_sensitive_detail_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"card_sensitive_detail_ref01","srcdatavar":"card_sensitive_detail_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_sensitive_detail_ref01"}}],"index$":1}]}, 'CardSensitiveDetail', {"POST /twcard-data/v1/sensitive-card-data/details":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["keyVersion","encryptedPayload"],"properties":{"keyVersion":{"type":"integer","format":"int32","description":"The version of the encryption key to use. Always set to 1.","example":1},"encryptedPayload":{"type":"string","description":"Your JWE encrypted payload.","example":"<your JWE>"}}}}}},"parameters":[{"name":"x-tw-twcard-card-token","in":"header","required":true,"description":"The card token identifying which card to retrieve details for.","schema":{"type":"string","format":"uuid"},"example":"ca0c8154-1e14-4464-a1ce-dcea7dc3de52","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /twcard-data/v1/sensitive-card-data/pin":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["keyVersion","encryptedPayload"],"properties":{"keyVersion":{"type":"integer","format":"int32","description":"The version of the encryption key to use. Always set to 1.","example":1},"encryptedPayload":{"type":"string","description":"Your JWE encrypted payload.","example":"<your JWE>"}}}}}},"parameters":[{"name":"x-tw-twcard-card-token","in":"header","required":true,"description":"The card token identifying which card to retrieve the PIN for.","schema":{"type":"string","format":"uuid"},"example":"ca0c8154-1e14-4464-a1ce-dcea7dc3de52","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /twcard-data/v1/sensitive-card-data/preset-pin":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for setting a card PIN.","required":["keyVersion","encryptedPayload"],"properties":{"keyVersion":{"type":"integer","description":"The version of the key to use. It is always set to 1.","example":1,"key$":"keyVersion"},"encryptedPayload":{"type":"string","description":"Your [JWE payload](/guides/product/issue-cards/sensitive-card-details).","example":"eyJhbGciOiJSU0...","key$":"encryptedPayload"}},"index$":1}}}},"parameters":[{"name":"x-tw-twcard-order-id","in":"header","required":true,"description":"The card order ID.","schema":{"type":"string"},"example":"142","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /twcard-data/v1/clientSideEncryption/fetchEncryptingKey":{"protocol":"http","parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"card_sensitive_detail.create.0":"GET-only live run: needs POST /twcard-data/v1/sensitive-card-data/details"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const card_sensitive_detail_ref01_ent = client.CardSensitiveDetail()
    let card_sensitive_detail_ref01_data = setup.data.new.card_sensitive_detail['card_sensitive_detail_ref01']

    card_sensitive_detail_ref01_data = (await card_sensitive_detail_ref01_ent.create(card_sensitive_detail_ref01_data)).data()
    assert(null != card_sensitive_detail_ref01_data)


    // LOAD
    const card_sensitive_detail_ref01_match_dt0: any = {}
    const card_sensitive_detail_ref01_data_dt0 = (await card_sensitive_detail_ref01_ent.load(card_sensitive_detail_ref01_match_dt0)).data()
    assert(null != card_sensitive_detail_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/card_sensitive_detail/CardSensitiveDetailTestData.json')

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
    ['card_sensitive_detail01','card_sensitive_detail02','card_sensitive_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_CARD_SENSITIVE_DETAIL_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_CARD_SENSITIVE_DETAIL_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_CARD_SENSITIVE_DETAIL_ENTID']
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
  
