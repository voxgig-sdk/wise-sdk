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
(0, node_test_1.describe)('OttEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Ott();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Ott().load({ "actionType": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ott.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "actionType": { "a": true, "h": "Action Type", "n": "actionType", "r": false, "sh": "The action bound to the one time token.", "t": "`$STRING`", "key$": "actionType", "index$": 0 }, "challenges": { "a": true, "h": "Challenges", "n": "challenges", "r": false, "sh": "Array of challenge objects.", "t": "`$ARRAY`", "key$": "challenges", "index$": 1 }, "oneTimeToken": { "a": true, "h": "One Time Token", "n": "oneTimeToken", "r": false, "sh": "Unique identifier of a one time token.", "t": "`$STRING`", "key$": "oneTimeToken", "index$": 2 }, "otpCode": { "a": true, "h": "Otp Code", "n": "otpCode", "r": false, "sh": "6 digit OTP code in text format.", "t": "`$STRING`", "key$": "otpCode", "index$": 3 }, "userId": { "a": true, "fo": "int64", "h": "User Id", "n": "userId", "r": false, "sh": "Creator of this one time token.", "t": "`$INTEGER`", "key$": "userId", "index$": 4 }, "validity": { "a": true, "fo": "int64", "h": "Validity", "n": "validity", "r": false, "sh": "Seconds until the one time token becomes expired.", "t": "`$INTEGER`", "key$": "validity", "index$": 5 } }, "name": "ott", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["otpCode"], "co": { "id": "POST /one-time-token/sms/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/one-time-token/sms/verify", "q": { "exist": ["one_time_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "one-time-token" }, { "lit": "sms" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body.oneTimeTokenProperties`" }, "index$": 0 }, { "a": true, "bf": ["otpCode"], "co": { "id": "POST /one-time-token/voice/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/one-time-token/voice/verify", "q": { "exist": ["one_time_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "one-time-token" }, { "lit": "voice" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body.oneTimeTokenProperties`" }, "index$": 1 }, { "a": true, "bf": ["otpCode"], "co": { "id": "POST /one-time-token/whatsapp/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/one-time-token/whatsapp/verify", "q": { "exist": ["one_time_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "one-time-token" }, { "lit": "whatsapp" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body.oneTimeTokenProperties`" }, "index$": 2 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /one-time-token/status", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/one-time-token/status", "q": { "exist": ["one_time_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "one-time-token" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body.oneTimeTokenProperties`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "ott", "name__orig": "ott", "Name": "Ott", "name_": "ott", "name-": "ott", "NAME": "OTT", "index$": 43 }, { "active": true, "entity": "ott", "key$": "BasicOttFlow", "kind": "basic", "name": "BasicOttFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ott_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "ott_ref01", "srcdatavar": "ott_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ott_ref01" } }], "index$": 1 }] }, 'Ott', { "POST /one-time-token/sms/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "otpCode": { "type": "string", "description": "6 digit OTP code in text format.", "example": "111111", "key$": "otpCode" } }, "index$": 1 } } } }, "parameters": [{ "name": "One-Time-Token", "in": "header", "required": true, "description": "Text value of a OTT.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /one-time-token/voice/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "otpCode": { "type": "string", "description": "6 digit OTP code in text format.", "example": "111111", "key$": "otpCode" } }, "index$": 1 } } } }, "parameters": [{ "name": "One-Time-Token", "in": "header", "required": true, "description": "Text value of a OTT.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /one-time-token/whatsapp/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "otpCode": { "type": "string", "description": "6 digit OTP code in text format.", "example": "111111", "key$": "otpCode" } }, "index$": 1 } } } }, "parameters": [{ "name": "One-Time-Token", "in": "header", "required": true, "description": "Text value of a OTT.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /one-time-token/status": { "protocol": "http", "parameters": [{ "name": "One-Time-Token", "in": "header", "required": true, "description": "Text value of a OTT.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "ott.create.0": "GET-only live run: needs POST /one-time-token/sms/verify" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ott_ref01_ent = client.Ott();
        let ott_ref01_data = setup.data.new.ott['ott_ref01'];
        ott_ref01_data = (await ott_ref01_ent.create(ott_ref01_data)).data();
        (0, node_assert_1.default)(null != ott_ref01_data);
        // LOAD
        const ott_ref01_match_dt0 = {};
        const ott_ref01_data_dt0 = (await ott_ref01_ent.load(ott_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != ott_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ott/OttTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ott01', 'ott02', 'ott03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_OTT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_OTT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_OTT_ENTID'];
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
//# sourceMappingURL=OttEntity.test.js.map