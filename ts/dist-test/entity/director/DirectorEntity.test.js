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
(0, node_test_1.describe)('DirectorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Director();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Director().list({ "profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'director.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "countryOfResidenceIso3Code": { "a": true, "h": "Country Of Residence Iso3 Code", "n": "countryOfResidenceIso3Code", "r": false, "sh": "3 character country code.", "t": "`$STRING`", "key$": "countryOfResidenceIso3Code", "index$": 0 }, "dateOfBirth": { "a": true, "h": "Date Of Birth", "n": "dateOfBirth", "r": false, "sh": "Date of birth.", "t": "`$STRING`", "key$": "dateOfBirth", "index$": 1 }, "directors": { "a": true, "h": "Directors", "n": "directors", "r": false, "syn": true, "t": "`$ARRAY`", "key$": "directors", "index$": 2 }, "firstName": { "a": true, "h": "First Name", "n": "firstName", "r": false, "sh": "Director first name.", "t": "`$STRING`", "key$": "firstName", "index$": 3 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "sh": "ID of the director.", "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "lastName": { "a": true, "h": "Last Name", "n": "lastName", "r": false, "sh": "Director last name.", "t": "`$STRING`", "key$": "lastName", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "director", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["directors"], "co": { "id": "POST /profiles/{profileId}/directors", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/directors", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "directors" }], "t": { "req": "`reqdata.directors`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/directors", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/directors", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "directors" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /profiles/{profileId}/directors", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/profiles/{profileId}/directors", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "directors" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["directors"], "co": { "id": "PUT /profiles/{profileId}/directors", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/profiles/{profileId}/directors", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "directors" }], "t": { "req": "`reqdata.directors`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "director", "name__orig": "director", "Name": "Director", "name_": "director", "name-": "director", "NAME": "DIRECTOR", "index$": 27 }, { "active": true, "entity": "director", "key$": "BasicDirectorFlow", "kind": "basic", "name": "BasicDirectorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "director_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "director_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "director_ref01", "srcdatavar": "director_ref01_data", "suffix": "_up0", "textfield": "countryOfResidenceIso3Code" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-director_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "director_ref01", "suffix": "_rm0" }, "m": { "id": "director01" }, "o": "remove", "s": [], "v": [], "index$": 3 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "director_ref01" } }], "index$": 4 }] }, 'Director', { "POST /profiles/{profileId}/directors": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "firstName": { "type": "string", "description": "Director first name.", "example": "John" }, "lastName": { "type": "string", "description": "Director last name.", "example": "Doe" }, "dateOfBirth": { "type": "string", "description": "Date of birth.", "example": "1982-05-20" }, "countryOfResidenceIso3Code": { "type": "string", "description": "3 character country code.", "example": "usa" } } }, "index$": 1 }, "example": [{ "firstName": "John", "lastName": "Doe", "dateOfBirth": "1982-05-20", "countryOfResidenceIso3Code": "usa" }, { "firstName": "Jane", "lastName": "Doe", "dateOfBirth": "1981-12-07", "countryOfResidenceIso3Code": "usa" }] } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /profiles/{profileId}/directors": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "DELETE /profiles/{profileId}/directors": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "PUT /profiles/{profileId}/directors": { "protocol": "http", "requestBody": { "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "firstName": { "type": "string", "description": "Director first name.", "example": "John" }, "lastName": { "type": "string", "description": "Director last name.", "example": "Doe" }, "dateOfBirth": { "type": "string", "description": "Date of birth.", "example": "1982-05-20" }, "countryOfResidenceIso3Code": { "type": "string", "description": "3 character country code.", "example": "usa" } } }, "index$": 1 }, "example": [{ "firstName": "John", "lastName": "Doe", "dateOfBirth": "1982-05-20", "countryOfResidenceIso3Code": "usa" }, { "firstName": "Jane", "lastName": "Doe", "dateOfBirth": "1981-12-07", "countryOfResidenceIso3Code": "usa" }] } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "director.create.0": "GET-only live run: needs POST /profiles/{profileId}/directors", "director.update.2": "GET-only live run: needs PUT /profiles/{profileId}/directors", "director.remove.3": "GET-only live run: needs DELETE /profiles/{profileId}/directors", "director.list.4": "GET-only live run: checks a removal this run does not make" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const director_ref01_ent = client.Director();
        let director_ref01_data = setup.data.new.director['director_ref01'];
        director_ref01_data['profile_id'] = setup.idmap['profile01'];
        director_ref01_data = (await director_ref01_ent.create(director_ref01_data)).data();
        (0, node_assert_1.default)(null != director_ref01_data.id);
        // LIST
        const director_ref01_match = {};
        director_ref01_match['profile_id'] = setup.idmap['profile01'];
        const director_ref01_list = (await director_ref01_ent.list(director_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(director_ref01_list, { id: director_ref01_data.id })));
        // UPDATE
        const director_ref01_data_up0 = {};
        director_ref01_data_up0.id = director_ref01_data.id;
        const director_ref01_markdef_up0 = { name: 'countryOfResidenceIso3Code', value: 'Mark01-director_ref01_' + setup.now };
        director_ref01_data_up0[director_ref01_markdef_up0.name] = director_ref01_markdef_up0.value;
        const director_ref01_resdata_up0 = (await director_ref01_ent.update(director_ref01_data_up0)).data();
        (0, node_assert_1.default)(director_ref01_resdata_up0.id === director_ref01_data_up0.id);
        (0, node_assert_1.default)(director_ref01_resdata_up0[director_ref01_markdef_up0.name] === director_ref01_markdef_up0.value);
        // REMOVE
        const director_ref01_match_rm0 = { id: director_ref01_data.id };
        await director_ref01_ent.remove(director_ref01_match_rm0);
        // LIST
        const director_ref01_match_rt0 = {};
        director_ref01_match_rt0['profile_id'] = setup.idmap['profile01'];
        const director_ref01_list_rt0 = (await director_ref01_ent.list(director_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(director_ref01_list_rt0, { id: director_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/director/DirectorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['director01', 'director02', 'director03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_DIRECTOR_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_DIRECTOR_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_DIRECTOR_ENTID'];
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
//# sourceMappingURL=DirectorEntity.test.js.map