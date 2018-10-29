import { datascript as ds, mori, helpers } from 'datascript-mori'
import { connect, nextTx } from './rx-datascript'
const datascript = ds.js

import { maindb, localstate } from './lib/createDBConn'

const conn = maindb()
const globalstate = localstate() // global but not remote

const main = connect(datascript.db(conn))
const report$ = main.report$
const tx$ = main.tx$

const local = connect(datascript.db(globalstate))
const localreport$ = local.report$
const localtx$ = local.tx$

const maintransact = (data_to_add) => {
  console.log(data_to_add)
  return nextTx(tx$, helpers.entities_to_clj(data_to_add))
}
const localtransact = (data_to_add) => nextTx(localtx$, helpers.entities_to_clj(data_to_add))

export default datascript
export {
  conn,
  globalstate,
  connect,
  maintransact,
  localtransact,
  report$,
  tx$,
  localreport$,
  localtx$,
}
