

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


describe('ComparisonEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Comparison()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Comparison().load({"exclude_partner":"x","source_currency":"x","target_currency":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'comparison.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount":{"a":true,"h":"Amount","n":"amount","r":false,"sh":"The comparison amount","t":"`$NUMBER`","key$":"amount","index$":0},"amountType":{"a":true,"h":"Amount Type","n":"amountType","r":false,"sh":"Whether the amount represents a send amount or recipient gets amount","t":"`$STRING`","key$":"amountType","index$":1},"providerCountry":{"a":true,"h":"Provider Country","n":"providerCountry","r":false,"sh":"Provider country (ISO 3166-1 Alpha-2 code)","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"providerCountry","index$":2},"providerTypes":{"a":true,"h":"Provider Types","n":"providerTypes","r":false,"sh":"List of provider types included in the response","t":"`$ARRAY`","key$":"providerTypes","index$":3},"providers":{"a":true,"h":"Providers","n":"providers","r":false,"sh":"List of providers with their estimated quotes","t":"`$ARRAY`","key$":"providers","index$":4},"sourceCountry":{"a":true,"h":"Source Country","n":"sourceCountry","r":false,"sh":"Source country (ISO 3166-1 Alpha-2 code)","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sourceCountry","index$":5},"sourceCurrency":{"a":true,"h":"Source Currency","n":"sourceCurrency","r":false,"sh":"ISO 4217 source currency code","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"sourceCurrency","index$":6},"targetCountry":{"a":true,"h":"Target Country","n":"targetCountry","r":false,"sh":"Target country (ISO 3166-1 Alpha-2 code)","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"targetCountry","index$":7},"targetCurrency":{"a":true,"h":"Target Currency","n":"targetCurrency","r":false,"sh":"ISO 4217 target currency code","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"targetCurrency","index$":8}},"name":"comparison","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /comparisons","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"exclude_partner","or":"excludePartners","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"explode":true,"k":"query","n":"filter","or":"filter","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"explode":true,"k":"query","n":"include_wise","or":"includeWise","r":false,"style":"form","t":"`$BOOLEAN`","index$":2},{"a":true,"explode":true,"k":"query","n":"mid_market_rate","or":"midMarketRate","r":false,"style":"form","t":"`$NUMBER`","index$":3},{"a":true,"explode":true,"k":"query","n":"number_of_provider","or":"numberOfProviders","r":false,"style":"form","t":"`$INTEGER`","index$":4},{"a":true,"explode":true,"k":"query","n":"pay_in_method","or":"payInMethod","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"provider","or":"providers","r":false,"style":"form","t":"`$STRING`","index$":6},{"a":true,"explode":true,"k":"query","n":"provider_country","or":"providerCountry","r":false,"style":"form","t":"`$STRING`","index$":7},{"a":true,"explode":true,"k":"query","n":"provider_type","or":"providerTypes","r":false,"style":"form","t":"`$ARRAY`","index$":8},{"a":true,"explode":true,"k":"query","n":"recipient_gets_amount","or":"recipientGetsAmount","r":false,"style":"form","t":"`$NUMBER`","index$":9},{"a":true,"ex":10000,"explode":true,"k":"query","n":"send_amount","or":"sendAmount","r":false,"style":"form","t":"`$NUMBER`","index$":10},{"a":true,"explode":true,"k":"query","n":"source_country","or":"sourceCountry","r":false,"style":"form","t":"`$STRING`","index$":11},{"a":true,"ex":"GBP","explode":true,"k":"query","n":"source_currency","or":"sourceCurrency","r":true,"style":"form","t":"`$STRING`","index$":12},{"a":true,"explode":true,"k":"query","n":"target_country","or":"targetCountry","r":false,"style":"form","t":"`$STRING`","index$":13},{"a":true,"ex":"EUR","explode":true,"k":"query","n":"target_currency","or":"targetCurrency","r":true,"style":"form","t":"`$STRING`","index$":14},{"a":true,"explode":true,"k":"query","n":"wise_estimated_delivery","or":"wiseEstimatedDelivery","r":false,"style":"form","t":"`$STRING`","index$":15},{"a":true,"explode":true,"k":"query","n":"wise_fee","or":"wiseFee","r":false,"style":"form","t":"`$NUMBER`","index$":16},{"a":true,"explode":true,"k":"query","n":"wise_quote_created_time","or":"wiseQuoteCreatedTime","r":false,"style":"form","t":"`$STRING`","index$":17}]},"k":"http","m":"GET","o":"/comparisons","q":{"exist":["source_currency","target_currency"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"comparisons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"comparison","name__orig":"comparison","Name":"Comparison","name_":"comparison","name-":"comparison","NAME":"COMPARISON","index$":20}, {"active":true,"entity":"comparison","key$":"BasicComparisonFlow","kind":"basic","name":"BasicComparisonFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"comparison_ref01","srcdatavar":"comparison_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-comparison_ref01"}}],"index$":0}]}, 'Comparison', {"GET /comparisons":{"protocol":"http","parameters":[{"name":"sourceCurrency","in":"query","required":true,"description":"ISO 4217 source currency code","schema":{"type":"string"},"example":"GBP","index$":0},{"name":"targetCurrency","in":"query","required":true,"description":"ISO 4217 target currency code","schema":{"type":"string"},"example":"EUR","index$":1},{"name":"sendAmount","in":"query","required":false,"description":"Amount to send in source currency. Must provide either `sendAmount` or `recipientGetsAmount`.","schema":{"type":"number"},"example":10000,"index$":2},{"name":"recipientGetsAmount","in":"query","required":false,"description":"Amount to be received in target currency. Must provide either `sendAmount` or `recipientGetsAmount`.","schema":{"type":"number"},"index$":3},{"name":"midMarketRate","in":"query","required":false,"description":"Current mid-market rate between the source and target currency","schema":{"type":"number"},"index$":4},{"name":"wiseFee","in":"query","required":false,"description":"Wise's fee, if the Wise quote is known","schema":{"type":"number"},"index$":5},{"name":"wiseEstimatedDelivery","in":"query","required":false,"description":"Wise's estimated delivery timestamp, if the Wise quote is known","schema":{"type":"string"},"index$":6},{"name":"wiseQuoteCreatedTime","in":"query","required":false,"description":"Timestamp when the Wise quote was created","schema":{"type":"string"},"index$":7},{"name":"payInMethod","in":"query","required":false,"description":"Change the pay-in method of the Wise quote only (all other quotes will remain as bank transfer)","schema":{"type":"string"},"index$":8},{"name":"sourceCountry","in":"query","required":false,"description":"Filter by source country (ISO 3166-1 Alpha-2 code)","schema":{"type":"string"},"index$":9},{"name":"targetCountry","in":"query","required":false,"description":"Filter by target country (ISO 3166-1 Alpha-2 code)","schema":{"type":"string"},"index$":10},{"name":"providerCountry","in":"query","required":false,"description":"Filter by provider country (ISO 3166-1 Alpha-2 code)","schema":{"type":"string"},"index$":11},{"name":"filter","in":"query","required":false,"description":"Filter by most popular competitors","schema":{"type":"string","enum":["POPULAR"]},"index$":12},{"name":"numberOfProviders","in":"query","required":false,"description":"Number of popular competitors to return if `filter` is set to `POPULAR` - default value is 4","schema":{"type":"integer","format":"int32"},"index$":13},{"name":"providerTypes","in":"query","required":false,"description":"Filter by provider type","schema":{"type":"array","items":{"type":"string","enum":["bank","moneytransferprovider","travelMoney"]}},"index$":14},{"name":"providers","in":"query","required":false,"description":"Filter by specific provider aliases","schema":{"type":"string"},"index$":15},{"name":"excludePartners","in":"query","required":false,"description":"Exclude Wise's partner banks - default true","schema":{"type":"boolean"},"index$":16},{"name":"includeWise","in":"query","required":false,"description":"Overrides filters to ensure Wise data is returned, even if exclusionary filters are applied","schema":{"type":"boolean"},"index$":17},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":18}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let comparison_ref01_data = Object.values(setup.data.existing.comparison)[0] as any

    // LOAD
    const comparison_ref01_ent = client.Comparison()
    const comparison_ref01_match_dt0: any = {}
    const comparison_ref01_data_dt0 = (await comparison_ref01_ent.load(comparison_ref01_match_dt0)).data()
    assert(null != comparison_ref01_data_dt0)


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
      '../../../../.sdk/test/entity/comparison/ComparisonTestData.json')

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
    ['comparison01','comparison02','comparison03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_COMPARISON_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_COMPARISON_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_COMPARISON_ENTID']
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
  
