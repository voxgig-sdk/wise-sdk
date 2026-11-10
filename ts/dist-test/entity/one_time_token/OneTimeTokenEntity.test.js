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
(0, node_test_1.describe)('OneTimeTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.OneTimeToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.OneTimeToken().create({ "profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'one_time_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "challenges": { "a": true, "h": "Challenges", "n": "challenges", "r": false, "sh": "An array of challenges.", "t": "`$ARRAY`", "key$": "challenges", "index$": 0 }, "faceMap": { "a": true, "h": "Face Map", "n": "faceMap", "r": false, "sh": "A base64 encoded string.", "t": "`$STRING`", "key$": "faceMap", "index$": 1 }, "oneTimeToken": { "a": true, "fo": "uuid", "h": "One Time Token", "n": "oneTimeToken", "r": false, "sh": "A one-time token unique identifier.", "t": "`$STRING`", "key$": "oneTimeToken", "index$": 2 }, "validity": { "a": true, "h": "Validity", "n": "validity", "r": false, "sh": "The One-Time Token expiration in seconds.", "t": "`$INTEGER`", "key$": "validity", "index$": 3 } }, "name": "one_time_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /profiles/{profileId}/device-fingerprints/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "identity", "explode": false, "k": "header", "n": "accept_encoding", "or": "Accept-Encoding", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "identity", "explode": false, "k": "header", "n": "content_encoding", "or": "Content-Encoding", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "jwe", "explode": false, "k": "header", "n": "xtw_jose_method", "or": "X-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 4 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/device-fingerprints/verify", "q": { "$action": "device-fingerprint", "exist": ["accept_encoding", "content_encoding", "one_time_token", "profile_id", "xtw_jose_method"] }, "r": { "param": { "profileId": "profile_id" } }, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "device-fingerprints" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /profiles/{profileId}/pin/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "identity", "explode": false, "k": "header", "n": "accept_encoding", "or": "Accept-Encoding", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "identity", "explode": false, "k": "header", "n": "content_encoding", "or": "Content-Encoding", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "jwe", "explode": false, "k": "header", "n": "xtw_jose_method", "or": "X-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 4 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/pin/verify", "q": { "$action": "pin", "exist": ["accept_encoding", "content_encoding", "one_time_token", "profile_id", "xtw_jose_method"] }, "r": { "param": { "profileId": "profile_id" } }, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "pin" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["faceMap"], "co": { "id": "POST /profiles/{profileId}/facemaps/verify", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "explode": false, "k": "header", "n": "one_time_token", "or": "One-Time-Token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/facemaps/verify", "q": { "exist": ["one_time_token", "profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "facemaps" }, { "lit": "verify" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "one_time_token", "name__orig": "one_time_token", "Name": "OneTimeToken", "name_": "one_time_token", "name-": "one-time-token", "NAME": "ONE_TIME_TOKEN", "index$": 41 }, { "active": true, "entity": "one_time_token", "key$": "BasicOneTimeTokenFlow", "kind": "basic", "name": "BasicOneTimeTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "one_time_token_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'OneTimeToken', { "POST /profiles/{profileId}/device-fingerprints/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "A JWE encrypted string. The decrypted payload contains:\n- `deviceFingerprint` — A device fingerprint value.\n\nPayload before encryption:\n```json\n{\"deviceFingerprint\": \"3207da22-a0d3-4b6b-a591-6297e646fe32\"}\n```\n" }, "example": "<JWE encrypted string>" } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "One-Time-Token", "in": "header", "required": true, "description": "A one-time token unique identifier.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "name": "Accept-Encoding", "in": "header", "required": true, "schema": { "type": "string", "default": "identity" }, "index$": 2 }, { "name": "Content-Encoding", "in": "header", "required": true, "schema": { "type": "string", "default": "identity" }, "index$": 3 }, { "name": "X-tw-jose-method", "in": "header", "required": true, "schema": { "type": "string", "default": "jwe" }, "index$": 4 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 5 }] }, "POST /profiles/{profileId}/pin/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "A JWE encrypted string. The decrypted payload contains:\n- `pin` — A four-digit string.\n\nPayload before encryption:\n```json\n{\"pin\": \"1234\"}\n```\n" }, "example": "<JWE encrypted string>" } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "One-Time-Token", "in": "header", "required": true, "description": "A one-time token unique identifier.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "name": "Accept-Encoding", "in": "header", "required": true, "schema": { "type": "string", "default": "identity" }, "index$": 2 }, { "name": "Content-Encoding", "in": "header", "required": true, "schema": { "type": "string", "default": "identity" }, "index$": 3 }, { "name": "X-tw-jose-method", "in": "header", "required": true, "schema": { "type": "string", "default": "jwe" }, "index$": 4 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 5 }] }, "POST /profiles/{profileId}/facemaps/verify": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "faceMap": { "type": "string", "description": "A base64 encoded string.", "key$": "faceMap" } }, "index$": 1 }, "example": { "faceMap": "<base64 encoded string>" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "One-Time-Token", "in": "header", "required": true, "description": "A one-time token unique identifier.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "one_time_token.create.0": "GET-only live run: needs POST /profiles/{profileId}/device-fingerprints/verify" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const one_time_token_ref01_ent = client.OneTimeToken();
        let one_time_token_ref01_data = setup.data.new.one_time_token['one_time_token_ref01'];
        one_time_token_ref01_data['profile_id'] = setup.idmap['profile01'];
        one_time_token_ref01_data = (await one_time_token_ref01_ent.create(one_time_token_ref01_data)).data();
        (0, node_assert_1.default)(null != one_time_token_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/one_time_token/OneTimeTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['one_time_token01', 'one_time_token02', 'one_time_token03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_ONE_TIME_TOKEN_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_ONE_TIME_TOKEN_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_ONE_TIME_TOKEN_ENTID'];
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
//# sourceMappingURL=OneTimeTokenEntity.test.js.map