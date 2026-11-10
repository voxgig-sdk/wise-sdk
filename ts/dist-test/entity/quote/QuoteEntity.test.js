"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('QuoteEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Quote();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Quote().load({ "id": 1, "profile_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'quote.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdTime": { "a": true, "fo": "date-time", "h": "Created Time", "n": "createdTime", "r": false, "sh": "Quote created timestamp.", "t": "`$STRING`", "key$": "createdTime", "index$": 0 }, "creationContext": { "a": true, "h": "Creation Context", "n": "creationContext", "r": false, "sh": "Used to pass additional metadata about the intended transfer.", "t": "`$OBJECT`", "key$": "creationContext", "index$": 1 }, "expirationTime": { "a": true, "fo": "date-time", "h": "Expiration Time", "n": "expirationTime", "r": false, "sh": "The date and time the quote expires.", "t": "`$STRING`", "key$": "expirationTime", "index$": 2 }, "guaranteedTargetAmount": { "a": true, "h": "Guaranteed Target Amount", "n": "guaranteedTargetAmount", "r": false, "sh": "Indicates whether the target amount is guaranteed.", "t": "`$BOOLEAN`", "key$": "guaranteedTargetAmount", "index$": 3 }, "guaranteedTargetAmountAllowed": { "a": true, "h": "Guaranteed Target Amount Allowed", "n": "guaranteedTargetAmountAllowed", "r": false, "sh": "Indicates whether guaranteed target amount is allowed.", "t": "`$BOOLEAN`", "key$": "guaranteedTargetAmountAllowed", "index$": 4 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "ID of this quote (GUID format).", "t": "`$STRING`", "key$": "id", "index$": 5 }, "notices": { "a": true, "h": "Notices", "n": "notices", "r": false, "sh": "Messages to display to the user.", "t": "`$ARRAY`", "key$": "notices", "index$": 6 }, "payOut": { "a": true, "h": "Pay Out", "n": "payOut", "r": false, "sh": "Mechanism Wise uses to deliver the transfer.", "t": "`$STRING`", "key$": "payOut", "index$": 7 }, "paymentMetadata": { "a": true, "h": "Payment Metadata", "n": "paymentMetadata", "r": false, "sh": "_Optional_.", "t": "`$OBJECT`", "key$": "paymentMetadata", "index$": 8 }, "paymentOptions": { "a": true, "h": "Payment Options", "n": "paymentOptions", "r": false, "sh": "List of the methods available to pay for the transfer.", "t": "`$ARRAY`", "key$": "paymentOptions", "index$": 9 }, "preferredPayIn": { "a": true, "h": "Preferred Pay In", "n": "preferredPayIn", "r": false, "sh": "Preferred pay-in method.", "t": "`$STRING`", "key$": "preferredPayIn", "index$": 10 }, "pricingConfiguration": { "a": true, "h": "Pricing Configuration", "n": "pricingConfiguration", "r": false, "sh": "Allows partners to override pricing configurations on a transfer level.", "t": "`$OBJECT`", "key$": "pricingConfiguration", "index$": 11 }, "profile": { "a": true, "fo": "int64", "h": "Profile", "n": "profile", "r": false, "sh": "Personal or business profile ID.", "t": "`$INTEGER`", "key$": "profile", "index$": 12 }, "providedAmountType": { "a": true, "h": "Provided Amount Type", "n": "providedAmountType", "r": false, "sh": "Indicates whether the quote was created as source or target.", "t": "`$STRING`", "key$": "providedAmountType", "index$": 13 }, "rate": { "a": true, "h": "Rate", "n": "rate", "r": false, "sh": "Exchange rate value used for the conversion.", "t": "`$NUMBER`", "key$": "rate", "index$": 14 }, "rateExpirationTime": { "a": true, "fo": "date-time", "h": "Rate Expiration Time", "n": "rateExpirationTime", "r": false, "sh": "Date and time the locked rate expires.", "t": "`$STRING`", "key$": "rateExpirationTime", "index$": 15 }, "rateType": { "a": true, "h": "Rate Type", "n": "rateType", "r": false, "sh": "Whether the rate is fixed or floating.", "t": "`$STRING`", "key$": "rateType", "index$": 16 }, "sourceAmount": { "a": true, "h": "Source Amount", "n": "sourceAmount", "r": false, "sh": "Amount in source currency to send.", "t": "`$NUMBER`", "key$": "sourceAmount", "index$": 17 }, "sourceCurrency": { "a": true, "h": "Source Currency", "n": "sourceCurrency", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Source (sending) currency code.", "t": "`$STRING`", "key$": "sourceCurrency", "index$": 18 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Current status of the quote.", "t": "`$STRING`", "key$": "status", "index$": 19 }, "targetAccount": { "a": true, "fo": "int64", "h": "Target Account", "n": "targetAccount", "r": false, "sh": "_Optional_.", "t": "`$INTEGER`", "key$": "targetAccount", "index$": 20 }, "targetAmount": { "a": true, "h": "Target Amount", "n": "targetAmount", "r": false, "sh": "Amount in target currency to be received by the recipient.", "t": "`$NUMBER`", "key$": "targetAmount", "index$": 21 }, "targetAmountAllowed": { "a": true, "h": "Target Amount Allowed", "n": "targetAmountAllowed", "r": false, "sh": "Indicates whether target amount is allowed.", "t": "`$BOOLEAN`", "key$": "targetAmountAllowed", "index$": 22 }, "targetCurrency": { "a": true, "h": "Target Currency", "n": "targetCurrency", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Target (receive) currency code.", "t": "`$STRING`", "key$": "targetCurrency", "index$": 23 }, "user": { "a": true, "fo": "int64", "h": "User", "n": "user", "r": false, "sh": "User ID that created the quote.", "t": "`$INTEGER`", "key$": "user", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "quote", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["creationContext", "payOut", "paymentMetadata", "preferredPayIn", "pricingConfiguration", "sourceAmount", "sourceCurrency", "targetAccount", "targetAmount", "targetCurrency"], "co": { "id": "POST /profiles/{profileId}/quotes", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 101, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/quotes", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "quotes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["pricingConfiguration", "sourceAmount", "sourceCurrency", "targetAmount", "targetCurrency"], "co": { "id": "POST /quotes", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/quotes", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "quotes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/quotes/{quoteId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf", "k": "param", "n": "id", "or": "quoteId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 101, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/quotes/{quoteId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "quoteId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "quotes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["payOut", "paymentMetadata", "pricingConfiguration", "targetAccount"], "co": { "id": "PATCH /profiles/{profileId}/quotes/{quoteId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf", "k": "param", "n": "id", "or": "quoteId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 101, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/profiles/{profileId}/quotes/{quoteId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "quoteId": "id" } }, "rb": { "kind": "json", "media": "application/merge-patch+json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "quotes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "quote", "name__orig": "quote", "Name": "Quote", "name_": "quote", "name-": "quote", "NAME": "QUOTE", "index$": 52 }, { "active": true, "entity": "quote", "key$": "BasicQuoteFlow", "kind": "basic", "name": "BasicQuoteFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "quote_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": { "profile_id": "profile01" }, "i": { "ref": "quote_ref01", "srcdatavar": "quote_ref01_data", "suffix": "_up0", "textfield": "createdTime" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-quote_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "quote_ref01", "srcdatavar": "quote_ref01_data", "suffix": "_dt0" }, "m": { "id": "quote01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-quote_ref01" } }], "index$": 2, "route": "GET /profiles/{profileId}/quotes/{quoteId}", "record": {} }] }, 'Quote', { "POST /profiles/{profileId}/quotes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["sourceCurrency", "targetCurrency"], "properties": { "sourceCurrency": { "type": "string", "description": "Source (sending) currency code.", "example": "GBP", "key$": "sourceCurrency" }, "targetCurrency": { "type": "string", "description": "Target (receiving) currency code.", "example": "USD", "key$": "targetCurrency" }, "sourceAmount": { "type": ["number", "null"], "description": "Amount in source currency. Either `sourceAmount` or `targetAmount` is required, never both.", "example": 100, "key$": "sourceAmount" }, "targetAmount": { "type": ["number", "null"], "description": "Amount in target currency.", "example": null, "key$": "targetAmount" }, "targetAccount": { "type": "integer", "format": "int64", "description": "_Optional_. This is the ID of transfer recipient, found in the create recipient response. If provided, can be used as an alternative to [updating the quote](/api-reference/quote/quoteupdate).", "example": 12345, "key$": "targetAccount" }, "payOut": { "type": ["string", "null"], "description": "_Optional_. Preferred payout method. \n\nDefault value is `BANK_TRANSFER`. \n\nExamples of other accepted values include `BALANCE`, `SWIFT`, `SWIFT_OUR`, `ALIPAY`, and `INTERAC`.\n", "example": null, "key$": "payOut" }, "preferredPayIn": { "type": ["string", "null"], "description": "_Optional_. Preferred payin method. Use `BANK_TRANSFER` to return this method at the top of the response's results.", "example": null, "key$": "preferredPayIn" }, "creationContext": { "type": "object", "description": "Used to pass additional metadata about the intended transfer.", "properties": { "flow": { "type": "string", "description": "_Optional_. Used to pass flow type for the creation flow on the quote. It should always be `MASS_PAY` for batch transfers funded via payin sessions.", "example": "MASS_PAY" } }, "key$": "creationContext" }, "paymentMetadata": { "type": "object", "description": "_Optional_. Used to pass additional metadata about the intended transfer.", "properties": { "transferNature": { "type": "string", "description": "_Optional_. Used to pass transfer nature for calculating proper tax amounts (IOF) for transfers to and from BRL. Accepted values are shown dynamically in transfer requirements.", "example": "MOVING_MONEY_BETWEEN_OWN_ACCOUNTS" } }, "key$": "paymentMetadata" }, "pricingConfiguration": { "type": "object", "description": "Required when configured for your client ID. Includes a `pricingConfiguration` to be used for pricing calculations with the quote.", "properties": { "fee": { "type": "object", "properties": { "type": {}, "variable": {}, "fixed": {} } } }, "key$": "pricingConfiguration" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Personal or business profile ID of the sender.", "schema": { "type": "integer", "format": "int64" }, "example": 101, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /quotes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["sourceCurrency", "targetCurrency"], "properties": { "sourceCurrency": { "type": "string", "description": "Source (sending) currency code.", "example": "GBP", "key$": "sourceCurrency" }, "targetCurrency": { "type": "string", "description": "Target (receiving) currency code.", "example": "USD", "key$": "targetCurrency" }, "sourceAmount": { "type": ["number", "null"], "description": "Amount in source currency. Either `sourceAmount` or `targetAmount` is required, never both.", "example": null, "key$": "sourceAmount" }, "targetAmount": { "type": ["number", "null"], "description": "Amount in target currency.", "example": 110, "key$": "targetAmount" }, "pricingConfiguration": { "type": "object", "description": "Required when configured for your client ID. Includes a `pricingConfiguration` to be used for pricing calculations with the quote.", "properties": { "fee": { "type": "object", "properties": { "type": {}, "variable": {}, "fixed": {} } } }, "key$": "pricingConfiguration" } }, "index$": 1 } } } }, "parameters": [{ "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 0 }] }, "GET /profiles/{profileId}/quotes/{quoteId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Personal or business profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 101, "index$": 0 }, { "name": "quoteId", "in": "path", "required": true, "description": "The quote ID (GUID format).", "schema": { "type": "string", "format": "uuid" }, "example": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "PATCH /profiles/{profileId}/quotes/{quoteId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/merge-patch+json": { "schema": { "type": "object", "properties": { "targetAccount": { "type": "integer", "format": "int64", "description": "ID of transfer recipient, found in the create recipient response.", "example": 12345, "key$": "targetAccount" }, "payOut": { "type": "string", "description": "_Optional_. Preferred payout method. \n\nDefault value is `BANK_TRANSFER`. \n\nExamples of other accepted values include `BALANCE`, `SWIFT`, `SWIFT_OUR`, `ALIPAY`, and `INTERAC`.\n", "example": "SWIFT_OUR", "key$": "payOut" }, "paymentMetadata": { "type": "object", "description": "_Optional_. Used to pass additional metadata about the intended transfer.", "properties": { "transferNature": { "type": "string", "description": "_Optional_. Used to pass transfer nature for calculating proper tax amounts (IOF) for transfers to and from BRL. Accepted values are shown dynamically in transfer requirements.", "example": "MOVING_MONEY_BETWEEN_OWN_ACCOUNTS" } }, "key$": "paymentMetadata" }, "pricingConfiguration": { "type": "object", "description": "Required when configured for your client ID. Includes `pricingConfiguration` to be used for pricing calculations with the quote. If previously passed, the existing `pricingConfiguration` will remain and not be updated.", "properties": { "fee": { "type": "object", "properties": { "type": {}, "variable": {}, "fixed": {} } } }, "key$": "pricingConfiguration" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Personal or business profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 101, "index$": 0 }, { "name": "quoteId", "in": "path", "required": true, "description": "The quote ID (GUID format).", "schema": { "type": "string", "format": "uuid" }, "example": "11144c35-9fe8-4c32-b7fd-d05c2a7734bf", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "quote.create.0": "GET-only live run: needs POST /profiles/{profileId}/quotes", "quote.update.1": "GET-only live run: needs PATCH /profiles/{profileId}/quotes/{quoteId}", "quote.load.2": "GET-only live run: reads a record only quote.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const quote_ref01_ent = client.Quote();
        let quote_ref01_data = setup.data.new.quote['quote_ref01'];
        quote_ref01_data['profile_id'] = setup.idmap['profile01'];
        quote_ref01_data = (await quote_ref01_ent.create(quote_ref01_data)).data();
        (0, node_assert_1.default)(null != quote_ref01_data.id);
        // UPDATE
        const quote_ref01_data_up0 = {};
        quote_ref01_data_up0.id = quote_ref01_data.id;
        quote_ref01_data_up0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const quote_ref01_markdef_up0 = { name: 'createdTime', value: 'Mark01-quote_ref01_' + setup.now };
        quote_ref01_data_up0[quote_ref01_markdef_up0.name] = quote_ref01_markdef_up0.value;
        const quote_ref01_resdata_up0 = (await quote_ref01_ent.update(quote_ref01_data_up0)).data();
        (0, node_assert_1.default)(quote_ref01_resdata_up0.id === quote_ref01_data_up0.id);
        (0, node_assert_1.default)(quote_ref01_resdata_up0[quote_ref01_markdef_up0.name] === quote_ref01_markdef_up0.value);
        // LOAD
        const quote_ref01_match_dt0 = {};
        quote_ref01_match_dt0.id = quote_ref01_data.id;
        quote_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const quote_ref01_data_dt0 = (await quote_ref01_ent.load(quote_ref01_match_dt0)).data();
        (0, node_assert_1.default)(quote_ref01_data_dt0.id === quote_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/quote/QuoteTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['quote01', 'quote02', 'quote03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_QUOTE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_QUOTE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_QUOTE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WiseSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=QuoteEntity.test.js.map