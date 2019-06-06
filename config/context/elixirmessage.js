import { setItem, getItem } from './persistence2'

import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
import transact from '../datascript'

import { sync } from './persistence'

// Fires when we receive a message on the Elixir data channel
export const receiveDataMessage = (db, maintransact, message, me, username) => {
  // console.log("ELIXIR MESSAGE", message)
  if ('ok' in message && 'confirmationid' in message.ok.msg) {
    var confirmationid = message['ok']['msg']['confirmationid']

    getItem('offline-transactions').then(
      txns => {
        var parsed_txns = txns ? JSON.parse(txns) : null
        parsed_txns.forEach( (item, i) => {
          if (item[1].confirmationid == confirmationid) {
            var newdata = parsed_txns.splice(i, 1) != [] ? parsed_txns.splice(i, 1) : null
            setItem('offline-transactions', JSON.stringify(newdata))
          }
        })
      }
    )

    var stringconfirmationid = JSON.stringify(confirmationid)

    var confirmedquery = `[:find ?e
                           :where [?e "confirmationid" ${stringconfirmationid}]]`
    var confirmeddb = db
    const confirmedqArgs = [confirmedquery, confirmeddb]
    var result = datascript.q(...confirmedqArgs)

    // console.log("receiveDataMessage", result)

    var confirmedent = result[0] ? result[0][0] : ''

    var report_id_confirmed_tx = [[':db/retract', ["confirmationid", confirmationid], 'confirmationid', confirmationid]]
    confirmedent ? maintransact(report_id_confirmed_tx, {'remoteuser': 'server confirmation'}) : console.log("missing confirmationid")
  }
  if ('ok' in message) return
  // console.log("ELIXIR OBJECT", message)
  const user = message.user
  const isMe = (someUser) => me === someUser
  if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)

  if (Object.keys(message).some(item => item == 'syncpoint')) {
    sync(message, username)
  }
  // only works if all the tx ids are the same
  if (message.user === 'system') {
    try {
      var single_tx = []
      message.body.map(s => {

        if (s.op == false) {
          single_tx.push([':db/retract', s.e, s.a, s.v])
        } else {
          single_tx.push([':db/add', s.e, s.a, s.v])
        }

      })
      maintransact(single_tx, {'remoteuser': message.user})
    }
    catch (e) {
      console.log(e)
    }
  }
}
