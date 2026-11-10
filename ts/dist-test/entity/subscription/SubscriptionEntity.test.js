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
(0, node_test_1.describe)('SubscriptionEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Subscription();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Subscription().list({ "client_key": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'subscription.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "fo": "date-time", "h": "Created At", "n": "created_at", "r": false, "sh": "Timestamp of when the subscription was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "created_by": { "a": true, "h": "Created By", "n": "created_by", "r": false, "t": "`$OBJECT`", "key$": "created_by", "index$": 1 }, "delivery": { "a": true, "h": "Delivery", "n": "delivery", "op": { "create": { "req": true, "type": "`$OBJECT`" } }, "r": false, "t": "`$OBJECT`", "key$": "delivery", "index$": 2 }, "id": { "a": true, "fo": "uuid", "h": "Id", "n": "id", "r": false, "sh": "UUID that uniquely identifies the subscription.", "t": "`$STRING`", "key$": "id", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "A custom name for your webhook to ease with identification.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": false, "t": "`$OBJECT`", "key$": "scope", "index$": 5 }, "trigger_on": { "a": true, "h": "Trigger On", "n": "trigger_on", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The event type this subscription is listening for.", "t": "`$STRING`", "key$": "trigger_on", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "subscription", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["delivery", "name", "trigger_on"], "co": { "id": "POST /applications/{clientKey}/subscriptions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "client_key", "or": "clientKey", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/applications/{clientKey}/subscriptions", "q": { "exist": ["client_key"] }, "r": { "param": { "clientKey": "client_key" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "applications" }, { "var": "client_key" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["delivery", "name", "trigger_on"], "co": { "id": "POST /profiles/{profileId}/subscriptions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/subscriptions", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /applications/{clientKey}/subscriptions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "client_key", "or": "clientKey", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/applications/{clientKey}/subscriptions", "q": { "exist": ["client_key"] }, "r": { "param": { "clientKey": "client_key" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "applications" }, { "var": "client_key" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /profiles/{profileId}/subscriptions", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/subscriptions", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "subscriptions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /applications/{clientKey}/subscriptions/{subscriptionId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "client_key", "or": "clientKey", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "subscriptionId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/applications/{clientKey}/subscriptions/{subscriptionId}", "q": { "exist": ["client_key", "id"] }, "r": { "param": { "clientKey": "client_key", "subscriptionId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "applications" }, { "var": "client_key" }, { "lit": "subscriptions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /profiles/{profileId}/subscriptions/{subscriptionId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "subscriptionId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/subscriptions/{subscriptionId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "subscriptionId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "subscriptions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /applications/{clientKey}/subscriptions/{subscriptionId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "client_key", "or": "clientKey", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "subscriptionId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/applications/{clientKey}/subscriptions/{subscriptionId}", "q": { "exist": ["client_key", "id"] }, "r": { "param": { "clientKey": "client_key", "subscriptionId": "id" } }, "s": [{ "lit": "applications" }, { "var": "client_key" }, { "lit": "subscriptions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /profiles/{profileId}/subscriptions/{subscriptionId}", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "id", "or": "subscriptionId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/profiles/{profileId}/subscriptions/{subscriptionId}", "q": { "exist": ["id", "profile_id"] }, "r": { "param": { "profileId": "profile_id", "subscriptionId": "id" } }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "subscriptions" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "subscription", "name__orig": "subscription", "Name": "Subscription", "name_": "subscription", "name-": "subscription", "NAME": "SUBSCRIPTION", "index$": 67 }, { "active": true, "entity": "subscription", "key$": "BasicSubscriptionFlow", "kind": "basic", "name": "BasicSubscriptionFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "subscription_ref01" }, "m": { "client_key": "client_key01", "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "subscription_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "subscription_ref01", "srcdatavar": "subscription_ref01_data", "suffix": "_dt0" }, "m": { "id": "subscription01", "profile_id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-subscription_ref01" } }], "index$": 2, "route": "GET /profiles/{profileId}/subscriptions/{subscriptionId}", "record": {} }, { "a": true, "d": {}, "i": { "ref": "subscription_ref01", "suffix": "_rm0" }, "m": { "id": "subscription01", "profile_id": "profile01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "subscription_ref01" } }], "index$": 4 }] }, 'Subscription', { "POST /applications/{clientKey}/subscriptions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "title": "Subscription Request", "type": "object", "required": ["name", "trigger_on", "delivery"], "properties": { "name": { "type": "string", "description": "A custom name for your webhook to ease with identification.", "example": "Webhook Subscription #1", "key$": "name" }, "trigger_on": { "type": "string", "description": "[Choose from a list of available events](/api-reference/webhook-event).\n", "example": "transfers#state-change", "key$": "trigger_on" }, "delivery": { "type": "object", "required": ["version", "url"], "properties": { "version": { "type": "string", "description": "The event representation semantic version.", "example": "4.0.0" }, "url": { "type": "string", "description": "The URL where your server will be listening for events.", "example": "https://your.webhook.url/12345" } }, "key$": "delivery" } }, "x-ref": "#/components/schemas/subscription-request", "index$": 1 } } } }, "parameters": [{ "name": "clientKey", "in": "path", "required": true, "description": "Your application's client key.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /profiles/{profileId}/subscriptions": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "title": "Subscription Request", "type": "object", "required": ["name", "trigger_on", "delivery"], "properties": { "name": { "type": "string", "description": "A custom name for your webhook to ease with identification.", "example": "Webhook Subscription #1", "key$": "name" }, "trigger_on": { "type": "string", "description": "[Choose from a list of available events](/api-reference/webhook-event).\n", "example": "transfers#state-change", "key$": "trigger_on" }, "delivery": { "type": "object", "required": ["version", "url"], "properties": { "version": { "type": "string", "description": "The event representation semantic version.", "example": "4.0.0" }, "url": { "type": "string", "description": "The URL where your server will be listening for events.", "example": "https://your.webhook.url/12345" } }, "key$": "delivery" } }, "x-ref": "#/components/schemas/subscription-request", "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "ID of the profile you are subscribing to.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /applications/{clientKey}/subscriptions": { "protocol": "http", "parameters": [{ "name": "clientKey", "in": "path", "required": true, "description": "Your application's client key.", "schema": { "type": "string" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /profiles/{profileId}/subscriptions": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "ID of the profile.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /applications/{clientKey}/subscriptions/{subscriptionId}": { "protocol": "http", "parameters": [{ "name": "clientKey", "in": "path", "required": true, "description": "Your application's client key.", "schema": { "type": "string" }, "index$": 0 }, { "name": "subscriptionId", "in": "path", "required": true, "description": "UUID of the subscription.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /profiles/{profileId}/subscriptions/{subscriptionId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "ID of the profile.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "subscriptionId", "in": "path", "required": true, "description": "UUID of the subscription.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "DELETE /applications/{clientKey}/subscriptions/{subscriptionId}": { "protocol": "http", "parameters": [{ "name": "clientKey", "in": "path", "required": true, "description": "Your application's client key.", "schema": { "type": "string" }, "index$": 0 }, { "name": "subscriptionId", "in": "path", "required": true, "description": "UUID of the subscription.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "DELETE /profiles/{profileId}/subscriptions/{subscriptionId}": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "ID of the profile.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "name": "subscriptionId", "in": "path", "required": true, "description": "UUID of the subscription.", "schema": { "type": "string", "format": "uuid" }, "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "subscription.create.0": "GET-only live run: needs POST /applications/{clientKey}/subscriptions", "subscription.remove.3": "GET-only live run: needs DELETE /applications/{clientKey}/subscriptions/{subscriptionId}", "subscription.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const subscription_ref01_ent = client.Subscription();
        let subscription_ref01_data = setup.data.new.subscription['subscription_ref01'];
        subscription_ref01_data['client_key'] = setup.idmap['client_key01'];
        subscription_ref01_data['profile_id'] = setup.idmap['profile01'];
        subscription_ref01_data = (await subscription_ref01_ent.create(subscription_ref01_data)).data();
        (0, node_assert_1.default)(null != subscription_ref01_data.id);
        // LIST
        const subscription_ref01_match = {};
        subscription_ref01_match['profile_id'] = setup.idmap['profile01'];
        const subscription_ref01_list = (await subscription_ref01_ent.list(subscription_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(subscription_ref01_list, { id: subscription_ref01_data.id })));
        // LOAD
        const subscription_ref01_match_dt0 = {};
        subscription_ref01_match_dt0.id = subscription_ref01_data.id;
        subscription_ref01_match_dt0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data();
        (0, node_assert_1.default)(subscription_ref01_data_dt0.id === subscription_ref01_data.id);
        // REMOVE
        const subscription_ref01_match_rm0 = { id: subscription_ref01_data.id };
        subscription_ref01_match_rm0['profile_id'] = setup.idmap['profile_id'] ?? setup.idmap['profile01'];
        await subscription_ref01_ent.remove(subscription_ref01_match_rm0);
        // LIST
        const subscription_ref01_match_rt0 = {};
        subscription_ref01_match_rt0['profile_id'] = setup.idmap['profile01'];
        const subscription_ref01_list_rt0 = (await subscription_ref01_ent.list(subscription_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(subscription_ref01_list_rt0, { id: subscription_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/subscription/SubscriptionTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['subscription01', 'subscription02', 'subscription03', 'profile01', 'profile02', 'profile03', 'client_key01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_SUBSCRIPTION_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_SUBSCRIPTION_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_SUBSCRIPTION_ENTID'];
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
//# sourceMappingURL=SubscriptionEntity.test.js.map