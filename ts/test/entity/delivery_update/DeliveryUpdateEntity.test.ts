

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


describe('DeliveryUpdateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.DeliveryUpdate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeliveryUpdate().create({"transfer_id":"x","delivery_update":"x","delivery_update_path":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'delivery_update.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"delivery_update":{"a":true,"h":"Delivery Update","n":"delivery_update","r":true,"sh":"The delivery signal to simulate.","t":"`$STRING`","key$":"delivery_update","index$":0},"delivery_update_path":{"a":true,"h":"Delivery Update Path","n":"delivery_update_path","r":true,"sh":"Delivery signals supported by the simulated route, not a history of events.","t":"`$ARRAY`","key$":"delivery_update_path","index$":1},"estimated_delivery_at":{"a":true,"fo":"date-time","h":"Estimated Delivery At","n":"estimated_delivery_at","r":false,"sh":"Optional estimated delivery time.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"estimated_delivery_at","index$":2},"observation_id":{"a":true,"fo":"uuid","h":"Observation Id","n":"observation_id","r":true,"sh":"Server-generated observation identifier.","t":"`$STRING`","key$":"observation_id","index$":3},"occurred_at":{"a":true,"fo":"date-time","h":"Occurred At","n":"occurred_at","r":true,"sh":"Server-generated observation time in UTC with millisecond precision.","t":"`$STRING`","key$":"occurred_at","index$":4},"scheme":{"a":true,"h":"Scheme","n":"scheme","r":false,"sh":"Payment scheme to include in the observation.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"scheme","index$":5}},"name":"delivery_update","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["delivery_update","delivery_update_path","estimated_delivery_at","scheme"],"co":{"id":"POST /simulation/transfers/{transferId}/delivery-update","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"transfer_id","or":"transferId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/simulation/transfers/{transferId}/delivery-update","q":{"exist":["transfer_id"]},"r":{"param":{"transferId":"transfer_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"simulation"},{"lit":"transfers"},{"var":"transfer_id"},{"lit":"delivery-update"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.transfer"]]},"key$":"delivery_update","name__orig":"delivery_update","Name":"DeliveryUpdate","name_":"delivery_update","name-":"delivery-update","NAME":"DELIVERY_UPDATE","index$":24}, {"active":true,"entity":"delivery_update","key$":"BasicDeliveryUpdateFlow","kind":"basic","name":"BasicDeliveryUpdateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"delivery_update_ref01"},"m":{"transfer_id":"transfer01"},"o":"create","s":[],"v":[],"index$":0}]}, 'DeliveryUpdate', {"POST /simulation/transfers/{transferId}/delivery-update":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["delivery_update_path","delivery_update"],"properties":{"scheme":{"type":["string","null"],"enum":["sepa_instant_credit_transfer",null],"description":"Payment scheme to include in the observation. May be omitted or null.","key$":"scheme"},"delivery_update_path":{"type":"array","minItems":1,"uniqueItems":true,"items":{"type":"string","enum":["partner_accepted","recipient_provider_accepted","scheme_settled","account_credited","funds_available"],"description":"The delivery signal to simulate. Must be a member of `delivery_update_path`, but need not be its last item.","x-ref":"#/components/schemas/delivery_update"},"description":"Delivery signals supported by the simulated route, not a history of events.\nSelect one or more distinct values in this progression order:\n`partner_accepted`, `recipient_provider_accepted`, `scheme_settled`,\n`account_credited`, `funds_available`. Values may be skipped.\nThe service validates the order and requires this array to contain `delivery_update`.\n","key$":"delivery_update_path"},"delivery_update":{"type":"string","enum":["partner_accepted","recipient_provider_accepted","scheme_settled","account_credited","funds_available"],"description":"The delivery signal to simulate. Must be a member of `delivery_update_path`, but need not be its last item.","key$":"delivery_update"},"estimated_delivery_at":{"type":["string","null"],"format":"date-time","description":"Optional estimated delivery time. May be omitted or null. Published timestamps are truncated to milliseconds.","key$":"estimated_delivery_at"}},"x-ref":"#/components/schemas/delivery-update-request","index$":1},"examples":{"recipientProviderAccepted":{"summary":"Simulate an intermediate delivery signal with an estimate","value":{"scheme":"sepa_instant_credit_transfer","delivery_update_path":["recipient_provider_accepted","scheme_settled"],"delivery_update":"recipient_provider_accepted","estimated_delivery_at":"2026-10-01T10:00:05.000Z"}},"fundsAvailable":{"summary":"Simulate funds available without a scheme or estimate","value":{"delivery_update_path":["funds_available"],"delivery_update":"funds_available"}}}}}},"parameters":[{"name":"transferId","in":"path","required":true,"description":"The ID of the transfer to simulate. The caller must have access to this transfer.","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"delivery_update.create.0":"GET-only live run: needs POST /simulation/transfers/{transferId}/delivery-update"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const delivery_update_ref01_ent = client.DeliveryUpdate()
    let delivery_update_ref01_data = setup.data.new.delivery_update['delivery_update_ref01']
    delivery_update_ref01_data['transfer_id'] = setup.idmap['transfer01']

    delivery_update_ref01_data = (await delivery_update_ref01_ent.create(delivery_update_ref01_data)).data()
    assert(null != delivery_update_ref01_data)


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
      '../../../../.sdk/test/entity/delivery_update/DeliveryUpdateTestData.json')

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
    ['delivery_update01','delivery_update02','delivery_update03','transfer01','transfer02','transfer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_DELIVERY_UPDATE_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_DELIVERY_UPDATE_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_DELIVERY_UPDATE_ENTID']
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
  
