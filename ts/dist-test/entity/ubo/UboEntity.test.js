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
(0, node_test_1.describe)('UboEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WISE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WISE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WiseSDK.test();
        const ent = testsdk.Ubo();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.WiseSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Ubo().list({ "profile_id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WISE_TEST_LIVE;
        for (const op of ['create', 'list', 'update']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ubo.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "addressFirstLine": { "a": true, "h": "Address First Line", "n": "addressFirstLine", "r": false, "sh": "First line of address.", "t": "`$STRING`", "key$": "addressFirstLine", "index$": 0 }, "city": { "a": true, "h": "City", "n": "city", "r": false, "sh": "City of residential address.", "t": "`$STRING`", "key$": "city", "index$": 1 }, "countryOfResidenceIso3Code": { "a": true, "h": "Country Of Residence Iso3 Code", "n": "countryOfResidenceIso3Code", "r": false, "sh": "3 character country code.", "t": "`$STRING`", "key$": "countryOfResidenceIso3Code", "index$": 2 }, "dateOfBirth": { "a": true, "h": "Date Of Birth", "n": "dateOfBirth", "r": false, "sh": "Date of birth.", "t": "`$STRING`", "key$": "dateOfBirth", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "ID of the ultimate beneficial owner.", "t": "`$STRING`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Owner full name.", "t": "`$STRING`", "key$": "name", "index$": 5 }, "ownershipPercentage": { "a": true, "fo": "int32", "h": "Ownership Percentage", "n": "ownershipPercentage", "r": false, "sh": "Percentage of ownership.", "t": "`$INTEGER`", "key$": "ownershipPercentage", "index$": 6 }, "postCode": { "a": true, "h": "Post Code", "n": "postCode", "r": false, "sh": "Address post code.", "t": "`$STRING`", "key$": "postCode", "index$": 7 }, "state": { "a": true, "h": "State", "n": "state", "r": false, "sh": "State or region of residential address.", "t": "`$STRING`", "key$": "state", "index$": 8 }, "ubos": { "a": true, "h": "Ubos", "n": "ubos", "r": false, "syn": true, "t": "`$ARRAY`", "key$": "ubos", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "ubo", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["ubos"], "co": { "id": "POST /profiles/{profileId}/ubos", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/profiles/{profileId}/ubos", "q": { "exist": ["profile_id", "ubos"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "ubos" }], "t": { "req": "`reqdata.ubos`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /profiles/{profileId}/ubos", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/profiles/{profileId}/ubos", "q": { "exist": ["profile_id"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "ubos" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "bf": ["ubos"], "co": { "id": "PUT /profiles/{profileId}/ubos", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "ex": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "explode": false, "k": "header", "n": "x_external_correlation_id", "or": "X-External-Correlation-Id", "r": false, "style": "simple", "t": "`$STRING`", "index$": 0 }], "params": [{ "a": true, "k": "param", "n": "profile_id", "or": "profileId", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/profiles/{profileId}/ubos", "q": { "exist": ["profile_id", "ubos"] }, "r": { "param": { "profileId": "profile_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "profiles" }, { "var": "profile_id" }, { "lit": "ubos" }], "t": { "req": "`reqdata.ubos`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.profile"]] }, "key$": "ubo", "name__orig": "ubo", "Name": "Ubo", "name_": "ubo", "name-": "ubo", "NAME": "UBO", "index$": 72 }, { "active": true, "entity": "ubo", "key$": "BasicUboFlow", "kind": "basic", "name": "BasicUboFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "ubo_ref01" }, "m": { "profile_id": "profile01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "profile_id": "profile01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "ubo_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "ubo_ref01", "srcdatavar": "ubo_ref01_data", "suffix": "_up0", "textfield": "addressFirstLine" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-ubo_ref01" } }], "v": [], "index$": 2 }] }, 'Ubo', { "POST /profiles/{profileId}/ubos": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "required": ["name", "dateOfBirth", "countryOfResidenceIso3Code"], "properties": { "name": { "type": "string", "description": "Owner full name.", "example": "John Doe" }, "dateOfBirth": { "type": "string", "description": "Date of birth.", "example": "1982-05-20" }, "countryOfResidenceIso3Code": { "type": "string", "description": "3 character country code.", "example": "usa" }, "addressFirstLine": { "type": "string", "description": "First line of residential address. Required if the business profile's registered address is in the EU, EEA or US.", "example": "123 Fake St" }, "postCode": { "type": "string", "description": "Residential address post code. Required if the business profile's registered address is in the EU, EEA or US and the country in `countryOfResidenceIso3Code` uses post codes.", "example": "FK 12345" }, "documentType": { "type": "string", "description": "Identification document type.", "enum": ["PASSPORT", "NATIONAL_ID", "RESIDENCE_PERMIT", "DRIVING_LICENSE", "CPF"], "example": "PASSPORT" }, "documentId": { "type": "string", "description": "Document number or identifier.", "example": "AA299822313" }, "documentCountryIso3Code": { "type": "string", "description": "Document issuing country as an ISO 3166-1 alpha-3 code.", "example": "usa" }, "nationality": { "type": "string", "description": "Nationality as an ISO 3166-1 alpha-2 or alpha-3 country code. Required if the business profile's registered address is in Singapore.", "example": "usa" }, "email": { "type": "string", "description": "Owner email address.", "minLength": 1, "maxLength": 255, "pattern": "^.+@.+$", "example": "john.doe@example.com" }, "placeOfBirthCity": { "type": "string", "description": "City of birth. Required if the business profile's registered address is in the EU or EEA. Maximum 255 characters.", "example": "London" }, "placeOfBirthCountryIso3Code": { "type": "string", "description": "Country of birth as an ISO 3166-1 alpha-3 code. Required if the business profile's registered address is in the EU or EEA.", "example": "gbr" }, "city": { "type": "string", "description": "City of residential address. Required if `countryOfResidenceIso3Code` is `usa`, or if the business profile's registered address is in the EU, EEA or US. Maximum 255 characters.", "example": "Phoenix" }, "state": { "type": "string", "description": "State or region of residential address. Required if `countryOfResidenceIso3Code` is `usa`, or if the business profile's registered address is in the EU, EEA or US and the country in `countryOfResidenceIso3Code` has states. Maximum 32 characters.", "example": "AZ" }, "ownershipPercentage": { "type": ["integer", "null"], "format": "int32", "description": "Percentage of ownership.", "example": 30 } } }, "index$": 1 }, "examples": { "twoOwners": { "summary": "Two beneficial owners (30/70 split)", "value": [{ "name": "John Doe", "dateOfBirth": "1982-05-20", "countryOfResidenceIso3Code": "usa", "addressFirstLine": "123 Fake St", "postCode": "FK 12345", "documentType": "PASSPORT", "documentId": "AA299822313", "documentCountryIso3Code": "usa", "nationality": "usa", "email": "john.doe@example.com", "placeOfBirthCity": "London", "placeOfBirthCountryIso3Code": "gbr", "city": "Phoenix", "state": "AZ", "ownershipPercentage": 30 }, { "name": "Jane Doe", "dateOfBirth": "1981-12-07", "countryOfResidenceIso3Code": "usa", "addressFirstLine": "125 Fake St", "postCode": "FK 12545", "documentType": "DRIVING_LICENSE", "documentId": "DL12345", "documentCountryIso3Code": "usa", "nationality": "usa", "email": "jane.doe@example.com", "placeOfBirthCity": "London", "placeOfBirthCountryIso3Code": "gbr", "city": "Phoenix", "state": "AZ", "ownershipPercentage": 70 }] } } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "GET /profiles/{profileId}/ubos": { "protocol": "http", "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] }, "PUT /profiles/{profileId}/ubos": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "required": ["name", "dateOfBirth", "countryOfResidenceIso3Code"], "properties": { "name": { "type": "string", "description": "Owner full name.", "example": "John Doe" }, "dateOfBirth": { "type": "string", "description": "Date of birth.", "example": "1982-05-20" }, "countryOfResidenceIso3Code": { "type": "string", "description": "3 character country code.", "example": "usa" }, "addressFirstLine": { "type": "string", "description": "First line of residential address. Required if the business profile's registered address is in the EU, EEA or US.", "example": "123 Fake St" }, "postCode": { "type": "string", "description": "Residential address post code. Required if the business profile's registered address is in the EU, EEA or US and the country in `countryOfResidenceIso3Code` uses post codes.", "example": "FK 12345" }, "documentType": { "type": "string", "description": "Identification document type.", "enum": ["PASSPORT", "NATIONAL_ID", "RESIDENCE_PERMIT", "DRIVING_LICENSE", "CPF"], "example": "PASSPORT" }, "documentId": { "type": "string", "description": "Document number or identifier.", "example": "AA299822313" }, "documentCountryIso3Code": { "type": "string", "description": "Document issuing country as an ISO 3166-1 alpha-3 code.", "example": "usa" }, "nationality": { "type": "string", "description": "Nationality as an ISO 3166-1 alpha-2 or alpha-3 country code. Required if the business profile's registered address is in Singapore.", "example": "usa" }, "email": { "type": "string", "description": "Owner email address.", "minLength": 1, "maxLength": 255, "pattern": "^.+@.+$", "example": "john.doe@example.com" }, "placeOfBirthCity": { "type": "string", "description": "City of birth. Required if the business profile's registered address is in the EU or EEA. Maximum 255 characters.", "example": "London" }, "placeOfBirthCountryIso3Code": { "type": "string", "description": "Country of birth as an ISO 3166-1 alpha-3 code. Required if the business profile's registered address is in the EU or EEA.", "example": "gbr" }, "city": { "type": "string", "description": "City of residential address. Required if `countryOfResidenceIso3Code` is `usa`, or if the business profile's registered address is in the EU, EEA or US. Maximum 255 characters.", "example": "Phoenix" }, "state": { "type": "string", "description": "State or region of residential address. Required if `countryOfResidenceIso3Code` is `usa`, or if the business profile's registered address is in the EU, EEA or US and the country in `countryOfResidenceIso3Code` has states. Maximum 32 characters.", "example": "AZ" }, "ownershipPercentage": { "type": ["integer", "null"], "format": "int32", "description": "Percentage of ownership.", "example": 30 } } }, "index$": 1 }, "examples": { "twoOwners": { "summary": "Two beneficial owners (30/70 split)", "value": [{ "name": "John Doe", "dateOfBirth": "1982-05-20", "countryOfResidenceIso3Code": "usa", "addressFirstLine": "123 Fake St", "postCode": "FK 12345", "documentType": "PASSPORT", "documentId": "AA299822313", "documentCountryIso3Code": "usa", "nationality": "usa", "email": "john.doe@example.com", "placeOfBirthCity": "London", "placeOfBirthCountryIso3Code": "gbr", "city": "Phoenix", "state": "AZ", "ownershipPercentage": 30 }, { "name": "Jane Doe", "dateOfBirth": "1981-12-07", "countryOfResidenceIso3Code": "usa", "addressFirstLine": "125 Fake St", "postCode": "FK 12545", "documentType": "DRIVING_LICENSE", "documentId": "DL12345", "documentCountryIso3Code": "usa", "nationality": "usa", "email": "jane.doe@example.com", "placeOfBirthCity": "London", "placeOfBirthCountryIso3Code": "gbr", "city": "Phoenix", "state": "AZ", "ownershipPercentage": 70 }] } } } } }, "parameters": [{ "name": "profileId", "in": "path", "required": true, "description": "Business profile ID.", "schema": { "type": "integer", "format": "int64" }, "index$": 0 }, { "x-global": true, "name": "X-External-Correlation-Id", "in": "header", "required": false, "description": "Optional UUID for correlating requests across systems. If provided, Wise echoes it back in the response. Maximum 36 characters. [Learn more](/guides/developer/headers/correlation-id).\n", "schema": { "type": "string", "format": "uuid", "maxLength": 36 }, "example": "f47ac10b-58cc-4372-a567-0e02b2c3d479", "x-ref": "#/components/parameters/X-External-Correlation-Id", "index$": 1 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "ubo.create.0": "GET-only live run: needs POST /profiles/{profileId}/ubos", "ubo.update.2": "GET-only live run: needs PUT /profiles/{profileId}/ubos" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const ubo_ref01_ent = client.Ubo();
        let ubo_ref01_data = setup.data.new.ubo['ubo_ref01'];
        ubo_ref01_data['profile_id'] = setup.idmap['profile01'];
        ubo_ref01_data = (await ubo_ref01_ent.create(ubo_ref01_data)).data();
        (0, node_assert_1.default)(null != ubo_ref01_data.id);
        // LIST
        const ubo_ref01_match = {};
        ubo_ref01_match['profile_id'] = setup.idmap['profile01'];
        const ubo_ref01_list = (await ubo_ref01_ent.list(ubo_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(ubo_ref01_list, { id: ubo_ref01_data.id })));
        // UPDATE
        const ubo_ref01_data_up0 = {};
        ubo_ref01_data_up0.id = ubo_ref01_data.id;
        const ubo_ref01_markdef_up0 = { name: 'addressFirstLine', value: 'Mark01-ubo_ref01_' + setup.now };
        ubo_ref01_data_up0[ubo_ref01_markdef_up0.name] = ubo_ref01_markdef_up0.value;
        const ubo_ref01_resdata_up0 = (await ubo_ref01_ent.update(ubo_ref01_data_up0)).data();
        (0, node_assert_1.default)(ubo_ref01_resdata_up0.id === ubo_ref01_data_up0.id);
        (0, node_assert_1.default)(ubo_ref01_resdata_up0[ubo_ref01_markdef_up0.name] === ubo_ref01_markdef_up0.value);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ubo/UboTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WiseSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ubo01', 'ubo02', 'ubo03', 'profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WISE_TEST_UBO_ENTID': idmap,
        'WISE_TEST_LIVE': 'FALSE',
        'WISE_TEST_EXPLAIN': 'FALSE',
        'WISE_APIKEY': '',
    });
    idmap = env['WISE_TEST_UBO_ENTID'];
    const live = 'TRUE' === env.WISE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WISE_TEST_UBO_ENTID'];
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
//# sourceMappingURL=UboEntity.test.js.map