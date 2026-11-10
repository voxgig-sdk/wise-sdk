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
(0, node_test_1.describe)('MessageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Message();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Message().create({ "case_id": "x", "submissionData": "x", "type": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'message.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "submissionData": { "a": true, "h": "Submission Data", "n": "submissionData", "r": true, "sh": "The data for the message submission.", "t": "`$OBJECT`", "union": { "branches": 5, "count": 3, "depth": 2 }, "key$": "submissionData", "index$": 0 }, "type": { "a": true, "h": "Type", "n": "type", "r": true, "sh": "The type of message submission.", "t": "`$STRING`", "key$": "type", "index$": 1 } }, "name": "message", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["submissionData", "type"], "co": { "id": "POST /cases/{caseId}/messages", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 12345678, "k": "param", "n": "case_id", "or": "caseId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/cases/{caseId}/messages", "q": { "exist": ["case_id"] }, "r": { "param": { "caseId": "case_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cases" }, { "var": "case_id" }, { "lit": "messages" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.case"]] }, "key$": "message", "name__orig": "message", "Name": "Message", "name_": "message", "name-": "message", "NAME": "MESSAGE", "index$": 39 }, { "active": true, "entity": "message", "key$": "BasicMessageFlow", "kind": "basic", "name": "BasicMessageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "message_ref01" }, "m": { "case_id": "case01" }, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'Message', { "POST /cases/{caseId}/messages": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Request body for submitting a message to a case.\n\nThe structure of `submissionData` depends on the `type` field.\n", "properties": { "type": { "type": "string", "description": "The type of message submission.", "enum": ["FREEFORM", "DEPOSIT_SANCTION_HIT_SUBMISSION", "REFERENCE_SANCTION_HIT_SUBMISSION", "RECIPIENT_SANCTION_HIT_SUBMISSION", "REFERENCE_LOCATION_HIT_SUBMISSION", "RECIPIENT_LOCATION_HIT_SUBMISSION", "FILE_SUBMISSION"], "example": "FREEFORM", "x-ref": "#/components/schemas/message-submission-type", "key$": "type" }, "submissionData": { "type": "object", "description": "The data for the message submission. Structure varies based on submission type.\n", "oneOf": [{ "type": "object", "title": "FREEFORM Submission Data", "description": "Submission data for FREEFORM message type.\nUsed for general text-based communication on a case.\n\n**Prerequisites:**\n- Case must not be in RESOLVED or FAILED status\n\n**Validation Rules:**\n- `freeText` is REQUIRED and must be non-blank\n", "properties": { "freeText": {} }, "required": ["freeText"], "example": { "freeText": "Please find attached the requested documentation for this transfer." }, "x-ref": "#/components/schemas/submission-data-freeform" }, { "type": "object", "title": "Sanction Hit Submission Data", "description": "Submission data for sanction hit cases. Used for:\n- DEPOSIT_SANCTION_HIT_SUBMISSION\n- REFERENCE_SANCTION_HIT_SUBMISSION\n- RECIPIENT_SANCTION_HIT_SUBMISSION\n\n**Important**: Only ONE of the entity types should be provided per submission.\n\n### Validation Rules by Submission Type:\n\n**DEPOSIT_SANCTION_HIT_SUBMISSION**:\n- Must contain either `individual` OR `organisation` (exactly one)\n\n**RECIPIENT_SANCTION_HIT_SUBMISSION**:\n- Must contain either `individual` OR `organisation` (exactly one)\n- If `individual`, `countryOfResidenceIso3` is REQUIRED\n\n**REFERENCE_SANCTION_HIT_SUBMISSION**:\n- Must contain exactly one of: `individual`, `organisation`, `multiple`, `vessel`, or `other`\n- If `individual`, `countryOfResidenceIso3` is REQUIRED\n", "oneOf": [{}, {}, {}, {}, {}], "x-ref": "#/components/schemas/submission-data-sanction-hit" }, { "type": "object", "title": "Location Hit Submission Data", "description": "Submission data for location hit cases. Used for:\n- REFERENCE_LOCATION_HIT_SUBMISSION\n- RECIPIENT_LOCATION_HIT_SUBMISSION\n\nBoth types require an `other` object with location-specific details.\n", "anyOf": [{}, {}], "x-ref": "#/components/schemas/submission-data-location-hit" }, { "type": "object", "title": "FILE_SUBMISSION Submission Data", "description": "Submission data for FILE_SUBMISSION message type.\nUsed to attach previously uploaded files to a case.\n\n**Prerequisites:**\n- Files must be uploaded via `POST /cases/{caseId}/files` before submitting\n- Case must not be in RESOLVED or FAILED status\n- Files must belong to the specified profile\n\n**Validation Rules:**\n- `profileId` is REQUIRED\n- `fileIds` is REQUIRED and must not be empty\n- `fileIds` must not contain duplicates\n- All file IDs must reference existing files\n- All files must belong to the specified `profileId`\n", "properties": { "profileId": {}, "fileIds": {} }, "required": ["profileId", "fileIds"], "example": { "profileId": 14556049, "fileIds": [] }, "x-ref": "#/components/schemas/submission-data-file" }], "key$": "submissionData" } }, "required": ["type", "submissionData"], "x-ref": "#/components/schemas/message-submission-request", "index$": 1 }, "examples": { "freeform": { "summary": "FREEFORM", "description": "Free text message submission", "value": { "type": "FREEFORM", "submissionData": { "freeText": "The transfer has been verified and approved by our compliance team." } } }, "fileSubmission": { "summary": "FILE_SUBMISSION", "description": "File submission - attach previously uploaded files to a case.\nFiles must be uploaded via the file upload endpoint before submitting.\n", "value": { "type": "FILE_SUBMISSION", "submissionData": { "profileId": 14556049, "fileIds": ["a1b2c3d4-e5f6-7890-abcd-ef1234567890", "b2c3d4e5-f6a7-8901-bcde-f12345678901"] } } }, "depositSanctionHitIndividual": { "summary": "DEPOSIT_SANCTION_HIT_SUBMISSION (individual)", "description": "Submit individual depositor information for a deposit sanction hit case.", "value": { "type": "DEPOSIT_SANCTION_HIT_SUBMISSION", "submissionData": { "individual": { "name": "Maria Garcia Rodriguez", "dob": "12/05/1988", "nationality": "Spanish" } } } }, "depositSanctionHitOrganisation": { "summary": "DEPOSIT_SANCTION_HIT_SUBMISSION (organisation)", "description": "Submit organisation depositor information for a deposit sanction hit case.", "value": { "type": "DEPOSIT_SANCTION_HIT_SUBMISSION", "submissionData": { "organisation": { "name": "Tech Solutions Europe S.A.", "streetAddress": "Av. de la Liberté 25", "city": "Luxembourg", "postCode": "1931", "countryIso3": "LUX", "natureOfBusiness": "Software Development", "website": "https://www.techsolutions-eu.com" } } } }, "recipientSanctionHitIndividual": { "summary": "RECIPIENT_SANCTION_HIT_SUBMISSION (individual)", "description": "Submit individual recipient information for a recipient sanction hit case.", "value": { "type": "RECIPIENT_SANCTION_HIT_SUBMISSION", "submissionData": { "individual": { "name": "Li Wei Chen", "countryOfResidenceIso3": "SGP", "dob": "03/11/1982", "nationality": "Singaporean" } } } }, "recipientSanctionHitOrganisation": { "summary": "RECIPIENT_SANCTION_HIT_SUBMISSION (organisation)", "description": "Submit organisation recipient information for a recipient sanction hit case.", "value": { "type": "RECIPIENT_SANCTION_HIT_SUBMISSION", "submissionData": { "organisation": { "name": "Pacific Rim Trading Co.", "streetAddress": "88 Marina Boulevard", "city": "Singapore", "postCode": "018984", "countryIso3": "SGP", "natureOfBusiness": "Commodities Trading" } } } }, "referenceSanctionHitIndividual": { "summary": "REFERENCE_SANCTION_HIT_SUBMISSION (individual)", "description": "Submit individual information for a reference sanction hit case.", "value": { "type": "REFERENCE_SANCTION_HIT_SUBMISSION", "submissionData": { "individual": { "name": "Robert Downy Jr", "countryOfResidenceIso3": "EGY", "dob": "22/08/1975", "nationality": "Egyptian" } } } }, "referenceSanctionHitOrganisation": { "summary": "REFERENCE_SANCTION_HIT_SUBMISSION (organisation)", "description": "Submit organisation information for a reference sanction hit case.", "value": { "type": "REFERENCE_SANCTION_HIT_SUBMISSION", "submissionData": { "organisation": { "name": "Global Trading Partners LLC", "streetAddress": "1500 Commerce Street, Suite 400", "city": "Dubai", "postCode": "00000", "countryIso3": "ARE", "natureOfBusiness": "Import/Export Trading", "website": "https://www.globaltrading-partners.com" } } } }, "referenceSanctionHitVessel": { "summary": "REFERENCE_SANCTION_HIT_SUBMISSION (vessel)", "description": "Submit vessel information for a reference sanction hit case.", "value": { "type": "REFERENCE_SANCTION_HIT_SUBMISSION", "submissionData": { "vessel": { "vesselImoNumber": "9074729" } } } }, "referenceSanctionHitMultiple": { "summary": "REFERENCE_SANCTION_HIT_SUBMISSION (multiple)", "description": "Submit information when multiple entities are involved in a reference sanction hit case.", "value": { "type": "REFERENCE_SANCTION_HIT_SUBMISSION", "submissionData": { "multiple": { "explanation": "This payment reference involves a consortium of three companies: Alpha Corp (USA), Beta Ltd (UK), and Gamma GmbH (Germany). The payment is for a joint infrastructure project where funds are distributed proportionally: 40% to Alpha Corp, 35% to Beta Ltd, and 25% to Gamma GmbH." } } } }, "referenceSanctionHitOther": { "summary": "REFERENCE_SANCTION_HIT_SUBMISSION (other)", "description": "Submit information for entity types not covered by standard categories.", "value": { "type": "REFERENCE_SANCTION_HIT_SUBMISSION", "submissionData": { "other": { "explanation": "The payment reference relates to a charitable foundation registered with the UN. The Foundation for Educational Development (FED) is a non-profit organization established in 2010, registered under Swiss law with headquarters in Geneva. Registration number: CH-660.0.000.000-1." } } } }, "referenceLocationHit": { "summary": "REFERENCE_LOCATION_HIT_SUBMISSION", "description": "Submit location-related information for a reference location hit case.", "value": { "type": "REFERENCE_LOCATION_HIT_SUBMISSION", "submissionData": { "other": { "relatedToLocation": "The payment reference mentions Crimea due to historical business operations that were fully wound down in 2014.", "paymentExplanation": "Current payment is for consulting services rendered in London, UK.", "location": "Crimea, Ukraine", "referenceDescription": "Invoice CRM-2026-0042 - Consulting services for Q2 2026." } } } }, "recipientLocationHit": { "summary": "RECIPIENT_LOCATION_HIT_SUBMISSION", "description": "Submit location-related information for a recipient location hit case.", "value": { "type": "RECIPIENT_LOCATION_HIT_SUBMISSION", "submissionData": { "other": { "relatedToLocation": "Recipient company has a branch registration in the flagged jurisdiction for administrative purposes only.", "paymentExplanation": "Payment for software licenses delivered electronically.", "location": "Minsk, Belarus", "businessWebsite": "https://www.recipient-software.ie" } } } } } } } }, "parameters": [{ "name": "caseId", "in": "path", "required": true, "description": "The unique identifier of the case.", "schema": { "type": "integer", "format": "int64" }, "example": 12345678, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "message.create.0": "GET-only live run: needs POST /cases/{caseId}/messages" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const message_ref01_ent = client.Message();
        let message_ref01_data = setup.data.new.message['message_ref01'];
        message_ref01_data['case_id'] = setup.idmap['case01'];
        message_ref01_data = (await message_ref01_ent.create(message_ref01_data)).data();
        (0, node_assert_1.default)(null != message_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/message/MessageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['message01', 'message02', 'message03', 'case01', 'case02', 'case03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_MESSAGE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_MESSAGE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_MESSAGE_ENTID'];
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
//# sourceMappingURL=MessageEntity.test.js.map