import config from '../config'
import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import uuid from '../uuid'

// get rid of transact
import transact from '../transact'

let chData = chan()
let chAuth = chan()
let chUnPass = chan()

const me = uuid()

import Channel from './phoenix-channel'

import { receiveDataMessage } from './elixirmessage'

/***** get rid of this */

import datascript from 'datascript'
import {componentdb} from '../lib/createDBConn'
const conn_components = componentdb()
var querieslist = []
const ql = datascript.q(`[:find ?query ?sortfields ?sortorders ?limit :where [?e "query" ?query] [?e "sortfields" ?sortfields] [?e "sortorders" ?sortorders] [?e "limit" ?limit]]`, datascript.db(conn_components))
querieslist[0] = [...ql]

/***** get rid of above */

// Data Communicating Sequential Processes. Takes JWT from the Auth CSP and sets up the Elixir channel (server only)
const channel = (conn, syncpoint) => go(function* () {
  // localStorage.removeItem('key')
  // putAsync(chUnPass, {email: config.username, password: config.password})
  // var key = yield localStorage.getItem('key') || take(chData)
  var key = config.jwt
  console.log('key is:', key)

  var user = me
  var msg = {jwt: key, syncpoint: syncpoint, subscription: querieslist}
  const ex_data_channel = Channel(config.url, "datomic:" + user, user, receiveDataMessage, chData, conn, key)
  yield timeout(10000)
  ex_data_channel.send(msg)
  console.log('yield take chData', yield take(chData))
  // console.log('end data go function')

  transact(conn, [{
    ':db/id': -1,
    'localstate/state': 'loggingin'
  }])
  return ex_data_channel
})

// Authentication Communicating Sequential Process. Puts a JWT on the Data CSP.
go(function* (conn) {
  // putAsync is more Communicating Sequential Processes but from outside Go functions
  const receiveAuthMessage = (conn, message, me) => {
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
    yield timeout(10000)
    ex_auth_channel.send(msg)
    console.log('yield take chAuth', yield take(chAuth))
    var value = yield take(chAuth)
    localStorage.setItem('key', value.jwt)
    yield put(chData, localStorage.getItem('key'))
  }
})

export default channel
