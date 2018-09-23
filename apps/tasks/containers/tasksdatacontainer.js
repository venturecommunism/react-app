import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, query }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  const qArgs = [query, db]
  try {
    function generalsort(array, index) {
      function sortfunction(a,b) {
        if (index[0] >= 1) {
          return a[index[0]] > b[index[0]]
        } else {
          // do reverse sorting if the number is negative
          index[0] = Math.abs(index[0])
          return b[index[0]] > a[index[0]]
        }
      }
      if (index.length <= 1) {
        return array.sort(sortfunction)
      }
      else {
        return generalsort(array.sort(sortfunction), index.slice(1, index.length)) 
      }
    }
    var result = generalsort(datascript.q(...qArgs), [12,-5])
    onData(null, {result})
  } catch (error) {
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
