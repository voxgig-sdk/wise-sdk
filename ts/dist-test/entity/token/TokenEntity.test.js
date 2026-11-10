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
(0, node_test_1.describe)('TokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Token();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Token().create({ "access_token": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_token": { "a": true, "h": "Access Token", "n": "access_token", "r": false, "sh": "Access token to be used when calling the API.", "t": "`$STRING`", "key$": "access_token", "index$": 0 }, "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "Token creation time in ISO 8601 format.", "t": "`$STRING`", "key$": "created_at", "index$": 1 }, "expires_at": { "a": true, "h": "Expires At", "n": "expires_at", "r": false, "sh": "Access token expiration timestamp (UTC).", "t": "`$STRING`", "key$": "expires_at", "index$": 2 }, "expires_in": { "a": true, "fo": "int32", "h": "Expires In", "n": "expires_in", "r": false, "sh": "Access token expiry time in seconds.", "t": "`$INTEGER`", "key$": "expires_in", "index$": 3 }, "refresh_token": { "a": true, "h": "Refresh Token", "n": "refresh_token", "r": false, "sh": "Refresh token used to obtain new user access tokens without requiring the user to re-authorise.", "t": "`$STRING`", "key$": "refresh_token", "index$": 4 }, "refresh_token_expires_at": { "a": true, "h": "Refresh Token Expires At", "n": "refresh_token_expires_at", "r": false, "sh": "Refresh token expiration timestamp (UTC).", "t": "`$STRING`", "key$": "refresh_token_expires_at", "index$": 5 }, "refresh_token_expires_in": { "a": true, "fo": "int32", "h": "Refresh Token Expires In", "n": "refresh_token_expires_in", "r": false, "sh": "Refresh token expiry time in seconds.", "t": "`$INTEGER`", "key$": "refresh_token_expires_in", "index$": 6 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": false, "sh": "Scope of the token.", "t": "`$STRING`", "key$": "scope", "index$": 7 }, "token_type": { "a": true, "h": "Token Type", "n": "token_type", "r": false, "sh": "Type of the token.", "t": "`$STRING`", "key$": "token_type", "index$": 8 } }, "name": "token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /oauth/token", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/oauth/token", "q": {}, "r": {}, "rb": { "kind": "form", "media": "application/x-www-form-urlencoded" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "oauth" }, { "lit": "token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "token", "name__orig": "token", "Name": "Token", "name_": "token", "name-": "token", "NAME": "TOKEN", "index$": 69 }, { "active": true, "entity": "token", "key$": "BasicTokenFlow", "kind": "basic", "name": "BasicTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "token_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Token', { "POST /oauth/token": { "protocol": "http", "requestBody": { "required": true, "content": { "application/x-www-form-urlencoded": { "schema": { "discriminator": { "propertyName": "grant_type", "mapping": { "client_credentials": "#/components/schemas/client-credentials-grant", "registration_code": "#/components/schemas/registration-code-grant", "authorization_code": "#/components/schemas/authorization-code-grant", "refresh_token": "#/components/schemas/refresh-token-grant" } }, "oneOf": [{ "type": "object", "required": ["grant_type"], "properties": { "grant_type": { "type": "string", "description": "OAuth 2.0 grant type.", "enum": ["client_credentials"], "example": "client_credentials" } }, "x-ref": "#/components/schemas/client-credentials-grant" }, { "type": "object", "required": ["grant_type", "client_id", "email", "registration_code"], "properties": { "grant_type": { "type": "string", "description": "OAuth 2.0 grant type.", "enum": ["registration_code"], "example": "registration_code" }, "client_id": { "type": "string", "description": "Your API client ID." }, "email": { "type": "string", "format": "email", "description": "The email address of the user being registered." }, "registration_code": { "type": "string", "description": "Registration code obtained when creating the user via `POST /v1/user/signup/registration_code`." } }, "x-ref": "#/components/schemas/registration-code-grant" }, { "type": "object", "required": ["grant_type", "client_id", "code", "redirect_uri"], "properties": { "grant_type": { "type": "string", "description": "OAuth 2.0 grant type.", "enum": ["authorization_code"], "example": "authorization_code" }, "client_id": { "type": "string", "description": "Your API client ID." }, "code": { "type": "string", "description": "Authorisation code provided upon redirect back from the authorisation flow." }, "redirect_uri": { "type": "string", "description": "Registered redirect URL coordinated with Wise during onboarding.", "example": "https://www.yourapp.com" } }, "x-ref": "#/components/schemas/authorization-code-grant" }, { "type": "object", "required": ["grant_type", "refresh_token"], "properties": { "grant_type": { "type": "string", "description": "OAuth 2.0 grant type.", "enum": ["refresh_token"], "example": "refresh_token" }, "refresh_token": { "type": "string", "description": "Refresh token obtained from a `registration_code` or `authorization_code` grant." } }, "x-ref": "#/components/schemas/refresh-token-grant" }], "index$": 1 } } } }, "parameters": [{ "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "token.create.0": "GET-only live run: needs POST /oauth/token" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const token_ref01_ent = client.Token();
        let token_ref01_data = setup.data.new.token['token_ref01'];
        token_ref01_data = (await token_ref01_ent.create(token_ref01_data)).data();
        (0, node_assert_1.default)(null != token_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/token/TokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['token01', 'token02', 'token03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_TOKEN_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_TOKEN_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_TOKEN_ENTID'];
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
//# sourceMappingURL=TokenEntity.test.js.map