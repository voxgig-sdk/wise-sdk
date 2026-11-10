

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


describe('ScaDeviceFingerprintEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.ScaDeviceFingerprint()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.ScaDeviceFingerprint().create({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'sca_device_fingerprint.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"createdAt":{"a":true,"fo":"date-time","h":"Created At","n":"createdAt","r":false,"sh":"The device fingerprint creation timestamp.","t":"`$STRING`","key$":"createdAt","index$":0},"deviceFingerprintId":{"a":true,"fo":"uuid","h":"Device Fingerprint Id","n":"deviceFingerprintId","r":false,"sh":"The identifier of the device fingerprint.","t":"`$STRING`","key$":"deviceFingerprintId","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"syn":true,"t":"`$STRING`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"sca_device_fingerprint","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":false,"co":{"id":"POST /profiles/{profileId}/device-fingerprints","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"identity","explode":false,"k":"header","n":"accept_encoding","or":"Accept-Encoding","r":true,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"identity","explode":false,"k":"header","n":"content_encoding","or":"Content-Encoding","r":true,"style":"simple","t":"`$STRING`","index$":1},{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":2},{"a":true,"ex":"jwe","explode":false,"k":"header","n":"xtw_jose_method","or":"X-tw-jose-method","r":true,"style":"simple","t":"`$STRING`","index$":3}],"params":[{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/profiles/{profileId}/device-fingerprints","q":{"exist":["accept_encoding","content_encoding","profile_id","xtw_jose_method"]},"r":{"param":{"profileId":"profile_id"}},"rb":{"kind":"json","media":"application/jose+json"},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"device-fingerprints"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /profiles/{profileId}/device-fingerprints/{deviceFingerprintId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"k":"param","n":"id","or":"deviceFingerprintId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"DELETE","o":"/profiles/{profileId}/device-fingerprints/{deviceFingerprintId}","q":{"exist":["id","profile_id"]},"r":{"param":{"deviceFingerprintId":"id","profileId":"profile_id"}},"s":[{"lit":"profiles"},{"var":"profile_id"},{"lit":"device-fingerprints"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"sca_device_fingerprint","name__orig":"sca_device_fingerprint","Name":"ScaDeviceFingerprint","name_":"sca_device_fingerprint","name-":"sca-device-fingerprint","NAME":"SCA_DEVICE_FINGERPRINT","index$":57}, {"active":true,"entity":"sca_device_fingerprint","key$":"BasicScaDeviceFingerprintFlow","kind":"basic","name":"BasicScaDeviceFingerprintFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"sca_device_fingerprint_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"sca_device_fingerprint_ref01","suffix":"_rm0"},"m":{"id":"sca_device_fingerprint01","profile_id":"profile01"},"o":"remove","s":[],"v":[],"index$":1}]}, 'ScaDeviceFingerprint', {"POST /profiles/{profileId}/device-fingerprints":{"protocol":"http","requestBody":{"required":true,"content":{"application/jose+json":{"schema":{"type":"string","description":"A JWE encrypted string. The decrypted payload contains:\n- `deviceFingerprint` — A string value used as a device fingerprint.\n\nPayload before encryption:\n```json\n{\"deviceFingerprint\": \"3207da22-a0d3-4b6b-a591-6297e646fe32\"}\n```\n","index$":1},"example":"<JWE encrypted string>"}}},"parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"Accept-Encoding","in":"header","required":true,"schema":{"type":"string","default":"identity"},"index$":1},{"name":"Content-Encoding","in":"header","required":true,"schema":{"type":"string","default":"identity"},"index$":2},{"name":"X-tw-jose-method","in":"header","required":true,"schema":{"type":"string","default":"jwe"},"index$":3},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":4}]},"DELETE /profiles/{profileId}/device-fingerprints/{deviceFingerprintId}":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID.","schema":{"type":"integer","format":"int64"},"index$":0},{"name":"deviceFingerprintId","in":"path","required":true,"description":"The device fingerprint ID.","schema":{"type":"string","format":"uuid"},"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"sca_device_fingerprint.create.0":"GET-only live run: needs POST /profiles/{profileId}/device-fingerprints","sca_device_fingerprint.remove.1":"GET-only live run: needs DELETE /profiles/{profileId}/device-fingerprints/{deviceFingerprintId}"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const sca_device_fingerprint_ref01_ent = client.ScaDeviceFingerprint()
    let sca_device_fingerprint_ref01_data = setup.data.new.sca_device_fingerprint['sca_device_fingerprint_ref01']
    sca_device_fingerprint_ref01_data['profile_id'] = setup.idmap['profile01']

    sca_device_fingerprint_ref01_data = (await sca_device_fingerprint_ref01_ent.create(sca_device_fingerprint_ref01_data)).data()
    assert(null != sca_device_fingerprint_ref01_data.id)


    // REMOVE
    const sca_device_fingerprint_ref01_match_rm0: any = { id: sca_device_fingerprint_ref01_data.id }
    sca_device_fingerprint_ref01_match_rm0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']
    await sca_device_fingerprint_ref01_ent.remove(sca_device_fingerprint_ref01_match_rm0)
  

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
      '../../../../.sdk/test/entity/sca_device_fingerprint/ScaDeviceFingerprintTestData.json')

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
    ['sca_device_fingerprint01','sca_device_fingerprint02','sca_device_fingerprint03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_SCA_DEVICE_FINGERPRINT_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_SCA_DEVICE_FINGERPRINT_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_SCA_DEVICE_FINGERPRINT_ENTID']
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
  
