

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


describe('CaseEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Case()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Case().load({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'case.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"Timestamp when the case was created.","t":"`$STRING`","key$":"createdAt","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"The description of the request.","t":"`$STRING`","key$":"description","index$":1},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Details related to the case.","t":"`$OBJECT`","key$":"details","index$":2},"externalId":{"a":true,"h":"External Id","n":"externalId","r":false,"sh":"Partner-created identifier for this case, if applicable.","t":"`$STRING`","key$":"externalId","index$":3},"id":{"a":true,"fo":"int64","h":"Id","n":"id","op":{"create":{"req":false,"type":"`$INTEGER`"}},"r":true,"sh":"Unique identifier of the case.","t":"`$INTEGER`","key$":"id","index$":4},"messages":{"a":true,"h":"Messages","n":"messages","r":true,"sh":"List of messages associated with this case.","t":"`$ARRAY`","union":{"branches":5,"count":2,"depth":7},"key$":"messages","index$":5},"profileId":{"a":true,"fo":"int64","h":"Profile Id","n":"profileId","r":true,"sh":"The profile ID associated with this case.","t":"`$INTEGER`","key$":"profileId","index$":6},"reference":{"a":true,"h":"Reference","n":"reference","r":true,"sh":"Reference information linking the case to a related entity.","t":"`$OBJECT`","key$":"reference","index$":7},"status":{"a":true,"h":"Status","n":"status","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The current status of the support case.","t":"`$STRING`","key$":"status","index$":8},"subType":{"a":true,"h":"Sub Type","n":"subType","r":false,"sh":"The sub-type of the support case.","t":"`$STRING`","key$":"subType","index$":9},"subject":{"a":true,"h":"Subject","n":"subject","r":false,"sh":"The subject of the case.","t":"`$STRING`","key$":"subject","index$":10},"type":{"a":true,"h":"Type","n":"type","op":{"create":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"The type of the support case.","t":"`$STRING`","key$":"type","index$":11},"updatedAt":{"a":true,"fo":"date-time","h":"Updated At","n":"updatedAt","r":false,"sh":"Timestamp when the case was last updated.","t":"`$STRING`","key$":"updatedAt","index$":12}},"id":{"field":"id","name":"id"},"name":"case","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["description","details","externalId","subject","type"],"co":{"id":"POST /cases","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/cases","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"cases"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /cases/{caseId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"id","or":"caseId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/cases/{caseId}","q":{"exist":["id"]},"r":{"param":{"caseId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"cases"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"case","name__orig":"case","Name":"Case","name_":"case","name-":"case","NAME":"CASE","index$":18}, {"active":true,"entity":"case","key$":"BasicCaseFlow","kind":"basic","name":"BasicCaseFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"case_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"case_ref01","srcdatavar":"case_ref01_data","suffix":"_dt0"},"m":{"id":"case01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-case_ref01"}}],"index$":1,"route":"GET /cases/{caseId}","record":{}}]}, 'Case', {"POST /cases":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"type":{"type":"string","description":"Type of the case. Value must be `GENERAL_ENQUIRY`. More case types will be added in the future.","example":"GENERAL_ENQUIRY","key$":"type"},"subject":{"type":"string","description":"The subject of the case. Do not include PII in the subject of cases.","example":"Inquiry about Transfer 12345","key$":"subject"},"details":{"type":"object","description":"Details related to the case.","properties":{"transferId":{"type":["integer","null"],"format":"int64","description":"ID of the transfer the case relates to. Can also be `null`.","example":58114690},"profileId":{"type":["integer","null"],"format":"int64","description":"ID of the profile the case relates to. Can also be `null`.","example":14556049},"userId":{"type":"integer","format":"int64","description":"ID of the user the case relates to. Can not be `null`.","example":1234}},"key$":"details"},"externalId":{"type":"string","description":"An ID provided by the external partner for partner internal tracking.","example":"partner_external_id_12345","key$":"externalId"},"description":{"type":"string","description":"The description of the request. The maximum size of the description is 65,535 characters. If additional characters are sent, the field will be truncated.","example":"Initial summary of the issue","key$":"description"}},"index$":1}}}},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]},"GET /cases/{caseId}":{"protocol":"http","parameters":[{"name":"caseId","in":"path","required":true,"description":"The unique identifier of the case.","schema":{"type":"integer","format":"int64"},"example":12345678,"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"case.create.0":"GET-only live run: needs POST /cases","case.load.1":"GET-only live run: reads a record only case.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const case_ref01_ent = client.Case()
    let case_ref01_data = setup.data.new.case['case_ref01']

    case_ref01_data = (await case_ref01_ent.create(case_ref01_data)).data()
    assert(null != case_ref01_data.id)


    // LOAD
    const case_ref01_match_dt0: any = {}
    case_ref01_match_dt0.id = case_ref01_data.id
    const case_ref01_data_dt0 = (await case_ref01_ent.load(case_ref01_match_dt0)).data()
    assert(case_ref01_data_dt0.id === case_ref01_data.id)


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
      '../../../../.sdk/test/entity/case/CaseTestData.json')

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
    ['case01','case02','case03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_CASE_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_CASE_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_CASE_ENTID']
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
  
