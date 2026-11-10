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
(0, node_test_1.describe)('PayinEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Payin();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Payin().create({ "payin_session_id": 1, "profile_id": 1, "payinSessionId": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'payin.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": false, "t": "`$NUMBER`", "key$": "amount", "index$": 0 }, "currency": { "a": true, "h": "Currency", "n": "currency", "r": false, "t": "`$STRING`", "key$": "currency", "index$": 1 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Manual input details that can be used by the end user to make the transfer without scanning the QR image.", "t": "`$OBJECT`", "key$": "details", "index$": 2 }, "failureReason": { "a": true, "h": "Failure Reason", "n": "failureReason", "r": false, "t": "`$STRING`", "key$": "failureReason", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 4 }, "payinSessionId": { "a": true, "h": "Payin Session Id", "n": "payinSessionId", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "payinSessionId", "index$": 5 }, "paymentInstrumentId": { "a": true, "h": "Payment Instrument Id", "n": "paymentInstrumentId", "r": false, "t": "`$STRING`", "key$": "paymentInstrumentId", "index$": 6 }, "qrCodeInBase64": { "a": true, "h": "Qr Code In Base64", "n": "qrCodeInBase64", "r": false, "sh": "An encoded QR image in base64 format, which can be decoded and displayed directly to the end user.", "t": "`$STRING`", "key$": "qrCodeInBase64", "index$": 7 }, "reference": { "a": true, "h": "Reference", "n": "reference", "r": false, "t": "`$STRING`", "key$": "reference", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$STRING`", "key$": "status", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "payin", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /profiles/{profileId}/payin-sessions/{payinSessionId}/paynow", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "payin_session_id", "or": "payinSessionId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/payin-sessions/{payinSessionId}/paynow", "q": { "exist": ["payin_session_id", "profile_id"] }, "r": { "param": { "payinSessionId": "payin_session_id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "payin-sessions" }, { "var": "payin_session_id" }, { "lit": "paynow" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["payinSessionId", "reference"], "co": { "id": "POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "payment_instrument_id", "or": "paymentInstrumentId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins", "q": { "exist": ["payment_instrument_id", "profile_id"] }, "r": { "param": { "paymentInstrumentId": "payment_instrument_id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "payment-instruments" }, { "var": "payment_instrument_id" }, { "lit": "payins" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile", "$.main.kit.entity.payment_instrument"]] }, "key$": "payin", "name__orig": "payin", "Name": "Payin", "name_": "payin", "name-": "payin", "NAME": "PAYIN", "index$": 43 }, { "active": true, "entity": "payin", "key$": "BasicPayinFlow", "kind": "basic", "name": "BasicPayinFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "payin_ref01" }, "m": { "payment_instrument_id": "payment_instrument01", "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Payin', { "POST /profiles/{profileId}/payin-sessions/{payinSessionId}/paynow": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Profile ID of the profile that created the transfer.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "payinSessionId", "in": "path", "required": true, "description": "Payin Session ID retrieved from Transfer object.", "schema": { "type": "string", "format": "string" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/payins": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "object", "properties": { "payinSessionId": { "type": "string", "key$": "payinSessionId" }, "reference": { "type": "string", "key$": "reference" } }, "required": ["payinSessionId"], "x-ref": "#/components/schemas/PayinSessionPayinInitiationRequest", "index$": 1 } } }, "required": true }, "parameters": [{ "in": "path", "name": "profileId", "required": true, "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "in": "path", "name": "paymentInstrumentId", "required": true, "schema": { "type": "string" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "payin.create.0": "GET-only live run: needs POST /profiles/{profileId}/payin-sessions/{payinSessionId}/paynow" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const payin_ref01_ent = client.Payin();
        let payin_ref01_data = setup.data.new.payin['payin_ref01'];
        payin_ref01_data['payment_instrument_id'] = setup.idmap['payment_instrument01'];
        payin_ref01_data['profile_id'] = setup.idmap['profile01'];
        payin_ref01_data = (await payin_ref01_ent.create(payin_ref01_data)).data();
        (0, node_assert_1.default)(null != payin_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/payin/PayinTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['payin01', 'payin02', 'payin03', 'profile01', 'profile02', 'profile03', 'payment_instrument01', 'payment_instrument02', 'payment_instrument03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_PAYIN_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_PAYIN_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_PAYIN_ENTID'];
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
//# sourceMappingURL=PayinEntity.test.js.map