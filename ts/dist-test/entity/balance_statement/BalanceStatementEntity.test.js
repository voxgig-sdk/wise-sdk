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
(0, node_test_1.describe)('BalanceStatementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.BalanceStatement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.BalanceStatement().list({ "id": "x", "profile_id": 1, "currency": "x", "interval_end": "x", "interval_start": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of []) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'balance_statement.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": false, "sh": "Transaction amount.", "t": "`$OBJECT`", "key$": "amount", "index$": 0 }, "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": false, "sh": "Date when transaction was created.", "t": "`$STRING`", "key$": "date", "index$": 1 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Transaction details.", "t": "`$OBJECT`", "key$": "details", "index$": 2 }, "exchangeDetails": { "a": true, "h": "Exchange Details", "n": "exchangeDetails", "r": false, "sh": "Exchange details for card transactions abroad.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "exchangeDetails", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 4 }, "referenceNumber": { "a": true, "h": "Reference Number", "n": "referenceNumber", "r": false, "sh": "Wise assigned unique transaction reference number.", "t": "`$STRING`", "key$": "referenceNumber", "index$": 5 }, "runningBalance": { "a": true, "h": "Running Balance", "n": "runningBalance", "r": false, "sh": "Running balance after the transaction.", "t": "`$OBJECT`", "key$": "runningBalance", "index$": 6 }, "totalFees": { "a": true, "h": "Total Fees", "n": "totalFees", "r": false, "sh": "Transaction fees.", "t": "`$OBJECT`", "key$": "totalFees", "index$": 7 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Transaction direction.", "t": "`$STRING`", "key$": "type", "index$": 8 } }, "id": { "field": "id", "name": "id" }, "name": "balance_statement", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/balance-statements/{balanceId}/statement.json", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 64, "k": "param", "n": "id", "or": "balanceId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 12345, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }], "query": [{ "a": true, "ex": "EUR", "explode": true, "k": "query", "n": "currency", "or": "currency", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2025-04-30T23:59:59.999Z", "explode": true, "k": "query", "n": "interval_end", "or": "intervalEnd", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2025-03-01T00:00:00.000Z", "explode": true, "k": "query", "n": "interval_start", "or": "intervalStart", "r": true, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "en", "explode": true, "k": "query", "n": "statement_locale", "or": "statementLocale", "r": false, "style": "form", "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "COMPACT", "explode": true, "k": "query", "n": "type", "or": "type", "r": false, "style": "form", "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/balance-statements/{balanceId}/statement.json", "q": { "exist": ["currency", "id", "interval_end", "interval_start", "profile_id"] }, "r": { "param": { "balanceId": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balance-statements" }, { "var": "id" }, { "lit": "statement.json" }], "t": { "req": "`reqdata`", "res": "`body.transactions`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "balance_statement", "name__orig": "balance_statement", "Name": "BalanceStatement", "name_": "balance_statement", "name-": "balance-statement", "NAME": "BALANCE_STATEMENT", "index$": 6 }, { "active": true, "entity": "balance_statement", "key$": "BasicBalanceStatementFlow", "kind": "basic", "name": "BasicBalanceStatementFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": {}, "m": { "balance_id": "balance01", "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "balance_statement_ref01" } }], "unreachable": true }] }, 'BalanceStatement', { "GET /profiles/{profileId}/balance-statements/{balanceId}/statement.json": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "example": 12345, "index$": 0 }, { "name": "balanceId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The balance ID to get the statement for.", "example": 64, "index$": 1 }, { "name": "currency", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Currency of the balance statement requested (ISO 4217 Alphabetic Code).", "example": "EUR", "index$": 2 }, { "name": "intervalStart", "in": "query", "required": true, "schema": { "type": "string", "format": "date-time" }, "description": "Statement start time in UTC.", "example": "2025-03-01T00:00:00.000Z", "index$": 3 }, { "name": "intervalEnd", "in": "query", "required": true, "schema": { "type": "string", "format": "date-time" }, "description": "Statement end time in UTC.", "example": "2025-04-30T23:59:59.999Z", "index$": 4 }, { "name": "type", "in": "query", "required": false, "schema": { "type": "string", "enum": ["COMPACT", "FLAT"] }, "description": "Statement type:\n- `COMPACT` - Single statement line per transaction\n- `FLAT` - Accounting statements where transaction fees are on a separate line\n", "example": "COMPACT", "index$": 5 }, { "name": "statementLocale", "in": "query", "required": false, "schema": { "type": "string" }, "description": "Language for the statement. Supports 2 character language codes.", "example": "en", "index$": 6 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 7 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let balance_statement_ref01_data = Object.values(setup.data.existing.balance_statement)[0];
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/balance_statement/BalanceStatementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['balance_statement01', 'balance_statement02', 'balance_statement03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_BALANCE_STATEMENT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_BALANCE_STATEMENT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_BALANCE_STATEMENT_ENTID'];
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
//# sourceMappingURL=BalanceStatementEntity.test.js.map