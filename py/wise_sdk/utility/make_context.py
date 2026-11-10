# Wise SDK utility: make_context

from wise_sdk.core.context import WiseContext


def make_context_util(ctxmap, basectx):
    return WiseContext(ctxmap, basectx)
