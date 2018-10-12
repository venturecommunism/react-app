// Datascript things
import datascript from 'datascript'
import {maindb, fakedb, componentdb} from './lib/createDBConn'

const clientonly = false
const conn = clientonly ? fakedb() : maindb()
const conn_components = componentdb()
// const transact = datascript.transact
// Transaction function maintains the log (for time travel, undo, etc.)
import transact from './transact'
import uuid from './uuid'

var querieslist = []
const ql = datascript.q(`[:find ?query ?sortfields ?sortorders ?limit :where [?e "query" ?query] [?e "sortfields" ?sortfields] [?e "sortorders" ?sortorders] [?e "limit" ?limit]]`, datascript.db(conn_components))
// querieslist might get more entries for data needed now versus later
querieslist[0] = [...ql]

// Elixir / Phoenix Channels things
import {go, chan, take, put, timeout, putAsync} from 'js-csp'
import Channel from './channel'
import config from './config'

// Generates random-ish names
const NAMES = ['Girl', 'Boy', 'Horse', 'Foo', 'Face', 'Giant', 'Super', 'Bug', 'Captain', 'Lazer']
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min
const getRandomName = () => NAMES[getRandomInt(0, NAMES.length)]
const getRandomUser = () => `${ getRandomName() }${ getRandomName() }${ getRandomName() }`
const me = getRandomUser()

// Transaction log, transaction metadata, connected peers (not used yet),
// data channel for elixir/phoenix, a Data CSP and Auth CSP
var log = []
var meta = []
var peers = []
var channel
let chData = chan()
let chAuth = chan()
let chUnPass = chan()
var key

// Fires when we receive a message on the Elixir data channel
const receiveDataMessage = (conn, message) => {
  if ('ok' in message && 'confirmationid' in message.ok.msg) {
    var confirmationid = message['ok']['msg']['confirmationid']
    var stringconfirmationid = JSON.stringify(confirmationid)

    var confirmedquery = `[:find ?e
                           :where [?e "confirmationid" ${stringconfirmationid}]]`
    var confirmeddb = datascript.db(conn)
    const confirmedqArgs = [confirmedquery, confirmeddb]
    var result = datascript.q(...confirmedqArgs)
    var confirmedent = result[0][0]

    var report_id_confirmed_tx = [[':db/retract', confirmedent, 'confirmationid', confirmationid]]
    transact(conn, report_id_confirmed_tx, {'remoteuser': 'server confirmation'})
  }
  if ('ok' in message) return
  const user = message.user
  const isMe = (someUser) => me === someUser
  console.log('ELIXIR OBJECT', message)
//  console.log('ELIXIR MSG', JSON.stringify(message))

  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

    if (message.user === 'system') {
      function org_transaction(s) {
        return [':db/add', s.e, s.a, s.v]
      }

      function add_remoteeids(s) {
        return [':db/add', s.e, 'dat.sync.remote.db/id', s.e]
      }

      function sort_func(a, b) {
        return b.tx - a.tx
      }

      var sorted_body = message.body.sort(sort_func)

      var tx_id = message.body[0].tx
      var bool_val = true
      message.body.map( s => s.tx !== tx_id ? bool_val = false : '')
      if (bool_val === true) {
        var single_tx = [[':db/add', 0, 'app/sync', tx_id]]
        message.body.map(s => {
          single_tx.push(org_transaction(s))
          single_tx.push(add_remoteeids(s))
        })
        transact(conn, single_tx, {'remoteuser': message.user})
        return
      }

      function recurse_array(whole, part) {
        if ((whole.length < 0 || part.length > 0) && whole[whole.length - 1].tx !== part[part.length - 1].tx) {
          var tx_id = part[0].tx
          var array_of_arrays = [[':db/add', 0, 'app/sync', tx_id]]
          part.map(s => array_of_arrays.push(org_transaction(s)) )
          transact(conn, array_of_arrays, {'remoteuser': message.user})
          if (whole.length < 1) return
          recurse_array(whole, [])
        } else {
          part.push(whole[whole.length - 1])
          whole.splice(whole.length - 1, 1)
          recurse_array(whole, part)
        }
      }

      recurse_array(sorted_body, [])

    } else

    if (message.body.id) {
      peers.push(message.body.id)
      transact(conn, [[':db/add', -1, ':app/peer', message.body.id]], {'remoteuser': 'system tweets'})
    } else

    if (message.tweet) {
      transact(conn, [{
        ':db/id': -1,
        ...message
      }], {'remoteuser': 'system tweets'})
    } else {

    const tx = {}
    message.body.map(s => tx[s.a] = s.v)

    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': message.user})
  }
}

// Choose between Client and Server
// Sets up the channel on Elixir/Phoenix (client only)
if (clientonly) {
  channel = {}
  channel.send = function () {
    console.log('set clientonly to false in order to actually send')
  }
} else {
  // Data Communicating Sequential Processes. Takes JWT from the Auth CSP and sets up the Elixir channel (server only)
  go(function* () {
//
// these lines determine whether the jwt key comes from config.jwt or the chData channel
//
//    localStorage.removeItem('key')
//    key = yield localStorage.getItem('key') || take(chData)
    var key = config.jwt
    // console.log('key is:', key)

    var user = me
    var msg = {jwt: key, syncpoint: 'none', subscription: querieslist}
    const ex_data_channel = Channel(config.url, "datomic:" + user, user, receiveDataMessage, chData, conn, key)
    yield timeout(10000)
    ex_data_channel.send(msg)
    console.log('yield take chData', yield take(chData))
    // console.log('end data go function')
    channel = ex_data_channel

    transact(conn, [{
      ':db/id': -1,
      'localstate/state': 'loggingin'
    }])
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
//      var msg = {email: 'john@phoenix-trello.com', password: '12345678'}
      const ex_auth_channel = Channel(config.url, "auth:" + user, user, receiveAuthMessage, chAuth, conn)
      yield timeout(10000)
      ex_auth_channel.send(msg)
      console.log('yield take chAuth', yield take(chAuth))
      var value = yield take(chAuth)
      localStorage.setItem('key', value.jwt)
      yield put(chData, localStorage.getItem('key'))
    }
  })
}

// Datascript listener. Fires when we transact data
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

  // adds things to the history
  log.push(report.tx_data)
  meta.push(report.tx_meta)

  // if there's metadata but it's got remoteuser or secrets tags, then don't transact it
  if (report.tx_meta && (report.tx_meta.remoteuser || report.tx_meta.secrets)) return

  // removes the confirmationid from the transaction itself since the server only needs it in meta
  var tx_data_modded = report.tx_data.filter( s => {
    return s.a != 'confirmationid'
  })

  channel.send({data: tx_data_modded, meta: report.tx_meta, confirmationid: report.tx_data.confirmationid})
})

/*
import Meteor from 'react-native-meteor';
import { AppRegistry } from 'react-native';
import {
  Router,
  Scene,
  Actions,
} from 'react-native-router-flux';
*/

// The actual context. This is the first argument to actions.
export const initContext = () => {
  return {
    datascript: datascript,
    conn: conn,
    transact: transact,
    log: log,
    putAsync: putAsync,
    chUnPass: chUnPass,
    conn_components: conn_components,
    meta: meta,
    uuid: uuid,
  };
}
