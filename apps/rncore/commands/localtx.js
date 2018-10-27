import uuid from '../../../config/uuid'
import {datascript as ds} from 'datascript-mori'
import {parse} from 'datascript-mori'
const datascript = ds.js

export default {
  tx({globalstate, transact}, tx_data) {

const db = datascript.db(globalstate)
console.log(tx_data.stateref)
    const query = `[:find ?val ?uuid :where
[?e "${Object.keys(tx_data)[0]}" ?val]
[?e "uuid" ?uuid]
]
`
  const result = datascript.q(query, db)
  console.log(result)
    if (result.length > 0) {
      console.log(tx_data)
      transact(globalstate, [{
        ...tx_data,
        uuid: result[0][1],
        confirmationid: uuid()
      }])
    }

    if (result.length == 0) {
      console.log(tx_data)
      transact(globalstate, [{
        ...tx_data,
        uuid: uuid(),
        confirmationid: uuid()
      }])
    }
  },
}
