import { AppRegistry } from 'react-native'

import datascript from 'datascript'
import { maindb, fakedb } from './lib/createDBConn'

const clientonly = false
const conn = clientonly ? fakedb() : maindb()
import transact from './transact'

import setchannel from './context/channel-mobile'
var channel
if (clientonly) {
  channel = {}
  channel.send = function () {
    console.log('set clientonly to false in order to actually send')
  }
} else {
  channel = setchannel(conn)
}

datascript.listen(conn, {channel}, function(report) {
  // adds a uuid. sync doesn't work without it
  if (report.tx_meta.uuid) {
    var newreportforuuid = {}
    newreportforuuid.C = report.tx_data[0].C
    newreportforuuid.m = report.tx_data[0].m
    newreportforuuid.tx = report.tx_data[0].tx
    newreportforuuid.added = true
    newreportforuuid.e = report.tx_data[0].e
    newreportforuuid.a = "uuid"
    newreportforuuid.v = report.tx_meta.uuid
    report.tx_data.push(newreportforuuid)
  }

  // if there's metadata but it's got remoteuser or secrets tags, then don't transact it
  if (report.tx_meta && (report.tx_meta.remoteuser || report.tx_meta.secrets)) return

  // removes the confirmationid from the transaction itself since the server only needs it in meta
  var tx_data_modded = report.tx_data.filter( s => {
    return s.a != 'confirmationid'
  })

  channel.send({data: tx_data_modded, meta: report.tx_meta, confirmationid: report.tx_data.confirmationid})
})

export const initContext = () => {
  return {
    conn: conn,
    transact: transact,
    AppRegistry: AppRegistry,
  }
}
