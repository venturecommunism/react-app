import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  const qArgs = [query, db]
  try {
    function generalsort(array, index) {
      function sortfunction(a,b) {
        return a[index] > b[index]
      }
      return array.sort(sortfunction)
    }
    var result = generalsort(generalsort(datascript.q(...qArgs), 12), 5)
    onData(null, {result})
  } catch (error) {
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
