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
(0, node_test_1.describe)('JoseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Jose();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Jose().load({ "algorithm": 1, "scope": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'jose.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "keyId": { "a": true, "fo": "UUID", "h": "Key Id", "n": "keyId", "r": false, "sh": "ID of the key in UUID format.", "t": "`$STRING`", "key$": "keyId", "index$": 0 }, "keyMaterial": { "a": true, "h": "Key Material", "n": "keyMaterial", "r": false, "t": "`$OBJECT`", "key$": "keyMaterial", "index$": 1 }, "publicKeyMaterial": { "a": true, "h": "Public Key Material", "n": "publicKeyMaterial", "r": false, "t": "`$OBJECT`", "key$": "publicKeyMaterial", "index$": 2 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": false, "sh": "Scope of the key.", "t": "`$STRING`", "key$": "scope", "index$": 3 }, "validFrom": { "a": true, "h": "Valid From", "n": "validFrom", "r": false, "sh": "The key is valid from this date.", "t": "`$STRING`", "key$": "validFrom", "index$": 4 }, "validTill": { "a": true, "h": "Valid Till", "n": "validTill", "r": false, "sh": "The key is valid until this date.", "t": "`$STRING`", "key$": "validTill", "index$": 5 }, "version": { "a": true, "fo": "int32", "h": "Version", "n": "version", "r": false, "sh": "Version of the public key issued.", "t": "`$INTEGER`", "key$": "version", "index$": 6 } }, "name": "jose", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": false, "co": { "id": "POST /auth/jose/playground/jwsjwe", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "identity", "explode": false, "k": "header", "n": "accept_encoding", "or": "Accept-Encoding", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "2333836d-2e1c-4acd-8b52-234d379260aa", "explode": false, "k": "header", "n": "x_tw_jose_encryption_kid", "or": "X-TW-JOSE-Encryption-kid", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "jws+jwe", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "POST", "o": "/auth/jose/playground/jwsjwe", "q": { "exist": ["x_tw_jose_encryption_kid", "x_tw_jose_method"] }, "r": {}, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jwsjwe" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": false, "co": { "id": "POST /auth/jose/playground/jwe", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "jwe", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/auth/jose/playground/jwe", "q": { "exist": ["x_tw_jose_method"] }, "r": {}, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jwe" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": false, "co": { "id": "POST /auth/jose/playground/jwe-direct-encryption", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "jwe", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/auth/jose/playground/jwe-direct-encryption", "q": { "exist": ["x_tw_jose_method"] }, "r": {}, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jwe-direct-encryption" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": false, "co": { "id": "POST /auth/jose/playground/jws", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "jws", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/auth/jose/playground/jws", "q": { "exist": ["x_tw_jose_method"] }, "r": {}, "rb": { "kind": "json", "media": "application/jose+json" }, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jws" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }, { "a": true, "bf": ["keyId", "publicKeyMaterial", "scope", "validFrom", "validTill"], "co": { "id": "POST /auth/jose/request/public-keys", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/auth/jose/request/public-keys", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "request" }, { "lit": "public-keys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 4 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /auth/jose/response/public-keys", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": "ES512", "explode": true, "k": "query", "n": "algorithm", "or": "algorithm", "r": true, "style": "form", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "PAYLOAD_SIGNING", "explode": true, "k": "query", "n": "scope", "or": "scope", "r": true, "style": "form", "t": "`$STRING`", "index$": 1 }, { "a": true, "explode": true, "k": "query", "n": "version", "or": "version", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/auth/jose/response/public-keys", "q": { "exist": ["algorithm", "scope"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "response" }, { "lit": "public-keys" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /auth/jose/playground/jwe", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2333836d-2e1c-4acd-8b52-234d379260aa", "explode": false, "k": "header", "n": "x_tw_jose_encryption_kid", "or": "x-tw-jose-encryption-kid", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "jwe", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/auth/jose/playground/jwe", "q": { "exist": ["x_tw_jose_encryption_kid", "x_tw_jose_method"] }, "r": {}, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jwe" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "GET /auth/jose/playground/jwsjwe", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "2333836d-2e1c-4acd-8b52-234d379260aa", "explode": false, "k": "header", "n": "x_tw_jose_encryption_kid", "or": "X-TW-JOSE-Encryption-kid", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "jws+jwe", "explode": false, "k": "header", "n": "x_tw_jose_method", "or": "x-tw-jose-method", "r": true, "style": "simple", "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/auth/jose/playground/jwsjwe", "q": { "exist": ["x_tw_jose_encryption_kid", "x_tw_jose_method"] }, "r": {}, "rs": { "kind": "json", "media": "application/jose+json" }, "s": [{ "lit": "auth" }, { "lit": "jose" }, { "lit": "playground" }, { "lit": "jwsjwe" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "jose", "name__orig": "jose", "Name": "Jose", "name_": "jose", "name-": "jose", "NAME": "JOSE", "index$": 35 }, { "active": true, "entity": "jose", "key$": "BasicJoseFlow", "kind": "basic", "name": "BasicJoseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "jose_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "jose_ref01", "srcdatavar": "jose_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-jose_ref01" } }], "index$": 1 }] }, 'Jose', { "POST /auth/jose/playground/jwsjwe": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "JWE-encoded string containing a signed JWS. The payload before signing and encryption should contain a `message` field with any text.\n\nOriginal payload:\n```json\n{\"message\": \"This is an example from docs.wise.com\"}\n```\n\nEncoded (JWS+JWE):\n```\neyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.W0fuxaZOoyaBcxWwgtjEPkOnLdVNyH9ncZi5Y9xQbjD4sYJn8vEQmxKHDw5s14sWhdexSNAPTVMSyzwJaA-LRL0tZTEuQ.ohD4LLjImiKOV4Tu.Rgp9mc2JD6m9Zm5htSqrejwWYy0_hIylYdLD39ZCR-VnQ2VX-Tot8kKGeNncnv7hJ_ApANWiJpKJbiM.5hNt-uaxuOkOraGGZSmsig\n```\n", "index$": 1 }, "example": "eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.W0fuxaZOoyaBcxWwgtjEPkOnLdVNyH9ncZi5Y9xQbjD4sYJn8vEQmxKHDw5s14sWhdexSNAPTVMSyzwJaA-LRL0tZTEuQ.ohD4LLjImiKOV4Tu.Rgp9mc2JD6m9Zm5htSqrejwWYy0_hIylYdLD39ZCR-VnQ2VX-Tot8kKGeNncnv7hJ_ApANWiJpKJbiM.5hNt-uaxuOkOraGGZSmsig" } } }, "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jws+jwe"] }, "example": "jws+jwe", "index$": 0 }, { "name": "Accept-Encoding", "in": "header", "required": false, "description": "Disables response compression so the encrypted response can be processed correctly.", "schema": { "type": "string", "enum": ["identity"] }, "example": "identity", "index$": 1 }, { "name": "X-TW-JOSE-Encryption-kid", "in": "header", "required": true, "description": "ID of the public JWE key uploaded to Wise for encrypting the response.", "schema": { "type": "string", "format": "uuid" }, "example": "2333836d-2e1c-4acd-8b52-234d379260aa", "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] }, "POST /auth/jose/playground/jwe": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "JWE-encoded string. The payload before encryption should contain a `message` field with any text.\n\nOriginal payload:\n```json\n{\"message\": \"This is an example from docs.wise.com\"}\n```\n\nEncoded (JWE):\n```\neyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.W_WPBDXclMryaywqAB-_yC1hUYukKmZxByhE9d1G8hClc2HpewkryILGJW4uVTUeRdo1oVWd68TPIqi7bqMGUsrT-3MI4ggVSjC1rf8Lf1xTZ8-GHjSPso8tFBXnydOKzggi6fnfk98BIW76Rnxkn6sW79LH5NgN1spTOoh8-tI3i_wbHdqJOxTReaUNMYZobm7wxedZcRxhsaSrVqx2qdELeqkfwgvB1DRbHTF_PTe4W0ibMbcJivHjiDf6oAV9vXgVhYb66rhB43pgdFDv4nY1mkQC45R5T6CBdzv80EdAVOj1G4bktHyJWaJzHVsGozpxsNj3bt1AopyvDO8tsw.WLOO5WH4ZpBPi-8B.0g3eUpQPvRIaTbgUi6sH0WejsJ1nLWDGnDKTktZrkquLQlCMmIguj0I5UCyqXEo.URtTniRvfGxrKRLK63trug\n```\n", "index$": 1 }, "example": "eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.W_WPBDXclMryaywqAB-_yC1hUYukKmZxByhE9d1G8hClc2HpewkryILGJW4uVTUeRdo1oVWd68TPIqi7bqMGUsrT-3MI4ggVSjC1rf8Lf1xTZ8-GHjSPso8tFBXnydOKzggi6fnfk98BIW76Rnxkn6sW79LH5NgN1spTOoh8-tI3i_wbHdqJOxTReaUNMYZobm7wxedZcRxhsaSrVqx2qdELeqkfwgvB1DRbHTF_PTe4W0ibMbcJivHjiDf6oAV9vXgVhYb66rhB43pgdFDv4nY1mkQC45R5T6CBdzv80EdAVOj1G4bktHyJWaJzHVsGozpxsNj3bt1AopyvDO8tsw.WLOO5WH4ZpBPi-8B.0g3eUpQPvRIaTbgUi6sH0WejsJ1nLWDGnDKTktZrkquLQlCMmIguj0I5UCyqXEo.URtTniRvfGxrKRLK63trug" } } }, "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jwe"] }, "example": "jwe", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /auth/jose/playground/jwe-direct-encryption": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "JWE-encoded string. The payload before encryption should contain a `message` field with any text.\n\nOriginal payload:\n```json\n{\"message\": \"This is an example from docs.wise.com\"}\n```\n\nEncoded (JWE):\n```\neyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.rVqOhX92u637hqwrw96rqA48e7NhMZVeWvUZwA4OAwOa_sBVcpXecd6qivPfZ-CuhRaD4gNKUlUJnTedBwOh5hcDZELRWThtwNiTZKaDS_ZNDjJf1r0VQPj65nT2ikfPAP-S6cYCy6JbWXivf7Jwq6lus-QydmxoLlVRvAuROFe-HzlH0-JhlwOdhPwbwl1AGx64qEir7oOn5VezJvpx3sscipm3w30mfoFc7pLlscMijMNFUwngXCLmgpno1rC_ZDzRcEycVbwvgKW75jO25UyEJif25MdE0UJUx4IT6MDviHqtBXO4OQpwhd_W6jVk-PlZ1WkZyOZqpi8HLKGo8Q.eFHqPV-mcBC82Ga2.W9o2BT7Q-vEUA2u3n4gaSdfQY_4svVj0-jwjcXmlBraZEKmtTW_A1ygvr8b9iHfS9fkxL8H_6S_oEcqzFqTKmNTzwe2V0cRY-kvzsKI.lO2gETmo2WocPZoTpU-pkQ\n```\n", "index$": 1 }, "example": "eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.rVqOhX92u637hqwrw96rqA48e7NhMZVeWvUZwA4OAwOa_sBVcpXecd6qivPfZ-CuhRaD4gNKUlUJnTedBwOh5hcDZELRWThtwNiTZKaDS_ZNDjJf1r0VQPj65nT2ikfPAP-S6cYCy6JbWXivf7Jwq6lus-QydmxoLlVRvAuROFe-HzlH0-JhlwOdhPwbwl1AGx64qEir7oOn5VezJvpx3sscipm3w30mfoFc7pLlscMijMNFUwngXCLmgpno1rC_ZDzRcEycVbwvgKW75jO25UyEJif25MdE0UJUx4IT6MDviHqtBXO4OQpwhd_W6jVk-PlZ1WkZyOZqpi8HLKGo8Q.eFHqPV-mcBC82Ga2.W9o2BT7Q-vEUA2u3n4gaSdfQY_4svVj0-jwjcXmlBraZEKmtTW_A1ygvr8b9iHfS9fkxL8H_6S_oEcqzFqTKmNTzwe2V0cRY-kvzsKI.lO2gETmo2WocPZoTpU-pkQ" } } }, "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jwe"] }, "example": "jwe", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /auth/jose/playground/jws": { "protocol": "http", "requestBody": { "required": true, "content": { "application/jose+json": { "schema": { "type": "string", "description": "JWS-encoded string. The payload before signing should contain a `message` field with any text.\n\nOriginal payload:\n```json\n{\"message\": \"This is an example from docs.wise.com\"}\n```\n\nEncoded (JWS):\n```\neyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsInVybCI6Ii92MS9hdXRoL2pvc2UvcGxheWdyb3VuZC9qd3MifQ.eyJtZXNzYWdlIjoiVGhpcyBpcyBhbiBleGFtcGxlIGZyb20gZG9jcy53aXNlLmNvbSJ9.AS9QHdkWvUEn0LxQEMPRBzlceN78J-Le-Qm1XIkkSBpsGdc0WM0MZTIGFEAJEcWeUR2M-abtd5DRdar4hLzs9apPAQ-GT70SIDV6pX9-4UKfIfzJ4g305zCoHflTfn-ijvI7XrVR_yr7xO9GJo86bfBqAX_m5uuxyU7Jy9gM1epd8HcC\n```\n", "index$": 1 }, "example": "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCIsInVybCI6Ii92MS9hdXRoL2pvc2UvcGxheWdyb3VuZC9qd3MifQ.eyJtZXNzYWdlIjoiVGhpcyBpcyBhbiBleGFtcGxlIGZyb20gZG9jcy53aXNlLmNvbSJ9.AS9QHdkWvUEn0LxQEMPRBzlceN78J-Le-Qm1XIkkSBpsGdc0WM0MZTIGFEAJEcWeUR2M-abtd5DRdar4hLzs9apPAQ-GT70SIDV6pX9-4UKfIfzJ4g305zCoHflTfn-ijvI7XrVR_yr7xO9GJo86bfBqAX_m5uuxyU7Jy9gM1epd8HcC" } } }, "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jws"] }, "example": "jws", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /auth/jose/request/public-keys": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "keyId": { "type": "string", "format": "uuid", "description": "Unique public key identifier in UUID format.", "key$": "keyId" }, "validFrom": { "type": "string", "description": "The key is valid from this date. Format: `yyyy-MM-dd HH:mm:ss` (UTC).", "key$": "validFrom" }, "validTill": { "type": "string", "description": "The key is valid until this date. Format: `yyyy-MM-dd HH:mm:ss` (UTC).", "key$": "validTill" }, "scope": { "type": "string", "description": "Scope of the payload operation.", "enum": ["PAYLOAD_SIGNING", "PAYLOAD_ENCRYPTION"], "key$": "scope" }, "publicKeyMaterial": { "type": "object", "properties": { "algorithm": { "type": "string", "description": "Algorithm to be used for:\n- Signature verification (Scope: `PAYLOAD_SIGNING`): `ES256`, `ES384`, `ES512`, `PS256`, `PS384`, `PS512`\n- Payload encryption (Scope: `PAYLOAD_ENCRYPTION`): `RSA_OAEP_256`\n", "enum": ["ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "RSA_OAEP_256"] }, "keyMaterial": { "type": "string", "description": "Public key material in DER (Distinguished Encoding Rules) format and base64 encoded." } }, "key$": "publicKeyMaterial" } }, "index$": 1 }, "example": { "keyId": "e87da464-8e5e-4380-8f2d-4e4e04052672", "scope": "PAYLOAD_SIGNING", "validFrom": "2023-04-27 00:00:00", "validTill": "2024-04-01 00:00:00", "publicKeyMaterial": { "algorithm": "ES512", "keyMaterial": "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQBYAwVICxD0Paq7MOuO34omujHxSrQXZtiTQ/VMteqAeUfM4wE+vTSpbYCqb1pNhhcQpF+FJd2H8jB1H1zil7qLLcBw+yl4PrnLza1pmNLr+kqQVoVXVyVx/xxMK2WObLn8tHxXtW4k+bm1/ySF+0RQ265IZcw2i8YYX2FY59JkwE2Fac=" } } } } }, "parameters": [{ "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 0 }] }, "GET /auth/jose/response/public-keys": { "protocol": "http", "parameters": [{ "name": "version", "in": "query", "required": false, "description": "Fetch a specific public key version. If omitted the most recent public key is provided.", "schema": { "type": "integer", "format": "int32" }, "index$": 0 }, { "name": "algorithm", "in": "query", "required": true, "description": "Algorithm to be used for signature verification or payload encryption. This must match the algorithm used during request.\n\n- Signature verification (Scope: `PAYLOAD_SIGNING`): `ES256`, `ES384`, `ES512`, `PS256`, `PS384`, `PS512`\n- Payload encryption (Scope: `PAYLOAD_ENCRYPTION`): `RSA_OAEP_256`\n", "schema": { "type": "string", "enum": ["ES256", "ES384", "ES512", "PS256", "PS384", "PS512", "RSA_OAEP_256"] }, "example": "ES512", "index$": 1 }, { "name": "scope", "in": "query", "required": true, "description": "Scope of the key. Must be `PAYLOAD_SIGNING` or `PAYLOAD_ENCRYPTION`.", "schema": { "type": "string", "enum": ["PAYLOAD_SIGNING", "PAYLOAD_ENCRYPTION"] }, "example": "PAYLOAD_SIGNING", "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] }, "GET /auth/jose/playground/jwe": { "protocol": "http", "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jwe"] }, "example": "jwe", "index$": 0 }, { "name": "x-tw-jose-encryption-kid", "in": "header", "required": true, "description": "Public Key ID of JWE Encryption Key", "schema": { "type": "string" }, "example": "2333836d-2e1c-4acd-8b52-234d379260aa", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "GET /auth/jose/playground/jwsjwe": { "protocol": "http", "parameters": [{ "name": "x-tw-jose-method", "in": "header", "required": true, "description": "JOSE method identifier.", "schema": { "type": "string", "enum": ["jws+jwe"] }, "example": "jws+jwe", "index$": 0 }, { "name": "X-TW-JOSE-Encryption-kid", "in": "header", "required": true, "description": "ID of the public JWE key uploaded to Wise for encrypting the response.", "schema": { "type": "string", "format": "uuid" }, "example": "2333836d-2e1c-4acd-8b52-234d379260aa", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "jose.create.0": "GET-only live run: needs POST /auth/jose/playground/jwsjwe" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const jose_ref01_ent = client.Jose();
        let jose_ref01_data = setup.data.new.jose['jose_ref01'];
        jose_ref01_data = (await jose_ref01_ent.create(jose_ref01_data)).data();
        (0, node_assert_1.default)(null != jose_ref01_data);
        // LOAD
        const jose_ref01_match_dt0 = {};
        const jose_ref01_data_dt0 = (await jose_ref01_ent.load(jose_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != jose_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/jose/JoseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['jose01', 'jose02', 'jose03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_JOSE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_JOSE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_JOSE_ENTID'];
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
//# sourceMappingURL=JoseEntity.test.js.map