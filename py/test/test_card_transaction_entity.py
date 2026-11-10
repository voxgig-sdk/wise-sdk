# CardTransaction entity test

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


class TestCardTransactionEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.CardTransaction(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.CardTransaction(None).list({"card_token": 1, "profile_id": 1, "from_creation_time": "x", "to_creation_time": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _card_transaction_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "card_transaction." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key, _live_ex in {"card_token01": "59123122-223d-45f9-b840-0ad4a4f80937", "profile01": 123456}.items():
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    setup["idmap"][_live_key] = _live_ex
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("card_transaction01")
            if _live_id is None:
                _live_id = 342671
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "card_transaction",
                                 lambda: client.CardTransaction(None).list({"card_token": setup["idmap"].get("card_token01"), "profile_id": setup["idmap"].get("profile01"), "from_creation_time": "2025-12-15T00:00:00Z", "to_creation_time": "2026-01-15T00:00:10Z"}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        card_transaction_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.card_transaction")))
        card_transaction_ref01_data = None
        if len(card_transaction_ref01_data_raw) > 0:
            card_transaction_ref01_data = helpers.to_map(card_transaction_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        card_transaction_ref01_ent = client.CardTransaction(None)
        card_transaction_ref01_match = {
            "card_token": setup["idmap"]["card_token01"],
            "profile_id": setup["idmap"]["profile01"],
        }
        if setup["live"]:
            card_transaction_ref01_match["from_creation_time"] = "2025-12-15T00:00:00Z"
            card_transaction_ref01_match["to_creation_time"] = "2026-01-15T00:00:10Z"

        card_transaction_ref01_list_result = card_transaction_ref01_ent.list(card_transaction_ref01_match, None)
        assert isinstance(card_transaction_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        card_transaction_ref01_match_dt0 = {
            "id": card_transaction_ref01_data["id"],
        }
        card_transaction_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        card_transaction_ref01_data_dt0_loaded = card_transaction_ref01_ent.load(card_transaction_ref01_match_dt0, None)
        card_transaction_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(card_transaction_ref01_data_dt0_loaded))
        assert card_transaction_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(card_transaction_ref01_data_dt0_load_result.get("id"), card_transaction_ref01_data["id"])



def _card_transaction_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/card_transaction/CardTransactionTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["card_transaction01", "card_transaction02", "card_transaction03", "profile01", "profile02", "profile03", "card01", "card02", "card03", "card_token01"],
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
        "WISE_TEST_CARD_TRANSACTION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_CARD_TRANSACTION_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_CARD_TRANSACTION_ENTID"))
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
