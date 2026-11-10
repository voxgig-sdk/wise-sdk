

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


describe('CardOrderEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
  afterEach(liveDelay('WISE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = WiseSDK.test()
    const ent = testsdk.CardOrder()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = WiseSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.CardOrder().list({"profile_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.WISE_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'card_order.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"address":{"a":true,"h":"Address","n":"address","r":false,"sh":"Address set during card order.","t":"`$OBJECT`","key$":"address","index$":0},"cardHolderName":{"a":true,"h":"Card Holder Name","n":"cardHolderName","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"Name of the card holder.","t":"`$STRING`","key$":"cardHolderName","index$":1},"cardHolderProfileId":{"a":true,"fo":"int64","h":"Card Holder Profile Id","n":"cardHolderProfileId","r":false,"sh":"The cardholder profile for this card.","t":"`$INTEGER`","key$":"cardHolderProfileId","index$":2},"cardProgram":{"a":true,"h":"Card Program","n":"cardProgram","r":false,"sh":"The card program associated with this card order.","t":"`$OBJECT`","key$":"cardProgram","index$":3},"cardToken":{"a":true,"h":"Card Token","n":"cardToken","r":false,"sh":"Token of the card associated with card order.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"cardToken","index$":4},"city":{"a":true,"h":"City","n":"city","r":false,"sh":"Card holder's city (max 30 characters).","t":"`$STRING`","key$":"city","index$":5},"clientId":{"a":true,"h":"Client Id","n":"clientId","r":false,"sh":"Client ID.","t":"`$STRING`","key$":"clientId","index$":6},"country":{"a":true,"h":"Country","n":"country","r":false,"sh":"Card holder's country (ISO 3166-1 alpha-2, max 2 characters).","t":"`$STRING`","key$":"country","index$":7},"creationTime":{"a":true,"fo":"date-time","h":"Creation Time","n":"creationTime","r":false,"sh":"Time when the card order is created.","t":"`$STRING`","key$":"creationTime","index$":8},"deliveryDetails":{"a":true,"h":"Delivery Details","n":"deliveryDetails","r":false,"sh":"Delivery details of a physical card order.","t":"`$OBJECT`","key$":"deliveryDetails","index$":9},"deliveryEstimate":{"a":true,"fo":"date-time","h":"Delivery Estimate","n":"deliveryEstimate","r":false,"sh":"The estimated time when the card will be delivered.","t":"`$STRING`","key$":"deliveryEstimate","index$":10},"deliveryOption":{"a":true,"h":"Delivery Option","n":"deliveryOption","r":false,"sh":"The delivery method for the card order.","t":"`$STRING`","key$":"deliveryOption","index$":11},"embossedName":{"a":true,"h":"Embossed Name","n":"embossedName","r":false,"sh":"The cardholder's name to print on the card (physical card only).","t":"`$STRING`","key$":"embossedName","index$":12},"errors":{"a":true,"h":"Errors","n":"errors","r":false,"sh":"Collection of validation errors.","t":"`$ARRAY`","key$":"errors","index$":13},"firstLine":{"a":true,"h":"First Line","n":"firstLine","r":false,"sh":"Card holder's address (max 30 characters).","t":"`$STRING`","key$":"firstLine","index$":14},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"sh":"ID of the card order.","t":"`$INTEGER`","key$":"id","index$":15},"lifetimeLimit":{"a":true,"h":"Lifetime Limit","n":"lifetimeLimit","r":false,"sh":"Maximum amount of spending on the card once issued.","t":["`$ONE`",["`$NUMBER`","`$NULL`"]],"key$":"lifetimeLimit","index$":16},"modificationTime":{"a":true,"fo":"date-time","h":"Modification Time","n":"modificationTime","r":false,"sh":"Time when the card order was last modified.","t":"`$STRING`","key$":"modificationTime","index$":17},"phoneNumber":{"a":true,"h":"Phone Number","n":"phoneNumber","r":false,"sh":"Phone number associated with the card order.","t":"`$STRING`","key$":"phoneNumber","index$":18},"postCode":{"a":true,"h":"Post Code","n":"postCode","r":false,"sh":"Card holder's postal code (max 10 characters).","t":"`$STRING`","key$":"postCode","index$":19},"profileId":{"a":true,"fo":"int64","h":"Profile Id","n":"profileId","r":false,"sh":"Profile ID.","t":"`$INTEGER`","key$":"profileId","index$":20},"program":{"a":true,"h":"Program","n":"program","r":true,"sh":"The name of the card program.","t":"`$STRING`","key$":"program","index$":21},"replacementDetails":{"a":true,"h":"Replacement Details","n":"replacementDetails","r":false,"sh":"The replacement details for this card.","t":"`$OBJECT`","key$":"replacementDetails","index$":22},"replacesCard":{"a":true,"h":"Replaces Card","n":"replacesCard","r":false,"sh":"Token of the card being replaced by this replacement card order.","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"replacesCard","index$":23},"secondLine":{"a":true,"h":"Second Line","n":"secondLine","r":false,"sh":"Card holder's address (max 30 characters).","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"secondLine","index$":24},"state":{"a":true,"h":"State","n":"state","r":false,"sh":"Card holder's state (max 30 characters).","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"state","index$":25},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Status of the card order.","t":"`$STRING`","key$":"status","index$":26},"thirdLine":{"a":true,"h":"Third Line","n":"thirdLine","r":false,"sh":"Card holder's address (max 30 characters).","t":["`$ONE`",["`$STRING`","`$NULL`"]],"key$":"thirdLine","index$":27}},"id":{"field":"id","name":"id"},"name":"card_order","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["address","cardHolderName","cardHolderProfileId","deliveryOption","embossedName","lifetimeLimit","phoneNumber","program","replacementDetails"],"co":{"id":"POST /spend/profiles/{profileId}/card-orders","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0},{"a":true,"ex":"054064c9-e01e-49fb-8fd9-b0990b9442f4","explode":false,"k":"header","n":"xidempotence_uuid","or":"X-idempotence-uuid","r":true,"style":"simple","t":"`$STRING`","index$":1}],"params":[{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"POST","o":"/spend/profiles/{profileId}/card-orders","q":{"exist":["profile_id","xidempotence_uuid"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"bf":["city","country","firstLine","postCode","secondLine","state","thirdLine"],"co":{"id":"POST /spend/address/validate","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/spend/address/validate","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"address"},{"lit":"validate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":142,"k":"param","n":"id","or":"cardOrderId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements","q":{"$action":"requirement","exist":["id","profile_id"]},"r":{"param":{"cardOrderId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"},{"var":"id"},{"lit":"requirements"}],"t":{"req":"`reqdata`","res":"`body.requirements`"},"index$":0},{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/card-orders","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"ex":1,"explode":true,"k":"query","n":"page_number","or":"pageNumber","r":false,"style":"form","t":"`$INTEGER`","index$":0},{"a":true,"ex":10,"explode":true,"k":"query","n":"page_size","or":"pageSize","r":false,"style":"form","t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/card-orders","q":{"exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"}],"t":{"page":{"total":"`body.totalCount`"},"req":"`reqdata`","res":"`body.cardOrders`"},"index$":1},{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/card-orders/availability","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/card-orders/availability","q":{"$action":"availability","exist":["profile_id"]},"r":{"param":{"profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"},{"lit":"availability"}],"t":{"req":"`reqdata`","res":"`body.cardPrograms`"},"index$":2}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /spend/profiles/{profileId}/card-orders/{cardOrderId}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":142,"k":"param","n":"id","or":"cardOrderId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/spend/profiles/{profileId}/card-orders/{cardOrderId}","q":{"exist":["id","profile_id"]},"r":{"param":{"cardOrderId":"id","profileId":"profile_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["status"],"co":{"id":"PUT /spend/profiles/{profileId}/card-orders/{cardOrderId}/status","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"f47ac10b-58cc-4372-a567-0e02b2c3d479","explode":false,"k":"header","n":"x_external_correlation_id","or":"X-External-Correlation-Id","r":false,"style":"simple","t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":142,"k":"param","n":"id","or":"cardOrderId","r":true,"t":"`$INTEGER`","index$":0},{"a":true,"ex":123456,"k":"param","n":"profile_id","or":"profileId","r":true,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"PUT","o":"/spend/profiles/{profileId}/card-orders/{cardOrderId}/status","q":{"$action":"status","exist":["id","profile_id"]},"r":{"param":{"cardOrderId":"id","profileId":"profile_id"}},"s":[{"lit":"spend"},{"lit":"profiles"},{"var":"profile_id"},{"lit":"card-orders"},{"var":"id"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.profile"]]},"key$":"card_order","name__orig":"card_order","Name":"CardOrder","name_":"card_order","name-":"card-order","NAME":"CARD_ORDER","index$":15}, {"active":true,"entity":"card_order","key$":"BasicCardOrderFlow","kind":"basic","name":"BasicCardOrderFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"card_order_ref01"},"m":{"profile_id":"profile01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"profile_id":"profile01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"card_order_ref01"}}],"index$":1},{"a":true,"d":{"profile_id":"profile01"},"i":{"ref":"card_order_ref01","srcdatavar":"card_order_ref01_data","suffix":"_up0","textfield":"cardHolderName"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_order_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"card_order_ref01","srcdatavar":"card_order_ref01_data","suffix":"_dt0"},"m":{"id":"card_order01","profile_id":"profile01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-card_order_ref01"}}],"index$":3,"route":"GET /spend/profiles/{profileId}/card-orders/{cardOrderId}","record":{}}]}, 'CardOrder', {"POST /spend/profiles/{profileId}/card-orders":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Request body for creating a card order.","required":["program","cardHolderName"],"properties":{"program":{"type":"string","description":"The name of the card program.","example":"VISA_DEBIT_BUSINESS_UK_1_PHYSICAL_CARDS_API","key$":"program"},"cardHolderName":{"type":"string","description":"The cardholder's name.","example":"John Smith","key$":"cardHolderName"},"embossedName":{"type":"string","description":"The cardholder's name to print on the card (physical card only). The field length should be between 1 and 22 characters (spaces included).","example":"Smith John","key$":"embossedName"},"phoneNumber":{"type":"string","description":"For partners onboarded after 1/3/2025, we will use the profile phone number for any Card-related One-Time Password (OTP) requests. See [3ds](/guides/product/issue-cards/3ds).\nEnsure that the phone number is valid and starts with a \"+\" followed by the country code.\n","example":"+441234567890","key$":"phoneNumber"},"address":{"type":"object","description":"The cardholder's billing address or delivery address. **Required** for physical cards. **Optional** for virtual cards (defaults to the profile address, if omitted). Fields vary by country. See the [card address validation guide](/guides/developer/api-guides/card-address-validation).","additionalProperties":true,"properties":{"firstLine":{"type":"string","example":"56 Shoreditch High St"},"secondLine":{"type":["string","null"],"example":"The Tea Bldg"},"thirdLine":{"type":["string","null"],"example":null},"city":{"type":"string","example":"London"},"postCode":{"type":"string","example":"E1 6JJ"},"state":{"type":["string","null"],"example":null},"country":{"type":"string","description":"ISO 3166-1 alpha-2 country code.","example":"GB"}},"key$":"address"},"deliveryOption":{"type":"string","description":"The delivery method for the card order. The delivery method will be defined during scoping phase. Please reach out to your Implementation Manager for more information.\n\nOnly specify this field for `KIOSK_COLLECTION`. If not specified, the default delivery method for your region will be used.\n- `POSTAL_SERVICE_STANDARD` - Default delivery method. Not traceable.\n- `POSTAL_SERVICE_WITH_TRACKING` - Available in certain regions. Default in Brazil.\n- `KIOSK_COLLECTION` - Available in select regions. See the [kiosk collection guide](/guides/product/issue-cards/card-kiosk-collection).\n","enum":["POSTAL_SERVICE_STANDARD","POSTAL_SERVICE_WITH_TRACKING","KIOSK_COLLECTION"],"example":null,"key$":"deliveryOption"},"lifetimeLimit":{"type":"number","description":"Optionally sets a lifetime spending limit on the card. A lifetime limit of 0 means that a card cannot be used until the lifetime limit is updated.","example":100,"key$":"lifetimeLimit"},"cardHolderProfileId":{"type":"integer","format":"int64","description":"The cardholder profile for this card. This is used for business profiles.","example":654321,"key$":"cardHolderProfileId"},"replacementDetails":{"type":"object","description":"The replacement details for this card.","properties":{"cardToken":{"type":"string","description":"Token of the card to replace.","example":"4a75fdb7-5791-49ac-832c-81c4347e4df0"},"reason":{"type":"string","description":"Reason for replacing the card:\n- `CARD_DAMAGED`\n- `CARD_EXPIRING`\n","enum":["CARD_DAMAGED","CARD_EXPIRING"],"example":"CARD_DAMAGED"}},"key$":"replacementDetails"}},"index$":1}}}},"parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"name":"X-idempotence-uuid","in":"header","required":true,"description":"Idempotency key. Should be generated and used for any subsequent retries.","schema":{"type":"string","format":"uuid"},"example":"054064c9-e01e-49fb-8fd9-b0990b9442f4","index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"POST /spend/address/validate":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","description":"Address to validate. Fields vary by country. See the [card address validation guide](/guides/developer/api-guides/card-address-validation).","additionalProperties":true,"properties":{"firstLine":{"type":"string","description":"Card holder's address (max 30 characters).","example":"56 Shoreditch High St","key$":"firstLine"},"secondLine":{"type":["string","null"],"description":"Card holder's address (max 30 characters).","example":"The Tea Bldg","key$":"secondLine"},"thirdLine":{"type":["string","null"],"description":"Card holder's address (max 30 characters).","example":null,"key$":"thirdLine"},"city":{"type":"string","description":"Card holder's city (max 30 characters).","example":"London","key$":"city"},"postCode":{"type":"string","description":"Card holder's postal code (max 10 characters).","example":"E1 6JJ","key$":"postCode"},"state":{"type":["string","null"],"description":"Card holder's state (max 30 characters).","example":null,"key$":"state"},"country":{"type":"string","description":"Card holder's country (ISO 3166-1 alpha-2, max 2 characters).","example":"GB","key$":"country"}},"index$":1}}}},"parameters":[{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":0}]},"GET /spend/profiles/{profileId}/card-orders/{cardOrderId}/requirements":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"name":"cardOrderId","in":"path","required":true,"description":"The card order ID.","schema":{"type":"integer","format":"int64"},"example":142,"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"GET /spend/profiles/{profileId}/card-orders":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"name":"pageSize","in":"query","description":"The maximum number of card orders to return per page. This number can be between 10 - 100, and will default to 10.","schema":{"type":"integer","format":"int32"},"example":10,"index$":1},{"name":"pageNumber","in":"query","description":"The page number to retrieve the next set of card orders. The number has to be greater or equal to 1, and will default to 1.","schema":{"type":"integer","format":"int32"},"example":1,"index$":2},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":3}]},"GET /spend/profiles/{profileId}/card-orders/availability":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":1}]},"GET /spend/profiles/{profileId}/card-orders/{cardOrderId}":{"protocol":"http","parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"name":"cardOrderId","in":"path","required":true,"description":"The card order ID.","schema":{"type":"integer","format":"int64"},"example":142,"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]},"PUT /spend/profiles/{profileId}/card-orders/{cardOrderId}/status":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["status"],"properties":{"status":{"type":"string","description":"The intended new status of the card order:\n- `CANCELLED`\n- `COMPLETED` (deprecated)\n","enum":["CANCELLED","COMPLETED"],"example":"CANCELLED"}}}}}},"parameters":[{"name":"profileId","in":"path","required":true,"description":"The profile ID (personal or business).","schema":{"type":"integer","format":"int64"},"example":123456,"index$":0},{"name":"cardOrderId","in":"path","required":true,"description":"The card order ID.","schema":{"type":"integer","format":"int64"},"example":142,"index$":1},{"x-global":true,"name":"X-External-Correlation-Id","in":"header","required":false,"description":"Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n","schema":{"type":"string","format":"uuid","maxLength":36},"example":"f47ac10b-58cc-4372-a567-0e02b2c3d479","x-ref":"#/components/parameters/X-External-Correlation-Id","index$":2}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"card_order.create.0":"GET-only live run: needs POST /spend/profiles/{profileId}/card-orders","card_order.update.2":"GET-only live run: needs PUT /spend/profiles/{profileId}/card-orders/{cardOrderId}/status"} : {})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const card_order_ref01_ent = client.CardOrder()
    let card_order_ref01_data = setup.data.new.card_order['card_order_ref01']
    card_order_ref01_data['profile_id'] = setup.idmap['profile01']

    card_order_ref01_data = (await card_order_ref01_ent.create(card_order_ref01_data)).data()
    assert(null != card_order_ref01_data.id)


    // LIST
    const card_order_ref01_match: any = {}
    card_order_ref01_match['profile_id'] = setup.idmap['profile01']

    const card_order_ref01_list = (await card_order_ref01_ent.list(card_order_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(card_order_ref01_list, { id: card_order_ref01_data.id })))


    // UPDATE
    const card_order_ref01_data_up0: any = {}
    card_order_ref01_data_up0.id = card_order_ref01_data.id
    card_order_ref01_data_up0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']

    const card_order_ref01_markdef_up0 = { name: 'cardHolderName', value: 'Mark01-card_order_ref01_' + setup.now }
    ;(card_order_ref01_data_up0 as any)[card_order_ref01_markdef_up0.name] = card_order_ref01_markdef_up0.value

    const card_order_ref01_resdata_up0 = (await card_order_ref01_ent.update(card_order_ref01_data_up0)).data()
    assert(card_order_ref01_resdata_up0.id === card_order_ref01_data_up0.id)

    assert((card_order_ref01_resdata_up0 as any)[card_order_ref01_markdef_up0.name] === card_order_ref01_markdef_up0.value)


    // LOAD
    const card_order_ref01_match_dt0: any = {}
    card_order_ref01_match_dt0.id = card_order_ref01_data.id
    card_order_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01']
    const card_order_ref01_data_dt0 = (await card_order_ref01_ent.load(card_order_ref01_match_dt0)).data()
    assert(card_order_ref01_data_dt0.id === card_order_ref01_data.id)


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
      '../../../../.sdk/test/entity/card_order/CardOrderTestData.json')

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
    ['card_order01','card_order02','card_order03','profile01','profile02','profile03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'WISE_TEST_CARD_ORDER_ENTID': idmap,
    'WISE_TEST_LIVE': 'FALSE',
    'WISE_TEST_EXPLAIN': 'FALSE',
    'WISE_APIKEY': '',
  })

  idmap = env['WISE_TEST_CARD_ORDER_ENTID']

  const live = 'TRUE' === env.WISE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['WISE_TEST_CARD_ORDER_ENTID']
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
  
