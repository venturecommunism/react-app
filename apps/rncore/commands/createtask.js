import uuid from '../../../config/uuid'

export default {
  createtask({maintransact}, text) {
    var date = new Date().getTime().toString()
    maintransact([{
      ':db/id': -1,
      description: text,
      entry: date,
      status: 'pending',
      uuid: uuid(),
      confirmationid: uuid()
    }])
  },
}
