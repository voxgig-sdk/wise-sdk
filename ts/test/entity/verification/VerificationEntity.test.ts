

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


describe('VerificationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Verification()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Verification().list({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'verification.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"required_evidences":{"a":true,"h":"Required Evidences","n":"required_evidences","r":false,"sh":"List of evidence types required to complete verification.","t":"`$ARRAY`","key$":"required_evidences","index$":0}},"name":"verification","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["accountPurpose","accountPurposeExplanation","annualIncome","businessUseCase","incomeExplanation","intendedCountries","mainSourceOfFunding","mainSourceOfIncome","monthlyAnticipatedVolume","yearlyAnticipatedVolume"],"co":{"id":"POST /profiles/{profileId}/additional-verification/upload-evidences","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/additional-verification/upload-evidences","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"additional-verification"},{"lit":"upload-evidences"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/verification-status/required-evidences","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/profiles/{profileId}/verification-status/required-evidences","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"verification-status"},{"lit":"required-evidences"}],"t":{"req":"`reqdata`","res":"`body.required_evidences`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"verification","name__orig":"verification","Name":"Verification","name_":"verification","name-":"verification","NAME":"VERIFICATION","index$":74}, {"active":true,"entity":"verification","key$":"BasicVerificationFlow","kind":"basic","name":"BasicVerificationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"verification_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"verification_ref01"}}],"index$":1}]}, 'Verification', {"POST /profiles/{profileId}/additional-verification/upload-evidences":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"oneOf":[{"title":"Personal Profile","type":"object","description":"Payload for Personal profile verification.","example":{"accountPurpose":"MOVING_SAVINGS","intendedCountries":["deu","esp"],"yearlyAnticipatedVolume":"0_2350","mainSourceOfIncome":"SALARY","annualIncome":"0_11500"},"properties":{"accountPurpose":{"type":"string","description":"The primary reason for using the account.","enum":["MOVING_SAVINGS","SENDING_MONEY_TO_FRIENDS_OR_FAMILY","GENERAL_LIVING_EXPENSES","BUYING_GOODS_OR_SERVICES_ABROAD","PAYING_FOR_MORTGAGE_OR_LOAN","PAYING_BILLS","RECEIVING_SALARY_OR_PENSION","INVESTING"]},"accountPurposeExplanation":{"type":"string","description":"Additional reasons and specific examples for using Wise account. This is a free-text field."},"intendedCountries":{"type":"array","description":"List of ISO 3166-1 alpha-3 country codes.<br>\nCheck the [lists of countries you can send money to with Wise](https://wise.com/help/articles/2571942/what-countries-can-i-send-to).\n","items":{"type":"string"}},"yearlyAnticipatedVolume":{"type":"string","description":"Expected yearly transaction volume in Euros.","enum":["0_2350","2351_6000","6001_11500","11501_60000","60001_175000","175001_+"]},"mainSourceOfIncome":{"type":"string","description":"Primary source of income. Must be submitted with annualIncome.","enum":["SALARY","INVESTMENTS","PENSION","INHERITANCE","LOAN","OTHER"]},"annualIncome":{"type":"string","description":"Expected annual income in Euros. Must be submitted with mainSourceOfIncome.","enum":["0_11500","11501_19000","19001_28500","28501_47500","47501_75000","75001_+"]},"incomeExplanation":{"type":"string","description":"Additional ways you earn money that were not identified in the provided documents. This is a free-text field."}}},{"title":"Business Profile","type":"object","description":"Payload for Business profile verification.","example":{"businessUseCase":["PAYING_SUPPLIERS_CONTRACTORS_OR_EMPLOYEES","PAYING_RENT_OR_UTILITIES"],"intendedCountries":["deu","esp"],"monthlyAnticipatedVolume":"0_1200","mainSourceOfFunding":"BUSINESS_LOAN"},"properties":{"businessUseCase":{"type":"array","description":"How the business intends to use the platform.","items":{"type":"string","enum":[]}},"intendedCountries":{"type":"array","description":"List of ISO 3166-1 alpha-3 country codes.<br>\nCheck the [lists of countries you can send money to with Wise](https://wise.com/help/articles/2571942/what-countries-can-i-send-to).\n","items":{"type":"string"}},"mainSourceOfFunding":{"type":"string","description":"Primary source of business funding.","enum":["REVENUE","BUSINESS_LOAN","FUNDING_AND_SHAREHOLDER_INVESTMENTS","INVESTMENT_INCOME","DONATIONS","GRANTS","OTHER"]},"monthlyAnticipatedVolume":{"type":"string","description":"Expected monthly transaction volume in Euros.","enum":["0_1200","1201_6000","6001_12000","12001_60000","60001_120000","120001_235000","235001_600000","600001_1200000","1200001_6000000","6000001_12000000","12000001_+"]}}}],"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"description":"The unique identifier of the profile.","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /profiles/{profileId}/verification-status/required-evidences":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"description":"The unique identifier of the profile.","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"verification.create.0":"GET-only live run: needs POST /profiles/{profileId}/additional-verification/upload-evidences"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const verification_ref01_ent = client.Verification()
    let verification_ref01_data = setup.data.new.verification['verification_ref01']
    verification_ref01_data['profile_id'] = setup.idmap['profile01']

    verification_ref01_data = (await verification_ref01_ent.create(verification_ref01_data)).data()
    assert(null != verification_ref01_data)


    // LIST
    const verification_ref01_match: any = {}
    verification_ref01_match['profile_id'] = setup.idmap['profile01']

    const verification_ref01_list = (await verification_ref01_ent.list(verification_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/verification/VerificationTestData.json')

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
    ['verification01','verification02','verification03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_VERIFICATION_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_VERIFICATION_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_VERIFICATION_ENTID']
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
  
