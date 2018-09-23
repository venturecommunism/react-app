import { BunyanLogger } from '../../../../app/core/logger/concrete/bunyanLogger'
import test from 'ava'
import sinon from 'sinon'

test.beforeEach(t => {
  t.context.logger = new BunyanLogger({name: 'app'})
})

test('BunyanLogger#info', t => {
  sinon.spy(t.context.logger.logger, 'info')
  t.context.logger.logger.info('Info level')
  t.true(t.context.logger.logger.info.calledWith('Info level'))
  sinon.restore()
})

test('BunyanLogger#debug', t => {
  sinon.spy(t.context.logger.logger, 'debug')
  t.context.logger.logger.debug('Debug level')
  t.true(t.context.logger.logger.debug.calledWith('Debug level'))
  sinon.restore()
})

test('BunyanLogger#warn', t => {
  sinon.spy(t.context.logger.logger, 'warn')
  t.context.logger.logger.warn('Warn level')
  t.true(t.context.logger.logger.warn.calledWith('Warn level'))
  sinon.restore()
})

test('BunyanLogger#error', t => {
  sinon.spy(t.context.logger.logger, 'error')
  t.context.logger.logger.error('Error level')
  t.true(t.context.logger.logger.error.calledWith('Error level'))
  sinon.restore()
})
