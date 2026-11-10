

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


describe('AddressRequirementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.AddressRequirement()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('address_requirement hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of WiseSDK.test(offline).AddressRequirement().stream('list')) { }
    }, /offline/)

    for await (const _item of WiseSDK.test(offline).AddressRequirement()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = WiseSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.AddressRequirement().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of WiseSDK.test().AddressRequirement().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new WiseSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.AddressRequirement().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.AddressRequirement().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AddressRequirement().list({"profile":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'address_requirement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"details":{"a":true,"h":"Details","n":"details","r":true,"sh":"Address details to provide context for requirements lookup.","t":"`$OBJECT`","key$":"details","index$":0},"fields":{"a":true,"h":"Fields","n":"fields","r":false,"sh":"List of fields required for the address.","t":"`$ARRAY`","key$":"fields","index$":1},"profile":{"a":true,"fo":"int64","h":"Profile","n":"profile","r":false,"sh":"User profile ID.","t":"`$INTEGER`","key$":"profile","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Always \"address\".","t":"`$STRING`","key$":"type","index$":3}},"name":"address_requirement","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["details","profile"],"co":{"id":"POST /address-requirements","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/address-requirements","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"address-requirements"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /address-requirements","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/address-requirements","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"address-requirements"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"address_requirement","name__orig":"address_requirement","Name":"AddressRequirement","name_":"address_requirement","name-":"address-requirement","NAME":"ADDRESS_REQUIREMENT","index$":4}, {"active":true,"entity":"address_requirement","key$":"BasicAddressRequirementFlow","kind":"basic","name":"BasicAddressRequirementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"address_requirement_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"address_requirement_ref01"}}],"index$":1}]}, 'AddressRequirement', {"POST /address-requirements":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","description":"Request body for retrieving address requirements based on context.","required":["details"],"properties":{"profile":{"type":"integer","format":"int64","description":"User profile ID.","example":12345678,"key$":"profile"},"details":{"type":"object","description":"Address details to provide context for requirements lookup. Additional fields beyond those listed are accepted.","required":["country"],"properties":{"country":{"type":"string","description":"Country code (ISO 3166-2 Country Code).","example":"US"},"state":{"type":"string","description":"State code. Provide to discover state-dependent fields.","example":"AZ"}},"additionalProperties":{"type":"string","description":"Any other properties to provide context for the requirements lookup."},"key$":"details"}},"x-ref":"#/components/schemas/AddressRequirementsRequest","index$":1},"example":{"details":{"country":"US"}}}}},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]},"GET /address-requirements":{"protocol":"http","parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"address_requirement.create.0":"GET-only live run: needs POST /address-requirements"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const address_requirement_ref01_ent = client.AddressRequirement()
    let address_requirement_ref01_data = setup.data.new.address_requirement['address_requirement_ref01']

    address_requirement_ref01_data = (await address_requirement_ref01_ent.create(address_requirement_ref01_data)).data()
    assert(null != address_requirement_ref01_data)


    // LIST
    const address_requirement_ref01_match: any = {}

    const address_requirement_ref01_list = (await address_requirement_ref01_ent.list(address_requirement_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/address_requirement/AddressRequirementTestData.json')

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
    ['address_requirement01','address_requirement02','address_requirement03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_ADDRESS_REQUIREMENT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_ADDRESS_REQUIREMENT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_ADDRESS_REQUIREMENT_ENTID']
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
  
