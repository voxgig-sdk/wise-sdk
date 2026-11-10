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
(0, node_test_1.describe)('BalanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Balance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Balance().list({ "profile_id": "x", "type": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'balance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "amount": { "a": true, "h": "Amount", "n": "amount", "r": false, "sh": "Available balance that can be used to fund transfers.", "t": "`$OBJECT`", "key$": "amount", "index$": 0 }, "cashAmount": { "a": true, "h": "Cash Amount", "n": "cashAmount", "r": false, "sh": "Cash amount in the account.", "t": "`$OBJECT`", "key$": "cashAmount", "index$": 1 }, "creationTime": { "a": true, "fo": "date-time", "h": "Creation Time", "n": "creationTime", "r": false, "sh": "Date when the balance was created.", "t": "`$STRING`", "key$": "creationTime", "index$": 2 }, "currency": { "a": true, "h": "Currency", "n": "currency", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Currency code (ISO 4217 Alphabetic Code).", "t": "`$STRING`", "key$": "currency", "index$": 3 }, "icon": { "a": true, "h": "Icon", "n": "icon", "r": false, "sh": "Icon for the balance.", "t": ["`$ONE`", ["`$OBJECT`", "`$NULL`"]], "key$": "icon", "index$": 4 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "Balance ID.", "t": "`$INTEGER`", "key$": "id", "index$": 5 }, "investmentState": { "a": true, "h": "Investment State", "n": "investmentState", "r": false, "sh": "Investment state of the balance.", "t": "`$STRING`", "key$": "investmentState", "index$": 6 }, "modificationTime": { "a": true, "fo": "date-time", "h": "Modification Time", "n": "modificationTime", "r": false, "sh": "Date when the balance was last modified.", "t": "`$STRING`", "key$": "modificationTime", "index$": 7 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the balance.", "t": ["`$ONE`", ["`$STRING`", "`$NULL`"]], "key$": "name", "index$": 8 }, "overdraft": { "a": true, "h": "Overdraft", "n": "overdraft", "r": false, "sh": "Overdraft details for the account.", "t": "`$OBJECT`", "key$": "overdraft", "index$": 9 }, "reservedAmount": { "a": true, "h": "Reserved Amount", "n": "reservedAmount", "r": false, "sh": "Amount reserved for transactions.", "t": "`$OBJECT`", "key$": "reservedAmount", "index$": 10 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "Must be `CLOSED`.", "t": "`$STRING`", "key$": "state", "index$": 11 }, "targetRecipientId": { "a": true, "h": "Target Recipient Id", "n": "targetRecipientId", "r": true, "sh": "ID of the recipient to receive the refund of the excess funds.", "t": "`$INTEGER`", "key$": "targetRecipientId", "index$": 12 }, "totalAvailable": { "a": true, "h": "Total Available", "n": "totalAvailable", "r": false, "sh": "Total available balance, which is the sum of cash ledger balance and any approved overdraft limit.", "t": "`$OBJECT`", "key$": "totalAvailable", "index$": 13 }, "totalCash": { "a": true, "h": "Total Cash", "n": "totalCash", "r": false, "sh": "Total cash balance across all balances, including group balances but excluding asset portfolios.", "t": "`$OBJECT`", "key$": "totalCash", "index$": 14 }, "totalWorth": { "a": true, "h": "Total Worth", "n": "totalWorth", "r": false, "sh": "Total worth of the account, including cash ledger balance and valuation of any asset portfolio if invested.", "t": "`$OBJECT`", "key$": "totalWorth", "index$": 15 }, "type": { "a": true, "h": "Type", "n": "type", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "Type of balance account.", "t": "`$STRING`", "key$": "type", "index$": 16 }, "visible": { "a": true, "h": "Visible", "n": "visible", "r": false, "sh": "Whether the balance is visible to the user.", "t": "`$BOOLEAN`", "key$": "visible", "index$": 17 } }, "id": { "field": "id", "name": "id" }, "name": "balance", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["state", "targetRecipientId"], "co": { "id": "POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "hold_limit_breach_id", "or": "holdLimitBreachId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}", "q": { "exist": ["hold_limit_breach_id", "profile_id"] }, "r": { "param": { "holdLimitBreachId": "hold_limit_breach_id", "profileId": "profile_id" } }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balances" }, { "lit": "hold-limit-breach" }, { "var": "hold_limit_breach_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["amount", "quoteId", "sourceBalanceId", "targetBalanceId"], "co": { "id": "POST /profiles/{profileId}/balance-movements", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "xidempotence_uuid", "or": "X-idempotence-uuid", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/balance-movements", "q": { "$action": "movement", "exist": ["profile_id", "xidempotence_uuid"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balance-movements" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["currency", "name", "type"], "co": { "id": "POST /profiles/{profileId}/balances", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "explode": false, "k": "header", "n": "xidempotence_uuid", "or": "X-idempotence-uuid", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/balances", "q": { "exist": ["profile_id", "xidempotence_uuid"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balances" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/balances", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": "STANDARD", "explode": true, "k": "query", "n": "type", "or": "types", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/balances", "q": { "exist": ["profile_id", "type"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balances" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/total-funds/{currency}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "EUR", "k": "param", "n": "currency", "or": "currency", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/total-funds/{currency}", "q": { "exist": ["currency", "profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "total-funds" }, { "var": "currency" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /profiles/{profileId}/balances/{balanceId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "balanceId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/balances/{balanceId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "balanceId": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /profiles/{profileId}/balances/{balanceId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "balanceId", "r": true, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/profiles/{profileId}/balances/{balanceId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "balanceId": "id", "profileId": "profile_id" } }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "balances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile", "$.main.kit.entity.hold_limit_breach"], ["$.main.kit.entity.profile"]] }, "key$": "balance", "name__orig": "balance", "Name": "Balance", "name_": "balance", "name-": "balance", "NAME": "BALANCE", "index$": 5 }, { "active": true, "entity": "balance", "key$": "BasicBalanceFlow", "kind": "basic", "name": "BasicBalanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "balance_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "balance_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "balance_ref01", "srcdatavar": "balance_ref01_data", "suffix": "_dt0" }, "m": { "id": "balance01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-balance_ref01" } }], "index$": 2, "route": "GET /profiles/{profileId}/balances/{balanceId}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "balance_ref01", "suffix": "_rm0" }, "m": { "id": "balance01", "profile_id": "profile01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "balance_ref01" } }], "index$": 4 }] }, 'Balance', { "POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["targetRecipientId", "state"], "properties": { "targetRecipientId": { "type": "integer", "description": "ID of the recipient to receive the refund of the excess funds.", "example": 148393305, "key$": "targetRecipientId" }, "state": { "type": "string", "description": "Must be `CLOSED`. This is the only supported value.", "example": "CLOSED", "key$": "state" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "holdLimitBreachId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The hold limit breach ID.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /profiles/{profileId}/balance-movements": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Request body for balance movements (conversion or transfer).", "properties": { "quoteId": { "type": "string", "format": "uuid", "description": "Quote ID. Required for cross-currency movements. Quote must be created with `payOut: BALANCE`." }, "sourceBalanceId": { "type": "integer", "format": "int64", "description": "Source balance ID. Required when moving between balances (with targetBalanceId)." }, "targetBalanceId": { "type": "integer", "format": "int64", "description": "Target balance ID. Required when moving between balances (with sourceBalanceId)." }, "amount": { "type": "object", "description": "Amount to move. Required for same-currency movements. Either `amount` or `quoteId` must be provided.", "properties": { "value": { "type": "number", "description": "Amount value." }, "currency": { "type": "string", "description": "Currency code (ISO 4217 Alphabetic Code)." } } } } }, "examples": { "conversion": { "summary": "Convert between currencies", "value": { "quoteId": "00000000-0000-0000-0000-000000000000" } }, "move": { "summary": "Move within same currency", "value": { "sourceBalanceId": 1, "targetBalanceId": 2, "amount": { "value": 100, "currency": "EUR" } } } } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "X-idempotence-uuid", "in": "header", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "Unique identifier assigned by you. Used for idempotency check purposes. Should your call fail for technical reasons then you can use the same value again for making a retry call.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /profiles/{profileId}/balances": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "description": "Request body for creating a balance account.", "required": ["currency", "type"], "properties": { "currency": { "type": "string", "description": "Currency code (ISO 4217 Alphabetic Code).", "example": "EUR", "key$": "currency" }, "type": { "type": "string", "description": "Type of balance account.\n- `STANDARD` - Standard balance account. Only one per currency per profile.\n- `SAVINGS` - Savings balance (Jar). Multiple allowed per currency.\n", "enum": ["STANDARD", "SAVINGS"], "example": "STANDARD", "x-ref": "#/components/schemas/BalanceType", "key$": "type" }, "name": { "type": "string", "description": "Name of the balance. Required for SAVINGS type balances.", "key$": "name" } }, "index$": 1 }, "example": { "currency": "EUR", "type": "STANDARD" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "X-idempotence-uuid", "in": "header", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "Unique identifier assigned by you. Used for idempotency check purposes. Should your call fail for technical reasons then you can use the same value again for making a retry call.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /profiles/{profileId}/balances": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "types", "in": "query", "required": true, "schema": { "type": "string" }, "description": "Comma-separated list of balance types to return. Acceptable values are `STANDARD` and `SAVINGS`.", "example": "STANDARD", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /profiles/{profileId}/total-funds/{currency}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "currency", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Currency code (ISO 4217 Alphabetic Code). All values will be converted to this currency.", "example": "EUR", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /profiles/{profileId}/balances/{balanceId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "balanceId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The balance ID.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "DELETE /profiles/{profileId}/balances/{balanceId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The profile ID.", "index$": 0 }, { "name": "balanceId", "in": "path", "required": true, "schema": { "type": "integer", "format": "int64" }, "description": "The balance ID.", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "balance.create.0": "GET-only live run: needs POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}", "balance.remove.3": "GET-only live run: needs DELETE /profiles/{profileId}/balances/{balanceId}", "balance.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const balance_ref01_ent = client.Balance();
        let balance_ref01_data = setup.data.new.balance['balance_ref01'];
        balance_ref01_data['profile_id'] = setup.idmap['profile01'];
        balance_ref01_data = (await balance_ref01_ent.create(balance_ref01_data)).data();
        (0, node_assert_1.default)(null != balance_ref01_data.id);
        // LIST
        const balance_ref01_match = {};
        balance_ref01_match['profile_id'] = setup.idmap['profile01'];
        const balance_ref01_list = (await balance_ref01_ent.list(balance_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(balance_ref01_list, { id: balance_ref01_data.id })));
        // LOAD
        const balance_ref01_match_dt0 = {};
        balance_ref01_match_dt0.id = balance_ref01_data.id;
        balance_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const balance_ref01_data_dt0 = (await balance_ref01_ent.load(balance_ref01_match_dt0)).data();
        (0, node_assert_1.default)(balance_ref01_data_dt0.id === balance_ref01_data.id);
        // REMOVE
        const balance_ref01_match_rm0 = { id: balance_ref01_data.id };
        balance_ref01_match_rm0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        await balance_ref01_ent.remove(balance_ref01_match_rm0);
        // LIST
        const balance_ref01_match_rt0 = {};
        balance_ref01_match_rt0['profile_id'] = setup.idmap['profile01'];
        const balance_ref01_list_rt0 = (await balance_ref01_ent.list(balance_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(balance_ref01_list_rt0, { id: balance_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/balance/BalanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['balance01', 'balance02', 'balance03', 'profile01', 'profile02', 'profile03', 'hold_limit_breach01', 'hold_limit_breach02', 'hold_limit_breach03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_BALANCE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_BALANCE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_BALANCE_ENTID'];
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
//# sourceMappingURL=BalanceEntity.test.js.map