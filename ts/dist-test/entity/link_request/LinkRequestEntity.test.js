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
(0, node_test_1.describe)('LinkRequestEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.LinkRequest();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.LinkRequest().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'link_request.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "clientKey": { "a": true, "h": "Client Key", "n": "clientKey", "r": true, "sh": "Client key that created the embedded link request.", "t": "`$STRING`", "key$": "clientKey", "index$": 0 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "r": true, "sh": "The end user's email address, to receive dispute updates.", "t": "`$STRING`", "key$": "email", "index$": 1 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "sh": "Embedded link request ID.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "metadata": { "a": true, "h": "Metadata", "n": "metadata", "r": true, "sh": "Flow-specific metadata.", "t": "`$OBJECT`", "key$": "metadata", "index$": 3 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": true, "sh": "Profile that owns the embedded flow.", "t": "`$INTEGER`", "key$": "profileId", "index$": 4 }, "redirectUrl": { "a": true, "fo": "uri", "h": "Redirect Url", "n": "redirectUrl", "r": true, "sh": "URL where Wise redirects the user after the flow resolves.", "t": "`$STRING`", "key$": "redirectUrl", "index$": 5 }, "transactionId": { "a": true, "fo": "int64", "h": "Transaction Id", "n": "transactionId", "r": true, "sh": "The ID of the card transaction to dispute.", "t": "`$INTEGER`", "key$": "transactionId", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "Embedded Flow type.", "t": "`$STRING`", "key$": "type", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "link_request", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["kycReviewId", "redirectUrl"], "co": { "id": "POST /profiles/{profileId}/embedded-flows/link-requests/kyc-reviews", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/embedded-flows/link-requests/kyc-reviews", "q": { "$action": "kyc_review", "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "embedded-flows" }, { "lit": "link-requests" }, { "lit": "kyc-reviews" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["method", "redirectUrl"], "co": { "id": "POST /profiles/{profileId}/embedded-flows/link-requests/payment-instrument", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/embedded-flows/link-requests/payment-instrument", "q": { "$action": "payment_instrument", "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "embedded-flows" }, { "lit": "link-requests" }, { "lit": "payment-instrument" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["redirectUrl", "targetCurrency"], "co": { "id": "POST /profiles/{profileId}/embedded-flows/link-requests/recipients", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/embedded-flows/link-requests/recipients", "q": { "$action": "recipient", "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "embedded-flows" }, { "lit": "link-requests" }, { "lit": "recipients" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["email", "redirectUrl", "transactionId"], "co": { "id": "POST /profiles/{profileId}/embedded-flows/link-requests/spend/disputes", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/embedded-flows/link-requests/spend/disputes", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "embedded-flows" }, { "lit": "link-requests" }, { "lit": "spend" }, { "lit": "disputes" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /embedded-flows/link-requests/{embeddedLinkRequestId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ea5eb6ca-3af7-4e88-a2e2-6a68dd92f198", "k": "param", "n": "id", "or": "embeddedLinkRequestId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/embedded-flows/link-requests/{embeddedLinkRequestId}", "q": { "exist": ["id"] }, "r": { "param": { "embeddedLinkRequestId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "embedded-flows" }, { "lit": "link-requests" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "link_request", "name__orig": "link_request", "Name": "LinkRequest", "name_": "link_request", "name-": "link-request", "NAME": "LINK_REQUEST", "index$": 37 }, { "active": true, "entity": "link_request", "key$": "BasicLinkRequestFlow", "kind": "basic", "name": "BasicLinkRequestFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "link_request_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "link_request_ref01", "srcdatavar": "link_request_ref01_data", "suffix": "_dt0" }, "m": { "id": "link_request01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-link_request_ref01" } }], "index$": 1, "route": "GET /embedded-flows/link-requests/{embeddedLinkRequestId}", "record": {} }] }, 'LinkRequest', { "POST /profiles/{profileId}/embedded-flows/link-requests/kyc-reviews": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirectUrl", "kycReviewId"], "properties": { "redirectUrl": { "type": "string", "format": "uri", "description": "URL where the user is redirected when the flow resolves.\nThis also includes query parameters based on flow completion state and completed KYC review ID.\n\nFor more information, see our [Embedded Flows - KYC Review guide](/guides/product/embedded-flows/flows/kyc-reviews).\n", "example": "https://example.com/return" }, "kycReviewId": { "type": "string", "description": "The UUID for the KYC review to be completed.", "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "format": "uuid" } } }, "example": { "redirectUrl": "https://example.com/return", "kycReviewId": "f47ac10b-58cc-4372-a567-0e02b2c3d479" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /profiles/{profileId}/embedded-flows/link-requests/payment-instrument": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirectUrl", "method"], "properties": { "redirectUrl": { "type": "string", "format": "uri", "description": "URL where the user is redirected when the flow resolves.\nThis also includes query parameters based on flow completion state and created payment instrument ID.\n\nFor more information, see our [Embedded Flows - Payment Instruments guide](/guides/product/embedded-flows/flows/payment-instrument).\n", "example": "https://example.com/return" }, "method": { "type": "string", "enum": ["BACS", "SEPA", "ACH", "EFT"], "description": "The method the payment instrument is created for.", "example": "BACS" } } }, "example": { "redirectUrl": "https://example.com/return", "method": "BACS" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /profiles/{profileId}/embedded-flows/link-requests/recipients": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirectUrl"], "properties": { "redirectUrl": { "type": "string", "format": "uri", "description": "URL where the user is redirected when the flow resolves.\nThis also includes query parameters based on flow completion state and created recipient ID.\n\nFor more information, see our [Embedded Flows - Recipient Creation guide](/guides/product/embedded-flows/flows/recipient-creation).\n", "example": "https://example.com/return" }, "targetCurrency": { "type": "string", "description": "Optional target currency used to start recipient requirements for a specific currency.", "example": "USD" } } }, "example": { "redirectUrl": "https://example.com/return", "targetCurrency": "USD" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /profiles/{profileId}/embedded-flows/link-requests/spend/disputes": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["redirectUrl", "transactionId", "email"], "properties": { "redirectUrl": { "type": "string", "format": "uri", "description": "URL where the user is redirected when the flow resolves.\nThis also includes query parameters based on flow completion state and disputed transaction IDs.\n\nFor more information, see our [Embedded Flows - Dispute Creation guide](/guides/product/embedded-flows/flows/dispute-creation).\n", "example": "https://example.com/return", "key$": "redirectUrl" }, "transactionId": { "type": "integer", "format": "int64", "description": "The ID of the card transaction to dispute. It must belong to the given profile.", "example": 625327, "key$": "transactionId" }, "email": { "type": "string", "format": "email", "description": "The end user's email address, to receive dispute updates.", "example": "user@example.com", "key$": "email" } }, "index$": 1 }, "example": { "redirectUrl": "https://example.com/return", "transactionId": 625327, "email": "user@example.com" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /embedded-flows/link-requests/{embeddedLinkRequestId}": { "protocol": "http", "parameters": [{ "name": "embeddedLinkRequestId", "in": "path", "required": true, "description": "The embedded link request ID.", "schema": { "type": "string", "format": "uuid" }, "example": "ea5eb6ca-3af7-4e88-a2e2-6a68dd92f198", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "link_request.create.0": "GET-only live run: needs POST /profiles/{profileId}/embedded-flows/link-requests/kyc-reviews", "link_request.load.1": "GET-only live run: reads a record only link_request.create.0 gives" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const link_request_ref01_ent = client.LinkRequest();
        let link_request_ref01_data = setup.data.new.link_request['link_request_ref01'];
        link_request_ref01_data['profile_id'] = setup.idmap['profile01'];
        link_request_ref01_data = (await link_request_ref01_ent.create(link_request_ref01_data)).data();
        (0, node_assert_1.default)(null != link_request_ref01_data.id);
        // LOAD
        const link_request_ref01_match_dt0 = {};
        link_request_ref01_match_dt0.id = link_request_ref01_data.id;
        const link_request_ref01_data_dt0 = (await link_request_ref01_ent.load(link_request_ref01_match_dt0)).data();
        (0, node_assert_1.default)(link_request_ref01_data_dt0.id === link_request_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/link_request/LinkRequestTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['link_request01', 'link_request02', 'link_request03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_LINK_REQUEST_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_LINK_REQUEST_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_LINK_REQUEST_ENTID'];
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
//# sourceMappingURL=LinkRequestEntity.test.js.map