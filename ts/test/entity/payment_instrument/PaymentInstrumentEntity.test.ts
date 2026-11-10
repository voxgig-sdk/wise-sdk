

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


describe('PaymentInstrumentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.PaymentInstrument()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PaymentInstrument().list({"id":1,"profile_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'payment_instrument.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accountHolderName":{"a":true,"h":"Account Holder Name","n":"accountHolderName","r":false,"t":"`$STRING`","key$":"accountHolderName","index$":0},"accountNumber":{"a":true,"h":"Account Number","n":"accountNumber","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"accountNumber","index$":1},"accountOwnerDetails":{"a":true,"h":"Account Owner Details","n":"accountOwnerDetails","r":false,"t":"`$OBJECT`","key$":"accountOwnerDetails","index$":2},"accountType":{"a":true,"h":"Account Type","n":"accountType","r":false,"t":"`$STRING`","key$":"accountType","index$":3},"bankCode":{"a":true,"h":"Bank Code","n":"bankCode","r":false,"t":"`$STRING`","key$":"bankCode","index$":4},"bankName":{"a":true,"h":"Bank Name","n":"bankName","r":false,"t":"`$STRING`","key$":"bankName","index$":5},"branchCode":{"a":true,"h":"Branch Code","n":"branchCode","r":false,"t":"`$STRING`","key$":"branchCode","index$":6},"disconnectReason":{"a":true,"h":"Disconnect Reason","n":"disconnectReason","r":false,"t":"`$STRING`","key$":"disconnectReason","index$":7},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":8},"reference":{"a":true,"h":"Reference","n":"reference","r":false,"t":"`$STRING`","key$":"reference","index$":9},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":10},"type":{"a":true,"h":"Type","n":"type","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"t":"`$STRING`","key$":"type","index$":11}},"id":{"field":"id","name":"id"},"name":"payment_instrument","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"paymentInstrumentId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation","q":{"$action":"manual-confirmation","exist":["id","profile_id"]},"r":{"param":{"paymentInstrumentId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"payment-instruments"},{"var":"id"},{"lit":"manual-confirmation"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["accountHolderName","accountNumber","accountOwnerDetails","accountType","bankCode","branchCode","reference","type"],"co":{"id":"POST /profiles/{profileId}/payment-instruments","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/payment-instruments","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"payment-instruments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"paymentInstrumentId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins","q":{"$action":"payin","exist":["id","profile_id"]},"r":{"param":{"paymentInstrumentId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"payment-instruments"},{"var":"id"},{"lit":"payins"}],"t":{"req":"`reqdata`","res":"`body.payins`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"paymentInstrumentId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/payment-instruments/{paymentInstrumentId}","q":{"exist":["id","profile_id"]},"r":{"param":{"paymentInstrumentId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"payment-instruments"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"payment_instrument","name__orig":"payment_instrument","Name":"PaymentInstrument","name_":"payment_instrument","name-":"payment-instrument","NAME":"PAYMENT_INSTRUMENT","index$":47}, {"active":true,"entity":"payment_instrument","key$":"BasicPaymentInstrumentFlow","kind":"basic","name":"BasicPaymentInstrumentFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"payment_instrument_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"payment_instrument_id":"payment_instrument01","profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"payment_instrument_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"payment_instrument_ref01","srcdatavar":"payment_instrument_ref01_data","suffix":"_dt0"},"m":{"id":"payment_instrument01","profile_id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-payment_instrument_ref01"}}],"index$":2,"route":"GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}","record":{}}]}, 'PaymentInstrument', {"POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation":{"protocol":"http","parameters":[{"in":"path","name":"profileId","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"in":"path","name":"paymentInstrumentId","required":true,"schema":{"type":"string"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"POST /profiles/{profileId}/payment-instruments":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","properties":{"accountHolderName":{"type":"string","key$":"accountHolderName"},"accountNumber":{"type":"string","key$":"accountNumber"},"accountOwnerDetails":{"type":"object","properties":{"address":{"type":"object","properties":{"addressFirstLine":{},"city":{},"country":{},"postCode":{},"state":{}},"x-ref":"#/components/schemas/Address-2"},"email":{"type":"string","format":"email","maxLength":254,"minLength":0}},"x-ref":"#/components/schemas/AccountOwnerDetails","key$":"accountOwnerDetails"},"accountType":{"type":"string","key$":"accountType"},"bankCode":{"type":"string","key$":"bankCode"},"branchCode":{"type":"string","key$":"branchCode"},"reference":{"type":"string","key$":"reference"},"type":{"type":"string","key$":"type"}},"required":["accountNumber","type"],"x-ref":"#/components/schemas/InitialiseInstrumentRequest","index$":1}}},"required":true},"parameters":[{"in":"path","name":"profileId","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins":{"protocol":"http","parameters":[{"in":"path","name":"profileId","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"in":"path","name":"paymentInstrumentId","required":true,"schema":{"type":"string"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"GET /profiles/{profileId}/payment-instruments/{paymentInstrumentId}":{"protocol":"http","parameters":[{"in":"path","name":"profileId","required":true,"schema":{"type":"integer","format":"int64"},"index$":0},{"in":"path","name":"paymentInstrumentId","required":true,"schema":{"type":"string"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"payment_instrument.create.0":"GET-only live run: needs POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const payment_instrument_ref01_ent = client.PaymentInstrument()
    let payment_instrument_ref01_data = setup.data.new.payment_instrument['payment_instrument_ref01']
    payment_instrument_ref01_data['profile_id'] = setup.idmap['profile01']

    payment_instrument_ref01_data = (await payment_instrument_ref01_ent.create(payment_instrument_ref01_data)).data()
    assert(null != payment_instrument_ref01_data.id)


    // LIST
    const payment_instrument_ref01_match: any = {}
    payment_instrument_ref01_match['payment_instrument_id'] = setup.idmap['payment_instrument01']
    payment_instrument_ref01_match['profile_id'] = setup.idmap['profile01']

    const payment_instrument_ref01_list = (await payment_instrument_ref01_ent.list(payment_instrument_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(payment_instrument_ref01_list, { id: payment_instrument_ref01_data.id })))


    // LOAD
    const payment_instrument_ref01_match_dt0: any = {}
    payment_instrument_ref01_match_dt0.id = payment_instrument_ref01_data.id
    payment_instrument_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']
    const payment_instrument_ref01_data_dt0 = (await payment_instrument_ref01_ent.load(payment_instrument_ref01_match_dt0)).data()
    assert(payment_instrument_ref01_data_dt0.id === payment_instrument_ref01_data.id)


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
      '../../../../.sdk/test/entity/payment_instrument/PaymentInstrumentTestData.json')

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
    ['payment_instrument01','payment_instrument02','payment_instrument03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_PAYMENT_INSTRUMENT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_PAYMENT_INSTRUMENT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_PAYMENT_INSTRUMENT_ENTID']
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
  
