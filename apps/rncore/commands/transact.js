import uuid from '../../../config/uuid'

export default {
  tx({maintransact}, tx_data, id) {
    console.log(tx_data)
    maintransact([{
      ...tx_data,
      uuid: id,
      confirmationid: uuid()
    }])
  },
}
