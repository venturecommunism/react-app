import datascript from 'datascript'
import transact from '../transact'
import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { sync } from './persistence'

// Fires when we receive a message on the Elixir data channel
export const receiveDataMessage = (conn, message, me) => {
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
  //  console.log('ELIXIR OBJECT', message)
  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

  if (Object.keys(message).some(item => item == 'syncpoint')) {
    sync(message)
  }
  // only works if all the tx ids are the same
  if (message.user === 'system') {
    try {
      var single_tx = []
      message.body.map(s => {
        single_tx.push([':db/add', s.e, s.a, s.v])
      })
      transact(conn, single_tx, {'remoteuser': message.user})
    }
    catch (e) {
      console.log(e)
    }
  }
}