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
(0, node_test_1.describe)('TransferRequirementEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.TransferRequirement();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.TransferRequirement().create({ "customerTransactionId": 1, "quoteUuid": "x", "targetAccount": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'transfer_requirement.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "customerTransactionId": { "a": true, "fo": "uuid", "h": "Customer Transaction Id", "n": "customerTransactionId", "r": false, "sh": "Unique identifier for the transfer request", "t": "`$STRING`", "key$": "customerTransactionId", "index$": 0 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "t": "`$OBJECT`", "key$": "details", "index$": 1 }, "originatorLegalEntityType": { "a": true, "h": "Originator Legal Entity Type", "n": "originatorLegalEntityType", "r": false, "sh": "Type of sender.", "t": "`$STRING`", "key$": "originatorLegalEntityType", "index$": 2 }, "quoteUuid": { "a": true, "fo": "uuid", "h": "Quote Uuid", "n": "quoteUuid", "r": true, "sh": "V2 quote ID", "t": "`$STRING`", "key$": "quoteUuid", "index$": 3 }, "targetAccount": { "a": true, "fo": "int64", "h": "Target Account", "n": "targetAccount", "r": true, "sh": "Recipient account ID", "t": "`$INTEGER`", "key$": "targetAccount", "index$": 4 } }, "name": "transfer_requirement", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["customerTransactionId", "details", "originatorLegalEntityType", "quoteUuid", "targetAccount"], "co": { "id": "POST /transfer-requirements", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/transfer-requirements", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "transfer-requirements" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "transfer_requirement", "name__orig": "transfer_requirement", "Name": "TransferRequirement", "name_": "transfer_requirement", "name-": "transfer-requirement", "NAME": "TRANSFER_REQUIREMENT", "index$": 72 }, { "active": true, "entity": "transfer_requirement", "key$": "BasicTransferRequirementFlow", "kind": "basic", "name": "BasicTransferRequirementFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "transfer_requirement_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'TransferRequirement', { "POST /transfer-requirements": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["targetAccount", "quoteUuid"], "properties": { "targetAccount": { "type": "integer", "format": "int64", "description": "Recipient account ID", "key$": "targetAccount" }, "quoteUuid": { "type": "string", "format": "uuid", "description": "V2 quote ID", "key$": "quoteUuid" }, "customerTransactionId": { "type": "string", "format": "uuid", "description": "Unique identifier for the transfer request", "key$": "customerTransactionId" }, "originatorLegalEntityType": { "type": "string", "enum": ["PRIVATE", "BUSINESS"], "description": "Type of sender. Required from March 2026 for Correspondent Send integrations", "key$": "originatorLegalEntityType" }, "details": { "type": "object", "properties": { "reference": { "type": "string" }, "sourceOfFunds": { "type": "string" }, "sourceOfFundsOther": { "type": "string" }, "transferPurpose": { "type": "string" }, "transferPurposeSubTransferPurpose": { "type": "string" }, "transferPurposeInvoiceNumber": { "type": "string" }, "transferNature": { "type": "string" } }, "key$": "details" } }, "index$": 1 }, "example": { "targetAccount": 8692237, "quoteUuid": "8fa9be20-ba43-4b15-abbb-9424e1481050", "originatorLegalEntityType": "PRIVATE", "details": { "reference": "Invoice 2026-001", "sourceOfFunds": "verification.source.of.funds.salary", "transferPurpose": "verification.transfers.purpose.pay.bills" } } } } }, "parameters": [{ "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 0 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "transfer_requirement.create.0": "GET-only live run: needs POST /transfer-requirements" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const transfer_requirement_ref01_ent = client.TransferRequirement();
        let transfer_requirement_ref01_data = setup.data.new.transfer_requirement['transfer_requirement_ref01'];
        transfer_requirement_ref01_data = (await transfer_requirement_ref01_ent.create(transfer_requirement_ref01_data)).data();
        (0, node_assert_1.default)(null != transfer_requirement_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/transfer_requirement/TransferRequirementTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['transfer_requirement01', 'transfer_requirement02', 'transfer_requirement03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_TRANSFER_REQUIREMENT_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_TRANSFER_REQUIREMENT_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_TRANSFER_REQUIREMENT_ENTID'];
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
//# sourceMappingURL=TransferRequirementEntity.test.js.map