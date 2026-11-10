# Wise SDK exists test

require "minitest/autorun"
require_relative "../Wise_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = WiseSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
