import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
import { maindb, fakedb } from './lib/createDBConn'

const clientonly = false
const conn = clientonly ? fakedb() : maindb()
import transact from './transact'

import { loadsyncpoint } from './context/persistence'
loadsyncpoint(conn)

/*****
* Elixir / Phoenix Channel
*/

import { receiveDataMessage } from './context/elixirmessage'
import uuid from './uuid'

import queries from './context/querieslist'
const querieslist = queries()

import {go, chan, take, put, timeout, putAsync} from 'js-csp'
import Channel from './context/phoenix-channel'
import config from './config'

const me = uuid()

var channel
let chData = chan()
let chAuth = chan()
let chUnPass = chan()
let chSyncpoint = chan()
var key

import { get } from 'idb-keyval'
get('syncpoint')
  .then(syncpoint => {
    syncpoint
    ?
    get(syncpoint)
      .then(letterpoint => {
        letterpoint ? putAsync(chSyncpoint, JSON.stringify(letterpoint)) : putAsync(chSyncpoint, 'none')
      })
    : putAsync(chSyncpoint, 'none')
  })
  .catch(err => {
    putAsync(chSyncpoint, 'none')
    console.log("maybe there is no syncpoint", err)
  })


// Data Communicating Sequential Processes. Takes JWT from the Auth CSP and sets up the Elixir channel (server only)
go(function* () {
  //
  // these lines determine whether the jwt key comes from config.jwt or the chData channel
  //
  // localStorage.removeItem('key')
  // putAsync(chUnPass, {email: config.username, password: config.password})
  // key = yield localStorage.getItem('key') || take(chData)
  var key = config.jwt
  // console.log('key is:', key)

  var syncpoint = yield take(chSyncpoint)

  var user = me
  var msg = {jwt: key, syncpoint: syncpoint, subscription: querieslist}
  const ex_data_channel = Channel(config.url, "datomic:" + user, user, receiveDataMessage, chData, conn, key)
  yield timeout(1000)
  ex_data_channel.send(msg)
  console.log('yield take chData', yield take(chData))
  // console.log('end data go function')
  channel = ex_data_channel
})

// Authentication Communicating Sequential Process. Puts a JWT on the Data CSP.
go(function* () {
  // putAsync is more Communicating Sequential Processes but from outside Go functions
  const receiveAuthMessage = (conn, message) => {
    // console.log('message', message)
    putAsync(chAuth, message)
  }
  if (!localStorage.getItem('key')) {
    // console.log('step 1')
    var user = me
    var msg = yield take(chUnPass)
    console.log('yield take chUnPass', msg)
    // var msg = {email: 'john@phoenix-trello.com', password: '12345678'}
    const ex_auth_channel = Channel(config.url, "auth:" + user, user, receiveAuthMessage, chAuth, conn)
    yield timeout(1000)
    ex_auth_channel.send(msg)
    console.log('yield take chAuth', yield take(chAuth))
    var value = yield take(chAuth)
    localStorage.setItem('key', value.jwt)
    yield put(chData, localStorage.getItem('key'))
  }
})

/*****
* End Elixir / Phoenix Channel
*/

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

  channel.send
  ? channel.send({data: tx_data_modded, meta: report.tx_meta, confirmationid: report.tx_data.confirmationid})
  : console.log('there is no channel')
})

export const initContext = () => {
  return {
    conn: conn,
    transact: transact,
  }
}
