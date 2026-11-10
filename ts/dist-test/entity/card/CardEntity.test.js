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
(0, node_test_1.describe)('CardEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Card();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Card().list({ "profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'card.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bankIdentificationNumber": { "a": true, "h": "Bank Identification Number", "n": "bankIdentificationNumber", "r": false, "sh": "Bank identification number (BIN) of the card.", "t": "`$STRING`", "key$": "bankIdentificationNumber", "index$": 0 }, "cardHolderName": { "a": true, "h": "Card Holder Name", "n": "cardHolderName", "r": false, "sh": "Name of the card holder.", "t": "`$STRING`", "key$": "cardHolderName", "index$": 1 }, "cardProgram": { "a": true, "h": "Card Program", "n": "cardProgram", "r": false, "sh": "Card program details.", "t": "`$OBJECT`", "key$": "cardProgram", "index$": 2 }, "clientId": { "a": true, "h": "Client Id", "n": "clientId", "r": false, "sh": "Client ID of the partner that issued the card.", "t": "`$STRING`", "key$": "clientId", "index$": 3 }, "creationTime": { "a": true, "fo": "date-time", "h": "Creation Time", "n": "creationTime", "r": false, "sh": "Time when the card was created.", "t": "`$STRING`", "key$": "creationTime", "index$": 4 }, "expiryDate": { "a": true, "fo": "date-time", "h": "Expiry Date", "n": "expiryDate", "r": false, "sh": "Date when the card will expire.", "t": "`$STRING`", "key$": "expiryDate", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "syn": true, "t": "`$STRING`", "key$": "id", "index$": 6 }, "lastFourDigits": { "a": true, "h": "Last Four Digits", "n": "lastFourDigits", "r": false, "sh": "Last 4 digits of the card number.", "t": "`$STRING`", "key$": "lastFourDigits", "index$": 7 }, "modificationTime": { "a": true, "fo": "date-time", "h": "Modification Time", "n": "modificationTime", "r": false, "sh": "Time when the card was last modified.", "t": "`$STRING`", "key$": "modificationTime", "index$": 8 }, "phoneNumber": { "a": true, "h": "Phone Number", "n": "phoneNumber", "r": false, "sh": "Phone number associated with the card.", "t": "`$STRING`", "key$": "phoneNumber", "index$": 9 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": false, "sh": "Profile ID that owns this card.", "t": "`$INTEGER`", "key$": "profileId", "index$": 10 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "Current status of the card.", "t": "`$OBJECT`", "key$": "status", "index$": 11 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "Unique identifier for the card.", "t": "`$STRING`", "key$": "token", "index$": 12 }, "unlockSpendingPermissions": { "a": true, "h": "Unlock Spending Permissions", "n": "unlockSpendingPermissions", "r": false, "sh": "Method with which physical card spending permissions can be unlocked.", "t": "`$STRING`", "key$": "unlockSpendingPermissions", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "card", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count", "q": { "$action": "reset_pin_count", "exist": ["card_token", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "reset-pin-count" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions", "q": { "$action": "spending_permission", "exist": ["card_token", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "spending-permissions" }], "t": { "req": "`reqdata`", "res": "`body.permissions`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /spend/profiles/{profileId}/cards", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page_number", "or": "pageNumber", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 10, "explode": true, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/cards", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }], "t": { "page": { "total": "`body.totalCount`" }, "req": "`reqdata`", "res": "`body.cards`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /spend/profiles/{profileId}/cards/{cardToken}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "k": "param", "n": "id", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/spend/profiles/{profileId}/cards/{cardToken}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "cardToken": "id", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["permissions"], "co": { "id": "PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PATCH", "o": "/spend/profiles/{profileId}/cards/{cardToken}/spending-permissions", "q": { "$action": "spending_permission", "exist": ["card_token", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "spending-permissions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["status"], "co": { "id": "PUT /spend/profiles/{profileId}/cards/{cardToken}/status", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 123456, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "PUT", "o": "/spend/profiles/{profileId}/cards/{cardToken}/status", "q": { "$action": "status", "exist": ["card_token", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "status" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"], ["$.main.kit.entity.profile"]] }, "key$": "card", "name__orig": "card", "Name": "Card", "name_": "card", "name-": "card", "NAME": "CARD", "index$": 11 }, { "active": true, "entity": "card", "key$": "BasicCardFlow", "kind": "basic", "name": "BasicCardFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "card_ref01" }, "m": { "card_token": "card_token01", "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "card_ref01" } }], "index$": 1 }, { "a": false, "d": { "profile_id": "profile01" }, "i": { "ref": "card_ref01", "srcdatavar": "card_ref01_data", "suffix": "_up0", "textfield": "bankIdentificationNumber" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_ref01" } }], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "card_ref01", "srcdatavar": "card_ref01_data", "suffix": "_dt0" }, "m": { "id": "card01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-card_ref01" } }], "index$": 2, "route": "GET /spend/profiles/{profileId}/cards/{cardToken}", "record": {} }] }, 'Card', { "POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /spend/profiles/{profileId}/cards": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile to retrieve cards for.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "pageSize", "in": "query", "required": false, "description": "The maximum number of cards to return per page. Must be between 10 and 100.", "schema": { "type": "integer", "format": "int64", "minimum": 10, "maximum": 100, "default": 10 }, "example": 10, "index$": 1 }, { "name": "pageNumber", "in": "query", "required": false, "description": "The page number to retrieve. Must be greater than or equal to 1.", "schema": { "type": "integer", "format": "int64", "minimum": 1, "default": 1 }, "example": 1, "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] }, "GET /spend/profiles/{profileId}/cards/{cardToken}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["permissions"], "properties": { "permissions": { "type": "array", "uniqueItems": true, "maxItems": 6, "description": "List of permissions to update.", "items": { "type": "object", "description": "Spending permission configuration for a card.", "x-tags": ["card"], "required": ["type", "isEnabled"], "properties": { "type": { "type": "string", "description": "The type of transaction this permission controls.\n\nPermissions available on all cards:\n- `ECOM` - Online transactions\n- `ATM_WITHDRAWAL` - ATM withdrawals\n- `MOBILE_WALLETS` - Digital wallet payments (Apple Pay, Google Pay)\n\nAdditional permissions available on physical cards:\n- `POS_MAGSTRIPE` - Physical point-of-sale transactions with magnetic stripe\n- `POS_CONTACTLESS` - Physical point-of-sale contactless transactions\n- `POS_CHIP` - Physical point-of-sale transactions with chip\n\nVirtual cards do not return physical point-of-sale permissions. Only permissions returned for the card can be updated.\n", "enum": [], "example": "ECOM" }, "isEnabled": { "type": "boolean", "description": "Indicates if this permission type is enabled.", "example": false }, "isLocked": { "type": "boolean", "readOnly": true, "description": "Indicates if this permission is locked. If `true`, this permission cannot be updated.", "example": false } }, "x-ref": "#/components/schemas/Permission" } } } }, "example": { "permissions": [{ "type": "ECOM", "isEnabled": true }, { "type": "POS_CHIP", "isEnabled": true }] } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "PUT /spend/profiles/{profileId}/cards/{cardToken}/status": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["status"], "properties": { "status": { "type": "string", "description": "The status to update the card to.", "enum": ["ACTIVE", "FROZEN", "BLOCKED"], "example": "ACTIVE" } } }, "example": { "status": "ACTIVE" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The ID of the profile that owns the card.", "schema": { "type": "integer", "format": "int64" }, "example": 123456, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The unique token identifying the card.", "schema": { "type": "string", "format": "uuid" }, "example": "ca0c8154-1e14-4464-a1ce-dcea7dc3de52", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "card.create.0": "GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/reset-pin-count", "card.update.2": "GET-only live run: needs PATCH /spend/profiles/{profileId}/cards/{cardToken}/spending-permissions" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const card_ref01_ent = client.Card();
        let card_ref01_data = setup.data.new.card['card_ref01'];
        card_ref01_data['card_token'] = setup.idmap['card_token01'];
        card_ref01_data['profile_id'] = setup.idmap['profile01'];
        card_ref01_data = (await card_ref01_ent.create(card_ref01_data)).data();
        (0, node_assert_1.default)(null != card_ref01_data.id);
        // LIST
        const card_ref01_match = {};
        card_ref01_match['profile_id'] = setup.idmap['profile01'];
        const card_ref01_list = (await card_ref01_ent.list(card_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(card_ref01_list, { id: card_ref01_data.id })));
        // LOAD
        const card_ref01_match_dt0 = {};
        card_ref01_match_dt0.id = card_ref01_data.id;
        card_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const card_ref01_data_dt0 = (await card_ref01_ent.load(card_ref01_match_dt0)).data();
        (0, node_assert_1.default)(card_ref01_data_dt0.id === card_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/card/CardTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['card01', 'card02', 'card03', 'profile01', 'profile02', 'profile03', 'card_token01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_CARD_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_CARD_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_CARD_ENTID'];
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
//# sourceMappingURL=CardEntity.test.js.map