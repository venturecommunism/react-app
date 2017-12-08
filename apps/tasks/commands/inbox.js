export default {
  add_new_task_to_inbox({conn, transact}) {
    transact(conn, [{
      ':db/id': -1,
      description: `Follower of Jane ${new Date().getTime()}`,
      date: `${new Date().getTime()}`
    }])
  },
}
