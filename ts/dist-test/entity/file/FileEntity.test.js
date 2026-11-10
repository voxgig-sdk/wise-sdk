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
(0, node_test_1.describe)('FileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.File();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('file hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.WiseSDK.test(offline).File().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.WiseSDK.test(offline).File()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.WiseSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.File().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.WiseSDK.test().File().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.WiseSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.File().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.File().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.File().list({ "page_number": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'file.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "createdAt": { "a": true, "h": "Created At", "n": "createdAt", "r": true, "sh": "Timestamp when the file was uploaded.", "t": "`$STRING`", "key$": "createdAt", "index$": 0 }, "file": { "a": true, "h": "File", "n": "file", "r": true, "sh": "The file to upload.", "t": "`$STRING`", "key$": "file", "index$": 1 }, "fileId": { "a": true, "fo": "uuid", "h": "File Id", "n": "fileId", "r": true, "sh": "Unique identifier of the uploaded file.", "t": "`$STRING`", "key$": "fileId", "index$": 2 }, "fileName": { "a": true, "h": "File Name", "n": "fileName", "r": true, "sh": "The name of the uploaded file.", "t": "`$STRING`", "key$": "fileName", "index$": 3 }, "profileId": { "a": true, "fo": "int64", "h": "Profile Id", "n": "profileId", "r": true, "sh": "The ID of the profile this file belongs to.", "t": "`$INTEGER`", "key$": "profileId", "index$": 4 }, "purpose": { "a": true, "h": "Purpose", "n": "purpose", "r": true, "sh": "The purpose of the file upload.", "t": "`$STRING`", "key$": "purpose", "index$": 5 }, "submissionData": { "a": true, "h": "Submission Data", "n": "submissionData", "r": true, "sh": "Metadata for the file upload, sent as the `submissionData` part of the multipart request.", "t": "`$OBJECT`", "key$": "submissionData", "index$": 6 } }, "name": "file", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /cases/files", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/cases/files", "q": {}, "r": {}, "rb": { "fields": [{ "binary": true, "media": "application/pdf, image/jpeg, image/png", "name": "file" }, { "media": "application/json", "name": "submissionData" }], "kind": "multipart", "media": "multipart/form-data" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cases" }, { "lit": "files" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /cases/files", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "ex": 1, "explode": true, "k": "query", "n": "page_number", "or": "pageNumber", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 2, "explode": true, "k": "query", "n": "page_size", "or": "pageSize", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 14556049, "explode": true, "k": "query", "n": "profile_id", "or": "profileId", "r": false, "style": "form", "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/cases/files", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "cases" }, { "lit": "files" }], "t": { "req": "`reqdata`", "res": "`body.files`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "file", "name__orig": "file", "Name": "File", "name_": "file", "name-": "file", "NAME": "FILE", "index$": 31 }, { "active": true, "entity": "file", "key$": "BasicFileFlow", "kind": "basic", "name": "BasicFileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "file_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "file_ref01" } }], "index$": 1 }] }, 'File', { "POST /cases/files": { "protocol": "http", "requestBody": { "required": true, "content": { "multipart/form-data": { "schema": { "type": "object", "properties": { "file": { "type": "string", "contentMediaType": "application/octet-stream", "description": "The file to upload. Do not include personally identifying information in the file name. Must be one of the supported content types\n(`application/pdf`, `image/jpeg`, `image/png`) and must not exceed 15 MB.\nFile name must not exceed 128 characters and the file extension must match the content type\n(e.g. `.pdf` for `application/pdf`).\n", "key$": "file" }, "submissionData": { "type": "object", "description": "Metadata for the file upload, sent as the `submissionData` part of the multipart request.\n", "properties": { "profileId": { "type": "integer", "format": "int64", "description": "The ID of the profile you are providing the file for. If you are set up only with your own profile and do not have them for end customers you must use your own profileId.\n", "example": 14556049 }, "purpose": { "type": "string", "description": "The purpose of the file upload.", "enum": ["GENERAL"], "example": "GENERAL", "x-ref": "#/components/schemas/file-purpose" } }, "required": ["profileId", "purpose"], "example": { "profileId": 14556049, "purpose": "GENERAL" }, "x-ref": "#/components/schemas/file-upload-request", "key$": "submissionData" } }, "required": ["file", "submissionData"], "index$": 1 }, "encoding": { "file": { "contentType": "application/pdf, image/jpeg, image/png" }, "submissionData": { "contentType": "application/json" } } } } }, "parameters": [{ "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 0 }] }, "GET /cases/files": { "protocol": "http", "parameters": [{ "name": "pageNumber", "in": "query", "required": false, "description": "The page number to retrieve. Must be at least `1`.", "schema": { "type": "integer", "format": "int32", "minimum": 1, "default": 1 }, "example": 1, "index$": 0 }, { "name": "pageSize", "in": "query", "required": false, "description": "The maximum number of files to return per page. Between `1` and `100`.", "schema": { "type": "integer", "format": "int32", "minimum": 1, "maximum": 100, "default": 100 }, "example": 2, "index$": 1 }, { "name": "profileId", "in": "query", "required": false, "description": "Filter files by profile ID.\nOmit this parameter to retrieve files across all profiles.\n", "schema": { "type": "integer", "format": "int64" }, "example": 14556049, "index$": 2 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 3 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "file.create.0": "GET-only live run: needs POST /cases/files" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const file_ref01_ent = client.File();
        let file_ref01_data = setup.data.new.file['file_ref01'];
        file_ref01_data = (await file_ref01_ent.create(file_ref01_data)).data();
        (0, node_assert_1.default)(null != file_ref01_data);
        // LIST
        const file_ref01_match = {};
        const file_ref01_list = (await file_ref01_ent.list(file_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/file/FileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['file01', 'file02', 'file03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_FILE_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_FILE_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_FILE_ENTID'];
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
//# sourceMappingURL=FileEntity.test.js.map