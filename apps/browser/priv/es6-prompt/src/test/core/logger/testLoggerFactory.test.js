import { LoggerFactory } from '../../../app/core/logger/loggerFactory'
import { BunyanLogger } from '../../../app/core/logger/concrete/bunyanLogger'
import test from 'ava'

test('Expect logger to equals null when trying to get "unknown"', t => {
  t.is(LoggerFactory.get('unknown'), null)
})

test('Expect logger instanceof to equals BunyanLogger', t => {
  t.true(LoggerFactory.get('bunyan', {name: 'my-app'}) instanceof BunyanLogger)
})
