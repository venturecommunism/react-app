import { setItem } from './context/persistence2'

import datascript, { report$, maintransact, localreport$, localtransact, mori, helpers } from './datascript'

import uuid from './uuid'
const me = uuid()
import config from './config'

import { loadsyncpoint } from './context/persistence'
loadsyncpoint(maintransact)

import { DataChannel, AuthChannel } from './context/phoenix-channel'
const ex_data = DataChannel(config.url, "datomic", me)
const ex_auth = AuthChannel(config.url, "auth", me)

import ql from './context/querieslist'
const querieslist = ql()

var datascript_db
report$.subscribe(report => {
  datascript_db = mori.get(report, helpers.DB_AFTER)
})

var channel

import { receiveDataMessage } from './context/elixirmessage'

const datasync = (chan, jwt) => {
  // why test for chan.send? is there no chan after a join or ok?
  chan.type   == 'join' && chan.send       ? chan.send({jwt: jwt, syncpoint: chan.syncpoint, subscription: querieslist})
  : chan.type == 'new:msg'                 ? receiveDataMessage(datascript_db, maintransact, chan.msg, me)
  : chan.type == 'timeout'                 ? console.log('timeout ', chan.room, ": ", chan.error)
//  : chan.type   == 'ok'  && chan.send      ? chan.send({jwt: jwt, syncpoint: chan.msg.syncpoint, subscription: querieslist})
//  : chan.type == 'ok'                      ? console.log('ok', chan)
  : chan.type   == 'ok'                    ? receiveDataMessage(datascript_db, maintransact, {ok: chan.msg}, me)
  : console.log("finally", chan)

  chan && chan.msg ? console.log('chan and chan.msg') : ''
  // how do i not do this
  if (chan.send && !channel) {
    channel = chan
  }
}

ex_auth.subscribe(chan =>
  chan.type   == 'join'         ? chan.send({email: config.username, password: config.password})
  : chan.type == 'timeout'      ? console.log('timeout ', chan.room, ": ", chan.error)
  : chan.type == 'msg'          ? setItem('token', chan.msg.jwt) &&  ex_data.subscribe(datachannel => datasync(datachannel, chan.msg.jwt))
  : chan.type == 'ok'           ? console.log('ok')
  : chan.error                  ? console.log(chan.error)
  : console.log(channel.type)
)

report$.subscribe(r => {
  var report = {}
  report.tx_meta = {}
  mori.toJs(mori.get(r, helpers.TX_META)).forEach( item =>
    report.tx_meta[item[0]] = item[1]
  )
  report.tx_data = mori.toJs(mori.get(r, helpers.TX_DATA))

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

  channel && channel.send
  ? channel.send({data: tx_data_modded, meta: report.tx_meta, confirmationid: report.tx_data.confirmationid})
  : console.log('there is no channel')
})

export const initContext = () => {
  return {
    report$: report$,
    maintransact: maintransact,
  }
}
