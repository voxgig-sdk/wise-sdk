

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


describe('CardHolderLimitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.CardHolderLimit()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CardHolderLimit().list({"card_holder_profile_id":"x","profile_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_holder_limit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"aggregateWindow":{"a":true,"h":"Aggregate Window","n":"aggregateWindow","op":{"list":{"req":false,"type":"`$OBJECT`"}},"r":true,"sh":"The limits to set, per aggregation window.","t":"`$OBJECT`","key$":"aggregateWindow","index$":0},"spendLimits":{"a":true,"h":"Spend Limits","n":"spendLimits","r":false,"sh":"Spend limits configured for this cardholder.","t":"`$ARRAY`","key$":"spendLimits","index$":1},"type":{"a":true,"h":"Type","n":"type","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The category of spending the limit applies to.","t":"`$STRING`","key$":"type","index$":2}},"name":"card_holder_limit","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"card_holder_profile_id","or":"cardHolderProfileId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"businessProfileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","q":{"exist":["card_holder_profile_id","profile_id"]},"r":{"param":{"businessProfileId":"profile_id","cardHolderProfileId":"card_holder_profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-holder-profiles"},{"var":"card_holder_profile_id"},{"lit":"spend-limits"}],"t":{"req":"`reqdata`","res":"`body.spendLimits`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"card_holder_profile_id","or":"cardHolderProfileId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"businessProfileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"DELETE","o":"/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","q":{"exist":["card_holder_profile_id","profile_id"]},"r":{"param":{"businessProfileId":"profile_id","cardHolderProfileId":"card_holder_profile_id"}},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-holder-profiles"},{"var":"card_holder_profile_id"},{"lit":"spend-limits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["aggregateWindow","type"],"co":{"id":"PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"card_holder_profile_id","or":"cardHolderProfileId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"businessProfileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"PATCH","o":"/spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits","q":{"exist":["card_holder_profile_id","profile_id"]},"r":{"param":{"businessProfileId":"profile_id","cardHolderProfileId":"card_holder_profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-holder-profiles"},{"var":"card_holder_profile_id"},{"lit":"spend-limits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"card_holder_limit","name__orig":"card_holder_limit","Name":"CardHolderLimit","name_":"card_holder_limit","name-":"card-holder-limit","NAME":"CARD_HOLDER_LIMIT","index$":13}, {"active":true,"entity":"card_holder_limit","key$":"BasicCardHolderLimitFlow","kind":"basic","name":"BasicCardHolderLimitFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"card_holder_profile_id":"card_holder_profile01","profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_holder_limit_ref01"}}],"index$":0},{"a":false,"d":{"profile_id":"profile01"},"i":{"ref":"card_holder_limit_ref01","srcdatavar":"card_holder_limit_ref01_data","suffix":"_up0","textfield":"type"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_holder_limit_ref01"}}],"v":[],"unreachable":true}]}, 'CardHolderLimit', {"GET /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits":{"protocol":"http","parameters":[{"name":"businessProfileId","in":"path","required":true,"description":"The business profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"cardHolderProfileId","in":"path","required":true,"description":"The personal profile ID of the cardholder.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"DELETE /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits":{"protocol":"http","parameters":[{"name":"businessProfileId","in":"path","required":true,"description":"The business profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"cardHolderProfileId","in":"path","required":true,"description":"The personal profile ID of the cardholder.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["type","aggregateWindow"],"properties":{"type":{"type":"string","description":"The category of spending the limit applies to.","enum":["PURCHASE"],"key$":"type"},"aggregateWindow":{"type":"object","description":"The limits to set, per aggregation window. At least one of `daily` or `monthly` must be provided.","properties":{"daily":{"type":"object","properties":{"value":{}}},"monthly":{"type":"object","properties":{"value":{}}}},"key$":"aggregateWindow"}},"index$":1},"example":{"type":"PURCHASE","aggregateWindow":{"daily":{"value":{"amount":1000,"currency":"GBP"}},"monthly":{"value":{"amount":3000,"currency":"GBP"}}}}}}},"parameters":[{"name":"businessProfileId","in":"path","required":true,"description":"The business profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"cardHolderProfileId","in":"path","required":true,"description":"The personal profile ID of the cardholder.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"card_holder_limit.update.1":"GET-only live run: needs PATCH /spend/profiles/{businessProfileId}/card-holder-profiles/{cardHolderProfileId}/spend-limits"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let card_holder_limit_ref01_data = Object.values(setup.data.existing.card_holder_limit)[0] as any

    // LIST
    const card_holder_limit_ref01_ent = client.CardHolderLimit()
    const card_holder_limit_ref01_match: any = {}
    card_holder_limit_ref01_match['card_holder_profile_id'] = setup.idmap['card_holder_profile01']
    card_holder_limit_ref01_match['profile_id'] = setup.idmap['profile01']

    const card_holder_limit_ref01_list = (await card_holder_limit_ref01_ent.list(card_holder_limit_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/card_holder_limit/CardHolderLimitTestData.json')

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
    ['card_holder_limit01','card_holder_limit02','card_holder_limit03','profile01','profile02','profile03','card_holder_profile01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_CARD_HOLDER_LIMIT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_CARD_HOLDER_LIMIT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_CARD_HOLDER_LIMIT_ENTID']
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
  
