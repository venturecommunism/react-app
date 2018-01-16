import { ConfReader } from '../../../app/core/conf/confReader'
import test from 'ava'

test.beforeEach(t => {
  t.context.confReader = new ConfReader()
})

test('Expect database name to equals "test" when reading the dev.yml conf file', t => {
  const devConf = t.context.confReader.read('./src/conf/dev.yml')
  t.is(devConf.database.name, 'test')
})

test('Expect database "unknown" props to equals equals undefined', t => {
  const devConf = t.context.confReader.read('./src/conf/dev.yml')
  t.is(devConf.database.unknown, undefined)
})

test('Expect the reading result of an unknown configuration file to equal null', t => {
  const unknownConf = t.context.confReader.read('./src/conf/unknown.yml')
  t.is(unknownConf, null)
})
