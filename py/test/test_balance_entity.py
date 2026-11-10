# Balance entity test

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


class TestBalanceEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.Balance(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Balance(None).list({"profile_id": "x", "type": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _balance_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "balance." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"balance.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/balances/hold-limit-breach/{holdLimitBreachId}\"}")
            print("LIVE STEP {\"id\":\"balance.remove.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /profiles/{profileId}/balances/{balanceId}\"}")
            print("LIVE STEP {\"id\":\"balance.list.4\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_BALANCE_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        balance_ref01_ent = client.Balance(None)
        balance_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.balance"), "balance_ref01"))
        balance_ref01_data["profile_id"] = setup["idmap"]["profile01"]

        balance_ref01_data = helpers.to_map(runner.entity_data(balance_ref01_ent.create(balance_ref01_data, None)))
        assert balance_ref01_data is not None
        assert balance_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        balance_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }
        if setup["live"]:
            balance_ref01_match["type"] = "STANDARD"

        balance_ref01_list_result = balance_ref01_ent.list(balance_ref01_match, None)
        assert isinstance(balance_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(balance_ref01_list_result),
            {"id": balance_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        balance_ref01_match_dt0 = {
            "id": balance_ref01_data["id"],
        }
        balance_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        balance_ref01_data_dt0_loaded = balance_ref01_ent.load(balance_ref01_match_dt0, None)
        balance_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(balance_ref01_data_dt0_loaded))
        assert balance_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(balance_ref01_data_dt0_load_result.get("id"), balance_ref01_data["id"])

        if setup["live"]:
            runner.live_pace()
        # REMOVE
        balance_ref01_match_rm0 = {
            "id": balance_ref01_data["id"],
        }
        balance_ref01_match_rm0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        balance_ref01_ent.remove(balance_ref01_match_rm0, None)

        if setup["live"]:
            runner.live_pace()
        # LIST
        balance_ref01_match_rt0 = {
            "profile_id": setup["idmap"]["profile01"],
        }
        if setup["live"]:
            balance_ref01_match_rt0["type"] = "STANDARD"

        balance_ref01_list_rt0_result = balance_ref01_ent.list(balance_ref01_match_rt0, None)
        assert isinstance(balance_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(balance_ref01_list_rt0_result),
            {"id": balance_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_BALANCE_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("balance01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "balance",
                                 lambda: client.Balance(None).list({"profile_id": setup["idmap"].get("profile01"), "type": "STANDARD"}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        balance_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.balance")))
        balance_ref01_data = None
        if len(balance_ref01_data_raw) > 0:
            balance_ref01_data = helpers.to_map(balance_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        balance_ref01_ent = client.Balance(None)
        balance_ref01_match = {
            "profile_id": setup["idmap"]["profile01"],
        }
        if setup["live"]:
            balance_ref01_match["type"] = "STANDARD"

        balance_ref01_list_result = balance_ref01_ent.list(balance_ref01_match, None)
        assert isinstance(balance_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        balance_ref01_match_dt0 = {
            "id": balance_ref01_data["id"],
        }
        balance_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        balance_ref01_data_dt0_loaded = balance_ref01_ent.load(balance_ref01_match_dt0, None)
        balance_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(balance_ref01_data_dt0_loaded))
        assert balance_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(balance_ref01_data_dt0_load_result.get("id"), balance_ref01_data["id"])



def _balance_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/balance/BalanceTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["balance01", "balance02", "balance03", "profile01", "profile02", "profile03", "hold_limit_breach01", "hold_limit_breach02", "hold_limit_breach03"],
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
        "WISE_TEST_BALANCE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_BALANCE_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_BALANCE_ENTID"))
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
