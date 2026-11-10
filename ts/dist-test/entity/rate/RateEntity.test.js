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
(0, node_test_1.describe)('RateEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Rate();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('rate hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WiseSDK.test(offline).Rate().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WiseSDK.test(offline).Rate()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WiseSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Rate().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WiseSDK.test().Rate().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WiseSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Rate().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Rate().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Rate().list({ "from": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rate.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "rate": { "a": true, "fo": "double", "h": "Rate", "n": "rate", "r": true, "sh": "Exchange rate value.", "t": "`$NUMBER`", "key$": "rate", "index$": 0 }, "source": { "a": true, "h": "Source", "n": "source", "r": true, "sh": "Source (send) currency code.", "t": "`$STRING`", "key$": "source", "index$": 1 }, "target": { "a": true, "h": "Target", "n": "target", "r": true, "sh": "Target (receive) currency code.", "t": "`$STRING`", "key$": "target", "index$": 2 }, "time": { "a": true, "h": "Time", "n": "time", "r": true, "sh": "Timestamp for exchange rate.", "t": "`$STRING`", "key$": "time", "index$": 3 } }, "name": "rate", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /rates", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "2019-02-13T14:53:01", "explode": true, "k": "query", "n": "from", "or": "from", "r": false, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "day", "explode": true, "k": "query", "n": "group", "or": "group", "r": false, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "EUR", "explode": true, "k": "query", "n": "source", "or": "source", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "USD", "explode": true, "k": "query", "n": "target", "or": "target", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "2019-02-13T14:53:01", "explode": true, "k": "query", "n": "time", "or": "time", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }, { "a": true, "ex": "2019-03-13T14:53:01", "explode": true, "k": "query", "n": "to", "or": "to", "r": false, "style": "form", "t": "`$STRING`", "index$": 5 }] }, "k": "http", "m": "GET", "o": "/rates", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "rates" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "rate", "name__orig": "rate", "Name": "Rate", "name_": "rate", "name-": "rate", "NAME": "RATE", "index$": 53 }, { "active": true, "entity": "rate", "key$": "BasicRateFlow", "kind": "basic", "name": "BasicRateFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "rate_ref01" } }], "index$": 0 }] }, 'Rate', { "GET /rates": { "protocol": "http", "parameters": [{ "name": "source", "in": "query", "required": false, "description": "Source (send) currency code.", "schema": { "type": "string" }, "example": "EUR", "index$": 0 }, { "name": "target", "in": "query", "required": false, "description": "Target (receive) currency code.", "schema": { "type": "string" }, "example": "USD", "index$": 1 }, { "name": "time", "in": "query", "required": false, "description": "Timestamp to get historic exchange rate. <br>Supports only Timestamp (combined date and time). Timezone offset is supported but optional. <br>Supported examples: `2019-03-13T14:53:01` or `2019-03-13T14:53:01+0100`.\n", "schema": { "type": "string" }, "example": "2019-02-13T14:53:01", "index$": 2 }, { "name": "from", "in": "query", "required": false, "description": "Period start date/time to get exchange rate history. <br>Supports Timestamp (combined date and time) or Date (date only). <br>Supported examples: `2019-03-13T14:53:01` or `2019-03-13`.\n", "schema": { "type": "string" }, "example": "2019-02-13T14:53:01", "index$": 3 }, { "name": "to", "in": "query", "required": false, "description": "Period end date/time to get exchange rate history. <br>Supports Timestamp (combined date and time) or Date (date only). <br>Timezone offset is supported but optional. <br>Supported examples: `2019-03-13T14:53:01+0100` or `2019-03-13+0100`.\n", "schema": { "type": "string" }, "example": "2019-03-13T14:53:01", "index$": 4 }, { "name": "group", "in": "query", "required": false, "description": "Interval for history grouping.", "schema": { "type": "string", "enum": ["day", "hour", "minute"] }, "example": "day", "index$": 5 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 6 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let rate_ref01_data = Object.values(setup.data.existing.rate)[0];
        // LIST
        const rate_ref01_ent = client.Rate();
        const rate_ref01_match = {};
        const rate_ref01_list = (await rate_ref01_ent.list(rate_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rate/RateTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rate01', 'rate02', 'rate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_RATE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_RATE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_RATE_ENTID'];
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
//# sourceMappingURL=RateEntity.test.js.map