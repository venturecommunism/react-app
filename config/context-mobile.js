import { setItem, getItem, getKeys } from './context/persistence2'

import datascript, { tx$, validtx$, report$, maintransact, localreport$, localtransact, mori, helpers } from './datascript'

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
const ex_data = DataChannel(config.url, "datomic", me, localreport$)
const ex_auth = AuthChannel(config.url, "auth", me, localreport$, maintransact)

const connectionstate = (newstate) => {
  // console.log('newstate', newstate)
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

const sync = (chan, username, jwt) => {
  var thekeys
  getKeys().then(keys => {
    thekeys = keys
    var filteredarray = thekeys.filter( (item) => {
      if (typeof item == 'string') {
        if (item.match(/^offlinetxn/g)) return true
      } else {
        return false
      }
    })
    // console.log("filtered array", filteredarray)
    filteredarray.forEach( item => {
      getItem(item).then( output => {
        var data = JSON.parse(output)
        channel.send({data: data[0], meta: data[1], confirmationid: data[2]})
      })
    })
  })


  var thekeys
  getKeys().then(keys => {

    thekeys = keys
    var filteredarray = thekeys.filter( (item) => {
      if (typeof item == 'string') {
        var re = new RegExp(username+'-syncpoint-')
        if (item.match(re, ["i"])) return true
      } else {
        return false
      }
    })
    // console.log("sync filtered array", filteredarray)
    var removal = username+'-syncpoint-'
//    var syncspot = filteredarray.length > 0 ? filteredarray.sort().reverse()[0].slice(removal.length) : 'none'
    // console.log("syncspot", syncspot)
    var syncspot = 'none'
    chan.send({username: username, jwt: jwt, syncpoint: syncspot == 'none' ? syncspot : syncspot, subscription: querieslist})
  })
}

const datasync = (chan, jwt, username) => {
  // why test for chan.send? is there no chan after a join or ok?
  chan.type   == 'join' && chan.send       ? sync(chan, username, jwt)
  : chan.type == 'new:msg'                 ? online(maindb, maintransact, chan.msg, me, username)
  : chan.type == 'timeout'                 ? console.log('timeout ', chan.room, ": ", chan.error)
  : chan.type   == 'ok'                    ? online(maindb, maintransact, {ok: chan.msg}, me, username)
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

validtx$.subscribe(r => {
  if (r == undefined) return

  var report = {}
  report.tx_meta = r[1]
  report.tx_data = r[0]

/*
  if (report.tx_meta && report.tx_meta.uuid) {
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
*/

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
