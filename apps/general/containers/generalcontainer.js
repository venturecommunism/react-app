import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, componentid }, onData) => {
  const {conn, log} = context()

  var db = datascript.db(conn)

  const cQuery = `
    [:find ?query
     :where [?e "query" ?query]
            [?e "componentid" "${componentid}"]]`
  const cArgs = [cQuery, db]
  const query = datascript.q(...cArgs)[0][0]
  const qArgs = [query, db]

  try {
    function generalsort(array, index) {
      function sortfunction(a,b) {
        if (index[0] >= 1) {
alert('POSITIVE SORT')
          return a[index[0]] > b[index[0]]
        } else {
alert('NEGATIVE SORT')
          // do reverse sorting if the number is negative
          index[0] = Math.abs(index[0])
          return b[index[0]] > a[index[0]]
        }
      }
      if (index.length <= 1) {
alert('index length 1 or less')
        return array.sort(sortfunction)
      }
      else {
alert('index length greater or equal to 1')
        var newarray = array.sort(sortfunction)
alert(array)
alert(newarray)
        return generalsort(newarray, index.slice(1, index.length)) 
      }
    }
    var result = generalsort(datascript.q(...qArgs), [-1, -1])
    onData(null, {result})
  } catch (error) {
    alert(error)
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
