export default {
  add_new_task_to_inbox({conn, transact}) {
    var date = new Date().getTime()
    transact(conn, [{
      ':db/id': -1,
      description: `Follower of Jane ${date}`,
      date: `${date}`,
      status: `pending`,
      uuid: `uuid-${date}`
    }])
  },
}
