export default {
  keyupaddtask({conn, transact}, e) {
    if (e.which === 13) {
      var date = new Date().getTime()
      transact(conn, [{
        ':db/id': -1,
        description: e.target.value,
        date: `${date}`,
        status: `pending`,
        uuid: `uuid-${date}`
      }])
      e.target.value = ""
    }
  },
  tasksomedaymaybebutton({conn, transact, uuid}, e) {
    console.log(e)
    var date = new Date().getTime()
    transact(conn, [{
      uuid: e,
      wait: 'somedaymaybe',
      confirmationid: uuid()
    }])
  },
  datetimepicker({conn, transact}, uuid, year, month, day, hour, minute) {
    transact(conn, [{
      uuid: uuid,
      due: year + "-" + month + "-" + day + "-" + hour + "-" + minute
    }])
  },
  inboxstatecheckbox({conn, transact}, e) {
    transact(conn, [{
      "localstate/moduleid": "inbox",
      "localstate/selectlist": e
    }])
  },
  makeproject({conn, transact, uuid}, e) {
    transact(conn, [{
      type: "project",
      uuid: e,
      confirmationid: uuid()
    }])
  },
  placeinproject({conn, transact, uuid, datascript}, e) {
    var query = `[:find ?select :where
                  [?e "localstate/selectlist" ?select]
                  [?e "localstate/moduleid" "inbox"]]`
    var result = datascript.q(query, datascript.db(conn))
    result.forEach(x => {
      var confid = uuid()
      var obj = {
        uuid: x[0],
        project: e,
        confirmationid: confid
      }
      transact(conn, [obj])
    })
  }
}
