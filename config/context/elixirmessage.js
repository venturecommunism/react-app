import datascript from 'datascript'
import transact from '../transact'
import {go, chan, take, put, timeout, putAsync} from 'js-csp'

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
  console.log('ELIXIR OBJECT', message)

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
    } else

    if (Object.keys(message.body).some(item => item == 'syncpoint')) {
      console.log("syncpoint")
    } else {

    const tx = {}

    try {
      message.body.map(s => tx[s.a] = s.v)
    }
    catch (e) {
      console.log(e, message)
    }

    transact(conn, [{
      ':db/id': -1,
      ...tx
    }], {'remoteuser': message.user})
  }
}

