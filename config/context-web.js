import { setItem } from './context/persistence2'

import datascript, { report$, maintransact, localreport$, localtransact, mori, helpers } from './datascript'

import uuid from './uuid'
const me = uuid()
import config from './config'

import ql from './context/querieslist'
const querieslist = ql()

var maindb
var localdb
report$.subscribe(report => maindb = mori.get(report, helpers.DB_AFTER))
localreport$.subscribe(report => localdb = mori.get(report, helpers.DB_AFTER))

import { DataChannel, AuthChannel } from './context/phoenix-channel'
const ex_data = DataChannel(config.url, "datomic", me)
const ex_auth = AuthChannel(config.url, "auth", me, localreport$)

const connectionstate = (newstate) => {
  console.log('newstate', newstate)
  localtransact([{
    ':db/id': -1,
    status: newstate,
    id: 'status',
  }])
}

var channel

import { receiveDataMessage } from './context/elixirmessage'

const online = (maindb, maintransact, msg, me, username) => {
  connectionstate("online")
  receiveDataMessage(maindb, maintransact, msg, me, username)
}

const datasync = (chan, jwt) => {
  // why test for chan.send? is there no chan after a join or ok?
  chan.type   == 'join' && chan.send       ? chan.send({username: "someone@somewhere.com", jwt: jwt, syncpoint: chan.syncpoint == 'none' ? chan.syncpoint : JSON.stringify(chan.syncpoint), subscription: querieslist})
  : chan.type == 'new:msg'                 ? online(maindb, maintransact, chan.msg, me)
  : chan.type == 'timeout'                 ? console.log('timeout ', chan.room, ": ", chan.error)
  : chan.type   == 'ok'                    ? online(maindb, maintransact, {ok: chan.msg}, me)
  : chan.type  == 'error'                  ? connectionstate(chan.error)
  : console.log('no match: ', chan.type)

  // how do i not do this
  if (chan.send && !channel) {
    channel = chan
  }
}

ex_auth.subscribe(chan =>
  chan.type   == 'join'         ? chan.send(chan.auth_join_msg)
  : chan.type == 'timeout'      ? connectionstate('timeout')
  : chan.type == 'msg'          ? setItem('token', chan.msg.jwt) &&  ex_data.subscribe(datachannel => datasync(datachannel, chan.msg.jwt, chan.auth_join_msg.email))
  : chan.type == 'ok'           ? connectionstate('connecting...')
  : chan.error                  ? connectionstate('offline (timeout)')
  : console.log('no match: ', chan.type)
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
    localreport$: localreport$,
    localtransact: localtransact,
    maindb: maindb,
    localdb: localdb,
  }
}
