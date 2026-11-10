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
(0, node_test_1.describe)('PaymentInitiationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.PaymentInitiation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PaymentInitiation().load({ "batch_group_id": 1, "id": 1, "profile_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payment_initiation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "payment_initiation", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["accountId", "reference", "type"], "co": { "id": "POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "54a6bc09-cef9-49a8-9041-f1f0c654cd88", "k": "param", "n": "batch_group_id", "or": "batchGroupId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations", "q": { "exist": ["batch_group_id", "profile_id"] }, "r": { "param": { "batchGroupId": "batch_group_id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "batch-groups" }, { "var": "batch_group_id" }, { "lit": "payment-initiations" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "54a6bc09-cef9-49a8-9041-f1f0c654cd88", "k": "param", "n": "batch_group_id", "or": "batchGroupId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 12345, "k": "param", "n": "id", "or": "paymentInitiationId", "r": true, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 12345678, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}", "q": { "exist": ["batch_group_id", "id", "profile_id"] }, "r": { "param": { "batchGroupId": "batch_group_id", "paymentInitiationId": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "batch-groups" }, { "var": "batch_group_id" }, { "lit": "payment-initiations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.profile", "$.main.kit.entity.batch_group"]] }, "key$": "payment_initiation", "name__orig": "payment_initiation", "Name": "PaymentInitiation", "name_": "payment_initiation", "name-": "payment-initiation", "NAME": "PAYMENT_INITIATION", "index$": 47 }, { "active": true, "entity": "payment_initiation", "key$": "BasicPaymentInitiationFlow", "kind": "basic", "name": "BasicPaymentInitiationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payment_initiation_ref01" }, "m": { "batch_group_id": "batch_group01", "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "payment_initiation_ref01", "srcdatavar": "payment_initiation_ref01_data", "suffix": "_dt0" }, "m": { "batch_group_id": "batch_group01", "id": "payment_initiation01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-payment_initiation_ref01" } }], "index$": 1, "route": "GET /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}", "record": {} }] }, 'PaymentInitiation', { "POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "discriminator": { "propertyName": "type", "mapping": { "DIRECT_DEBIT": "#/components/schemas/PaymentInitiationDirectDebitRequest", "PAYIN_SESSION": "#/components/schemas/PaymentInitiationPayinSessionRequest" } }, "oneOf": [{ "title": "Direct debit", "type": "object", "description": "Funds all transfers in the batch group via direct debit.\n\nTo use this funding method, you must link an external bank account first. See [direct debit account creation](/api-reference/direct-debit-account/directdebitaccountcreate) for more information.\n", "required": ["type", "accountId"], "properties": { "type": { "type": "string", "description": "The method of payment to use.", "enum": ["DIRECT_DEBIT"], "example": "DIRECT_DEBIT" }, "accountId": { "type": "integer", "format": "int64", "description": "Direct debit account ID. See [direct debit account creation](/api-reference/direct-debit-account/directdebitaccountcreate).", "example": 1 }, "reference": { "type": "string", "description": "Optional payment initiation reference. Maximum 10 characters. If not provided, a reference will be generated automatically.", "example": "B1234567" } }, "x-ref": "#/components/schemas/PaymentInitiationDirectDebitRequest" }, { "title": "Payin session", "type": "object", "description": "Funds all transfers in the batch group using the payin session associated with the batch group (see `payinSessionId` on the [batch group](/api-reference/batch-group)).\n", "required": ["type"], "properties": { "type": { "type": "string", "description": "The method of payment to use.", "enum": ["PAYIN_SESSION"], "example": "PAYIN_SESSION" } }, "x-ref": "#/components/schemas/PaymentInitiationPayinSessionRequest" }], "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile that the batch group is associated with.", "index$": 0 }, { "name": "batchGroupId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid", "example": "54a6bc09-cef9-49a8-9041-f1f0c654cd88" }, "description": "The batch group ID.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations/{paymentInitiationId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345678 }, "description": "The ID of the profile that the batch group is associated with.", "index$": 0 }, { "name": "batchGroupId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid", "example": "54a6bc09-cef9-49a8-9041-f1f0c654cd88" }, "description": "The batch group ID.", "index$": 1 }, { "name": "paymentInitiationId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64", "example": 12345 }, "description": "The payment initiation ID.", "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "payment_initiation.create.0": "GET-only live run: needs POST /profiles/{profileId}/batch-groups/{batchGroupId}/payment-initiations", "payment_initiation.load.1": "GET-only live run: reads a record only payment_initiation.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const payment_initiation_ref01_ent = client.PaymentInitiation();
        let payment_initiation_ref01_data = setup.data.new.payment_initiation['payment_initiation_ref01'];
        payment_initiation_ref01_data['batch_group_id'] = setup.idmap['batch_group01'];
        payment_initiation_ref01_data['profile_id'] = setup.idmap['profile01'];
        payment_initiation_ref01_data = (await payment_initiation_ref01_ent.create(payment_initiation_ref01_data)).data();
        (0, node_assert_1.default)(null != payment_initiation_ref01_data.id);
        // LOAD
        const payment_initiation_ref01_match_dt0 = {};
        payment_initiation_ref01_match_dt0.id = payment_initiation_ref01_data.id;
        payment_initiation_ref01_match_dt0['batch_group_id'] = setup.idmap['batch_group_id'] ?? setup.idmap['batch_group01'];
        payment_initiation_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const payment_initiation_ref01_data_dt0 = (await payment_initiation_ref01_ent.load(payment_initiation_ref01_match_dt0)).data();
        (0, node_assert_1.default)(payment_initiation_ref01_data_dt0.id === payment_initiation_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payment_initiation/PaymentInitiationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payment_initiation01', 'payment_initiation02', 'payment_initiation03', 'profile01', 'profile02', 'profile03', 'batch_group01', 'batch_group02', 'batch_group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_PAYMENT_INITIATION_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_PAYMENT_INITIATION_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_PAYMENT_INITIATION_ENTID'];
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
//# sourceMappingURL=PaymentInitiationEntity.test.js.map