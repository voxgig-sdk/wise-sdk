

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


describe('HoldLimitBreachEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.HoldLimitBreach()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.HoldLimitBreach().list({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'hold_limit_breach.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":false,"sh":"Amount value.","t":"`$NUMBER`","key$":"amount","index$":0},"closingReason":{"a":true,"h":"Closing Reason","n":"closingReason","r":false,"sh":"Reason the breach was closed, null if state is `OPEN`.","t":"`$STRING`","key$":"closingReason","index$":1},"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"Date when the hold limit breach was created.","t":"`$STRING`","key$":"createdAt","index$":2},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"Currency code (ISO 4217 Alphabetic Code).","t":"`$STRING`","key$":"currency","index$":3},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"sh":"Hold limit breach ID.","t":"`$INTEGER`","key$":"id","index$":4},"profileId":{"a":true,"fo":"int64","h":"Profile Id","n":"profileId","r":false,"sh":"ID of the profile that owns the hold limit breach","t":"`$INTEGER`","key$":"profileId","index$":5},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Current state of the hold limit breach.","t":"`$STRING`","key$":"state","index$":6},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Date when the hold limit breach was last modified.","t":"`$STRING`","key$":"updatedAt","index$":7}},"id":{"field":"id","name":"id"},"name":"hold_limit_breach","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/balances/hold-limit-breach","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"AUTOMATICALLY_RESOLVED","explode":true,"k":"query","n":"closing_reason","or":"closingReason","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":"OPEN","explode":true,"k":"query","n":"state","or":"state","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/balances/hold-limit-breach","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"balances"},{"lit":"hold-limit-breach"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"hold_limit_breach","name__orig":"hold_limit_breach","Name":"HoldLimitBreach","name_":"hold_limit_breach","name-":"hold-limit-breach","NAME":"HOLD_LIMIT_BREACH","index$":34}, {"active":true,"entity":"hold_limit_breach","key$":"BasicHoldLimitBreachFlow","kind":"basic","name":"BasicHoldLimitBreachFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"hold_limit_breach_ref01"}}],"index$":0}]}, 'HoldLimitBreach', {"GET /profiles/{profileId}/balances/hold-limit-breach":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"description":"The profile ID.","index$":0},{"name":"state","in":"query","required":false,"description":"Filter by breach state. One of `OPEN`, `CLOSED`","schema":{"type":"string","format":"string"},"example":"OPEN","index$":1},{"name":"closingReason","in":"query","required":false,"description":"Filter by closing reason. One of `AUTOMATICALLY_RESOLVED`, `MANUALLY_RESOLVED`","schema":{"type":"string","format":"string"},"example":"AUTOMATICALLY_RESOLVED","index$":2},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let hold_limit_breach_ref01_data = Object.values(setup.data.existing.hold_limit_breach)[0] as any

    // LIST
    const hold_limit_breach_ref01_ent = client.HoldLimitBreach()
    const hold_limit_breach_ref01_match: any = {}
    hold_limit_breach_ref01_match['profile_id'] = setup.idmap['profile01']

    const hold_limit_breach_ref01_list = (await hold_limit_breach_ref01_ent.list(hold_limit_breach_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/hold_limit_breach/HoldLimitBreachTestData.json')

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
    ['hold_limit_breach01','hold_limit_breach02','hold_limit_breach03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_HOLD_LIMIT_BREACH_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_HOLD_LIMIT_BREACH_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_HOLD_LIMIT_BREACH_ENTID']
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
  
