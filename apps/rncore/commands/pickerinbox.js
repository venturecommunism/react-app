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
  addtoproject({conn, transact}, projid, values, clear, set_theproject) {
    if (values.length < 1) {
      set_theproject(projid)
    } else {
    set_theproject(projid)
    values.map(item =>
      transact(conn, [{
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
