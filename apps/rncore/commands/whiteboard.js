import uuid from '../../../config/uuid'

export default {
  selectcontext({maintransact}, thisitem, contextuuid) {
    maintransact([{
      uuid: thisitem.uuid,
      context: contextuuid,
      confirmationid: uuid(),
    }])
  },
}
