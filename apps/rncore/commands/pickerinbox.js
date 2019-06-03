import uuid from '../../../config/uuid'

export default {
  datetimepicker({maintransact}, uuidnum, year, month, day, hour, minute) {
    var due = year + (month < 9 ? "0" + (month + 1) : (month + 1)) + (day < 10 ? "0" + day : day) + "T" + (hour < 10 ? "0" + hour : hour) + (minute < 10 ? "0" + minute : minute) + "00" + "Z"
    maintransact([{
      uuid: uuidnum,
      due: due,
      confirmationid: uuid()
    }])
  },
  uponeproject({localtransact}) {
    localtransact([[':db.fn/retractEntity', ["id", "project"]]])
  },
  checkboxchange({}, values, add, remove, uuid) {
    values.indexOf(uuid) > -1 ? remove(uuid) : add(uuid)
  },
  removeproject({maintransact}, uuid, projid) {
      maintransact([[
        ':db/retract',
        ["uuid", uuid],
        "project",
        projid
        ]])
  },
  addtoproject({maintransact, localtransact}, projid, values, clear) {
    if (values.length < 1) {
      localtransact([{
        ':db/id': -1,
        project: projid,
        id: 'project',
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
