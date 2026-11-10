

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


describe('GpiTrackingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.GpiTracking()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GpiTracking().create({"identifier":1,"identifierType":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gpi_tracking.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"identifier":{"a":true,"h":"Identifier","n":"identifier","r":true,"sh":"The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`.","t":"`$STRING`","key$":"identifier","index$":0},"identifierType":{"a":true,"h":"Identifier Type","n":"identifierType","r":true,"sh":"The type of identifier used to look up the transfer.","t":"`$STRING`","key$":"identifierType","index$":1},"transactions":{"a":true,"h":"Transactions","n":"transactions","r":false,"sh":"The matching GPI tracking transactions.","t":"`$ARRAY`","key$":"transactions","index$":2}},"name":"gpi_tracking","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["identifier","identifierType"],"co":{"id":"POST /gpi-tracking","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/gpi-tracking","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"gpi-tracking"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"gpi_tracking","name__orig":"gpi_tracking","Name":"GpiTracking","name_":"gpi_tracking","name-":"gpi-tracking","NAME":"GPI_TRACKING","index$":33}, {"active":true,"entity":"gpi_tracking","key$":"BasicGpiTrackingFlow","kind":"basic","name":"BasicGpiTrackingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"gpi_tracking_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'GpiTracking', {"POST /gpi-tracking":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","description":"Identify the transfer to look up by `UETR` or `TRANSFER_ID`.","properties":{"identifierType":{"type":"string","description":"The type of identifier used to look up the transfer.","enum":["UETR","TRANSFER_ID"],"x-ref":"#/components/schemas/GpiTrackingIdentifierType","key$":"identifierType"},"identifier":{"type":"string","minLength":1,"description":"The UETR or Wise transfer ID of the transfer to look up, matching `identifierType`. Must be a UUID (e.g. `97ed4827-7b6f-4491-a206-42bcf859a919`) when `identifierType` is `UETR`, or a positive integer (int64) (e.g. `16521632`) when `identifierType` is `TRANSFER_ID`.","example":"97ed4827-7b6f-4491-a206-42bcf859a919","key$":"identifier"}},"required":["identifier","identifierType"],"x-ref":"#/components/schemas/LookupGpiTrackingRequestContent","index$":1},"examples":{"lookup-by-transfer-id":{"summary":"Look up GPI tracking by transfer ID","value":{"identifierType":"TRANSFER_ID","identifier":"16521632"}},"lookup-by-uetr":{"summary":"Look up GPI tracking by UETR","value":{"identifierType":"UETR","identifier":"97ed4827-7b6f-4491-a206-42bcf859a919"}}}}},"required":true},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"gpi_tracking.create.0":"GET-only live run: needs POST /gpi-tracking"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const gpi_tracking_ref01_ent = client.GpiTracking()
    let gpi_tracking_ref01_data = setup.data.new.gpi_tracking['gpi_tracking_ref01']

    gpi_tracking_ref01_data = (await gpi_tracking_ref01_ent.create(gpi_tracking_ref01_data)).data()
    assert(null != gpi_tracking_ref01_data)


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
      '../../../../.sdk/test/entity/gpi_tracking/GpiTrackingTestData.json')

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
    ['gpi_tracking01','gpi_tracking02','gpi_tracking03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_GPI_TRACKING_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_GPI_TRACKING_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_GPI_TRACKING_ENTID']
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
  
