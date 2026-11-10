

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


describe('ActivityEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.Activity()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Activity().list({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'activity.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdOn":{"a":true,"fo":"date-time","h":"Created On","n":"createdOn","r":false,"sh":"Timestamp when the activity was created.","t":"`$STRING`","key$":"createdOn","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A short description that briefly summarizes the activity.","t":"`$STRING`","key$":"description","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Activity id.","t":"`$STRING`","key$":"id","index$":2},"primaryAmount":{"a":true,"h":"Primary Amount","n":"primaryAmount","r":false,"sh":"A currency formatted text that describe the primary amount of transaction.","t":"`$STRING`","key$":"primaryAmount","index$":3},"resource":{"a":true,"h":"Resource","n":"resource","r":false,"sh":"The resource associated with the activity.","t":"`$OBJECT`","key$":"resource","index$":4},"secondaryAmount":{"a":true,"h":"Secondary Amount","n":"secondaryAmount","r":false,"sh":"A currency formatted text that describe the secondary amount of transaction.","t":"`$STRING`","key$":"secondaryAmount","index$":5},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status of the Activity.","t":"`$STRING`","key$":"status","index$":6},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the Activity.","t":"`$STRING`","key$":"title","index$":7},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of Activity.","t":"`$STRING`","key$":"type","index$":8},"updatedOn":{"a":true,"fo":"date-time","h":"Updated On","n":"updatedOn","r":false,"sh":"Timestamp when the activity was last modified.","t":"`$STRING`","key$":"updatedOn","index$":9}},"id":{"field":"id","name":"id"},"name":"activity","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /profiles/{profileId}/activities","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":"TRANSFER","explode":true,"k":"query","n":"monetary_resource_type","or":"monetaryResourceType","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":"","explode":true,"k":"query","n":"next_cursor","or":"nextCursor","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"ex":"2025-03-10T11:56:30.376Z","explode":true,"k":"query","n":"since","or":"since","r":false,"style":"form","t":"`$STRING`","index$":2},{"a":true,"ex":10,"explode":true,"k":"query","n":"size","or":"size","r":false,"style":"form","t":"`$INTEGER`","index$":3},{"a":true,"ex":"IN_PROGRESS","explode":true,"k":"query","n":"status","or":"status","r":false,"style":"form","t":"`$STRING`","index$":4},{"a":true,"ex":"2025-03-30T23:59:59.999Z","explode":true,"k":"query","n":"until","or":"until","r":false,"style":"form","t":"`$STRING`","index$":5}]},"k":"http","m":"GET","o":"/profiles/{profileId}/activities","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"activities"}],"t":{"page":{"cursor":"`body.cursor`"},"req":"`reqdata`","res":"`body.activities`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"activity","name__orig":"activity","Name":"Activity","name_":"activity","name-":"activity","NAME":"ACTIVITY","index$":2}, {"active":true,"entity":"activity","key$":"BasicActivityFlow","kind":"basic","name":"BasicActivityFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"activity_ref01"}}],"index$":0}]}, 'Activity', {"GET /profiles/{profileId}/activities":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"schema":{"type":"integer","format":"int64"},"description":"The unique identifier of the profile.","index$":0},{"name":"monetaryResourceType","in":"query","required":false,"schema":{"type":"string","description":"Type of Activity Monetary Resource.","example":"TRANSFER","enum":["ACCRUAL_CHARGE","ACQUIRING_PAYMENT","ASSETS_WITHDRAWAL","BALANCE_CASHBACK","BALANCE_INTEREST","BALANCE_TRANSACTION","BANK_DETAILS_ORDER","BATCH_TRANSFER","CARD_CASHBACK","CARD_ORDER","CARD_TRANSACTION","DIRECT_DEBIT_INSTRUCTION","DIRECT_DEBIT_TRANSACTION","FEE_REFUND","INCIDENT_REFUND","INCORPORATION_ORDER","OPERATIONAL_TRANSACTION","PAYMENT_REQUEST","REWARD","REWARDS_REDEMPTION","SEND_ORDER","SEND_ORDER_EXECUTION","TRANSFER"],"x-ref":"#/components/schemas/ActivityResourceType"},"description":"Filter activity by resource type.","index$":1},{"name":"status","in":"query","required":false,"schema":{"type":"string","description":"Status of the Activity.\n- `REQUIRES_ATTENTION` - Requires an end user attention.\n- `IN_PROGRESS` - Indicates that this activity has yet to be completed. (Example: In progress Top Up)\n- `UPCOMING` - Indicates that this activity is scheduled to happen in the future. By default these activities will only be shown 2 days before the date. (Example: A scheduled transfer)\n- `COMPLETED` - Indicates that this activity is at its end state. (Example: A completed Top Up)\n- `CANCELLED` - Indicates that this activity is cancelled. (Example: A Top Up is cancelled)\n","example":"IN_PROGRESS","enum":["REQUIRES_ATTENTION","IN_PROGRESS","UPCOMING","COMPLETED","CANCELLED"],"x-ref":"#/components/schemas/ActivityStatus"},"description":"Filter by activity status.","index$":2},{"name":"since","in":"query","required":false,"schema":{"type":"string","format":"date-time","example":"2025-03-10T11:56:30.376Z"},"description":"Filter activity list after a certain timestamp. Use ISO 8601 format.","index$":3},{"name":"until","in":"query","required":false,"schema":{"type":"string","format":"date-time","example":"2025-03-30T23:59:59.999Z"},"description":"Filter activity list until a certain timestamp. Use ISO 8601 format.","index$":4},{"name":"nextCursor","in":"query","required":false,"schema":{"type":"string","example":""},"description":"Pagination cursor returned from a previous response. Use the `cursor` value from the response to fetch the next page of activities.\n","index$":5},{"name":"size","in":"query","required":false,"schema":{"type":"integer","minimum":1,"maximum":100,"default":10},"description":"Desired size of query. Min 1, max 100, and default value is 10 if not specified.","index$":6},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let activity_ref01_data = Object.values(setup.data.existing.activity)[0] as any

    // LIST
    const activity_ref01_ent = client.Activity()
    const activity_ref01_match: any = {}
    activity_ref01_match['profile_id'] = setup.idmap['profile01']

    const activity_ref01_list = (await activity_ref01_ent.list(activity_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/activity/ActivityTestData.json')

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
    ['activity01','activity02','activity03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_ACTIVITY_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_ACTIVITY_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_ACTIVITY_ENTID']
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
  
