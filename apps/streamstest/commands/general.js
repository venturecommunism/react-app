export default {
  test({conn, transact, uuid}) {
    var date = Math.floor(new Date().getTime() / 1000)
    transact(conn, [{
      ':db/id': -1,
      name: "Web Entry-" + date,
      uuid: uuid()
    }])
  },
}
