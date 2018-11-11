import uuid from '../../../config/uuid'

export default {
  checkitem({}, uuid) {
    console.log(JSON.stringify(uuid))
  },
  dostuff({}, values, add, remove, uuid) {
    values.indexOf(uuid) > -1 ? remove(uuid) : add(uuid)
  },
  removeall({}, clear) {
    clear()
  },
  addtoproject({maintransact, localtransact}, projid, values, clear) {
    if (values.length < 1) {
      localtransact([{
        ':db/id': -1,
        project: projid,
      }])
    } else {
    values.map(item =>
      maintransact([{
        ':db/id': -1,
        project: projid,
        uuid: item,
        confirmationid: uuid()
      }])
    )
    clear()
    }
  }
}
