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
  addtoproject({conn, transact, uuid}, projid, values, clear) {
    if (values.length < 1) {
      alert('empty')
    } else {
    values.map(item =>
      transact(conn, [{
        ':db/id': -1,
        project: projid,
        uuid: item
      }])
    )
    clear()
    }
  }
}
