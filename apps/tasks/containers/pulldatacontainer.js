import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const pullDataComposer = ({ context, pullquery }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  try {
    //this one shows how the query would be done if we weren't using backticks
    //var result = datascript.pull_many(db, '["name", {"_follows" ...}]', [['name', 'Jane']])
    var result = datascript.pull_many(db, ...eval(pullquery))
    onData(null, {result})
  } catch (error) {
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(pullDataComposer),
  useDeps()
)(component)
