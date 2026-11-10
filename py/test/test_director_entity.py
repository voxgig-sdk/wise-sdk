# Director entity test

import json
import os
import time

import pytest

from wise_sdk.utility.voxgig_struct import voxgig_struct as vs
from wise_sdk import WiseSDK
from wise_sdk.core import helpers
from wise_sdk.config import shared_config
from wise_sdk.feature.base_feature import WiseBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestDirectorEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.Director(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Director(None).list({"profile_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _director_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "director." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"director.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/directors\"}")
            print("LIVE STEP {\"id\":\"director.update.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PUT /profiles/{profileId}/directors\"}")
            print("LIVE STEP {\"id\":\"director.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/directors\"}")
            print("LIVE STEP {\"id\":\"director.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_DIRECTOR_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        director_ref01_ent = client.Director(None)
        director_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.director"), "director_ref01"))
        director_ref01_data["profile_id"] = setup["idmap"]["profile01"]

        director_ref01_data = helpers.to_map(runner.entity_data(director_ref01_ent.create(director_ref01_data, None)))
        assert director_ref01_data is not None
        assert director_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        director_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }

        director_ref01_list_result = director_ref01_ent.list(director_ref01_match, None)
        assert isinstance(director_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(director_ref01_list_result),
            {"id": director_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        director_ref01_data_up0_up = {
            "id": director_ref01_data["id"],
        }

        director_ref01_markdef_up0_name = "countryOfResidenceIso3Code"
        director_ref01_markdef_up0_value = "Mark01-director_ref01_" + str(setup["now"])
        director_ref01_data_up0_up[director_ref01_markdef_up0_name] = director_ref01_markdef_up0_value

        director_ref01_resdata_up0 = helpers.to_map(runner.entity_data(director_ref01_ent.update(director_ref01_data_up0_up, None)))
        assert director_ref01_resdata_up0 is not None
        assert runner.live_same_id(director_ref01_resdata_up0.get("id"), director_ref01_data_up0_up["id"])
        assert director_ref01_resdata_up0[director_ref01_markdef_up0_name] == director_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        director_ref01_match_rm0 = {
            "id": director_ref01_data["id"],
        }
        director_ref01_ent.remove(director_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        director_ref01_match_rt0 = {
            "profile_id": setup["idmap"]["profile01"],
        }

        director_ref01_list_rt0_result = director_ref01_ent.list(director_ref01_match_rt0, None)
        assert isinstance(director_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(director_ref01_list_rt0_result),
            {"id": director_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_DIRECTOR_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        director_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.director")))
        director_ref01_data = None
        if len(director_ref01_data_raw) > 0:
            director_ref01_data = helpers.to_map(director_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        director_ref01_ent = client.Director(None)
        director_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }

        director_ref01_list_result = director_ref01_ent.list(director_ref01_match, None)
        assert isinstance(director_ref01_list_result, list)



def _director_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/director/DirectorTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["director01", "director02", "director03", "profile01", "profile02", "profile03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "WISE_TEST_DIRECTOR_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_DIRECTOR_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_DIRECTOR_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("WISE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("WISE_APIKEY"),
            },
            extra or {},
        ])
        client = WiseSDK(helpers.to_map(merged_opts))

    _live = env.get("WISE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("WISE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
