

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


describe('BulkSettlementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.BulkSettlement()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BulkSettlement().create({"balanceTransfer":"x","settlementDate":"x","settlementReference":"x","transfers":"x","type":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bulk_settlement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"balanceTransfer":{"a":true,"fo":"decimal","h":"Balance Transfer","n":"balanceTransfer","r":false,"sh":"The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative.","t":"`$NUMBER`","key$":"balanceTransfer","index$":0},"refundedTransfers":{"a":true,"h":"Refunded Transfers","n":"refundedTransfers","r":false,"sh":"Array of transfers for which refunds have been processed.","t":"`$ARRAY`","key$":"refundedTransfers","index$":1},"settlementCurrency":{"a":true,"h":"Settlement Currency","n":"settlementCurrency","r":false,"sh":"The currency in which the transfers in this journal will be settled.","t":"`$STRING`","key$":"settlementCurrency","index$":2},"settlementDate":{"a":true,"fo":"date-time","h":"Settlement Date","n":"settlementDate","r":true,"sh":"The date you send the settlement funds, ISO 8601 format.","t":"`$STRING`","key$":"settlementDate","index$":3},"settlementReference":{"a":true,"h":"Settlement Reference","n":"settlementReference","r":true,"sh":"Reference used when paying the end of day settlement monies to Wise.","t":"`$STRING`","key$":"settlementReference","index$":4},"transfers":{"a":true,"h":"Transfers","n":"transfers","r":true,"sh":"Array of transfers to be settled.","t":"`$ARRAY`","key$":"transfers","index$":5},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"Type of settlement.","t":"`$STRING`","key$":"type","index$":6}},"name":"bulk_settlement","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["balanceTransfer","refundedTransfers","settlementCurrency","settlementDate","settlementReference","transfers","type"],"co":{"id":"POST /settlements","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/settlements","q":{},"r":{},"s":[{"lit":"settlements"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"bulk_settlement","name__orig":"bulk_settlement","Name":"BulkSettlement","name_":"bulk_settlement","name-":"bulk-settlement","NAME":"BULK_SETTLEMENT","index$":10}, {"active":true,"entity":"bulk_settlement","key$":"BasicBulkSettlementFlow","kind":"basic","name":"BasicBulkSettlementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bulk_settlement_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'BulkSettlement', {"POST /settlements":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["type","settlementReference","settlementDate","transfers"],"properties":{"type":{"type":"string","description":"Type of settlement.","enum":["TRUSTED_BULK_SETTLEMENT"],"example":"TRUSTED_BULK_SETTLEMENT","key$":"type"},"settlementReference":{"type":"string","description":"Reference used when paying the end of day settlement monies to Wise. This should match so that Wise can link the payment.\n\nMaximum 10 characters, must start with `TPFB` prefix.\n","pattern":"^TPFB.{1,6}$","example":"TPFB190322","key$":"settlementReference"},"settlementDate":{"type":"string","format":"date-time","description":"The date you send the settlement funds, ISO 8601 format.","example":"2019-03-22T23:59:59-05:00","key$":"settlementDate"},"settlementCurrency":{"type":"string","description":"The currency in which the transfers in this journal will be settled. If included, the `exchangeRate` must be set on every transfer in the transfers array.\n**Only include if you will settle in a currency different to the source currency of transfers.**\n","example":"USD","key$":"settlementCurrency"},"transfers":{"type":"array","description":"Array of transfers to be settled.","items":{"type":"object","required":["id","date","sourceAmount","sourceCurrency","customerName","partnerReference"],"properties":{"id":{"type":"integer","format":"int64","description":"ID of the transfer to be settled.","example":125678},"date":{"type":"string","format":"date-time","description":"The date the transfer was created, ISO 8601 format.","example":"2019-03-22T10:00:12-05:00"},"sourceAmount":{"type":"number","format":"decimal","description":"Transfer source amount with fee, always positive.","example":23.24},"sourceCurrency":{"type":"string","description":"Transfer source currency (ISO 4217).","example":"USD"},"customerName":{"type":"string","description":"Name of the customer. Helps identify customer when manual operation is required.","example":"Joe Bloggs"},"partnerReference":{"type":"string","description":"The transaction/payment identifier in your system, uniquely identifies the transfer in your platform.","example":"11111"},"comment":{"type":"string","description":"Other data about the transfer or sender.\n\nFor USA, you should send the account refund information for the sending customer (account number, routing number, street address, etc.)\n","example":"Extra Data"},"exchangeRate":{"type":"number","format":"decimal","description":"The exchange rate you used to calculate the settlement amount for this transfer.\n\n**Required if `settlementCurrency` is set on the journal.** You can set this value to be unique per transfer or the same for every transfer, depending on your settlement approach and agreements with Wise.\n","example":0.875469}}},"key$":"transfers"},"refundedTransfers":{"type":"array","description":"Array of transfers for which refunds have been processed. Only for Net Settlement.","items":{"type":"object","required":["id","partnerReference"],"properties":{"id":{"type":"integer","format":"int64","description":"ID of the refunded transfer.","example":178880},"exchangeRate":{"type":"number","format":"decimal","description":"The exchange rate used for this transfer. Should be the same value as the one used for the original transfer settlement.","example":0.875469},"partnerReference":{"type":"string","description":"The transaction/payment identifier in your system, uniquely identifies the transfer in your platform.","example":"11108"}}},"key$":"refundedTransfers"},"balanceTransfer":{"type":"number","format":"decimal","description":"The amount of money to be deducted from the expected settlement amount based on what is owed to you for previous days where the total settlement from you to Wise was negative.\n\nThis value must be 0 or negative.\n","example":0,"key$":"balanceTransfer"}},"index$":1},"examples":{"sameCurrency":{"summary":"Same Currency Settlement","value":{"type":"TRUSTED_BULK_SETTLEMENT","settlementReference":"TPFB190322","settlementDate":"2019-03-22T23:59:59-05:00","transfers":[{"id":125678,"date":"2019-03-22T10:00:12-05:00","sourceAmount":23.24,"sourceCurrency":"USD","customerName":"Joe Bloggs","partnerReference":"11111","comment":"Extra Data"},{"id":178889,"date":"2019-03-23T12:40:05-05:00","sourceAmount":125.67,"sourceCurrency":"USD","customerName":"Mat Newman","partnerReference":"11112","comment":"Extra Data"}],"refundedTransfers":[{"id":178880,"partnerReference":"11108"}],"balanceTransfer":0}},"crossCurrency":{"summary":"Cross Currency Settlement","value":{"type":"TRUSTED_BULK_SETTLEMENT","settlementReference":"TPFB190322","settlementDate":"2019-03-22T23:59:59-05:00","settlementCurrency":"USD","transfers":[{"id":125678,"date":"2019-03-22T10:00:12-05:00","sourceAmount":23.24,"sourceCurrency":"PHP","customerName":"Joe Bloggs","partnerReference":"11111","comment":"Extra Data","exchangeRate":0.875469},{"id":178889,"date":"2019-03-23T12:40:05-05:00","sourceAmount":125.67,"sourceCurrency":"PHP","customerName":"Mat Newman","partnerReference":"11112","comment":"Extra Data","exchangeRate":0.875469}],"refundedTransfers":[{"id":178880,"partnerReference":"11108"},{"id":178881,"partnerReference":"11109"}],"balanceTransfer":0}}}}}},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"bulk_settlement.create.0":"GET-only live run: needs POST /settlements"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const bulk_settlement_ref01_ent = client.BulkSettlement()
    let bulk_settlement_ref01_data = setup.data.new.bulk_settlement['bulk_settlement_ref01']

    bulk_settlement_ref01_data = (await bulk_settlement_ref01_ent.create(bulk_settlement_ref01_data)).data()
    assert(null != bulk_settlement_ref01_data)


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
      '../../../../.sdk/test/entity/bulk_settlement/BulkSettlementTestData.json')

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
    ['bulk_settlement01','bulk_settlement02','bulk_settlement03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_BULK_SETTLEMENT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_BULK_SETTLEMENT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_BULK_SETTLEMENT_ENTID']
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
  
