# Wise SDK exists test

import pytest
from wise_sdk import WiseSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WiseSDK.test(None, None)
        assert testsdk is not None
