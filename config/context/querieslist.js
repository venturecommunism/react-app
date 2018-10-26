import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
import { componentdb } from '../lib/createDBConn'
const conn_components = componentdb()

const querieslist = () => {
  var querieslist = []
  const ql = datascript.q(`[:find ?query ?sortfields ?sortorders ?limit :where [?e "query" ?query] [?e "sortfields" ?sortfields] [?e "sortorders" ?sortorders] [?e "limit" ?limit]]`, datascript.db(conn_components))
  // querieslist might get more entries for data needed now versus later
  querieslist[0] = [...ql]
  return querieslist
}

export default querieslist
