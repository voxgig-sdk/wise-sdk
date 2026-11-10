

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


describe('AccountDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.AccountDetail()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AccountDetail().load({"id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accountHolderName":{"a":true,"h":"Account Holder Name","n":"accountHolderName","r":true,"sh":"Name of the account holder as it appears on the account details.","t":"`$STRING`","key$":"accountHolderName","index$":0},"accountIdentification":{"a":true,"h":"Account Identification","n":"accountIdentification","r":true,"sh":"Country/scheme-specific account identification.","t":"`$ANY`","union":{"branches":3,"count":1,"depth":0},"key$":"accountIdentification","index$":1},"country":{"a":true,"h":"Country","n":"country","r":true,"sh":"ISO 3166-1 alpha-2 country code the account details belong to.","t":"`$STRING`","key$":"country","index$":2},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":true,"sh":"Unique identifier for the account details.","t":"`$INTEGER`","key$":"id","index$":3},"profileId":{"a":true,"fo":"int64","h":"Profile Id","n":"profileId","r":true,"sh":"Profile ID of the account details owner.","t":"`$INTEGER`","key$":"profileId","index$":4},"state":{"a":true,"h":"State","n":"state","r":true,"sh":"Current state of the account details.","t":"`$STRING`","key$":"state","index$":5}},"id":{"field":"id","name":"id"},"name":"account_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /balances/account-details/{id}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/balances/account-details/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"balances"},{"lit":"account-details"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account_detail","name__orig":"account_detail","Name":"AccountDetail","name_":"account_detail","name-":"account-detail","NAME":"ACCOUNT_DETAIL","index$":0}, {"active":true,"entity":"account_detail","key$":"BasicAccountDetailFlow","kind":"basic","name":"BasicAccountDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_detail_ref01","srcdatavar":"account_detail_ref01_data","suffix":"_dt0"},"m":{"id":"account_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_detail_ref01"}}],"index$":0,"route":"GET /balances/account-details/{id}","record":{}}]}, 'AccountDetail', {"GET /balances/account-details/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"Unique identifier for the account details.","schema":{"type":"integer","description":"Unique identifier for the account details.","format":"int64","example":12345678},"required":true,"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_detail_ref01_data = Object.values(setup.data.existing.account_detail)[0] as any

    // LOAD
    const account_detail_ref01_ent = client.AccountDetail()
    const account_detail_ref01_match_dt0: any = {}
    account_detail_ref01_match_dt0.id = account_detail_ref01_data.id
    const account_detail_ref01_data_dt0 = (await account_detail_ref01_ent.load(account_detail_ref01_match_dt0)).data()
    assert(account_detail_ref01_data_dt0.id === account_detail_ref01_data.id)


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
      '../../../../.sdk/test/entity/account_detail/AccountDetailTestData.json')

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
    ['account_detail01','account_detail02','account_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_ACCOUNT_DETAIL_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_ACCOUNT_DETAIL_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_ACCOUNT_DETAIL_ENTID']
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
  
