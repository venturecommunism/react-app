import uuid from '../../../config/uuid'

export default {
  addtogroup({maintransact}, text) {
    var date = new Date().getTime().toString()
    maintransact([{
      ':db/id': -1,
      description: text,
      entry: date,
      status: 'pending',
      uuid: uuid(),
      confirmationid: uuid(),
      group: 'somegroup',
    }])
  },
  createtask({maintransact}, text, user) {
    var date = new Date().getTime().toString()
    maintransact([{
      ':db/id': -1,
      description: text,
      entry: date,
      status: 'pending',
      uuid: uuid(),
      confirmationid: uuid(),
      owner: user,
      group: user,
    }])
  },
}
