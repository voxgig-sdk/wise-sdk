

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


describe('DeliveryEstimateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.DeliveryEstimate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeliveryEstimate().load({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'delivery_estimate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"estimatedDeliveryDate":{"a":true,"fo":"date-time","h":"Estimated Delivery Date","n":"estimatedDeliveryDate","r":false,"sh":"Estimated time when funds will arrive in the recipient's bank account.","t":"`$STRING`","key$":"estimatedDeliveryDate","index$":0},"formattedEstimatedDeliveryDate":{"a":true,"h":"Formatted Estimated Delivery Date","n":"formattedEstimatedDeliveryDate","r":false,"sh":"A string to display to users for the estimated delivery date.","t":"`$STRING`","key$":"formattedEstimatedDeliveryDate","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"delivery_estimate","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /delivery-estimates/{transferId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"Asia/Singapore","explode":true,"k":"query","n":"timezone","or":"timezone","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/delivery-estimates/{transferId}","q":{"exist":["id"]},"r":{"param":{"transferId":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"delivery-estimates"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"delivery_estimate","name__orig":"delivery_estimate","Name":"DeliveryEstimate","name_":"delivery_estimate","name-":"delivery-estimate","NAME":"DELIVERY_ESTIMATE","index$":23}, {"active":true,"entity":"delivery_estimate","key$":"BasicDeliveryEstimateFlow","kind":"basic","name":"BasicDeliveryEstimateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"delivery_estimate_ref01","srcdatavar":"delivery_estimate_ref01_data","suffix":"_dt0"},"m":{"id":"delivery_estimate01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-delivery_estimate_ref01"}}],"index$":0,"route":"GET /delivery-estimates/{transferId}","record":{}}]}, 'DeliveryEstimate', {"GET /delivery-estimates/{transferId}":{"protocol":"http","parameters":[{"name":"transferId","in":"path","required":true,"description":"The ID of the transfer.","schema":{"type":"integer","format":"int64"},"example":12345678,"index$":0},{"name":"timezone","in":"query","required":false,"description":"Timezone ID for the formatted text. Defaults to `UTC` if not provided.","schema":{"type":"string"},"example":"Asia/Singapore","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let delivery_estimate_ref01_data = Object.values(setup.data.existing.delivery_estimate)[0] as any

    // LOAD
    const delivery_estimate_ref01_ent = client.DeliveryEstimate()
    const delivery_estimate_ref01_match_dt0: any = {}
    delivery_estimate_ref01_match_dt0.id = delivery_estimate_ref01_data.id
    const delivery_estimate_ref01_data_dt0 = (await delivery_estimate_ref01_ent.load(delivery_estimate_ref01_match_dt0)).data()
    assert(delivery_estimate_ref01_data_dt0.id === delivery_estimate_ref01_data.id)


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
      '../../../../.sdk/test/entity/delivery_estimate/DeliveryEstimateTestData.json')

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
    ['delivery_estimate01','delivery_estimate02','delivery_estimate03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_DELIVERY_ESTIMATE_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_DELIVERY_ESTIMATE_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_DELIVERY_ESTIMATE_ENTID']
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
  
