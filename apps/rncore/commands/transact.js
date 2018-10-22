import uuid from '../../../config/uuid'

export default {
  tx({conn, transact}, tx_data, id) {
    console.log(tx_data)
    transact(conn, [{
      ...tx_data,
      uuid: id,
      confirmationid: uuid()
    }])
  },
}
