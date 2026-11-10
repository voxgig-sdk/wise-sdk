# BalanceStatement direct test

import json
import os
import pytest

from wise_sdk.utility.voxgig_struct import voxgig_struct as vs
from wise_sdk import WiseSDK
from wise_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestBalanceStatementDirect:

    def test_should_direct_load_balance_statement(self):
        setup = _balance_statement_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-balance_statement", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        if setup["live"]:
            runner.live_pace()
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            query["currency"] = "EUR"
            query["intervalEnd"] = "2025-04-30T23:59:59.999Z"
            query["intervalStart"] = "2025-03-01T00:00:00.000Z"
            params["id"] = 64
            params["profile_id"] = 12345
            pass
        else:
            params["id"] = "direct01"
            params["profile_id"] = "direct02"
            pass

        result = client.direct({
            "path": "profiles/{profile_id}/balance-statements/{id}/statement.json",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _balance_statement_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "WISE_TEST_BALANCE_STATEMENT_ENTID": {},
        "WISE_TEST_LIVE": "FALSE",
        "WISE_APIKEY": "",
    })

    live = env.get("WISE_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
            "apikey": env.get("WISE_APIKEY"),
        })
        client = WiseSDK(merged_opts)
        idmap = env.get("WISE_TEST_BALANCE_STATEMENT_ENTID")
        # A path parameter's example stands in for an id *_ENTID does not give.
        idmap = {"balance_statement01": 64, "profile01": 12345,
                 **(idmap if isinstance(idmap, dict) else {})}
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = WiseSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }
