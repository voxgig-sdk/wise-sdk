

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


describe('BatchGroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.BatchGroup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.BatchGroup().load({"id":1,"profile_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'batch_group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"alreadyPaid":{"a":true,"h":"Already Paid","n":"alreadyPaid","r":false,"sh":"Not applicable to this use case.","t":"`$BOOLEAN`","key$":"alreadyPaid","index$":0},"fileName":{"a":true,"h":"File Name","n":"fileName","r":false,"sh":"If this batch was submitted as a file, this is the given file name.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"fileName","index$":1},"groupType":{"a":true,"h":"Group Type","n":"groupType","r":false,"sh":"Whether this batch was submitted over the API or as a file.","t":"`$STRING`","key$":"groupType","index$":2},"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":false,"sh":"Batch group ID.","t":"`$STRING`","key$":"id","index$":3},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Descriptive name for the batch group.","t":"`$STRING`","key$":"name","index$":4},"payInDetails":{"a":true,"h":"Pay In Details","n":"payInDetails","r":false,"sh":"List of pay-in details describing how the batch group can be funded.","t":"`$ARRAY`","key$":"payInDetails","index$":5},"payinSessionId":{"a":true,"fo":"uuid","h":"Payin Session Id","n":"payinSessionId","r":false,"sh":"Optional ID of the payin session.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"payinSessionId","index$":6},"profileId":{"a":true,"fo":"int64","h":"Profile Id","n":"profileId","r":false,"sh":"The ID of the profile this payment belongs to.","t":"`$INTEGER`","key$":"profileId","index$":7},"shortId":{"a":true,"fo":"int64","h":"Short Id","n":"shortId","r":false,"sh":"Not applicable to this use case.","t":"`$INTEGER`","key$":"shortId","index$":8},"sourceCurrency":{"a":true,"h":"Source Currency","n":"sourceCurrency","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Source currency code (ISO 4217 Alphabetic Code).","t":"`$STRING`","key$":"sourceCurrency","index$":9},"status":{"a":true,"h":"Status","n":"status","op":{"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Current batch group status: - `NEW` — New batch group with zero or more transfers.","t":"`$STRING`","key$":"status","index$":10},"transferIds":{"a":true,"h":"Transfer Ids","n":"transferIds","r":false,"sh":"The IDs of all transfers successfully added to the group.","t":"`$ARRAY`","key$":"transferIds","index$":11},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"The method of payment to use.","t":"`$STRING`","key$":"type","index$":12},"userId":{"a":true,"fo":"int64","h":"User Id","n":"userId","r":false,"sh":"The ID of the user who initiated this payment.","t":"`$INTEGER`","key$":"userId","index$":13},"version":{"a":true,"fo":"int64","h":"Version","n":"version","op":{"update":{"req":true,"type":"`$INTEGER`"}},"r":false,"sh":"Batch version, used for concurrency control.","t":"`$INTEGER`","key$":"version","index$":14}},"id":{"field":"id","name":"id"},"name":"batch_group","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["type"],"co":{"id":"POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","k":"param","n":"batch_payment_id","or":"batchGroupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/profiles/{profileId}/batch-payments/{batchGroupId}/payments","q":{"exist":["batch_payment_id","profile_id"]},"r":{"param":{"batchGroupId":"batch_payment_id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"batch-payments"},{"var":"batch_payment_id"},{"lit":"payments"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["customerTransactionId","details","quoteUuid","sourceAccount","targetAccount"],"co":{"id":"POST /profiles/{profileId}/batch-groups/{batchGroupId}/transfers","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","k":"param","n":"id","or":"batchGroupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"POST","o":"/profiles/{profileId}/batch-groups/{batchGroupId}/transfers","q":{"$action":"transfer","exist":["id","profile_id"]},"r":{"param":{"batchGroupId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"batch-groups"},{"var":"id"},{"lit":"transfers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["name","sourceCurrency"],"co":{"id":"POST /profiles/{profileId}/batch-groups","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/batch-groups","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"batch-groups"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/batch-groups/{batchGroupId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","k":"param","n":"id","or":"batchGroupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/profiles/{profileId}/batch-groups/{batchGroupId}","q":{"exist":["id","profile_id"]},"r":{"param":{"batchGroupId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"batch-groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["status","version"],"co":{"id":"PATCH /profiles/{profileId}/batch-groups/{batchGroupId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"54a6bc09-cef9-49a8-9041-f1f0c654cd88","k":"param","n":"id","or":"batchGroupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"ex":12345678,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"PATCH","o":"/profiles/{profileId}/batch-groups/{batchGroupId}","q":{"exist":["id","profile_id"]},"r":{"param":{"batchGroupId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"batch-groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.profile"],["$.main.kit.entity.profile"]]},"key$":"batch_group","name__orig":"batch_group","Name":"BatchGroup","name_":"batch_group","name-":"batch-group","NAME":"BATCH_GROUP","index$":9}, {"active":true,"entity":"batch_group","key$":"BasicBatchGroupFlow","kind":"basic","name":"BasicBatchGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"batch_group_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{"profile_id":"profile01"},"i":{"ref":"batch_group_ref01","srcdatavar":"batch_group_ref01_data","suffix":"_up0","textfield":"fileName"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-batch_group_ref01"}}],"v":[],"index$":1},{"a":true,"d":{},"i":{"ref":"batch_group_ref01","srcdatavar":"batch_group_ref01_data","suffix":"_dt0"},"m":{"id":"batch_group01","profile_id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-batch_group_ref01"}}],"index$":2,"route":"GET /profiles/{profileId}/batch-groups/{batchGroupId}","record":{}}]}, 'BatchGroup', {"POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["type"],"properties":{"type":{"type":"string","description":"The method of payment to use.","enum":["BALANCE"],"example":"BALANCE","key$":"type"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile that the batch group is associated with.","index$":0},{"name":"batchGroupId","in":"path","required":true,"schema":{"type":"string","format":"uuid","example":"54a6bc09-cef9-49a8-9041-f1f0c654cd88"},"description":"The batch group ID.","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"POST /profiles/{profileId}/batch-groups/{batchGroupId}/transfers":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["targetAccount","quoteUuid","customerTransactionId"],"properties":{"targetAccount":{"type":"integer","format":"int64","description":"Recipient account ID.","example":67890},"sourceAccount":{"type":"integer","format":"int64","description":"Refund recipient account ID.","example":12345},"quoteUuid":{"type":"string","format":"uuid","description":"Quote ID.","example":"bd244a95-dcf8-4c31-aac8-bf5e2f3e54c0"},"customerTransactionId":{"type":"string","format":"uuid","description":"Unique identifier you generate for this transfer attempt.","example":"a]1b2c3d4-e5f6-7890-abcd-ef1234567890"},"details":{"type":"object","properties":{"reference":{"type":"string","description":"Recipient-facing reference (payment narrative).","example":"to my friend"},"transferPurpose":{"type":"string","description":"Transfer purpose code.","example":"verification.transfers.purpose.pay.bills"},"transferPurposeSubTransferPurpose":{"type":"string","description":"Sub-purpose code for the transfer.","example":"verification.sub.transfers.purpose.pay.interpretation.service"},"sourceOfFunds":{"type":"string","description":"Source of funds code.","example":"verification.source.of.funds.other"}}}}}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile that the batch group is associated with.","index$":0},{"name":"batchGroupId","in":"path","required":true,"schema":{"type":"string","format":"uuid","example":"54a6bc09-cef9-49a8-9041-f1f0c654cd88"},"description":"The batch group ID.","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"POST /profiles/{profileId}/batch-groups":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["sourceCurrency","name"],"properties":{"sourceCurrency":{"type":"string","description":"Source currency code (ISO 4217 Alphabetic Code). This currency is expected to be used for funding the batch group.","example":"GBP","key$":"sourceCurrency"},"name":{"type":"string","description":"Descriptive name for display purposes. Recommended to use a name that uniquely represents this batch. Maximum length of 100 characters.","example":"My batch group","key$":"name"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile to create the batch group for.","index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /profiles/{profileId}/batch-groups/{batchGroupId}":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile that the batch group is associated with.","index$":0},{"name":"batchGroupId","in":"path","required":true,"schema":{"type":"string","format":"uuid","example":"54a6bc09-cef9-49a8-9041-f1f0c654cd88"},"description":"The batch group ID.","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"PATCH /profiles/{profileId}/batch-groups/{batchGroupId}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["status","version"],"properties":{"status":{"type":"string","description":"Status to update to:\n- `COMPLETED` — Close the group and allow funding\n- `CANCELLED` — Cancel the group and all transfers\n","enum":["COMPLETED","CANCELLED"],"example":"COMPLETED","key$":"status"},"version":{"type":"integer","format":"int64","description":"The expected batch group version for concurrency control. Must match the server's current version.","example":1234,"key$":"version"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64","example":12345678},"description":"The ID of the profile that the batch group is associated with.","index$":0},{"name":"batchGroupId","in":"path","required":true,"schema":{"type":"string","format":"uuid","example":"54a6bc09-cef9-49a8-9041-f1f0c654cd88"},"description":"The batch group ID.","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"batch_group.create.0":"GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments","batch_group.update.1":"GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}","batch_group.load.2":"GET-only live run: reads a record only batch_group.create.0 gives"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const batch_group_ref01_ent = client.BatchGroup()
    let batch_group_ref01_data = setup.data.new.batch_group['batch_group_ref01']
    batch_group_ref01_data['profile_id'] = setup.idmap['profile01']

    batch_group_ref01_data = (await batch_group_ref01_ent.create(batch_group_ref01_data)).data()
    assert(null != batch_group_ref01_data.id)


    // UPDATE
    const batch_group_ref01_data_up0: any = {}
    batch_group_ref01_data_up0.id = batch_group_ref01_data.id
    batch_group_ref01_data_up0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']

    const batch_group_ref01_markdef_up0 = { name: 'fileName', value: 'Mark01-batch_group_ref01_' + setup.now }
    ;(batch_group_ref01_data_up0 as any)[batch_group_ref01_markdef_up0.name] = batch_group_ref01_markdef_up0.value

    const batch_group_ref01_resdata_up0 = (await batch_group_ref01_ent.update(batch_group_ref01_data_up0)).data()
    assert(batch_group_ref01_resdata_up0.id === batch_group_ref01_data_up0.id)

    assert((batch_group_ref01_resdata_up0 as any)[batch_group_ref01_markdef_up0.name] === batch_group_ref01_markdef_up0.value)


    // LOAD
    const batch_group_ref01_match_dt0: any = {}
    batch_group_ref01_match_dt0.id = batch_group_ref01_data.id
    batch_group_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']
    const batch_group_ref01_data_dt0 = (await batch_group_ref01_ent.load(batch_group_ref01_match_dt0)).data()
    assert(batch_group_ref01_data_dt0.id === batch_group_ref01_data.id)


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
      '../../../../.sdk/test/entity/batch_group/BatchGroupTestData.json')

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
    ['batch_group01','batch_group02','batch_group03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_BATCH_GROUP_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_BATCH_GROUP_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_BATCH_GROUP_ENTID']
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
  
