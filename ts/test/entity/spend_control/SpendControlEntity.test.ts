

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


describe('SpendControlEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.SpendControl()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SpendControl().list({"application_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spend_control.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ruleId":{"a":true,"fo":"int64","h":"Rule Id","n":"ruleId","r":false,"sh":"The ID of the applied authorisation rule.","t":"`$INTEGER`","key$":"ruleId","index$":0}},"name":"spend_control","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["ruleId"],"co":{"id":"POST /spend/applications/{clientId}/spend-controls/rules/apply","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"application_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/spend/applications/{clientId}/spend-controls/rules/apply","q":{"$action":"apply","exist":["application_id"]},"r":{"param":{"clientId":"application_id"}},"s":[{"lit":"spend"},{"lit":"applications"},{"var":"application_id"},{"lit":"spend-controls"},{"lit":"rules"},{"lit":"apply"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["ruleId"],"co":{"id":"POST /spend/applications/{clientId}/spend-controls/rules/unapply","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"application_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/spend/applications/{clientId}/spend-controls/rules/unapply","q":{"$action":"unapply","exist":["application_id"]},"r":{"param":{"clientId":"application_id"}},"s":[{"lit":"spend"},{"lit":"applications"},{"var":"application_id"},{"lit":"spend-controls"},{"lit":"rules"},{"lit":"unapply"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /spend/applications/{clientId}/spend-controls/rules/applied","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"application_id","or":"clientId","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/spend/applications/{clientId}/spend-controls/rules/applied","q":{"exist":["application_id"]},"r":{"param":{"clientId":"application_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"applications"},{"var":"application_id"},{"lit":"spend-controls"},{"lit":"rules"},{"lit":"applied"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /spend/applications/{clientId}/spend-controls/rules/{ruleId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"application_id","or":"clientId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"rule_id","or":"ruleId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"DELETE","o":"/spend/applications/{clientId}/spend-controls/rules/{ruleId}","q":{"exist":["application_id","rule_id"]},"r":{"param":{"clientId":"application_id","ruleId":"rule_id"}},"s":[{"lit":"spend"},{"lit":"applications"},{"var":"application_id"},{"lit":"spend-controls"},{"lit":"rules"},{"var":"rule_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.rule"]]},"key$":"spend_control","name__orig":"spend_control","Name":"SpendControl","name_":"spend_control","name-":"spend-control","NAME":"SPEND_CONTROL","index$":63}, {"active":true,"entity":"spend_control","key$":"BasicSpendControlFlow","kind":"basic","name":"BasicSpendControlFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"spend_control_ref01"},"m":{"application_id":"application01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{"application_id":"application01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"spend_control_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"spend_control_ref01","suffix":"_rm0"},"m":{"application_id":"application01","id":"spend_control01"},"o":"remove","s":[],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"suffix":"_rt0"},"m":{"application_id":"application01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"spend_control_ref01"}}],"unreachable":true}]}, 'SpendControl', {"POST /spend/applications/{clientId}/spend-controls/rules/apply":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"ruleId":{"type":"string","description":"The ID of the authorisation rule."}}},"example":{"ruleId":"123"}}}},"parameters":[{"name":"clientId","in":"path","required":true,"description":"The application client ID.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"POST /spend/applications/{clientId}/spend-controls/rules/unapply":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"ruleId":{"type":"string","description":"The ID of the authorisation rule."}}},"example":{"ruleId":"123"}}}},"parameters":[{"name":"clientId","in":"path","required":true,"description":"The application client ID.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /spend/applications/{clientId}/spend-controls/rules/applied":{"protocol":"http","parameters":[{"name":"clientId","in":"path","required":true,"description":"The application client ID.","schema":{"type":"string"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"DELETE /spend/applications/{clientId}/spend-controls/rules/{ruleId}":{"protocol":"http","parameters":[{"name":"clientId","in":"path","required":true,"description":"The application client ID.","schema":{"type":"string"},"index$":0},{"name":"ruleId","in":"path","required":true,"description":"The ID of the authorisation rule to delete.","schema":{"type":"integer","format":"int64"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"spend_control.create.0":"GET-only live run: needs POST /spend/applications/{clientId}/spend-controls/rules/apply","spend_control.remove.2":"GET-only live run: needs DELETE /spend/applications/{clientId}/spend-controls/rules/{ruleId}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let spend_control_ref01_data = Object.values(setup.data.existing.spend_control)[0] as any

    // LIST
    const spend_control_ref01_ent = client.SpendControl()
    const spend_control_ref01_match: any = {}
    spend_control_ref01_match['application_id'] = setup.idmap['application01']

    const spend_control_ref01_list = (await spend_control_ref01_ent.list(spend_control_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/spend_control/SpendControlTestData.json')

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
    ['spend_control01','spend_control02','spend_control03','rule01','rule02','rule03','application01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_SPEND_CONTROL_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_SPEND_CONTROL_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_SPEND_CONTROL_ENTID']
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
  
