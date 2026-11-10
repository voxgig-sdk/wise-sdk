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
(0, node_test_1.describe)('CardTransactionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.CardTransaction();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.CardTransaction().list({ "card_token": 1, "profile_id": 1, "from_creation_time": "x", "to_creation_time": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card_transaction.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "approvalCode": { "a": true, "h": "Approval Code", "n": "approvalCode", "r": false, "sh": "Also called authorization code.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "approvalCode", "index$": 0 }, "arn": { "a": true, "h": "Arn", "n": "arn", "r": false, "sh": "Acquirer reference number", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "arn", "index$": 1 }, "authorisationMethod": { "a": true, "h": "Authorisation Method", "n": "authorisationMethod", "r": false, "sh": "Authorisation method", "t": "`$STRING`", "key$": "authorisationMethod", "index$": 2 }, "balanceChannelReferenceId": { "a": true, "h": "Balance Channel Reference Id", "n": "balanceChannelReferenceId", "r": false, "sh": "Balance channel reference ID associated with the card transaction", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "balanceChannelReferenceId", "index$": 3 }, "billingAmount": { "a": true, "h": "Billing Amount", "n": "billingAmount", "r": false, "sh": "Billing amount", "t": "`$OBJECT`", "key$": "billingAmount", "index$": 4 }, "cardToken": { "a": true, "h": "Card Token", "n": "cardToken", "r": false, "sh": "Unique identifier of the card", "t": "`$STRING`", "key$": "cardToken", "index$": 5 }, "creationTime": { "a": true, "fo": "date-time", "h": "Creation Time", "n": "creationTime", "r": false, "sh": "When the transaction was created", "t": "`$STRING`", "key$": "creationTime", "index$": 6 }, "credits": { "a": true, "h": "Credits", "n": "credits", "r": false, "sh": "Array of credits.", "t": "`$ARRAY`", "key$": "credits", "index$": 7 }, "debits": { "a": true, "h": "Debits", "n": "debits", "r": false, "sh": "Array of debits.", "t": "`$ARRAY`", "key$": "debits", "index$": 8 }, "declineReason": { "a": true, "h": "Decline Reason", "n": "declineReason", "r": false, "sh": "Code of the [decline reason](/api-reference/card-transaction#card-transaction-decline-reasons) if applicable", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "declineReason", "index$": 9 }, "detailedDeclineReason": { "a": true, "h": "Detailed Decline Reason", "n": "detailedDeclineReason", "r": false, "sh": "Code of the [detailed decline reason](/api-reference/card-transaction#card-transaction-detailed-decline-reasons) if applicable", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "detailedDeclineReason", "index$": 10 }, "fees": { "a": true, "h": "Fees", "n": "fees", "r": false, "sh": "Array of fees", "t": "`$ARRAY`", "key$": "fees", "index$": 11 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "ID of the transaction", "t": "`$INTEGER`", "key$": "id", "index$": 12 }, "merchant": { "a": true, "h": "Merchant", "n": "merchant", "r": false, "sh": "Merchant information", "t": "`$OBJECT`", "key$": "merchant", "index$": 13 }, "modificationTime": { "a": true, "fo": "date-time", "h": "Modification Time", "n": "modificationTime", "r": false, "sh": "When the transaction was last updated", "t": "`$STRING`", "key$": "modificationTime", "index$": 14 }, "pinValidationResult": { "a": true, "h": "Pin Validation Result", "n": "pinValidationResult", "r": false, "sh": "PIN validation result.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "pinValidationResult", "index$": 15 }, "purgeTime": { "a": true, "fo": "date-time", "h": "Purge Time", "n": "purgeTime", "r": false, "sh": "Time at which reserved funds will be released after the authorisation hold expires", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "purgeTime", "index$": 16 }, "relayAuthorisationData": { "a": true, "h": "Relay Authorisation Data", "n": "relayAuthorisationData", "r": false, "sh": "Relayed authorisation response data, only available if the partner has opted in for [relayed authorisation](/guides/product/issue-cards/relayed-authorisation)", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "relayAuthorisationData", "index$": 17 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "The current [state](/api-reference/card-transaction#card-transaction-state) of the transaction.", "t": "`$STRING`", "key$": "state", "index$": 18 }, "transactionAmount": { "a": true, "h": "Transaction Amount", "n": "transactionAmount", "r": false, "sh": "Transaction amount, including any embedded fees such as ATM fees that are not applied by Wise", "t": "`$OBJECT`", "key$": "transactionAmount", "index$": 19 }, "transactionAmountWithFees": { "a": true, "h": "Transaction Amount With Fees", "n": "transactionAmountWithFees", "r": false, "sh": "Transaction amount including all fees", "t": "`$OBJECT`", "key$": "transactionAmountWithFees", "index$": 20 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "[Type](/api-reference/card-transaction#card-transaction-type) of the transaction.", "t": "`$STRING`", "key$": "type", "index$": 21 } }, "id": { "field": "id", "name": "id" }, "name": "card_transaction", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/cards/{cardToken}/transactions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "59123122-223d-45f9-b840-0ad4a4f80937", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }], "query": [{ "a": true, "ex": "2025-12-15T00:00:00Z", "explode": true, "k": "query", "n": "from_creation_time", "or": "fromCreationTime", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 342672, "explode": true, "k": "query", "n": "last_id", "or": "lastId", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 10, "explode": true, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": "2026-01-15T00:00:10Z", "explode": true, "k": "query", "n": "to_creation_time", "or": "toCreationTime", "r": true, "style": "form", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/cards/{cardToken}/transactions", "q": { "exist": ["card_token", "from_creation_time", "profile_id", "to_creation_time"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "transactions" }], "t": { "req": "`reqdata`", "res": "`body.transactions`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/cards/transactions/{transactionId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 342671, "k": "param", "n": "id", "or": "transactionId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/cards/transactions/{transactionId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "transactionId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "lit": "transactions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile", "$.main.kit.entity.card"]] }, "key$": "card_transaction", "name__orig": "card_transaction", "Name": "CardTransaction", "name_": "card_transaction", "name-": "card-transaction", "NAME": "CARD_TRANSACTION", "index$": 16 }, { "active": true, "entity": "card_transaction", "key$": "BasicCardTransactionFlow", "kind": "basic", "name": "BasicCardTransactionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "card_token": "card_token01", "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "card_transaction_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "card_transaction_ref01", "srcdatavar": "card_transaction_ref01_data", "suffix": "_dt0" }, "m": { "id": "card_transaction01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_transaction_ref01" } }], "index$": 1, "route": "GET /spend/profiles/{profileId}/cards/transactions/{transactionId}", "record": {} }] }, 'CardTransaction', { "GET /spend/profiles/{profileId}/cards/{cardToken}/transactions": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "59123122-223d-45f9-b840-0ad4a4f80937", "index$": 1 }, { "name": "fromCreationTime", "in": "query", "required": true, "description": "Start of range for transaction creation time in UTC, in ISO-8601 format.", "schema": { "type": "string", "format": "date-time" }, "example": "2025-12-15T00:00:00Z", "index$": 2 }, { "name": "toCreationTime", "in": "query", "required": true, "description": "End of range for transaction creation time in UTC, in ISO-8601 format.", "schema": { "type": "string", "format": "date-time" }, "example": "2026-01-15T00:00:10Z", "index$": 3 }, { "name": "pageSize", "in": "query", "required": false, "description": "Page size of query between 10 and 100 inclusive, defaults to 20.", "schema": { "type": "integer", "format": "int32", "minimum": 10, "maximum": 100, "default": 20 }, "example": 10, "index$": 4 }, { "name": "lastId", "in": "query", "required": false, "description": "A pagination cursor that marks your position in the list. Include the ID of the last transaction from the previous page to retrieve the next page (transactions with IDs less than the provided value).", "schema": { "type": "integer", "format": "int64" }, "example": 342672, "index$": 5 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 6 }] }, "GET /spend/profiles/{profileId}/cards/transactions/{transactionId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "transactionId", "in": "path", "required": true, "description": "The ID of the transaction.", "schema": { "type": "integer", "format": "int64" }, "example": 342671, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let card_transaction_ref01_data = Object.values(setup.data.existing.card_transaction)[0];
        // LIST
        const card_transaction_ref01_ent = client.CardTransaction();
        const card_transaction_ref01_match = {};
        card_transaction_ref01_match['card_token'] = setup.idmap['card_token01'];
        card_transaction_ref01_match['profile_id'] = setup.idmap['profile01'];
        const card_transaction_ref01_list = (await card_transaction_ref01_ent.list(card_transaction_ref01_match)).map((e) => e.data());
        // LOAD
        const card_transaction_ref01_match_dt0 = {};
        card_transaction_ref01_match_dt0.id = card_transaction_ref01_data.id;
        card_transaction_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const card_transaction_ref01_data_dt0 = (await card_transaction_ref01_ent.load(card_transaction_ref01_match_dt0)).data();
        (0, node_assert_1.default)(card_transaction_ref01_data_dt0.id === card_transaction_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card_transaction/CardTransactionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card_transaction01', 'card_transaction02', 'card_transaction03', 'profile01', 'profile02', 'profile03', 'card01', 'card02', 'card03', 'card_token01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_CARD_TRANSACTION_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_CARD_TRANSACTION_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_CARD_TRANSACTION_ENTID'];
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
//# sourceMappingURL=CardTransactionEntity.test.js.map