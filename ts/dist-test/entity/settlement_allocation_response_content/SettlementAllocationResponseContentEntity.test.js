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
(0, node_test_1.describe)('SettlementAllocationResponseContentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.SettlementAllocationResponseContent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.SettlementAllocationResponseContent().load({ "allocation_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'settlement_allocation_response_content.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "Timestamp when the settlement allocation was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "sh": "Currency code for the allocation (ISO 4217).", "t": "`$STRING`", "key$": "currency", "index$": 1 }, "expectedTotalAmount": { "a": true, "fo": "decimal", "h": "Expected Total Amount", "n": "expectedTotalAmount", "r": false, "sh": "Expected total amount for the allocation.", "t": "`$NUMBER`", "key$": "expectedTotalAmount", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier of the settlement allocation.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "nextPageToken": { "a": true, "h": "Next Page Token", "n": "nextPageToken", "r": false, "sh": "Token for fetching the next page of payment intents.", "t": "`$STRING`", "key$": "nextPageToken", "index$": 4 }, "paymentIntents": { "a": true, "h": "Payment Intents", "n": "paymentIntents", "r": false, "sh": "List of payment intents associated with the allocation.", "t": "`$ARRAY`", "key$": "paymentIntents", "index$": 5 }, "paymentReference": { "a": true, "h": "Payment Reference", "n": "paymentReference", "r": false, "sh": "Unique payment reference for the settlement allocation.", "t": "`$STRING`", "key$": "paymentReference", "index$": 6 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "Current state of the settlement allocation.", "t": "`$STRING`", "key$": "state", "index$": 7 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "Timestamp when the settlement allocation was last updated.", "t": "`$STRING`", "key$": "updatedAt", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "settlement_allocation_response_content", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /settlement/allocations", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "1023c8e2a19cc42260968ab2dcf1698e8344a2939ac97f686d21aacb650273e2", "explode": false, "k": "header", "n": "x_signature", "or": "X-Signature", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "1700000000", "explode": false, "k": "header", "n": "x_signature_timestamp", "or": "X-Signature-Timestamp", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/settlement/allocations", "q": { "$action": "allocation", "exist": ["x_signature", "x_signature_timestamp"] }, "r": {}, "rb": { "fields": [{ "name": "command" }, { "binary": true, "name": "file" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "settlement" }, { "lit": "allocations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /settlement/allocations/{allocationId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "allocation_id", "or": "allocationId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": true, "explode": true, "k": "query", "n": "include_payment_intent", "or": "includePaymentIntents", "r": false, "style": "form", "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "ex": 20, "explode": true, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "abc123", "explode": true, "k": "query", "n": "page_token", "or": "pageToken", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/settlement/allocations/{allocationId}", "q": { "exist": ["allocation_id"] }, "r": { "param": { "allocationId": "allocation_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "settlement" }, { "lit": "allocations" }, { "var": "allocation_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "settlement_allocation_response_content", "name__orig": "settlement_allocation_response_content", "Name": "SettlementAllocationResponseContent", "name_": "settlement_allocation_response_content", "name-": "settlement-allocation-response-content", "NAME": "SETTLEMENT_ALLOCATION_RESPONSE_CONTENT", "index$": 63 }, { "active": true, "entity": "settlement_allocation_response_content", "key$": "BasicSettlementAllocationResponseContentFlow", "kind": "basic", "name": "BasicSettlementAllocationResponseContentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "settlement_allocation_response_content_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "settlement_allocation_response_content_ref01", "srcdatavar": "settlement_allocation_response_content_ref01_data", "suffix": "_dt0" }, "m": { "id": "settlement_allocation_response_content01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-settlement_allocation_response_content_ref01" } }], "unreachable": true }] }, 'SettlementAllocationResponseContent', { "POST /settlement/allocations": { "protocol": "http", "requestBody": { "required": true, "content": { "multipart/form-data": { "schema": { "type": "object", "required": ["command", "file"], "properties": { "command": { "type": "object", "required": ["paymentReference", "expectedTotalAmount", "currency"], "properties": { "paymentReference": { "type": "string", "description": "Unique payment reference for the allocation request", "example": "PAY-2024-001234" }, "expectedTotalAmount": { "type": "number", "format": "decimal", "description": "Expected total amount for the allocation", "example": 10000 }, "currency": { "type": "string", "description": "Currency code", "pattern": "^[A-Z]{3}$", "example": "USD", "x-ref": "#/components/schemas/CurrencyCode" } }, "x-ref": "#/components/schemas/settlement-allocation-request" }, "file": { "type": "string", "format": "binary", "description": "Settlement Allocation Request (SAR) file containing payment intent details" } } } } } }, "parameters": [{ "name": "X-Signature", "in": "header", "required": true, "description": "HMAC-SHA256 signature of the request content, hex-encoded in lowercase (64 characters).\nMust be sent together with `X-Signature-Timestamp`.\n", "schema": { "type": "string", "pattern": "^[0-9a-f]{64}$" }, "example": "1023c8e2a19cc42260968ab2dcf1698e8344a2939ac97f686d21aacb650273e2", "index$": 0 }, { "name": "X-Signature-Timestamp", "in": "header", "required": true, "description": "Unix timestamp in **seconds** at which `X-Signature` was generated, as a decimal string.\n\nThis value is part of the signed canonical string, so it must exactly match the timestamp used to compute the signature. Requests more than 300 seconds from Wise server time are rejected in either direction.\n", "schema": { "type": "string", "pattern": "^[0-9]+$" }, "example": "1700000000", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /settlement/allocations/{allocationId}": { "protocol": "http", "parameters": [{ "name": "allocationId", "in": "path", "description": "Unique identifier of the settlement allocation.", "schema": { "type": "string", "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "description": "Unique identifier of the settlement allocation.", "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479" }, "required": true, "index$": 0 }, { "name": "includePaymentIntents", "in": "query", "description": "Whether to include payment intents in the response.", "schema": { "type": "boolean", "description": "Whether to include payment intents in the response.", "example": true }, "index$": 1 }, { "name": "pageToken", "in": "query", "description": "Token for fetching the next page of results.", "schema": { "type": "string", "description": "Token for fetching the next page of results.", "example": "abc123" }, "index$": 2 }, { "name": "pageSize", "in": "query", "description": "Number of items per page.", "schema": { "type": "integer", "maximum": 50, "description": "Number of items per page.", "format": "int32", "example": 20 }, "index$": 3 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 4 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "settlement_allocation_response_content.create.0": "GET-only live run: needs POST /settlement/allocations", "settlement_allocation_response_content.load.1": "GET-only live run: reads a record only settlement_allocation_response_content.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const settlement_allocation_response_content_ref01_ent = client.SettlementAllocationResponseContent();
        let settlement_allocation_response_content_ref01_data = setup.data.new.settlement_allocation_response_content['settlement_allocation_response_content_ref01'];
        settlement_allocation_response_content_ref01_data = (await settlement_allocation_response_content_ref01_ent.create(settlement_allocation_response_content_ref01_data)).data();
        (0, node_assert_1.default)(null != settlement_allocation_response_content_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/settlement_allocation_response_content/SettlementAllocationResponseContentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['settlement_allocation_response_content01', 'settlement_allocation_response_content02', 'settlement_allocation_response_content03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_SETTLEMENT_ALLOCATION_RESPONSE_CONTENT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_SETTLEMENT_ALLOCATION_RESPONSE_CONTENT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_SETTLEMENT_ALLOCATION_RESPONSE_CONTENT_ENTID'];
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
//# sourceMappingURL=SettlementAllocationResponseContentEntity.test.js.map