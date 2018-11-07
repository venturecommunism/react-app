import uuid from '../../../config/uuid'
import {datascript as ds} from 'datascript-mori'
import {parse} from 'datascript-mori'
const datascript = ds.js

export default {
  tx({localtransact, localdb}, tx_data) {

const db = localdb
    const query = `[:find ?val ?uuid :where
[?e "${Object.keys(tx_data)[0]}" ?val]
[?e "uuid" ?uuid]
]
`
  const result = datascript.q(query, db)
  console.log(result)
    if (result.length > 0) {
      console.log(tx_data)
      localtransact([{
        ...tx_data,
        uuid: result[0][1],
        confirmationid: uuid()
      }])
    }

    if (result.length == 0) {
      console.log(tx_data)
      localtransact([{
        ...tx_data,
        uuid: uuid(),
        confirmationid: uuid()
      }])
    }
  },
}
