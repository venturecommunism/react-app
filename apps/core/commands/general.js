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
}
