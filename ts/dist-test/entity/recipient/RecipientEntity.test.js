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
(0, node_test_1.describe)('RecipientEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Recipient();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('recipient hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WiseSDK.test(offline).Recipient().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WiseSDK.test(offline).Recipient()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WiseSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Recipient().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WiseSDK.test().Recipient().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WiseSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Recipient().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Recipient().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Recipient().list({ "active": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'recipient.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "acceptedOutcomes": { "a": true, "h": "Accepted Outcomes", "n": "acceptedOutcomes", "r": true, "sh": "Set to `true` to indicate the customer accepted the confirmation outcome.", "t": "`$BOOLEAN`", "key$": "acceptedOutcomes", "index$": 0 }, "accountHolderName": { "a": true, "h": "Account Holder Name", "n": "accountHolderName", "r": false, "sh": "Recipient full name.", "t": "`$STRING`", "key$": "accountHolderName", "index$": 1 }, "accountId": { "a": true, "fo": "int64", "h": "Account Id", "n": "accountId", "r": false, "sh": "Recipient account ID.", "t": "`$INTEGER`", "key$": "accountId", "index$": 2 }, "accountSummary": { "a": true, "h": "Account Summary", "n": "accountSummary", "r": false, "sh": "Summary of account details for ease of lookup.", "t": "`$STRING`", "key$": "accountSummary", "index$": 3 }, "active": { "a": true, "h": "Active", "n": "active", "r": false, "sh": "Status of the recipient account.", "t": "`$BOOLEAN`", "key$": "active", "index$": 4 }, "commonFieldMap": { "a": true, "h": "Common Field Map", "n": "commonFieldMap", "r": false, "sh": "Map of key lookup fields for the account.", "t": "`$OBJECT`", "key$": "commonFieldMap", "index$": 5 }, "confirmations": { "a": true, "h": "Confirmations", "n": "confirmations", "r": false, "sh": "Contains verification results for the recipient's details.", "t": "`$OBJECT`", "key$": "confirmations", "index$": 6 }, "country": { "a": true, "h": "Country", "n": "country", "r": false, "sh": "2-character country code.", "t": "`$STRING`", "key$": "country", "index$": 7 }, "creatorId": { "a": true, "fo": "int64", "h": "Creator Id", "n": "creatorId", "r": false, "sh": "Account entity that owns the recipient account.", "t": "`$INTEGER`", "key$": "creatorId", "index$": 8 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "3-character currency code.", "t": "`$STRING`", "key$": "currency", "index$": 9 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Contains the details of the recipient account specific to its currency and type.", "t": "`$OBJECT`", "key$": "details", "index$": 10 }, "displayFields": { "a": true, "h": "Display Fields", "n": "displayFields", "r": false, "sh": "Lookup fields (key/label/value) for rendering in your front-end.", "t": "`$ARRAY`", "key$": "displayFields", "index$": 11 }, "hash": { "a": true, "h": "Hash", "n": "hash", "r": false, "sh": "Account hash for tracking changes to recipient details.", "t": "`$STRING`", "key$": "hash", "index$": 12 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "ID of the recipient.", "t": "`$INTEGER`", "key$": "id", "index$": 13 }, "isInternal": { "a": true, "h": "Is Internal", "n": "isInternal", "r": false, "sh": "Indicates whether recipient is internal.", "t": "`$BOOLEAN`", "key$": "isInternal", "index$": 14 }, "legalEntityType": { "a": true, "h": "Legal Entity Type", "n": "legalEntityType", "r": false, "sh": "Entity type of recipient account.", "t": "`$STRING`", "key$": "legalEntityType", "index$": 15 }, "longAccountSummary": { "a": true, "h": "Long Account Summary", "n": "longAccountSummary", "r": false, "sh": "Longer account details summary.", "t": "`$STRING`", "key$": "longAccountSummary", "index$": 16 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Recipient name details.", "t": "`$OBJECT`", "key$": "name", "index$": 17 }, "ownedByCustomer": { "a": true, "h": "Owned By Customer", "n": "ownedByCustomer", "r": false, "sh": "Inidicates if recipient account belongs to profile owner.", "t": "`$BOOLEAN`", "key$": "ownedByCustomer", "index$": 18 }, "profile": { "a": true, "fo": "int64", "h": "Profile", "n": "profile", "r": false, "sh": "Personal or business profile ID of the sender.", "t": "`$INTEGER`", "key$": "profile", "index$": 19 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": false, "sh": "Specific profile that owns the recipient account.", "t": "`$INTEGER`", "key$": "profileId", "index$": 20 }, "quoteId": { "a": true, "h": "Quote Id", "n": "quoteId", "r": false, "sh": "Quote ID.", "t": "`$STRING`", "key$": "quoteId", "index$": 21 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Recipient account type.", "t": "`$STRING`", "key$": "type", "index$": 22 }, "ultimateBeneficiary": { "a": true, "h": "Ultimate Beneficiary", "n": "ultimateBeneficiary", "r": true, "sh": "The details for the ultimate beneficiary of this recipient.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "ultimateBeneficiary", "index$": 23 } }, "id": { "field": "id", "name": "id" }, "name": "recipient", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /accounts/{accountId}/quotes/{quoteId}/compatibility", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "account_id", "or": "accountId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "quote_id", "or": "quoteId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/accounts/{accountId}/quotes/{quoteId}/compatibility", "q": { "exist": ["account_id", "quote_id"] }, "r": { "param": { "accountId": "account_id", "quoteId": "quote_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "quotes" }, { "var": "quote_id" }, { "lit": "compatibility" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["accountHolderName", "currency", "details", "ownedByCustomer", "profile", "type", "ultimateBeneficiary"], "co": { "id": "POST /accounts", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": false, "explode": true, "k": "query", "n": "refund", "or": "refund", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/accounts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /accounts", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": true, "explode": true, "k": "query", "n": "active", "or": "active", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "explode": true, "k": "query", "n": "creator_id", "or": "creatorId", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "currency", "or": "currency", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "explode": true, "k": "query", "n": "owned_by_customer", "or": "ownedByCustomer", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 3 }, { "a": true, "explode": true, "k": "query", "n": "profile", "or": "profile", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 4 }, { "a": true, "explode": true, "k": "query", "n": "profile_id", "or": "profileId", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 5 }, { "a": true, "explode": true, "k": "query", "n": "seek_position", "or": "seekPosition", "r": false, "style": "form", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "index$": 6 }, { "a": true, "explode": true, "k": "query", "n": "size", "or": "size", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 7 }, { "a": true, "ex": "id,asc", "explode": true, "k": "query", "n": "sort", "or": "sort", "r": false, "style": "form", "t": "`$STRING`", "index$": 8 }, { "a": true, "explode": true, "k": "query", "n": "type", "or": "type", "r": false, "style": "form", "t": "`$STRING`", "index$": 9 }] }, "k": "http", "m": "GET", "o": "/accounts", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }], "t": { "req": "`reqdata`", "res": "`body.content`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /accounts/{accountId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "account_id", "or": "accountId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/accounts/{accountId}", "q": { "exist": ["account_id"] }, "r": { "param": { "accountId": "account_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }, { "var": "account_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /accounts/{accountId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "account_id", "or": "accountId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/accounts/{accountId}", "q": { "exist": ["account_id"] }, "r": { "param": { "accountId": "account_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }, { "var": "account_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["acceptedOutcomes"], "co": { "id": "PATCH /accounts/{accountId}/confirmations", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "account_id", "or": "accountId", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "explode": true, "k": "query", "n": "quote_id", "or": "quoteId", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/accounts/{accountId}/confirmations", "q": { "exist": ["account_id"] }, "r": { "param": { "accountId": "account_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "confirmations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.quote"]] }, "key$": "recipient", "name__orig": "recipient", "Name": "Recipient", "name_": "recipient", "name-": "recipient", "NAME": "RECIPIENT", "index$": 54 }, { "active": true, "entity": "recipient", "key$": "BasicRecipientFlow", "kind": "basic", "name": "BasicRecipientFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "recipient_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "recipient_ref01" } }], "index$": 1 }, { "a": false, "d": {}, "i": { "ref": "recipient_ref01", "srcdatavar": "recipient_ref01_data", "suffix": "_up0", "textfield": "accountHolderName" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-recipient_ref01" } }], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "recipient_ref01", "srcdatavar": "recipient_ref01_data", "suffix": "_dt0" }, "m": { "id": "recipient01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-recipient_ref01" } }], "unreachable": true }, { "a": false, "d": {}, "i": { "ref": "recipient_ref01", "suffix": "_rm0" }, "m": { "id": "recipient01" }, "o": "remove", "s": [], "v": [], "unreachable": true }, { "a": false, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "recipient_ref01" } }], "unreachable": true }] }, 'Recipient', { "POST /accounts/{accountId}/quotes/{quoteId}/compatibility": { "protocol": "http", "parameters": [{ "name": "accountId", "in": "path", "required": true, "description": "Recipient account ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "quoteId", "in": "path", "required": true, "description": "Quote ID.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /accounts": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Create a recipient (beneficiary) account request. The required fields inside the `details` object depend on currency and route. Use the account-requirements endpoints to discover the exact required fields.\n", "properties": { "currency": { "type": "string", "description": "3-character currency code.", "example": "GBP", "key$": "currency" }, "type": { "type": "string", "description": "Recipient account type. These are currency/route-specific, for example, `sort_code`, `iban`, `email`.", "example": "sort_code", "key$": "type" }, "profile": { "type": "integer", "format": "int64", "description": "Personal or business profile ID of the sender. We recommend passing the business profile ID if multiple users manage your business account so all users authorized on the business account can access the recipient.", "example": 30000000, "key$": "profile" }, "accountHolderName": { "type": "string", "description": "Recipient full name.", "example": "John Doe", "key$": "accountHolderName" }, "ownedByCustomer": { "type": "boolean", "description": "Indicates whether the recipient account is owned by the profile owner.\n\nWhile optional, we recommend setting to `true` for self-transfers (such as a user sending money to their own account in another country or currency).\nDistinguishing self-transfers from third-party transfers improves routing and processing efficiency.\n", "example": true, "key$": "ownedByCustomer" }, "details": { "type": "object", "description": "Contains the details of the recipient account specific to its currency and type. \n\nCommon examples include `legalType`, `sortCode`, `accountNumber`, `email`, `dateOfBirth`, etc. Use the **retrieve recipient account requirements** endpoint to determine what is required for a specific recipient.\n", "properties": { "legalType": { "type": "string", "description": "Recipient legal type.", "enum": ["PRIVATE", "BUSINESS"], "example": "PRIVATE" }, "sortCode": { "type": "string", "description": "Sort code (GBP example).", "example": "040075" }, "accountNumber": { "type": "string", "description": "Account number (GBP example).", "example": "37778842" }, "dateOfBirth": { "type": "string", "description": "Date of birth in ISO 8601 date format. Only required for certain currency routes. Call the **retrieve recipient account requirements** endpoint to confirm.", "example": "1961-01-01" } }, "additionalProperties": true, "key$": "details" }, "ultimateBeneficiary": { "type": ["object", "null"], "description": "The details about the ultimate beneficiary for this recipient, if present. If absent, the ultimate beneficiary _is_ the recipient.", "required": ["name"], "properties": { "accountNumber": { "type": ["string", "null"], "description": "Ultimate beneficiary account number.", "example": "37778842" }, "bankName": { "type": ["string", "null"], "description": "Ultimate beneficiary bank name.", "example": "Wise Payments Limited" }, "bankCode": { "type": ["string", "null"], "description": "Ultimate beneficiary bank code.", "example": "026073150" }, "name": { "type": "object", "description": "Ultimate beneficiary name details.", "required": ["fullName"], "properties": { "fullName": {} } }, "address": { "type": ["object", "null"], "description": "Ultimate beneficiary address.", "properties": { "country": {}, "firstLine": {}, "postCode": {}, "city": {}, "state": {} } }, "bankAddress": { "type": ["object", "null"], "description": "Ultimate beneficiary bank address.", "properties": { "country": {}, "firstLine": {}, "postCode": {}, "city": {}, "state": {} } } }, "key$": "ultimateBeneficiary" } }, "x-ref": "#/components/schemas/recipient-create-request", "index$": 1 }, "examples": { "GBP recipient": { "summary": "GBP recipient", "value": { "currency": "GBP", "type": "sort_code", "profile": 30000000, "ownedByCustomer": true, "accountHolderName": "John Doe", "details": { "legalType": "PRIVATE", "sortCode": "040075", "accountNumber": "37778842", "dateOfBirth": "1961-01-01" } } }, "Email recipient": { "summary": "Email recipient", "value": { "profile": 30000000, "accountHolderName": "John Doe", "currency": "EUR", "type": "email", "details": { "email": "john.doe@transfer-world.com" } } } } } } }, "parameters": [{ "name": "refund", "in": "query", "required": false, "description": "When `true`, the request creates a refund recipient account.", "schema": { "type": "boolean", "default": false }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /accounts": { "protocol": "http", "parameters": [{ "name": "creatorId", "in": "query", "required": false, "description": "Creator of the account.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "profileId", "in": "query", "required": false, "description": "Filters by the personal or business profile that created the account. Defaults to the personal profile.", "schema": { "type": "integer", "format": "int64" }, "index$": 1 }, { "name": "profile", "in": "query", "required": false, "description": "Alias for `profileId`.", "schema": { "type": "integer", "format": "int64" }, "index$": 2 }, { "name": "currency", "in": "query", "required": false, "description": "Filters the response by target currency.\n\nUseful for presenting a list of recipients to your customer when they have already indicated the target currency in your flow.\n\nSupports comma-separated values (for example, `USD,GBP`).\n", "schema": { "type": "string" }, "index$": 3 }, { "name": "active", "in": "query", "required": false, "description": "Filters by whether the selected profile is active. Defaults to `true`.", "schema": { "type": "boolean", "default": true }, "index$": 4 }, { "name": "type", "in": "query", "required": false, "description": "Filters the response by account type. Supports comma-separated values (for example, `iban,swift_code`).", "schema": { "type": "string" }, "index$": 5 }, { "name": "ownedByCustomer", "in": "query", "required": false, "description": "Filters the response by whether the account is owned by the customer. Leave out to retrieve all accounts.", "schema": { "type": "boolean" }, "index$": 6 }, { "name": "size", "in": "query", "required": false, "description": "The number of accounts returned in a page of the response. Defaults to 20 (the maximum).", "schema": { "type": "integer", "format": "int32", "maximum": 20 }, "index$": 7 }, { "name": "seekPosition", "in": "query", "required": false, "description": "For pagination, use the value from the `seekPositionForNext` field of the previous response to retrieve the next page.", "schema": { "type": ["integer", "null"], "format": "int64" }, "index$": 8 }, { "name": "sort", "in": "query", "required": false, "description": "Controls the sorting strategy for the response. \n\nUses comma-separated options (either `id` or `currency` first, followed by `asc` or `desc` for direction).\n\n- `?sort=id,asc` sorts in ascending order by `id`.\n- `?sort=id,desc` sorts in descending order by `id`.\n- `?sort=currency,asc` sorts in ascending order by currency.\n", "schema": { "type": "string", "example": "id,asc" }, "index$": 9 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 10 }] }, "GET /accounts/{accountId}": { "protocol": "http", "parameters": [{ "name": "accountId", "in": "path", "required": true, "description": "Recipient account ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "DELETE /accounts/{accountId}": { "protocol": "http", "parameters": [{ "name": "accountId", "in": "path", "required": true, "description": "Recipient account ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "PATCH /accounts/{accountId}/confirmations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["acceptedOutcomes"], "properties": { "acceptedOutcomes": { "type": "boolean", "description": "Set to `true` to indicate the customer accepted the confirmation outcome.", "example": true, "key$": "acceptedOutcomes" } }, "index$": 1 } } } }, "parameters": [{ "name": "accountId", "in": "path", "required": true, "description": "Recipient account ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "quoteId", "in": "query", "required": false, "description": "Required if the confirmation result contained a `quoteId`.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "recipient.create.0": "GET-only live run: needs POST /accounts/{accountId}/quotes/{quoteId}/compatibility", "recipient.update.2": "GET-only live run: needs PATCH /accounts/{accountId}/confirmations", "recipient.remove.4": "GET-only live run: needs DELETE /accounts/{accountId}", "recipient.list.5": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const recipient_ref01_ent = client.Recipient();
        let recipient_ref01_data = setup.data.new.recipient['recipient_ref01'];
        recipient_ref01_data = (await recipient_ref01_ent.create(recipient_ref01_data)).data();
        (0, node_assert_1.default)(null != recipient_ref01_data.id);
        // LIST
        const recipient_ref01_match = {};
        const recipient_ref01_list = (await recipient_ref01_ent.list(recipient_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(recipient_ref01_list, { id: recipient_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/recipient/RecipientTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['recipient01', 'recipient02', 'recipient03', 'quote01', 'quote02', 'quote03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_RECIPIENT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_RECIPIENT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_RECIPIENT_ENTID'];
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
//# sourceMappingURL=RecipientEntity.test.js.map