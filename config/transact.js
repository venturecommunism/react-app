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
  var tx_uuid = data_to_add[0].uuid
  if (!meta) {
    var meta = {
      type: "basic transaction",
      confirmationid: confid,
      uuid: tx_uuid
    }
  }

if (meta.type != "basic transaction") console.log(meta)

// if the transaction has any attribute that begins with localstate/ then we don't send it to the server
if (data_to_add.some(r => {
  if (Object.keys(r).some(x=>x.match(/^localstate\//i))) return true
})) {
  meta.secrets = "local transaction"
  data_to_add[0].uuid = "6497bbee-9739-42a0-908c-c49fc3d6a07d"
}

if (meta.type == "basic transaction" && data_to_add.some(r => {
  if (Object.keys(r).every(x => x != 'uuid')) {
    return true
  }
})) {
  console.log("problem data", data_to_add)
  alert("can't transact")
  return
}

//  console.log('zeroing in', data_to_add[0].uuid)
  data_to_add.map(datom => {
    datom.confirmationid = confid
    tx_uuid ? datom.uuid = tx_uuid : ''
    datom
  })
//  console.log('confirmationid', data_to_add[0].confirmationid)
  var tx_report = datascript.transact(conn, data_to_add, meta)
  console.log(tx_report)
  // console.log('tmpid', tx_report.tempids)
  //  console.log('resolved tempid', datascript.resolve_tempid(tx_report.tempids, -1))
}

export default transact
