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
(0, node_test_1.describe)('BankAccountDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.BankAccountDetail();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BankAccountDetail().list({ "profile_id": "x", "currency": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'bank_account_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accountDetailsId": { "a": true, "h": "Account Details Id", "n": "accountDetailsId", "r": false, "sh": "Unique ID of the issued account details.", "t": "`$INTEGER`", "key$": "accountDetailsId", "index$": 0 }, "active": { "a": true, "h": "Active", "n": "active", "r": false, "sh": "Status of the account detail.", "t": "`$BOOLEAN`", "key$": "active", "index$": 1 }, "balanceId": { "a": true, "h": "Balance Id", "n": "balanceId", "r": false, "sh": "ID of the balance the order is for.", "t": ["`$ONE`", ["`$INTEGER`", "`$NULL`"]], "key$": "balanceId", "index$": 2 }, "creationTime": { "a": true, "fo": "date-time", "h": "Creation Time", "n": "creationTime", "r": false, "sh": "Timestamp of when the order was created.", "t": "`$STRING`", "key$": "creationTime", "index$": 3 }, "currency": { "a": true, "h": "Currency", "n": "currency", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Currency code (ISO 4217 Alphabetic Code).", "t": "`$STRING`", "key$": "currency", "index$": 4 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "Account detail ID.", "t": "`$STRING`", "key$": "id", "index$": 5 }, "internationalDetails": { "a": true, "h": "International Details", "n": "internationalDetails", "r": false, "sh": "International bank account details.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "internationalDetails", "index$": 6 }, "localDetails": { "a": true, "h": "Local Details", "n": "localDetails", "r": false, "sh": "Local bank account details.", "t": "`$OBJECT`", "key$": "localDetails", "index$": 7 }, "modificationTime": { "a": true, "fo": "date-time", "h": "Modification Time", "n": "modificationTime", "r": false, "sh": "Timestamp of the last modification to the order.", "t": "`$STRING`", "key$": "modificationTime", "index$": 8 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": false, "sh": "Reason for the return.", "t": "`$STRING`", "key$": "reason", "index$": 9 }, "requirements": { "a": true, "h": "Requirements", "n": "requirements", "r": false, "sh": "List of requirements to fulfill the order.", "t": "`$ARRAY`", "key$": "requirements", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Order status.", "t": "`$STRING`", "key$": "status", "index$": 11 }, "targetAccountId": { "a": true, "fo": "int64", "h": "Target Account Id", "n": "targetAccountId", "r": true, "sh": "ID of the currency balance to create account details on.", "t": "`$INTEGER`", "key$": "targetAccountId", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "bank_account_detail", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["reason"], "co": { "id": "POST /profiles/{profileId}/account-details/payments/{paymentId}/returns", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 987654321, "k": "param", "n": "payment_id", "or": "paymentId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/account-details/payments/{paymentId}/returns", "q": { "exist": ["payment_id", "profile_id"] }, "r": { "param": { "paymentId": "payment_id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "account-details" }, { "lit": "payments" }, { "var": "payment_id" }, { "lit": "returns" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["currency"], "co": { "id": "POST /profiles/{profileId}/account-details-orders", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/account-details-orders", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "account-details-orders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["targetAccountId"], "co": { "id": "POST /profiles/{profileId}/bank-details", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/bank-details", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "bank-details" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/account-details-orders", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": "GBP", "explode": true, "k": "query", "n": "currency", "or": "currency", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/account-details-orders", "q": { "exist": ["currency", "profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "account-details-orders" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile", "$.main.kit.entity.payment"]] }, "key$": "bank_account_detail", "name__orig": "bank_account_detail", "Name": "BankAccountDetail", "name_": "bank_account_detail", "name-": "bank-account-detail", "NAME": "BANK_ACCOUNT_DETAIL", "index$": 7 }, { "active": true, "entity": "bank_account_detail", "key$": "BasicBankAccountDetailFlow", "kind": "basic", "name": "BasicBankAccountDetailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "bank_account_detail_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "bank_account_detail_ref01" } }], "index$": 1 }] }, 'BankAccountDetail', { "POST /profiles/{profileId}/account-details/payments/{paymentId}/returns": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "reason": { "type": "string", "description": "Reason for the return. Required when returning SWIFT payments.\n", "enum": ["INCORRECT_ACCOUNT_NUMBER", "CLOSED_ACCOUNT", "BLOCKED_ACCOUNT", "CANCELLATION_REQUEST", "REGULATORY", "CUSTOMER_REQUEST"], "example": "CLOSED_ACCOUNT", "key$": "reason" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile that received the payment.", "index$": 0 }, { "name": "paymentId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 987654321 }, "description": "The ID of the payment to return.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /profiles/{profileId}/account-details-orders": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["currency"], "properties": { "currency": { "type": "string", "description": "Balance currency (ISO 4217 Alphabetic Code) for the requested bank account details.", "example": "EUR", "key$": "currency" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile to create the bank account details order for.", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /profiles/{profileId}/bank-details": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["targetAccountId"], "properties": { "targetAccountId": { "type": "integer", "format": "int64", "description": "ID of the currency balance to create account details on.", "example": 123456, "key$": "targetAccountId" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile to create bank account details for.", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /profiles/{profileId}/account-details-orders": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile to list bank account detail orders for.", "index$": 0 }, { "name": "currency", "in": "query", "required": true, "schema": { "type": "string", "example": "GBP" }, "description": "Currency code (ISO 4217 Alphabetic Code).", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "bank_account_detail.create.0": "GET-only live run: needs POST /profiles/{profileId}/account-details/payments/{paymentId}/returns" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const bank_account_detail_ref01_ent = client.BankAccountDetail();
        let bank_account_detail_ref01_data = setup.data.new.bank_account_detail['bank_account_detail_ref01'];
        bank_account_detail_ref01_data['profile_id'] = setup.idmap['profile01'];
        bank_account_detail_ref01_data = (await bank_account_detail_ref01_ent.create(bank_account_detail_ref01_data)).data();
        (0, node_assert_1.default)(null != bank_account_detail_ref01_data.id);
        // LIST
        const bank_account_detail_ref01_match = {};
        bank_account_detail_ref01_match['profile_id'] = setup.idmap['profile01'];
        const bank_account_detail_ref01_list = (await bank_account_detail_ref01_ent.list(bank_account_detail_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(bank_account_detail_ref01_list, { id: bank_account_detail_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/bank_account_detail/BankAccountDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['bank_account_detail01', 'bank_account_detail02', 'bank_account_detail03', 'profile01', 'profile02', 'profile03', 'payment01', 'payment02', 'payment03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_BANK_ACCOUNT_DETAIL_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_BANK_ACCOUNT_DETAIL_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_BANK_ACCOUNT_DETAIL_ENTID'];
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
//# sourceMappingURL=BankAccountDetailEntity.test.js.map