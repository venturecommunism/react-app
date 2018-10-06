export default {
  createtask({conn, transact}, text) {
    const uuid = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    var date = new Date().getTime().toString()
    transact(conn, [{
      ':db/id': -1,
      description: text,
      entry: date,
      status: 'pending',
      uuid: uuid(),
      confirmationid: uuid()
    }])
  },
}
