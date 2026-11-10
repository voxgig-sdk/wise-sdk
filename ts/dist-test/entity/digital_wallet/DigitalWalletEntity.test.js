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
(0, node_test_1.describe)('DigitalWalletEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.DigitalWallet();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DigitalWallet().create({ "activation": 1, "certificates": "x", "clientDeviceId": "x", "clientWalletAccountId": "x", "nonce": "x", "nonceSignature": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'digital_wallet.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "activation": { "a": true, "h": "Activation", "n": "activation", "r": true, "sh": "Approve or decline a payment token activation", "t": "`$STRING`", "key$": "activation", "index$": 0 }, "activationData": { "a": true, "h": "Activation Data", "n": "activationData", "r": false, "sh": "Encrypted activation data following card scheme and wallet provider specifications.", "t": "`$STRING`", "key$": "activationData", "index$": 1 }, "cardDisplayName": { "a": true, "h": "Card Display Name", "n": "cardDisplayName", "r": false, "sh": "Default card name that will be displayed in wallet.", "t": "`$STRING`", "key$": "cardDisplayName", "index$": 2 }, "cardLastDigits": { "a": true, "h": "Card Last Digits", "n": "cardLastDigits", "r": false, "sh": "Last 4 digits of the card PAN.", "t": "`$STRING`", "key$": "cardLastDigits", "index$": 3 }, "cardNetwork": { "a": true, "h": "Card Network", "n": "cardNetwork", "r": false, "sh": "Card network.", "t": "`$STRING`", "key$": "cardNetwork", "index$": 4 }, "certificates": { "a": true, "h": "Certificates", "n": "certificates", "r": true, "sh": "DER encoded X.509 ECC leaf and sub CA certificates, each encoded in Base64.", "t": "`$ARRAY`", "key$": "certificates", "index$": 5 }, "clientDeviceId": { "a": true, "h": "Client Device Id", "n": "clientDeviceId", "r": true, "sh": "Stable device identification set by Wallet Provider.", "t": "`$STRING`", "key$": "clientDeviceId", "index$": 6 }, "clientWalletAccountId": { "a": true, "h": "Client Wallet Account Id", "n": "clientWalletAccountId", "r": true, "sh": "Client-provided consumer ID that identifies the Wallet Account Holder entity.", "t": "`$STRING`", "key$": "clientWalletAccountId", "index$": 7 }, "encryptedPassData": { "a": true, "h": "Encrypted Pass Data", "n": "encryptedPassData", "r": false, "sh": "Encrypted authentication data following card scheme and wallet provider specifications.", "t": "`$STRING`", "key$": "encryptedPassData", "index$": 8 }, "ephemeralKey": { "a": true, "h": "Ephemeral Key", "n": "ephemeralKey", "r": false, "sh": "Ephemeral key used to encrypt authentication data.", "t": "`$STRING`", "key$": "ephemeralKey", "index$": 9 }, "nonce": { "a": true, "h": "Nonce", "n": "nonce", "r": true, "sh": "One time use nonce generated by Apple Servers and HEX encoded on iOS app.", "t": "`$STRING`", "key$": "nonce", "index$": 10 }, "nonceSignature": { "a": true, "h": "Nonce Signature", "n": "nonceSignature", "r": true, "sh": "The device and account specific signature of the nonce generated by Apple and HEX encoded on iOS app.", "t": "`$STRING`", "key$": "nonceSignature", "index$": 11 }, "opaquePaymentCard": { "a": true, "h": "Opaque Payment Card", "n": "opaquePaymentCard", "r": false, "sh": "Encrypted authentication and activation data following card scheme and wallet provider specifications.", "t": "`$STRING`", "key$": "opaquePaymentCard", "index$": 12 }, "paymentTokens": { "a": true, "h": "Payment Tokens", "n": "paymentTokens", "r": false, "t": "`$ARRAY`", "key$": "paymentTokens", "index$": 13 }, "tokenServiceProvider": { "a": true, "h": "Token Service Provider", "n": "tokenServiceProvider", "r": false, "sh": "Token service provider.", "t": "`$STRING`", "key$": "tokenServiceProvider", "index$": 14 }, "userAddress": { "a": true, "h": "User Address", "n": "userAddress", "r": false, "sh": "Entire address and phone number associated with the card.", "t": "`$OBJECT`", "key$": "userAddress", "index$": 15 }, "walletNames": { "a": true, "h": "Wallet Names", "n": "walletNames", "r": false, "sh": "List of supported wallet types.", "t": "`$ARRAY`", "key$": "walletNames", "index$": 16 } }, "name": "digital_wallet", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["activation"], "co": { "id": "POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "DNITHE382607223583426199", "k": "param", "n": "payment_token_unique_reference", "or": "paymentTokenUniqueReference", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 12345, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation", "q": { "exist": ["card_token", "payment_token_unique_reference", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "paymentTokenUniqueReference": "payment_token_unique_reference", "profileId": "profile_id" } }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "payment-tokens" }, { "var": "payment_token_unique_reference" }, { "lit": "activation" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "bf": ["walletNames"], "co": { "id": "POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "ex": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "k": "param", "n": "card_token", "or": "cardToken", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 12345, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/spend/profiles/{profileId}/cards/{cardToken}/payment-tokens", "q": { "exist": ["card_token", "profile_id"] }, "r": { "param": { "cardToken": "card_token", "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "spend" }, { "lit": "profiles" }, { "var": "profile_id" }, { "lit": "cards" }, { "var": "card_token" }, { "lit": "payment-tokens" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["certificates", "nonce", "nonceSignature"], "co": { "id": "POST /twcard-data/v1/push-provisioning/encrypted-payload/apple-pay", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "explode": false, "k": "header", "n": "x_tw_twcard_card_token", "or": "x-tw-twcard-card-token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/twcard-data/v1/push-provisioning/encrypted-payload/apple-pay", "q": { "exist": ["x_tw_twcard_card_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "twcard-data" }, { "lit": "v1" }, { "lit": "push-provisioning" }, { "lit": "encrypted-payload" }, { "lit": "apple-pay" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["clientDeviceId", "clientWalletAccountId"], "co": { "id": "POST /twcard-data/v1/push-provisioning/encrypted-payload/google-pay", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "explode": false, "k": "header", "n": "x_tw_twcard_card_token", "or": "x-tw-twcard-card-token", "r": true, "style": "simple", "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/twcard-data/v1/push-provisioning/encrypted-payload/google-pay", "q": { "exist": ["x_tw_twcard_card_token"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "twcard-data" }, { "lit": "v1" }, { "lit": "push-provisioning" }, { "lit": "encrypted-payload" }, { "lit": "google-pay" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 3 }], "key$": "create" } }, "relations": { "ancestors": [["$.main.kit.entity.profile", "$.main.kit.entity.card"], ["$.main.kit.entity.profile", "$.main.kit.entity.card"]] }, "key$": "digital_wallet", "name__orig": "digital_wallet", "Name": "DigitalWallet", "name_": "digital_wallet", "name-": "digital-wallet", "NAME": "DIGITAL_WALLET", "index$": 25 }, { "active": true, "entity": "digital_wallet", "key$": "BasicDigitalWalletFlow", "kind": "basic", "name": "BasicDigitalWalletFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "digital_wallet_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'DigitalWallet', { "POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["activation"], "properties": { "activation": { "type": "string", "description": "Approve or decline a payment token activation", "enum": ["APPROVE", "DECLINE"], "example": "APPROVE", "key$": "activation" } }, "index$": 1 }, "example": { "activation": "APPROVE" } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID", "schema": { "type": "integer", "format": "int64" }, "example": 12345, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The card token", "schema": { "type": "string", "format": "uuid" }, "example": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "index$": 1 }, { "name": "paymentTokenUniqueReference", "in": "path", "required": true, "description": "The payment token unique reference issued by the scheme token service", "schema": { "type": "string" }, "example": "DNITHE382607223583426199", "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] }, "POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "walletNames": { "type": "array", "description": "List of supported wallet types.", "items": { "type": "string", "enum": ["APPLE_PAY", "GOOGLE_PAY"] }, "example": ["APPLE_PAY", "GOOGLE_PAY"], "key$": "walletNames" } }, "index$": 1 } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "The profile ID.", "schema": { "type": "integer", "format": "int64" }, "example": 12345, "index$": 0 }, { "name": "cardToken", "in": "path", "required": true, "description": "The card token.", "schema": { "type": "string", "format": "uuid" }, "example": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "index$": 1 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 2 }] }, "POST /twcard-data/v1/push-provisioning/encrypted-payload/apple-pay": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["certificates", "nonce", "nonceSignature"], "properties": { "certificates": { "type": "array", "description": "DER encoded X.509 ECC leaf and sub CA certificates, each encoded in Base64.", "items": { "type": "string" }, "example": ["MIICpTCCAkqgAwIBAgIIB...", "MIICpTCCAYmgAwIBAgIIX..."], "key$": "certificates" }, "nonce": { "type": "string", "description": "One time use nonce generated by Apple Servers and HEX encoded on iOS app.", "example": "a1b2c3d4e5f6", "key$": "nonce" }, "nonceSignature": { "type": "string", "description": "The device and account specific signature of the nonce generated by Apple and HEX encoded on iOS app.", "example": "f6e5d4c3b2a1", "key$": "nonceSignature" } }, "index$": 1 } } } }, "parameters": [{ "name": "x-tw-twcard-card-token", "in": "header", "required": true, "description": "The card token identifying which card to retrieve push provisioning data for.", "schema": { "type": "string", "format": "uuid" }, "example": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "POST /twcard-data/v1/push-provisioning/encrypted-payload/google-pay": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "required": ["clientDeviceId", "clientWalletAccountId"], "properties": { "clientDeviceId": { "type": "string", "description": "Stable device identification set by Wallet Provider. Could be computer identifier or ID tied to hardware such as TEE_ID or SE_ID. This field must match the `clientDeviceId` wallet provider will send in token provision request.", "example": "ed6abb56323ba656521ac476", "key$": "clientDeviceId" }, "clientWalletAccountId": { "type": "string", "description": "Client-provided consumer ID that identifies the Wallet Account Holder entity.", "example": "walletid", "key$": "clientWalletAccountId" } }, "index$": 1 } } } }, "parameters": [{ "name": "x-tw-twcard-card-token", "in": "header", "required": true, "description": "The card token identifying which card to retrieve push provisioning data for.", "schema": { "type": "string", "format": "uuid" }, "example": "a3f90c98-1cd1-4488-9050-2e32c696f8fa", "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "digital_wallet.create.0": "GET-only live run: needs POST /spend/profiles/{profileId}/cards/{cardToken}/payment-tokens/{paymentTokenUniqueReference}/activation" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const digital_wallet_ref01_ent = client.DigitalWallet();
        let digital_wallet_ref01_data = setup.data.new.digital_wallet['digital_wallet_ref01'];
        digital_wallet_ref01_data = (await digital_wallet_ref01_ent.create(digital_wallet_ref01_data)).data();
        (0, node_assert_1.default)(null != digital_wallet_ref01_data);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/digital_wallet/DigitalWalletTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['digital_wallet01', 'digital_wallet02', 'digital_wallet03', 'profile01', 'profile02', 'profile03', 'card01', 'card02', 'card03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_DIGITAL_WALLET_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_DIGITAL_WALLET_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_DIGITAL_WALLET_ENTID'];
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
//# sourceMappingURL=DigitalWalletEntity.test.js.map