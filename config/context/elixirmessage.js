import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
import transact from '../transact'

import { sync } from './persistence'

// Fires when we receive a message on the Elixir data channel
export const receiveDataMessage = (db, maintransact, message, me) => {
  console.log("ELIXIR MESSAGE", message)
  if ('ok' in message && 'confirmationid' in message.ok.msg) {
    var confirmationid = message['ok']['msg']['confirmationid']
    var stringconfirmationid = JSON.stringify(confirmationid)

    var confirmedquery = `[:find ?e
                           :where [?e "confirmationid" ${stringconfirmationid}]]`
    var confirmeddb = db
    const confirmedqArgs = [confirmedquery, confirmeddb]
    var result = datascript.q(...confirmedqArgs)

    console.log("receiveDataMessage", result)

    var confirmedent = result[0][0]

    var report_id_confirmed_tx = [[':db/retract', confirmedent, 'confirmationid', confirmationid]]
    maintransact(report_id_confirmed_tx, {'remoteuser': 'server confirmation'})
  }
  if ('ok' in message) return
  console.log("ELIXIR OBJECT", message)
  const user = message.user
  const isMe = (someUser) => me === someUser
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
      maintransact(single_tx, {'remoteuser': message.user})
    }
    catch (e) {
      console.log(e)
    }
  }
}
