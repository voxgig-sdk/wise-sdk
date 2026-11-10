# Wise SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

WiseUtility.registrar = ->(u) {
  u.clean = WiseUtilities::Clean
  u.clean_add = WiseUtilities::CleanAdd
  u.clean_explain = WiseUtilities::CleanExplain
  u.done = WiseUtilities::Done
  u.make_error = WiseUtilities::MakeError
  u.feature_add = WiseUtilities::FeatureAdd
  u.feature_hook = WiseUtilities::FeatureHook
  u.feature_init = WiseUtilities::FeatureInit
  u.fetcher = WiseUtilities::Fetcher
  u.make_fetch_def = WiseUtilities::MakeFetchDef
  u.make_context = WiseUtilities::MakeContext
  u.make_options = WiseUtilities::MakeOptions
  u.make_request = WiseUtilities::MakeRequest
  u.make_response = WiseUtilities::MakeResponse
  u.make_result = WiseUtilities::MakeResult
  u.make_point = WiseUtilities::MakePoint
  u.make_spec = WiseUtilities::MakeSpec
  u.make_url = WiseUtilities::MakeUrl
  u.param = WiseUtilities::Param
  u.prepare_auth = WiseUtilities::PrepareAuth
  u.prepare_body = WiseUtilities::PrepareBody
  u.prepare_headers = WiseUtilities::PrepareHeaders
  u.prepare_method = WiseUtilities::PrepareMethod
  u.prepare_params = WiseUtilities::PrepareParams
  u.prepare_path = WiseUtilities::PreparePath
  u.prepare_query = WiseUtilities::PrepareQuery
  u.graphql_body = WiseUtilities::GraphqlBody
  u.graphql_errors = WiseUtilities::GraphqlErrors
  u.result_basic = WiseUtilities::ResultBasic
  u.result_body = WiseUtilities::ResultBody
  u.result_headers = WiseUtilities::ResultHeaders
  u.transform_request = WiseUtilities::TransformRequest
  u.transform_response = WiseUtilities::TransformResponse
}
