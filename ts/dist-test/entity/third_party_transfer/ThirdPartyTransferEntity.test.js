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
(0, node_test_1.describe)('ThirdPartyTransferEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.ThirdPartyTransfer();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ThirdPartyTransfer().load({ "id": "x", "profile_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'third_party_transfer.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created": { "a": true, "fo": "date-time", "h": "Created", "n": "created", "r": false, "sh": "Timestamp when transfer was created.", "t": "`$STRING`", "key$": "created", "index$": 0 }, "details": { "a": true, "h": "Details", "n": "details", "op": { "create": { "req": true, "type": "`$OBJECT`" } }, "r": false, "sh": "Payment Details", "t": "`$OBJECT`", "key$": "details", "index$": 1 }, "hasActiveIssues": { "a": true, "h": "Has Active Issues", "n": "hasActiveIssues", "r": false, "sh": "Are there any pending issues which stop executing the transfer?", "t": "`$BOOLEAN`", "key$": "hasActiveIssues", "index$": 2 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "Transfer ID", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "originalTransferId": { "a": true, "h": "Original Transfer Id", "n": "originalTransferId", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Unique identifier randomly generated per transfer request by the calling client", "t": "`$STRING`", "key$": "originalTransferId", "index$": 4 }, "originator": { "a": true, "h": "Originator", "n": "originator", "op": { "create": { "req": true, "type": "`$ANY`" } }, "r": false, "sh": "Data block to capture payment originator details", "t": "`$OBJECT`", "key$": "originator", "index$": 5 }, "quote": { "a": true, "h": "Quote", "n": "quote", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Quote ID", "t": "`$STRING`", "key$": "quote", "index$": 6 }, "rate": { "a": true, "fo": "decimal", "h": "Rate", "n": "rate", "r": false, "sh": "Exchange rate value", "t": "`$NUMBER`", "key$": "rate", "index$": 7 }, "sourceAccount": { "a": true, "fo": "int64", "h": "Source Account", "n": "sourceAccount", "r": false, "sh": "Refund recipient account ID", "t": "`$INTEGER`", "key$": "sourceAccount", "index$": 8 }, "sourceCurrency": { "a": true, "h": "Source Currency", "n": "sourceCurrency", "r": false, "sh": "Source currency code", "t": "`$STRING`", "key$": "sourceCurrency", "index$": 9 }, "sourceValue": { "a": true, "fo": "decimal", "h": "Source Value", "n": "sourceValue", "r": false, "sh": "Transfer amount in source currency", "t": "`$NUMBER`", "key$": "sourceValue", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Transfer current status.", "t": "`$STRING`", "key$": "status", "index$": 11 }, "targetAccount": { "a": true, "fo": "int64", "h": "Target Account", "n": "targetAccount", "op": { "create": { "req": true, "type": "`$INTEGER`" } }, "r": false, "sh": "Recipient account ID", "t": "`$INTEGER`", "key$": "targetAccount", "index$": 12 }, "targetCurrency": { "a": true, "h": "Target Currency", "n": "targetCurrency", "r": false, "sh": "Target currency code", "t": "`$STRING`", "key$": "targetCurrency", "index$": 13 }, "targetValue": { "a": true, "fo": "decimal", "h": "Target Value", "n": "targetValue", "r": false, "sh": "Transfer amount in target currency", "t": "`$NUMBER`", "key$": "targetValue", "index$": 14 }, "user": { "a": true, "fo": "int64", "h": "User", "n": "user", "r": false, "sh": "Your user ID", "t": "`$INTEGER`", "key$": "user", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "third_party_transfer", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["details", "originalTransferId", "originator", "quote", "sourceAccount", "targetAccount"], "co": { "id": "POST /profiles/{profileId}/third-party-transfers", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 123456789, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/third-party-transfers", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "third-party-transfers" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/third-party-transfers/{transferId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 16521632, "k": "param", "n": "id", "or": "transferId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 123456789, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/third-party-transfers/{transferId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "transferId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "third-party-transfers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "third_party_transfer", "name__orig": "third_party_transfer", "Name": "ThirdPartyTransfer", "name_": "third_party_transfer", "name-": "third-party-transfer", "NAME": "THIRD_PARTY_TRANSFER", "index$": 67 }, { "active": true, "entity": "third_party_transfer", "key$": "BasicThirdPartyTransferFlow", "kind": "basic", "name": "BasicThirdPartyTransferFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "third_party_transfer_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "third_party_transfer_ref01", "srcdatavar": "third_party_transfer_ref01_data", "suffix": "_dt0" }, "m": { "id": "third_party_transfer01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-third_party_transfer_ref01" } }], "index$": 1, "route": "GET /profiles/{profileId}/third-party-transfers/{transferId}", "record": {} }] }, 'ThirdPartyTransfer', { "POST /profiles/{profileId}/third-party-transfers": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "originalTransferId": { "type": "string", "maxLength": 250, "minLength": 1, "pattern": "\\S", "description": "Unique transfer ID in your system. We use this field also to perform idempotency check to avoid duplicate transfers in case of network failures or timeouts.\n    You can only submit one transfer with same originalTransferId.", "example": "4711", "key$": "originalTransferId" }, "targetAccount": { "type": "integer", "description": "Recipient account ID.", "format": "int64", "example": 7839323, "key$": "targetAccount" }, "sourceAccount": { "type": "integer", "description": "Refund recipient account ID.", "format": "int64", "example": 1527389, "key$": "sourceAccount" }, "quote": { "type": "string", "minLength": 1, "pattern": "\\S", "description": "Quote ID. You can only create one transfer per one quote.\n    You cannot use same quote ID to create multiple transfers.", "example": "3522e360-356a-4e37-9f99-94a21898d8fa", "key$": "quote" }, "details": { "type": "object", "properties": { "reference": { "type": "string", "maxLength": 250, "description": "Recipient will see this reference text in their bank statement. Maximum allowed characters depends on the currency route.\n         Reference must be null or non-blank.\n         [Business Payments Tips](https://wise.com/help/articles/2932870/tips-for-paying-invoices) for a full list", "example": "T12789649" } }, "description": "Data block to capture payment details. This is a map of key-value pairs and all values must be string.", "x-ref": "#/components/schemas/Details", "key$": "details" }, "originator": { "oneOf": [{ "allOf": [{}, {}], "x-ref": "#/components/schemas/OriginatorPRIVATE" }, { "allOf": [{}, {}], "x-ref": "#/components/schemas/OriginatorBUSINESS" }], "discriminator": { "propertyName": "legalEntityType", "mapping": { "PRIVATE": "#/components/schemas/OriginatorPRIVATE", "BUSINESS": "#/components/schemas/OriginatorBUSINESS" } }, "description": "Data block to capture payment originator details.", "x-ref": "#/components/schemas/Originator", "key$": "originator" } }, "required": ["details", "originalTransferId", "originator", "quote", "targetAccount"], "x-ref": "#/components/schemas/CreateThirdPartyTransferRequestContent", "index$": 1 }, "examples": { "1.create-third-party-transfer-private-originator": { "summary": "PRIVATE Originator", "value": { "profileId": 123456789, "targetAccount": 7839323, "quote": "3522e360-356a-4e37-9f99-94a21898d8fa", "originalTransferId": "4711", "details": { "reference": "Ski trip" }, "originator": { "legalEntityType": "PRIVATE", "accountDetails": "123456789", "reference": "CST-2991992", "name": { "givenName": "John", "middleNames": ["Ryan"], "familyName": "Godspeed", "patronymicName": "Fitz" }, "dateOfBirth": "1977-07-01", "nationality": "EE", "address": { "firstLine": "Salu tee 100, Apt 4B", "city": "Tallinn", "countryCode": "EE", "postCode": "12112" } } } }, "2.create-third-party-transfer-business-originator": { "summary": "BUSINESS Originator", "value": { "profileId": 123456789, "targetAccount": 7839323, "quote": "3522e360-356a-4e37-9f99-94a21898d8fa", "originalTransferId": "4711", "details": { "reference": "Ski trip" }, "originator": { "legalEntityType": "BUSINESS", "reference": "78976", "name": { "fullName": "Hot Air Balloon Services Ltd" }, "businessRegistrationCode": "AE-89780", "businessRegistrationDate": "2020-01-15", "address": { "firstLine": "Salu tee 100, Apt 4B", "city": "Tallinn", "countryCode": "EE", "postCode": "12112" } } } } } } } }, "parameters": [{ "name": "profileId", "in": "path", "description": "The profile ID.", "schema": { "type": "integer", "description": "The profile ID.", "format": "int64", "example": 123456789 }, "required": true, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /profiles/{profileId}/third-party-transfers/{transferId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "description": "Profile Id", "schema": { "type": "integer", "description": "Profile Id", "format": "int64", "example": 123456789 }, "required": true, "index$": 0 }, { "name": "transferId", "in": "path", "description": "Transfer Id", "schema": { "type": "integer", "description": "Transfer Id", "format": "int64", "example": 16521632 }, "required": true, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "third_party_transfer.create.0": "GET-only live run: needs POST /profiles/{profileId}/third-party-transfers", "third_party_transfer.load.1": "GET-only live run: reads a record only third_party_transfer.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const third_party_transfer_ref01_ent = client.ThirdPartyTransfer();
        let third_party_transfer_ref01_data = setup.data.new.third_party_transfer['third_party_transfer_ref01'];
        third_party_transfer_ref01_data['profile_id'] = setup.idmap['profile01'];
        third_party_transfer_ref01_data = (await third_party_transfer_ref01_ent.create(third_party_transfer_ref01_data)).data();
        (0, node_assert_1.default)(null != third_party_transfer_ref01_data.id);
        // LOAD
        const third_party_transfer_ref01_match_dt0 = {};
        third_party_transfer_ref01_match_dt0.id = third_party_transfer_ref01_data.id;
        third_party_transfer_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const third_party_transfer_ref01_data_dt0 = (await third_party_transfer_ref01_ent.load(third_party_transfer_ref01_match_dt0)).data();
        (0, node_assert_1.default)(third_party_transfer_ref01_data_dt0.id === third_party_transfer_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/third_party_transfer/ThirdPartyTransferTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['third_party_transfer01', 'third_party_transfer02', 'third_party_transfer03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_THIRD_PARTY_TRANSFER_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_THIRD_PARTY_TRANSFER_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_THIRD_PARTY_TRANSFER_ENTID'];
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
//# sourceMappingURL=ThirdPartyTransferEntity.test.js.map