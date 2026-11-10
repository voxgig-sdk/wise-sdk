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
(0, node_test_1.describe)('PaymentIntentEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.PaymentIntent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PaymentIntent().load({ "allocation_id": 1, "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment_intent.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allocationId": { "a": true, "h": "Allocation Id", "n": "allocationId", "r": false, "sh": "Unique identifier of the associated settlement allocation.", "t": "`$STRING`", "key$": "allocationId", "index$": 0 }, "allocationType": { "a": true, "h": "Allocation Type", "n": "allocationType", "r": false, "sh": "Type of allocation.", "t": "`$STRING`", "key$": "allocationType", "index$": 1 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "Timestamp when the payment intent was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 2 }, "fundingSource": { "a": true, "h": "Funding Source", "n": "fundingSource", "r": false, "sh": "Source of funding for the payment.", "t": "`$STRING`", "key$": "fundingSource", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier of the payment intent.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "partnerEntityId": { "a": true, "h": "Partner Entity Id", "n": "partnerEntityId", "r": false, "sh": "Partner entity identifier.", "t": "`$STRING`", "key$": "partnerEntityId", "index$": 5 }, "paymentReference": { "a": true, "h": "Payment Reference", "n": "paymentReference", "r": false, "sh": "Payment reference.", "t": "`$STRING`", "key$": "paymentReference", "index$": 6 }, "profileId": { "a": true, "h": "Profile Id", "n": "profileId", "r": false, "sh": "Profile identifier.", "t": "`$STRING`", "key$": "profileId", "index$": 7 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": false, "sh": "Reason for the payment.", "t": "`$STRING`", "key$": "reason", "index$": 8 }, "recipientType": { "a": true, "h": "Recipient Type", "n": "recipientType", "r": false, "sh": "Type of recipient.", "t": "`$STRING`", "key$": "recipientType", "index$": 9 }, "sourceAmount": { "a": true, "fo": "decimal", "h": "Source Amount", "n": "sourceAmount", "r": false, "sh": "Source amount of the payment.", "t": "`$NUMBER`", "key$": "sourceAmount", "index$": 10 }, "sourceCurrency": { "a": true, "h": "Source Currency", "n": "sourceCurrency", "r": false, "sh": "Source currency code (ISO 4217).", "t": "`$STRING`", "key$": "sourceCurrency", "index$": 11 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "Current state of the payment intent.", "t": "`$STRING`", "key$": "state", "index$": 12 }, "targetAmount": { "a": true, "fo": "decimal", "h": "Target Amount", "n": "targetAmount", "r": false, "sh": "Target amount of the payment.", "t": "`$NUMBER`", "key$": "targetAmount", "index$": 13 }, "targetCurrency": { "a": true, "h": "Target Currency", "n": "targetCurrency", "r": false, "sh": "Target currency code (ISO 4217).", "t": "`$STRING`", "key$": "targetCurrency", "index$": 14 }, "updatedAt": { "a": true, "fo": "date-time", "h": "Updated At", "n": "updatedAt", "r": false, "sh": "Timestamp when the payment intent was last updated.", "t": "`$STRING`", "key$": "updatedAt", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "payment_intent", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "k": "param", "n": "allocation_id", "or": "allocationId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "k": "param", "n": "id", "or": "paymentIntentId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}", "q": { "exist": ["allocation_id", "id"] }, "r": { "param": { "allocationId": "allocation_id", "paymentIntentId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "settlement" }, { "lit": "allocations" }, { "var": "allocation_id" }, { "lit": "payment-intents" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "payment_intent", "name__orig": "payment_intent", "Name": "PaymentIntent", "name_": "payment_intent", "name-": "payment-intent", "NAME": "PAYMENT_INTENT", "index$": 48 }, { "active": true, "entity": "payment_intent", "key$": "BasicPaymentIntentFlow", "kind": "basic", "name": "BasicPaymentIntentFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payment_intent_ref01", "srcdatavar": "payment_intent_ref01_data", "suffix": "_dt0" }, "m": { "allocation_id": "allocation01", "id": "payment_intent01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_intent_ref01" } }], "index$": 0, "route": "GET /settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}", "record": {} }] }, 'PaymentIntent', { "GET /settlement/allocations/{allocationId}/payment-intents/{paymentIntentId}": { "protocol": "http", "parameters": [{ "name": "allocationId", "in": "path", "description": "Unique identifier of the settlement allocation.", "schema": { "type": "string", "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "description": "Unique identifier of the settlement allocation.", "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479" }, "required": true, "index$": 0 }, { "name": "paymentIntentId", "in": "path", "description": "Unique identifier of the payment intent.", "schema": { "type": "string", "pattern": "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "description": "Unique identifier of the payment intent.", "example": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }, "required": true, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let payment_intent_ref01_data = Object.values(setup.data.existing.payment_intent)[0];
        // LOAD
        const payment_intent_ref01_ent = client.PaymentIntent();
        const payment_intent_ref01_match_dt0 = {};
        payment_intent_ref01_match_dt0.id = payment_intent_ref01_data.id;
        payment_intent_ref01_match_dt0['allocation_id'] = setup.idmap['allocation_id'] ?? setup.idmap['allocation01'];
        const payment_intent_ref01_data_dt0 = (await payment_intent_ref01_ent.load(payment_intent_ref01_match_dt0)).data();
        (0, node_assert_1.default)(payment_intent_ref01_data_dt0.id === payment_intent_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment_intent/PaymentIntentTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment_intent01', 'payment_intent02', 'payment_intent03', 'allocation01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_PAYMENT_INTENT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_PAYMENT_INTENT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_PAYMENT_INTENT_ENTID'];
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
//# sourceMappingURL=PaymentIntentEntity.test.js.map