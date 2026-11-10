

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


describe('TestNotificationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.TestNotification()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TestNotification().create({"client_key":1,"subscription_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'test_notification.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Timestamp of when the test notification was created.","t":"`$STRING`","key$":"created_at","index$":0},"delivery_id":{"a":true,"fo":"uuid","h":"Delivery Id","n":"delivery_id","r":false,"sh":"ID of the delivery that was queued for sending.","t":"`$STRING`","key$":"delivery_id","index$":1}},"name":"test_notification","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"client_key","or":"clientKey","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"subscription_id","or":"subscriptionId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications","q":{"exist":["client_key","subscription_id"]},"r":{"param":{"clientKey":"client_key","subscriptionId":"subscription_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"applications"},{"var":"client_key"},{"lit":"subscriptions"},{"var":"subscription_id"},{"lit":"test-notifications"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.subscription"]]},"key$":"test_notification","name__orig":"test_notification","Name":"TestNotification","name_":"test_notification","name-":"test-notification","NAME":"TEST_NOTIFICATION","index$":66}, {"active":true,"entity":"test_notification","key$":"BasicTestNotificationFlow","kind":"basic","name":"BasicTestNotificationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"test_notification_ref01"},"m":{"client_key":"client_key01","subscription_id":"subscription01"},"o":"create","s":[],"v":[],"index$":0}]}, 'TestNotification', {"POST /applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications":{"protocol":"http","parameters":[{"name":"clientKey","in":"path","required":true,"description":"Your application's client key.","schema":{"type":"string"},"index$":0},{"name":"subscriptionId","in":"path","required":true,"description":"UUID of the subscription.","schema":{"type":"string","format":"uuid"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"test_notification.create.0":"GET-only live run: needs POST /applications/{clientKey}/subscriptions/{subscriptionId}/test-notifications"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const test_notification_ref01_ent = client.TestNotification()
    let test_notification_ref01_data = setup.data.new.test_notification['test_notification_ref01']
    test_notification_ref01_data['client_key'] = setup.idmap['client_key01']
    test_notification_ref01_data['subscription_id'] = setup.idmap['subscription01']

    test_notification_ref01_data = (await test_notification_ref01_ent.create(test_notification_ref01_data)).data()
    assert(null != test_notification_ref01_data)


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
      '../../../../.sdk/test/entity/test_notification/TestNotificationTestData.json')

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
    ['test_notification01','test_notification02','test_notification03','subscription01','subscription02','subscription03','client_key01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_TEST_NOTIFICATION_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_TEST_NOTIFICATION_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_TEST_NOTIFICATION_ENTID']
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
  
