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
(0, node_test_1.describe)('RuleEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Rule();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Rule().list({ "application_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'rule.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "The description of the authorisation rule.", "t": "`$STRING`", "key$": "description", "index$": 0 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "The unique ID for the authorisation rule.", "t": "`$INTEGER`", "key$": "id", "index$": 1 }, "operation": { "a": true, "h": "Operation", "n": "operation", "r": false, "sh": "Determines whether the transactions should be allowed or blocked.", "t": "`$STRING`", "key$": "operation", "index$": 2 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of authorisation rule.", "t": "`$STRING`", "key$": "type", "index$": 3 }, "values": { "a": true, "h": "Values", "n": "values", "r": false, "sh": "A list of values based on the `type` of rule configured.", "t": "`$ARRAY`", "key$": "values", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "rule", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["description", "operation", "type", "values"], "co": { "id": "POST /spend/applications/{clientId}/spend-controls/rules", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "application_id", "or": "clientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/spend/applications/{clientId}/spend-controls/rules", "q": { "exist": ["application_id"] }, "r": { "param": { "clientId": "application_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "applications" }, { "var": "application_id" }, { "lit": "spend-controls" }, { "lit": "rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /spend/applications/{clientId}/spend-controls/rules", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "application_id", "or": "clientId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/spend/applications/{clientId}/spend-controls/rules", "q": { "exist": ["application_id"] }, "r": { "param": { "clientId": "application_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "applications" }, { "var": "application_id" }, { "lit": "spend-controls" }, { "lit": "rules" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "rule", "name__orig": "rule", "Name": "Rule", "name_": "rule", "name-": "rule", "NAME": "RULE", "index$": 55 }, { "active": true, "entity": "rule", "key$": "BasicRuleFlow", "kind": "basic", "name": "BasicRuleFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "rule_ref01" }, "m": { "application_id": "application01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "application_id": "application01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "rule_ref01" } }], "index$": 1 }] }, 'Rule', { "POST /spend/applications/{clientId}/spend-controls/rules": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "type": { "type": "string", "enum": ["MCC", "CURRENCY"], "description": "The type of authorisation rule.", "key$": "type" }, "operation": { "type": "string", "enum": ["ALLOW", "BLOCK"], "description": "Determines whether the transactions should be allowed or blocked.", "key$": "operation" }, "description": { "type": "string", "description": "The description of the authorisation rule.", "key$": "description" }, "values": { "type": "array", "items": { "type": "string" }, "description": "A list of values based on the `type` of rule. For example, setting `MCC` as `type` requires `values` to be set as `[\"1234\", \"5678\"]`.", "key$": "values" } }, "index$": 1 }, "example": { "description": "Blocking all transactions from MCC 1234 and 5678", "type": "MCC", "operation": "BLOCK", "values": ["1234", "5678"] } } } }, "parameters": [{ "name": "clientId", "in": "path", "required": true, "description": "The application client ID.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /spend/applications/{clientId}/spend-controls/rules": { "protocol": "http", "parameters": [{ "name": "clientId", "in": "path", "required": true, "description": "The application client ID.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "rule.create.0": "GET-only live run: needs POST /spend/applications/{clientId}/spend-controls/rules" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const rule_ref01_ent = client.Rule();
        let rule_ref01_data = setup.data.new.rule['rule_ref01'];
        rule_ref01_data['application_id'] = setup.idmap['application01'];
        rule_ref01_data = (await rule_ref01_ent.create(rule_ref01_data)).data();
        (0, node_assert_1.default)(null != rule_ref01_data.id);
        // LIST
        const rule_ref01_match = {};
        rule_ref01_match['application_id'] = setup.idmap['application01'];
        const rule_ref01_list = (await rule_ref01_ent.list(rule_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(rule_ref01_list, { id: rule_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/rule/RuleTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['rule01', 'rule02', 'rule03', 'application01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_RULE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_RULE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_RULE_ENTID'];
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
//# sourceMappingURL=RuleEntity.test.js.map