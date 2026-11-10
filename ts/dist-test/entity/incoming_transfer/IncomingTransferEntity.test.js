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
(0, node_test_1.describe)('IncomingTransferEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.IncomingTransfer();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.IncomingTransfer().load({ "id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'incoming_transfer.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accountDetailsId": { "a": true, "h": "Account Details Id", "n": "accountDetailsId", "r": false, "sh": "Account details ID that received the incoming transfer.", "t": "`$STRING`", "key$": "accountDetailsId", "index$": 0 }, "amounts": { "a": true, "h": "Amounts", "n": "amounts", "r": true, "sh": "Payment amount waterfall representing the flow of funds: instructed → interbankSettlement → credited.", "t": "`$OBJECT`", "key$": "amounts", "index$": 1 }, "balanceId": { "a": true, "h": "Balance Id", "n": "balanceId", "r": true, "sh": "Balance ID associated with the incoming transfer.", "t": "`$STRING`", "key$": "balanceId", "index$": 2 }, "chargeBearer": { "a": true, "h": "Charge Bearer", "n": "chargeBearer", "r": false, "sh": "Charge bearer code indicating who pays the transaction fees.", "t": "`$STRING`", "key$": "chargeBearer", "index$": 3 }, "creditTransferType": { "a": true, "h": "Credit Transfer Type", "n": "creditTransferType", "r": false, "sh": "- `CUSTOMER_CREDIT_TRANSFER` - End-user or corporate payment where at least one side (debtor or creditor) is a non-financial institution.", "t": "`$STRING`", "key$": "creditTransferType", "index$": 4 }, "creditedTime": { "a": true, "fo": "date-time", "h": "Credited Time", "n": "creditedTime", "r": true, "sh": "Timestamp when the incoming transfer was credited to the balance.", "t": "`$STRING`", "key$": "creditedTime", "index$": 5 }, "creditor": { "a": true, "h": "Creditor", "n": "creditor", "r": true, "sh": "The creditor (beneficiary) of the incoming transfer.", "t": "`$OBJECT`", "key$": "creditor", "index$": 6 }, "debtor": { "a": true, "h": "Debtor", "n": "debtor", "r": true, "sh": "The debtor (ordering party) of the incoming transfer.", "t": "`$OBJECT`", "key$": "debtor", "index$": 7 }, "endToEndId": { "a": true, "h": "End To End Id", "n": "endToEndId", "r": false, "sh": "End-to-end identifier assigned by the debtor for reconciliation purposes.", "t": "`$STRING`", "key$": "endToEndId", "index$": 8 }, "exchangeRate": { "a": true, "fo": "decimal", "h": "Exchange Rate", "n": "exchangeRate", "r": true, "sh": "Wise's effective FX rate applied to this incoming transfer (source currency → target balance currency) as a decimal number.", "t": "`$NUMBER`", "key$": "exchangeRate", "index$": 9 }, "fees": { "a": true, "h": "Fees", "n": "fees", "r": true, "sh": "Breakdown of fees applied to the incoming transfer.", "t": "`$OBJECT`", "key$": "fees", "index$": 10 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": true, "sh": "Unique identifier for the incoming transfer.", "t": "`$STRING`", "key$": "id", "index$": 11 }, "previousInstructingAgents": { "a": true, "h": "Previous Instructing Agents", "n": "previousInstructingAgents", "r": true, "sh": "Financial institutions that previously instructed this payment (the historical chain the payment passed through before reaching Wise).", "t": "`$ARRAY`", "key$": "previousInstructingAgents", "index$": 12 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": true, "sh": "Profile ID of the balance owner.", "t": "`$INTEGER`", "key$": "profileId", "index$": 13 }, "scheme": { "a": true, "h": "Scheme", "n": "scheme", "r": true, "sh": "The payment scheme through which the incoming transfer was received.", "t": "`$STRING`", "key$": "scheme", "index$": 14 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "Current state of the incoming transfer.", "t": "`$STRING`", "key$": "state", "index$": 15 }, "uetr": { "a": true, "fo": "uuid", "h": "Uetr", "n": "uetr", "r": false, "sh": "Universal End-to-End Transaction Reference.", "t": "`$STRING`", "key$": "uetr", "index$": 16 }, "unstructuredReference": { "a": true, "h": "Unstructured Reference", "n": "unstructuredReference", "r": false, "sh": "Unstructured remittance information provided by the debtor.", "t": "`$STRING`", "key$": "unstructuredReference", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "incoming_transfer", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /incoming-transfers/{incomingTransferId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "k": "param", "n": "id", "or": "incomingTransferId", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/incoming-transfers/{incomingTransferId}", "q": { "exist": ["id"] }, "r": { "param": { "incomingTransferId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "incoming-transfers" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "incoming_transfer", "name__orig": "incoming_transfer", "Name": "IncomingTransfer", "name_": "incoming_transfer", "name-": "incoming-transfer", "NAME": "INCOMING_TRANSFER", "index$": 34 }, { "active": true, "entity": "incoming_transfer", "key$": "BasicIncomingTransferFlow", "kind": "basic", "name": "BasicIncomingTransferFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "incoming_transfer_ref01", "srcdatavar": "incoming_transfer_ref01_data", "suffix": "_dt0" }, "m": { "id": "incoming_transfer01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-incoming_transfer_ref01" } }], "index$": 0, "route": "GET /incoming-transfers/{incomingTransferId}", "record": {} }] }, 'IncomingTransfer', { "GET /incoming-transfers/{incomingTransferId}": { "protocol": "http", "parameters": [{ "name": "incomingTransferId", "in": "path", "description": "Unique incoming transfer identifier. UUID-formatted string.", "schema": { "type": "string", "description": "Unique incoming transfer identifier. UUID-formatted string.", "format": "uuid", "example": "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }, "required": true, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let incoming_transfer_ref01_data = Object.values(setup.data.existing.incoming_transfer)[0];
        // LOAD
        const incoming_transfer_ref01_ent = client.IncomingTransfer();
        const incoming_transfer_ref01_match_dt0 = {};
        incoming_transfer_ref01_match_dt0.id = incoming_transfer_ref01_data.id;
        const incoming_transfer_ref01_data_dt0 = (await incoming_transfer_ref01_ent.load(incoming_transfer_ref01_match_dt0)).data();
        (0, node_assert_1.default)(incoming_transfer_ref01_data_dt0.id === incoming_transfer_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/incoming_transfer/IncomingTransferTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['incoming_transfer01', 'incoming_transfer02', 'incoming_transfer03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_INCOMING_TRANSFER_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_INCOMING_TRANSFER_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_INCOMING_TRANSFER_ENTID'];
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
//# sourceMappingURL=IncomingTransferEntity.test.js.map