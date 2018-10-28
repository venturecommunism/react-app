import uuid from '../../../config/uuid'
import {datascript as ds, mori, helpers} from 'datascript-mori'
const {vector} = mori
const {DB_ADD} = helpers
const datascript = ds.js

export default {
  tx({tx$, nextTx}, tx_data) {
    nextTx(tx$, vector(
      vector(DB_ADD, -1, `uuid`, uuid()),
      vector(DB_ADD, -1, `something`, `Ivan`)
    ))

    nextTx(tx$, vector(
      vector(DB_ADD, -1, `uuid`, uuid()),
      vector(DB_ADD, -1, `something`, `Jeremy`)
    ))

    nextTx(tx$,     helpers.entities_to_clj([{
      ":db/id": -2,
      uuid: uuid(),
      something: "Splotsky",
      "aka": ["X", "Y"]
    }]))
  },
}
