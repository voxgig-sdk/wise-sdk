# Wise SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/debug_feature'
require_relative 'feature/idempotency_feature'
require_relative 'feature/metrics_feature'
require_relative 'feature/paging_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/secrets_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WiseFeatures
  def self.make_feature(name)
    case name
    when "base"
      WiseBaseFeature.new
    when "debug"
      WiseDebugFeature.new
    when "idempotency"
      WiseIdempotencyFeature.new
    when "metrics"
      WiseMetricsFeature.new
    when "paging"
      WisePagingFeature.new
    when "ratelimit"
      WiseRatelimitFeature.new
    when "retry"
      WiseRetryFeature.new
    when "secrets"
      WiseSecretsFeature.new
    when "test"
      WiseTestFeature.new
    when "timeout"
      WiseTimeoutFeature.new
    else
      WiseBaseFeature.new
    end
  end
end
