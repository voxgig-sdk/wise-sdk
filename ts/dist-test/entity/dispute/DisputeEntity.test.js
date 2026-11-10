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
(0, node_test_1.describe)('DisputeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Dispute();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Dispute().list({ "profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'dispute.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "canWithdraw": { "a": true, "h": "Can Withdraw", "n": "canWithdraw", "r": false, "sh": "Whether the dispute can be withdrawn.", "t": "`$BOOLEAN`", "key$": "canWithdraw", "index$": 0 }, "createdAt": { "a": true, "fo": "date-time", "h": "Created At", "n": "createdAt", "r": false, "sh": "Time when the dispute was created.", "t": "`$STRING`", "key$": "createdAt", "index$": 1 }, "createdBy": { "a": true, "h": "Created By", "n": "createdBy", "r": false, "sh": "Creator of the dispute.", "t": "`$STRING`", "key$": "createdBy", "index$": 2 }, "disclaimer": { "a": true, "h": "Disclaimer", "n": "disclaimer", "r": false, "sh": "Acknowledgement fields.", "t": "`$OBJECT`", "key$": "disclaimer", "index$": 3 }, "files": { "a": true, "h": "Files", "n": "files", "r": false, "sh": "Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload).", "t": "`$OBJECT`", "key$": "files", "index$": 4 }, "form": { "a": true, "h": "Form", "n": "form", "r": false, "sh": "Form fields required to submit this dispute.", "t": "`$OBJECT`", "key$": "form", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier of the dispute.", "t": "`$STRING`", "key$": "id", "index$": 6 }, "lastUpdatedAt": { "a": true, "fo": "date-time", "h": "Last Updated At", "n": "lastUpdatedAt", "r": false, "sh": "Time when the dispute was last updated.", "t": "`$STRING`", "key$": "lastUpdatedAt", "index$": 7 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": false, "sh": "Profile ID.", "t": "`$INTEGER`", "key$": "profileId", "index$": 8 }, "reason": { "a": true, "h": "Reason", "n": "reason", "r": false, "sh": "Dispute reason code.", "t": "`$STRING`", "key$": "reason", "index$": 9 }, "receipt": { "a": true, "fo": "binary", "h": "Receipt", "n": "receipt", "r": false, "sh": "The file to upload.", "t": "`$STRING`", "key$": "receipt", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Dispute overall status.", "t": "`$STRING`", "key$": "status", "index$": 11 }, "statusMessage": { "a": true, "h": "Status Message", "n": "statusMessage", "r": false, "sh": "Explanation for `subStatus`.", "t": "`$STRING`", "key$": "statusMessage", "index$": 12 }, "subStatus": { "a": true, "h": "Sub Status", "n": "subStatus", "r": false, "sh": "Dispute detailed status.", "t": "`$STRING`", "key$": "subStatus", "index$": 13 }, "transaction": { "a": true, "h": "Transaction", "n": "transaction", "r": false, "sh": "Transaction details for the dispute.", "t": "`$OBJECT`", "key$": "transaction", "index$": 14 }, "transactionId": { "a": true, "fo": "int64", "h": "Transaction Id", "n": "transactionId", "r": false, "sh": "Card transaction ID.", "t": "`$INTEGER`", "key$": "transactionId", "index$": 15 } }, "id": { "field": "id", "name": "id" }, "name": "dispute", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["disclaimer", "files", "form", "transaction"], "co": { "id": "POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 14547572, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "WRONG_AMOUNT", "k": "param", "n": "reason", "or": "reason", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "VISA", "k": "param", "n": "scheme", "or": "scheme", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}", "q": { "exist": ["profile_id", "reason", "scheme"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "dispute-form" }, { "lit": "flows" }, { "var": "scheme" }, { "var": "reason" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /spend/profiles/{profileId}/dispute-form/file", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 14547572, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/spend/profiles/{profileId}/dispute-form/file", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rb": { "fields": [{ "binary": true, "name": "receipt" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "dispute-form" }, { "lit": "file" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/disputes", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 16605997, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page_number", "or": "pageNumber", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 10, "explode": true, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": "ACTIVE", "explode": true, "k": "query", "n": "status", "or": "status", "r": false, "style": "form", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 2040, "explode": true, "k": "query", "n": "transaction_id", "or": "transactionId", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/disputes", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "disputes" }], "t": { "page": { "total": "`body.totalCount`" }, "req": "`reqdata`", "res": "`body.disputes`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/disputes/{disputeId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb", "k": "param", "n": "id", "or": "disputeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 16605997, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/disputes/{disputeId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "disputeId": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "disputes" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["status"], "co": { "id": "PUT /spend/profiles/{profileId}/disputes/{disputeId}/status", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb", "k": "param", "n": "id", "or": "disputeId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 16605997, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/spend/profiles/{profileId}/disputes/{disputeId}/status", "q": { "$action": "status", "exist": ["id", "profile_id"] }, "r": { "param": { "disputeId": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "disputes" }, { "var": "id" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile"]] }, "key$": "dispute", "name__orig": "dispute", "Name": "Dispute", "name_": "dispute", "name-": "dispute", "NAME": "DISPUTE", "index$": 28 }, { "active": true, "entity": "dispute", "key$": "BasicDisputeFlow", "kind": "basic", "name": "BasicDisputeFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "dispute_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "dispute_ref01" } }], "index$": 1 }, { "a": true, "d": { "profile_id": "profile01" }, "i": { "ref": "dispute_ref01", "srcdatavar": "dispute_ref01_data", "suffix": "_up0", "textfield": "createdAt" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dispute_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "dispute_ref01", "srcdatavar": "dispute_ref01_data", "suffix": "_dt0" }, "m": { "id": "dispute01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-dispute_ref01" } }], "index$": 3, "route": "GET /spend/profiles/{profileId}/disputes/{disputeId}", "record": {} }] }, 'Dispute', { "POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "transaction": { "type": "object", "description": "Transaction details for the dispute.", "properties": { "transactionId": { "type": "string", "description": "ID of the transaction.", "example": "12345" }, "email": { "type": "string", "description": "Email of the support team that Wise should reach out to.", "example": "support@partner.com" } }, "key$": "transaction" }, "form": { "type": "object", "description": "Form fields required to submit this dispute. The specific fields vary per reason code.\n\nSee the [disputes via API guide](/guides/product/issue-cards/card-disputes-api#reason-examples) for per-reason field details.\n", "additionalProperties": true, "key$": "form" }, "disclaimer": { "type": "object", "description": "Acknowledgement fields.", "properties": { "allAnswered": { "type": "boolean", "description": "Acknowledgment that all questions have been answered. Must be `true` or the request will be rejected.", "example": true }, "filesUploaded": { "type": "boolean", "description": "Acknowledgment that all relevant files have been attached. Must be `true` or the request will be rejected.", "example": true } }, "key$": "disclaimer" }, "files": { "type": "object", "description": "Key-value pairs mapping file field names to file IDs obtained from the [file upload endpoint](/api-reference/disputes/disputefileupload). Available file fields vary per reason code.\n", "additionalProperties": { "type": "string" }, "key$": "files" } }, "index$": 1 }, "example": { "transaction": { "transactionId": "12345", "email": "support@partner.com" }, "form": { "charged": { "value": 50, "currency": "EUR" }, "expected": { "value": 5, "currency": "EUR" }, "agreedDetails": { "agreed": true, "agreedReason": "some reason" }, "goods": "something", "details": "wrong amount dispute" }, "disclaimer": { "allAnswered": true, "filesUploaded": true } } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Your profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 14547572, "index$": 0 }, { "name": "scheme", "in": "path", "required": true, "description": "The network of the card that was used to make this transaction.", "schema": { "type": "string", "enum": ["MASTERCARD", "VISA"] }, "example": "VISA", "index$": 1 }, { "name": "reason", "in": "path", "required": true, "description": "Dispute reason code supplied by the [dispute reasons endpoint](/api-reference/disputes/disputereasonsget).", "schema": { "type": "string" }, "example": "WRONG_AMOUNT", "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] }, "POST /spend/profiles/{profileId}/dispute-form/file": { "protocol": "http", "requestBody": { "required": true, "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "receipt": { "type": "string", "format": "binary", "description": "The file to upload.", "key$": "receipt" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Your profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 14547572, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /spend/profiles/{profileId}/disputes": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Your profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 16605997, "index$": 0 }, { "name": "status", "in": "query", "required": false, "description": "Filter by dispute status.", "schema": { "type": "string", "enum": ["ACTIVE", "CLOSED"] }, "example": "ACTIVE", "index$": 1 }, { "name": "transactionId", "in": "query", "required": false, "description": "Filter by card transaction ID.", "schema": { "type": "integer", "format": "int64" }, "example": 2040, "index$": 2 }, { "name": "pageSize", "in": "query", "required": false, "description": "The maximum number of disputes to return per page. Between 10 and 100, defaults to 10.", "schema": { "type": "integer", "format": "int32", "minimum": 10, "maximum": 100, "default": 10 }, "example": 10, "index$": 3 }, { "name": "pageNumber", "in": "query", "required": false, "description": "The page number to retrieve. Must be at least 1, defaults to 1.", "schema": { "type": "integer", "format": "int32", "minimum": 1, "default": 1 }, "example": 1, "index$": 4 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 5 }] }, "GET /spend/profiles/{profileId}/disputes/{disputeId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Your profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 16605997, "index$": 0 }, { "name": "disputeId", "in": "path", "required": true, "description": "The dispute ID.", "schema": { "type": "string" }, "example": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "PUT /spend/profiles/{profileId}/disputes/{disputeId}/status": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["status"], "properties": { "status": { "type": "string", "description": "Must be set to `CLOSED`.", "enum": ["CLOSED"], "example": "CLOSED" } } }, "example": { "status": "CLOSED" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Your profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 16605997, "index$": 0 }, { "name": "disputeId", "in": "path", "required": true, "description": "The dispute ID.", "schema": { "type": "string" }, "example": "51e2dc60-9e4b-4ff5-b917-b90cc5e1ecfb", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "dispute.create.0": "GET-only live run: needs POST /spend/profiles/{profileId}/dispute-form/flows/{scheme}/{reason}", "dispute.update.2": "GET-only live run: needs PUT /spend/profiles/{profileId}/disputes/{disputeId}/status" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const dispute_ref01_ent = client.Dispute();
        let dispute_ref01_data = setup.data.new.dispute['dispute_ref01'];
        dispute_ref01_data['profile_id'] = setup.idmap['profile01'];
        dispute_ref01_data = (await dispute_ref01_ent.create(dispute_ref01_data)).data();
        (0, node_assert_1.default)(null != dispute_ref01_data.id);
        // LIST
        const dispute_ref01_match = {};
        dispute_ref01_match['profile_id'] = setup.idmap['profile01'];
        const dispute_ref01_list = (await dispute_ref01_ent.list(dispute_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(dispute_ref01_list, { id: dispute_ref01_data.id })));
        // UPDATE
        const dispute_ref01_data_up0 = {};
        dispute_ref01_data_up0.id = dispute_ref01_data.id;
        dispute_ref01_data_up0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const dispute_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-dispute_ref01_' + setup.now };
        dispute_ref01_data_up0[dispute_ref01_markdef_up0.name] = dispute_ref01_markdef_up0.value;
        const dispute_ref01_resdata_up0 = (await dispute_ref01_ent.update(dispute_ref01_data_up0)).data();
        (0, node_assert_1.default)(dispute_ref01_resdata_up0.id === dispute_ref01_data_up0.id);
        (0, node_assert_1.default)(dispute_ref01_resdata_up0[dispute_ref01_markdef_up0.name] === dispute_ref01_markdef_up0.value);
        // LOAD
        const dispute_ref01_match_dt0 = {};
        dispute_ref01_match_dt0.id = dispute_ref01_data.id;
        dispute_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const dispute_ref01_data_dt0 = (await dispute_ref01_ent.load(dispute_ref01_match_dt0)).data();
        (0, node_assert_1.default)(dispute_ref01_data_dt0.id === dispute_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/dispute/DisputeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['dispute01', 'dispute02', 'dispute03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_DISPUTE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_DISPUTE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_DISPUTE_ENTID'];
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
//# sourceMappingURL=DisputeEntity.test.js.map