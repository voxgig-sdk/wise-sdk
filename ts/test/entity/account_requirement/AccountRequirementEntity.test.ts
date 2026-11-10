

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


describe('AccountRequirementEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.AccountRequirement()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.AccountRequirement().list({"quote_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'account_requirement.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"accountHolderName":{"a":true,"h":"Account Holder Name","n":"accountHolderName","r":false,"sh":"Recipient full name.","t":"`$STRING`","key$":"accountHolderName","index$":0},"currency":{"a":true,"h":"Currency","n":"currency","r":false,"sh":"3-character currency code.","t":"`$STRING`","key$":"currency","index$":1},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Contains the details of the recipient account specific to its currency and type.","t":"`$OBJECT`","key$":"details","index$":2},"fields":{"a":true,"h":"Fields","n":"fields","r":false,"sh":"List of UI field groups to collect required data.","t":"`$ARRAY`","key$":"fields","index$":3},"ownedByCustomer":{"a":true,"h":"Owned By Customer","n":"ownedByCustomer","r":false,"sh":"Indicates whether the recipient account is owned by the profile owner.","t":"`$BOOLEAN`","key$":"ownedByCustomer","index$":4},"profile":{"a":true,"fo":"int64","h":"Profile","n":"profile","r":false,"sh":"Personal or business profile ID of the sender.","t":"`$INTEGER`","key$":"profile","index$":5},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Human-readable title for the requirement group.","t":"`$STRING`","key$":"title","index$":6},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Recipient account type.","t":"`$STRING`","key$":"type","index$":7},"ultimateBeneficiary":{"a":true,"h":"Ultimate Beneficiary","n":"ultimateBeneficiary","r":true,"sh":"The details about the ultimate beneficiary for this recipient, if present.","t":["`$ONE`",["`$OBJECT`","`$NULL`"]],"key$":"ultimateBeneficiary","index$":8},"usageInfo":{"a":true,"h":"Usage Info","n":"usageInfo","r":false,"sh":"Optional usage/help text.","t":"`$STRING`","key$":"usageInfo","index$":9}},"name":"account_requirement","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["accountHolderName","currency","details","ownedByCustomer","profile","type","ultimateBeneficiary"],"co":{"id":"POST /quotes/{quoteId}/account-requirements","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"accept_minor_version","or":"Accept-Minor-Version","r":false,"style":"simple","t":"`$INTEGER`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"quote_id","or":"quoteId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"originator_legal_entity_type","or":"originatorLegalEntityType","r":false,"style":"form","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/quotes/{quoteId}/account-requirements","q":{"exist":["quote_id"]},"r":{"param":{"quoteId":"quote_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"quotes"},{"var":"quote_id"},{"lit":"account-requirements"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /quotes/{quoteId}/account-requirements","source":"openapi3","version":2},"g":{"header":[{"a":true,"explode":false,"k":"header","n":"accept_minor_version","or":"Accept-Minor-Version","r":false,"style":"simple","t":"`$INTEGER`","index$":0},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":1}],"params":[{"a":true,"k":"param","n":"quote_id","or":"quoteId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":false,"explode":true,"k":"query","n":"address_required","or":"addressRequired","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"explode":true,"k":"query","n":"originator_legal_entity_type","or":"originatorLegalEntityType","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/quotes/{quoteId}/account-requirements","q":{"exist":["quote_id"]},"r":{"param":{"quoteId":"quote_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"quotes"},{"var":"quote_id"},{"lit":"account-requirements"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.quote"]]},"key$":"account_requirement","name__orig":"account_requirement","Name":"AccountRequirement","name_":"account_requirement","name-":"account-requirement","NAME":"ACCOUNT_REQUIREMENT","index$":1}, {"active":true,"entity":"account_requirement","key$":"BasicAccountRequirementFlow","kind":"basic","name":"BasicAccountRequirementFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_requirement_ref01"},"m":{"quote_id":"quote01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"quote_id":"quote01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"account_requirement_ref01"}}],"index$":1}]}, 'AccountRequirement', {"POST /quotes/{quoteId}/account-requirements":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Create a recipient (beneficiary) account request. The required fields inside the `details` object depend on currency and route. Use the account-requirements endpoints to discover the exact required fields.\n","properties":{"currency":{"type":"string","description":"3-character currency code.","example":"GBP","key$":"currency"},"type":{"type":"string","description":"Recipient account type. These are currency/route-specific, for example, `sort_code`, `iban`, `email`.","example":"sort_code","key$":"type"},"profile":{"type":"integer","format":"int64","description":"Personal or business profile ID of the sender. We recommend passing the business profile ID if multiple users manage your business account so all users authorized on the business account can access the recipient.","example":30000000,"key$":"profile"},"accountHolderName":{"type":"string","description":"Recipient full name.","example":"John Doe","key$":"accountHolderName"},"ownedByCustomer":{"type":"boolean","description":"Indicates whether the recipient account is owned by the profile owner.\n\nWhile optional, we recommend setting to `true` for self-transfers (such as a user sending money to their own account in another country or currency).\nDistinguishing self-transfers from third-party transfers improves routing and processing efficiency.\n","example":true,"key$":"ownedByCustomer"},"details":{"type":"object","description":"Contains the details of the recipient account specific to its currency and type. \n\nCommon examples include `legalType`, `sortCode`, `accountNumber`, `email`, `dateOfBirth`, etc. Use the **retrieve recipient account requirements** endpoint to determine what is required for a specific recipient.\n","properties":{"legalType":{"type":"string","description":"Recipient legal type.","enum":["PRIVATE","BUSINESS"],"example":"PRIVATE"},"sortCode":{"type":"string","description":"Sort code (GBP example).","example":"040075"},"accountNumber":{"type":"string","description":"Account number (GBP example).","example":"37778842"},"dateOfBirth":{"type":"string","description":"Date of birth in ISO 8601 date format. Only required for certain currency routes. Call the **retrieve recipient account requirements** endpoint to confirm.","example":"1961-01-01"}},"additionalProperties":true,"key$":"details"},"ultimateBeneficiary":{"type":["object","null"],"description":"The details about the ultimate beneficiary for this recipient, if present. If absent, the ultimate beneficiary _is_ the recipient.","required":["name"],"properties":{"accountNumber":{"type":["string","null"],"description":"Ultimate beneficiary account number.","example":"37778842"},"bankName":{"type":["string","null"],"description":"Ultimate beneficiary bank name.","example":"Wise Payments Limited"},"bankCode":{"type":["string","null"],"description":"Ultimate beneficiary bank code.","example":"026073150"},"name":{"type":"object","description":"Ultimate beneficiary name details.","required":["fullName"],"properties":{"fullName":{}}},"address":{"type":["object","null"],"description":"Ultimate beneficiary address.","properties":{"country":{},"firstLine":{},"postCode":{},"city":{},"state":{}}},"bankAddress":{"type":["object","null"],"description":"Ultimate beneficiary bank address.","properties":{"country":{},"firstLine":{},"postCode":{},"city":{},"state":{}}}},"key$":"ultimateBeneficiary"}},"x-ref":"#/components/schemas/recipient-create-request","index$":1}}}},"parameters":[{"name":"quoteId","in":"path","required":true,"description":"Quote ID (supports long or UUID-based IDs).","schema":{"type":"string"},"index$":0},{"name":"originatorLegalEntityType","in":"query","required":false,"description":"Legal entity type override for the actual sender.\n\nCorrespondent partners must include the `originatorLegalEntityType` query parameter to ensure the correct requirements are returned in the response. This parameter indicates whether the actual sender is `PRIVATE` or `BUSINESS`. When not included, the request is assumed to be for a `BUSINESS` entity, as Wise has no way of knowing if the true sender on a [third-party transfer](/api-reference/third-party-transfer) is a business or private individual.\n","schema":{"type":"string","enum":["BUSINESS","PRIVATE"]},"index$":1},{"name":"Accept-Minor-Version","in":"header","required":false,"description":"Set to `1` to ensure the response includes both the recipient name and email fields, which are required to support currencies such as KRW, JPY and RUB.","schema":{"type":"integer","enum":[1]},"index$":2},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":3}]},"GET /quotes/{quoteId}/account-requirements":{"protocol":"http","parameters":[{"name":"quoteId","in":"path","required":true,"description":"Quote ID (supports long or UUID-based IDs).","schema":{"type":"string"},"index$":0},{"name":"originatorLegalEntityType","in":"query","required":false,"description":"Legal entity type override for the actual sender. \n\nCorrespondent partners must include the `originatorLegalEntityType` query parameter to ensure the correct requirements are returned in the response. This parameter indicates whether the actual sender is `PRIVATE` or `BUSINESS`. When not included, the request is assumed to be for a `BUSINESS` entity, as Wise has no way of knowing if the true sender on a [third-party transfer](/api-reference/third-party-transfer) is a business or private individual. \n","schema":{"type":"string","enum":["BUSINESS","PRIVATE"]},"index$":1},{"name":"addressRequired","in":"query","required":false,"description":"When set to `true`, the response always returns address as required, even if not required by the specific currency route.\n\nInclude this query parameter set to `true` to force the address requirement regardless of currency.\n\n{% admonition type=\"warning\" %}\nAddress requirement fields are subject to change. Be sure to build your integration in a way that handles unrecognized or changed fields.\n{% /admonition %}\n","schema":{"type":"boolean","default":false},"index$":2},{"name":"Accept-Minor-Version","in":"header","required":false,"description":"Set to `1` to ensure the response includes both the recipient name and email fields, which are required to support currencies such as KRW, JPY and RUB.","schema":{"type":"integer","enum":[1]},"index$":3},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":4}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"account_requirement.create.0":"GET-only live run: needs POST /quotes/{quoteId}/account-requirements"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const account_requirement_ref01_ent = client.AccountRequirement()
    let account_requirement_ref01_data = setup.data.new.account_requirement['account_requirement_ref01']
    account_requirement_ref01_data['quote_id'] = setup.idmap['quote01']

    account_requirement_ref01_data = (await account_requirement_ref01_ent.create(account_requirement_ref01_data)).data()
    assert(null != account_requirement_ref01_data)


    // LIST
    const account_requirement_ref01_match: any = {}
    account_requirement_ref01_match['quote_id'] = setup.idmap['quote01']

    const account_requirement_ref01_list = (await account_requirement_ref01_ent.list(account_requirement_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/account_requirement/AccountRequirementTestData.json')

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
    ['account_requirement01','account_requirement02','account_requirement03','quote01','quote02','quote03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_ACCOUNT_REQUIREMENT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_ACCOUNT_REQUIREMENT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_ACCOUNT_REQUIREMENT_ENTID']
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
  
