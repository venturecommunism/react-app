import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

import multisort from './lib/multisort'

const dataComposer = ({ context, moduleid }, onData) => {
  // pull in the datascript connection and log of previous transactions from the context (see mantra spec for what the context is)
  const {conn, conn_components, log} = context()

  // get the database from the connection
  var db = datascript.db(conn)
  var db_components = datascript.db(conn_components)

  // a query to pull in the module, its root component and its data query. more later
  const cQuery = `
    [:find ?query
     :where [?e2 "query" ?query]
            [?e2 "componentid" ?compid]
            [?e "rootcomponent" ?e2]
            [?e "moduleid" "${moduleid}"]]`

  // arguments to a components query
  const cArgs = [cQuery, db_components]
  // fetching the query you actually want from the query about components
  const query = datascript.q(...cArgs)[0][0]
  // arguments for the actual query we want
  const qArgs = [query, db]

  // recursive multidimensional array sort being formed. TODO: change the structure to match datascript output (arrays all the way down)
  try {
    const pullquery = `
      [:find (pull $x ?e ["componentsname", "componentstype", "componentsfunction", {"_componentsparents" ...}]) :in $x :where [$x ?e "componentsname" "Root"]]
    `
    var pullcomponents = datascript.q(...[pullquery, db_components])[0]
    var result = multisort.arr.multisort(datascript.q(...qArgs), [2, 0], ['DESC', 'ASC'])
    onData(null, {result, pullcomponents})
  } catch (error) {
    alert(error)
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
