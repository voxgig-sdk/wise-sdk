# BatchGroup entity test

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


class TestBatchGroupEntity:

    def test_should_create_instance(self):
        testsdk = WiseSDK.test(None, None)
        ent = testsdk.BatchGroup(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = WiseSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.BatchGroup(None).load({"id": 1, "profile_id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _batch_group_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "batch_group." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"batch_group.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments\"}")
            print("LIVE STEP {\"id\":\"batch_group.update.1\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}\"}")
            print("LIVE STEP {\"id\":\"batch_group.load.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: reads a record only batch_group.create.0 gives\"}")
            pytest.skip("Live coverage incomplete: batch_group.create.0 excluded (GET-only live run: needs POST /profiles/{profileId}/batch-payments/{batchGroupId}/payments); batch_group.update.1 excluded (GET-only live run: needs PATCH /profiles/{profileId}/batch-groups/{batchGroupId}); batch_group.load.2 excluded (GET-only live run: reads a record only batch_group.create.0 gives)")

        if setup["live"]:
            for _live_key in ["profile01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via WISE_TEST_BATCH_GROUP_ENTID")
        client = setup["client"]

        if setup["live"]:
            runner.live_pace()
        # CREATE
        batch_group_ref01_ent = client.BatchGroup(None)
        batch_group_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.batch_group"), "batch_group_ref01"))
        batch_group_ref01_data["profile_id"] = setup["idmap"]["profile01"]

        batch_group_ref01_data = helpers.to_map(runner.entity_data(batch_group_ref01_ent.create(batch_group_ref01_data, None)))
        assert batch_group_ref01_data is not None
        assert batch_group_ref01_data["id"] is not None

        if setup["live"]:
            runner.live_pace()
        # UPDATE
        batch_group_ref01_data_up0_up = {
            "id": batch_group_ref01_data["id"],
            "profile_id": setup["idmap"]["profile_id"],
        }

        batch_group_ref01_markdef_up0_name = "fileName"
        batch_group_ref01_markdef_up0_value = "Mark01-batch_group_ref01_" + str(setup["now"])
        batch_group_ref01_data_up0_up[batch_group_ref01_markdef_up0_name] = batch_group_ref01_markdef_up0_value

        batch_group_ref01_resdata_up0 = helpers.to_map(runner.entity_data(batch_group_ref01_ent.update(batch_group_ref01_data_up0_up, None)))
        assert batch_group_ref01_resdata_up0 is not None
        assert runner.live_same_id(batch_group_ref01_resdata_up0.get("id"), batch_group_ref01_data_up0_up["id"])
        assert batch_group_ref01_resdata_up0[batch_group_ref01_markdef_up0_name] == batch_group_ref01_markdef_up0_value

        if setup["live"]:
            runner.live_pace()
        # LOAD
        batch_group_ref01_match_dt0 = {
            "id": batch_group_ref01_data["id"],
        }
        batch_group_ref01_match_dt0["profile_id"] = setup["idmap"].get("profile_id") or setup["idmap"].get("profile01")
        batch_group_ref01_data_dt0_loaded = batch_group_ref01_ent.load(batch_group_ref01_match_dt0, None)
        batch_group_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(batch_group_ref01_data_dt0_loaded))
        assert batch_group_ref01_data_dt0_load_result is not None
        assert runner.live_same_id(batch_group_ref01_data_dt0_load_result.get("id"), batch_group_ref01_data["id"])



def _batch_group_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/batch_group/BatchGroupTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = WiseSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["batch_group01", "batch_group02", "batch_group03", "profile01", "profile02", "profile03"],
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
        "WISE_TEST_BATCH_GROUP_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "WISE_TEST_BATCH_GROUP_ENTID": idmap,
        "WISE_TEST_LIVE": "FALSE",
        "WISE_TEST_EXPLAIN": "FALSE",
        "WISE_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("WISE_TEST_BATCH_GROUP_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)
    if idmap_resolved.get("profile_id") is None:
        idmap_resolved["profile_id"] = idmap_resolved.get("profile01")

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
