import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  const qArgs = [query, db]
  try {
    var result = datascript.q(...qArgs)
    onData(null, {result})
  } catch (error) {
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
