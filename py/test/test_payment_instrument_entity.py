# PaymentInstrument entity test

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


class TestPaymentInstrumentEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.PaymentInstrument(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.PaymentInstrument(None).list({"id": 1, "profile_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _payment_instrument_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "payment_instrument." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"payment_instrument.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/payment-instruments/{paymentInstrumentId}/manual-confirmation\"}")
            return self._run_get_only_flow(setup)

        if setup["live"]:
            for _live_key in ["profile01", "payment_instrument01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        payment_instrument_ref01_ent = client.PaymentInstrument(None)
        payment_instrument_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.payment_instrument"), "payment_instrument_ref01"))
        payment_instrument_ref01_data["profile_id"] = setup["idmap"]["profile01"]

        payment_instrument_ref01_data = helpers.to_map(runner.entity_data(payment_instrument_ref01_ent.create(payment_instrument_ref01_data, None)))
        assert payment_instrument_ref01_data is not None
        assert payment_instrument_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # LIST
        payment_instrument_ref01_match = {
            "payment_instrument_id": setup["idmap"]["payment_instrument01"],
            "profile_id": setup["idmap"]["profile01"],
        }

        payment_instrument_ref01_list_result = payment_instrument_ref01_ent.list(payment_instrument_ref01_match, None)
        assert isinstance(payment_instrument_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(payment_instrument_ref01_list_result),
            {"id": payment_instrument_ref01_data["id"]})
        assert not vs.isempty(found_item)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        payment_instrument_ref01_match_dt0 = {
            "id": payment_instrument_ref01_data["id"],
        }
        payment_instrument_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        payment_instrument_ref01_data_dt0_loaded = payment_instrument_ref01_ent.load(payment_instrument_ref01_match_dt0, None)
        payment_instrument_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(payment_instrument_ref01_data_dt0_loaded))
        assert payment_instrument_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(payment_instrument_ref01_data_dt0_load_result.get("id"), payment_instrument_ref01_data["id"])


    def _run_get_only_flow(self, setup):
        if setup["live"]:
            for _live_key in ["payment_instrument01", "profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
        client = setup["client"]
        if setup["live"]:
            _live_id = None if setup.get("synthetic_only") else setup["idmap"].get("payment_instrument01")
            runner.live_pace()
            runner.live_existing(setup, LIVE_STRICT, "payment_instrument",
                                 lambda: client.PaymentInstrument(None).list({"payment_instrument_id": setup["idmap"].get("payment_instrument01"), "profile_id": setup["idmap"].get("profile01")}, None),
                                 "id", _live_id)

        # Bootstrap entity data from existing test data.
        payment_instrument_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.payment_instrument")))
        payment_instrument_ref01_data = None
        if len(payment_instrument_ref01_data_raw) > 0:
            payment_instrument_ref01_data = helpers.to_map(payment_instrument_ref01_data_raw[0][1])

        if setup["live"]:
            runner.live_pace()
        # LIST
        payment_instrument_ref01_ent = client.PaymentInstrument(None)
        payment_instrument_ref01_match = {
            "payment_instrument_id": setup["idmap"]["payment_instrument01"],
            "profile_id": setup["idmap"]["profile01"],
        }

        payment_instrument_ref01_list_result = payment_instrument_ref01_ent.list(payment_instrument_ref01_match, None)
        assert isinstance(payment_instrument_ref01_list_result, list)

        if setup["live"]:
            runner.live_pace()
        # LOAD
        payment_instrument_ref01_match_dt0 = {
            "id": payment_instrument_ref01_data["id"],
        }
        payment_instrument_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        payment_instrument_ref01_data_dt0_loaded = payment_instrument_ref01_ent.load(payment_instrument_ref01_match_dt0, None)
        payment_instrument_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(payment_instrument_ref01_data_dt0_loaded))
        assert payment_instrument_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(payment_instrument_ref01_data_dt0_load_result.get("id"), payment_instrument_ref01_data["id"])



def _payment_instrument_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/payment_instrument/PaymentInstrumentTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["payment_instrument01", "payment_instrument02", "payment_instrument03", "profile01", "profile02", "profile03"],
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
        "WISE_TEST_PAYMENT_INSTRUMENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_PAYMENT_INSTRUMENT_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_PAYMENT_INSTRUMENT_ENTID"))
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
