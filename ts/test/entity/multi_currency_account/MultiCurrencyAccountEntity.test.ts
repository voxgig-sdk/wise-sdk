

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


describe('MultiCurrencyAccountEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.MultiCurrencyAccount()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.MultiCurrencyAccount().load({"country":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'multi_currency_account.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"multi_currency_account","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /borderless-accounts-configuration/profiles/{profileId}/available-currencies","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/borderless-accounts-configuration/profiles/{profileId}/available-currencies","q":{"$action":"available-currencies","exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"borderless-accounts-configuration"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"available-currencies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /borderless-accounts-configuration/profiles/{profileId}/payin-currencies","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/borderless-accounts-configuration/profiles/{profileId}/payin-currencies","q":{"$action":"payin-currencies","exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"borderless-accounts-configuration"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"payin-currencies"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /multi-currency-account/eligibility","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"FR","explode":true,"k":"query","n":"country","or":"country","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"explode":true,"k":"query","n":"profile_id","or":"profileId","r":false,"style":"form","t":"`$INTEGER`","index$":1},{"a":true,"ex":"CA","explode":true,"k":"query","n":"state","or":"state","r":false,"style":"form","t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/multi-currency-account/eligibility","q":{"$action":"eligibility"},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"multi-currency-account"},{"lit":"eligibility"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"multi_currency_account","name__orig":"multi_currency_account","Name":"MultiCurrencyAccount","name_":"multi_currency_account","name-":"multi-currency-account","NAME":"MULTI_CURRENCY_ACCOUNT","index$":40}, {"active":true,"entity":"multi_currency_account","key$":"BasicMultiCurrencyAccountFlow","kind":"basic","name":"BasicMultiCurrencyAccountFlow","param":{},"step":[{"a":false,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"multi_currency_account_ref01"}}],"unreachable":true},{"a":true,"d":{},"i":{"ref":"multi_currency_account_ref01","srcdatavar":"multi_currency_account_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-multi_currency_account_ref01"}}],"index$":0}]}, 'MultiCurrencyAccount', {"GET /borderless-accounts-configuration/profiles/{profileId}/available-currencies":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"Profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /borderless-accounts-configuration/profiles/{profileId}/payin-currencies":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"Profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /multi-currency-account/eligibility":{"protocol":"http","parameters":[{"name":"profileId","in":"query","required":false,"description":"Profile ID to check eligibility for.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"country","in":"query","required":false,"description":"2-letter ISO 3166 country code to check eligibility for.","schema":{"type":"string"},"example":"FR","index$":1},{"name":"state","in":"query","required":false,"description":"2-letter state/province code. Required when `country` is `US`.","schema":{"type":"string"},"example":"CA","index$":2},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let multi_currency_account_ref01_data = Object.values(setup.data.existing.multi_currency_account)[0] as any

    // LOAD
    const multi_currency_account_ref01_ent = client.MultiCurrencyAccount()
    const multi_currency_account_ref01_match_dt0: any = {}
    const multi_currency_account_ref01_data_dt0 = (await multi_currency_account_ref01_ent.load(multi_currency_account_ref01_match_dt0)).data()
    assert(null != multi_currency_account_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/multi_currency_account/MultiCurrencyAccountTestData.json')

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
    ['multi_currency_account01','multi_currency_account02','multi_currency_account03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_MULTI_CURRENCY_ACCOUNT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_MULTI_CURRENCY_ACCOUNT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_MULTI_CURRENCY_ACCOUNT_ENTID']
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
  
