# Wise SDK feature factory

from wise_sdk.feature.base_feature import WiseBaseFeature
from wise_sdk.feature.debug_feature import WiseDebugFeature
from wise_sdk.feature.idempotency_feature import WiseIdempotencyFeature
from wise_sdk.feature.metrics_feature import WiseMetricsFeature
from wise_sdk.feature.paging_feature import WisePagingFeature
from wise_sdk.feature.ratelimit_feature import WiseRatelimitFeature
from wise_sdk.feature.retry_feature import WiseRetryFeature
from wise_sdk.feature.secrets_feature import WiseSecretsFeature
from wise_sdk.feature.test_feature import WiseTestFeature
from wise_sdk.feature.timeout_feature import WiseTimeoutFeature


_FEATURES = {
    "base": lambda: WiseBaseFeature(),
    "debug": lambda: WiseDebugFeature(),
    "idempotency": lambda: WiseIdempotencyFeature(),
    "metrics": lambda: WiseMetricsFeature(),
    "paging": lambda: WisePagingFeature(),
    "ratelimit": lambda: WiseRatelimitFeature(),
    "retry": lambda: WiseRetryFeature(),
    "secrets": lambda: WiseSecretsFeature(),
    "test": lambda: WiseTestFeature(),
    "timeout": lambda: WiseTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
