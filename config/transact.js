import datascript from 'datascript'

const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const transact = (conn, data_to_add, meta) => {
// disable metadata to test transactions locally
  var confid = uuid()
  if (!meta) {
    var meta = {
      type: "basic transaction",
      confirmationid: confid
    }
  }

if (meta.type != "basic transaction") console.log(meta)

//  console.log('data_to_add', data_to_add)
//  console.log('zeroing in', data_to_add[0].uuid)
  data_to_add.map(datom => {
    datom.confirmationid = confid
    datom
  })
//  console.log('confirmationid', data_to_add[0].confirmationid)
  var tx_report = datascript.transact(conn, data_to_add, meta)
  console.log(tx_report)
  // console.log('tmpid', tx_report.tempids)
  //  console.log('resolved tempid', datascript.resolve_tempid(tx_report.tempids, -1))
}

export default transact
