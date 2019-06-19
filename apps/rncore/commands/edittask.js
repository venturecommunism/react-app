import uuid from '../../../config/uuid'

export default {
  edittask({maintransact}, text, uuidnum) {
    maintransact([{
      description: text,
      uuid: uuidnum,
      confirmationid: uuid(),
    }])
  },
}
