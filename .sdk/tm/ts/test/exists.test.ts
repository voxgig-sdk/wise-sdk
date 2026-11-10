
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { WiseSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = WiseSDK.test()
    equal(testsdk instanceof WiseSDK, true,
      'WiseSDK.test() must return a client synchronously')
  })

})
