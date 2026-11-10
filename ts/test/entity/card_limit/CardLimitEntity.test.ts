

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


describe('CardLimitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.CardLimit()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CardLimit().load({"card_token":1,"profile_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_limit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"daily":{"a":true,"h":"Daily","n":"daily","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"daily","index$":0},"lifetime":{"a":true,"h":"Lifetime","n":"lifetime","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"lifetime","index$":1},"monthly":{"a":true,"h":"Monthly","n":"monthly","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"monthly","index$":2},"transaction":{"a":true,"h":"Transaction","n":"transaction","r":false,"t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"transaction","index$":3}},"name":"card_limit","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/cards/{cardToken}/spend-limits","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"card_token","or":"cardToken","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/cards/{cardToken}/spend-limits","q":{"exist":["card_token","profile_id"]},"r":{"param":{"cardToken":"card_token","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"cards"},{"var":"card_token"},{"lit":"spend-limits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["daily","lifetime","monthly","transaction"],"co":{"id":"PATCH /spend/profiles/{profileId}/cards/{cardToken}/spend-limits","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"card_token","or":"cardToken","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"PATCH","o":"/spend/profiles/{profileId}/cards/{cardToken}/spend-limits","q":{"exist":["card_token","profile_id"]},"r":{"param":{"cardToken":"card_token","profileId":"profile_id"}},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"cards"},{"var":"card_token"},{"lit":"spend-limits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.profile","$.main.kit.entity.card"]]},"key$":"card_limit","name__orig":"card_limit","Name":"CardLimit","name_":"card_limit","name-":"card-limit","NAME":"CARD_LIMIT","index$":14}, {"active":true,"entity":"card_limit","key$":"BasicCardLimitFlow","kind":"basic","name":"BasicCardLimitFlow","param":{},"step":[{"a":false,"d":{"profile_id":"profile01"},"i":{"ref":"card_limit_ref01","srcdatavar":"card_limit_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_limit_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"card_limit_ref01","srcdatavar":"card_limit_ref01_data","suffix":"_dt0"},"m":{"id":"card_limit01","profile_id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_limit_ref01"}}],"unreachable":true}]}, 'CardLimit', {"GET /spend/profiles/{profileId}/cards/{cardToken}/spend-limits":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"cardToken","in":"path","required":true,"description":"The card token.","schema":{"type":"string"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"PATCH /spend/profiles/{profileId}/cards/{cardToken}/spend-limits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"transaction":{"type":"object","properties":{"value":{"type":"object","description":"The amount allowed per transaction.","properties":{"amount":{},"currency":{}}}},"key$":"transaction"},"daily":{"type":"object","properties":{"value":{"type":"object","description":"The amount allowed to be spent daily.","properties":{"amount":{},"currency":{}}}},"key$":"daily"},"monthly":{"type":"object","properties":{"value":{"type":"object","description":"The amount allowed to be spent monthly.","properties":{"amount":{},"currency":{}}}},"key$":"monthly"},"lifetime":{"type":"object","properties":{"value":{"type":"object","description":"The amount allowed to be spent over the lifetime of the card.","properties":{"amount":{},"currency":{}}}},"key$":"lifetime"}},"index$":1},"example":{"daily":{"value":{"amount":1000,"currency":"GBP"}},"monthly":{"value":{"amount":1000,"currency":"GBP"}}}}}},"parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"cardToken","in":"path","required":true,"description":"The card token.","schema":{"type":"string"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"card_limit.update.0":"GET-only live run: needs PATCH /spend/profiles/{profileId}/cards/{cardToken}/spend-limits"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_limit_ref01_data = Object.values(setup.data.existing.card_limit)[0] as any

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
      '../../../../.sdk/test/entity/card_limit/CardLimitTestData.json')

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
    ['card_limit01','card_limit02','card_limit03','profile01','profile02','profile03','card01','card02','card03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_CARD_LIMIT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_CARD_LIMIT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_CARD_LIMIT_ENTID']
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
  
