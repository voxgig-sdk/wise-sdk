# Wise SDK utility: make_context
require_relative '../core/context'
module WiseUtilities
  MakeContext = ->(ctxmap, basectx) {
    WiseContext.new(ctxmap, basectx)
  }
end
