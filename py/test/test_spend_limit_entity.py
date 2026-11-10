# SpendLimit entity test

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


class TestSpendLimitEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.SpendLimit(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.SpendLimit(None).list({"profile_id": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _spend_limit_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "spend_limit." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"spend_limit.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /spend/profiles/{profileId}/spend-limits\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_SPEND_LIMIT_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        spend_limit_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.spend_limit")))
        spend_limit_ref01_data = None
        if len(spend_limit_ref01_data_raw) > 0:
            spend_limit_ref01_data = helpers.to_map(spend_limit_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        spend_limit_ref01_ent = client.SpendLimit(None)
        spend_limit_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }

        spend_limit_ref01_list_result = spend_limit_ref01_ent.list(spend_limit_ref01_match, None)
        assert isinstance(spend_limit_ref01_list_result, list)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_SPEND_LIMIT_ENTID")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        spend_limit_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.spend_limit")))
        spend_limit_ref01_data = None
        if len(spend_limit_ref01_data_raw) > 0:
            spend_limit_ref01_data = helpers.to_map(spend_limit_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        spend_limit_ref01_ent = client.SpendLimit(None)
        spend_limit_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }

        spend_limit_ref01_list_result = spend_limit_ref01_ent.list(spend_limit_ref01_match, None)
        assert isinstance(spend_limit_ref01_list_result, list)



def _spend_limit_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/spend_limit/SpendLimitTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["spend_limit01", "spend_limit02", "spend_limit03", "profile01", "profile02", "profile03", "card01", "card02", "card03"],
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
        "WISE_TEST_SPEND_LIMIT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_SPEND_LIMIT_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_SPEND_LIMIT_ENTID"))
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
