# Wise SDK utility: prepare_body
require_relative 'media'
module WiseUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return WiseUtilities.raw_body(ctx.reqdata) if WiseUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
