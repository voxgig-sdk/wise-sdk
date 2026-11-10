# BalanceStatement entity test

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


class TestBalanceStatementEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.BalanceStatement(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.BalanceStatement(None).load({"id": "x", "profile_id": 1, "currency": "x", "interval_end": "x", "interval_start": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _balance_statement_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "balance_statement." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key, _live_ex in {"balance_statement01": 64, "profile01": 12345}.items():
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    setup["idmap"][_live_key] = _live_ex
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "balance_statement",
                                 lambda: [{"id": setup["idmap"].get("balance_statement01")}], "id", setup["idmap"].get("balance_statement01"))

        # Bootstrap entity data from existing test data.
        balance_statement_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.balance_statement")))
        balance_statement_ref01_data = None
        if len(balance_statement_ref01_data_raw) > 0:
            balance_statement_ref01_data = helpers.to_map(balance_statement_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LOAD
        balance_statement_ref01_ent = client.BalanceStatement(None)
        balance_statement_ref01_match_dt0 = {
            "id": balance_statement_ref01_data["id"],
        }
        balance_statement_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        if setup["live"]:
            balance_statement_ref01_match_dt0["currency"] = "EUR"
            balance_statement_ref01_match_dt0["interval_end"] = "2025-04-30T23:59:59.999Z"
            balance_statement_ref01_match_dt0["interval_start"] = "2025-03-01T00:00:00.000Z"
        balance_statement_ref01_data_dt0_loaded = balance_statement_ref01_ent.load(balance_statement_ref01_match_dt0, None)
        balance_statement_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(balance_statement_ref01_data_dt0_loaded))
        assert balance_statement_ref01_data_dt0_load_result is not None
        if not setup["live"]:
            assert runner.live_same_id(balance_statement_ref01_data_dt0_load_result.get("id"), balance_statement_ref01_data["id"])



def _balance_statement_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/balance_statement/BalanceStatementTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["balance_statement01", "balance_statement02", "balance_statement03", "profile01", "profile02", "profile03"],
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
        "WISE_TEST_BALANCE_STATEMENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_BALANCE_STATEMENT_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_BALANCE_STATEMENT_ENTID"))
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
