export default {
  create_task({conn, transact}, text) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: text,
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
  },
}
