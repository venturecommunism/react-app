import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'
import datascript from 'datascript'
import React from 'react'
import {Text} from 'react-native'
import Channel from '../../../config/channel'
import url from '../../../config/url'

const transact = datascript.transact

const dataComposer = ({ context, query }, onData) => {
  const {conn, me, chData, key} = context()
  const user = me
  //  let result = datascript.datoms(datascript.db(conn), ':eavt')
  var qArgs = [query, datascript.db(conn)]
  let result = datascript.q(...qArgs)
  // console.log("DATA CONTAINER RESULT", result)
  //  onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})
  // fires when we receive a message
  const receiveChatMessage = (conn, message) => {
    const user = message.user
    const isMe = (someUser) => me === someUser
    // console.log(JSON.stringify(message))
    // console.log("me", me)
    if (isMe(user)) return // prevent echoing yourself (TODO: server could handle this i guess?)
    console.log("REMOTE DATA")
    const tx = {}

    if (message.tweet) {
      transact(conn, [{
        ':db/id': -1,
        ...message
      }], {'remoteuser': 'system tweets'})
    }
    else {
      message.body.map(function(s){ tx[s.a] = s.v })
      transact(conn, [{
        ':db/id': -1,
        ...tx
      }], {'remoteuser': message.user})
    }
  }

  const channel = Channel(url, "rooms:datomic", user, receiveChatMessage, chData, conn, key)

  datascript.listen(conn, function(report) {
    const qArgs = [query, datascript.db(conn)]
    let result = datascript.q(...qArgs)

    // if (!report.tx_meta || !report.tx_meta.remoteuser) return

    // onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})
    onData(null, {result: datascript.q(...qArgs)})
    // if (report.tx_meta && report.tx_meta.remote) return
    // channel.send(report.tx_data)
  })

  // onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})
  onData(null, {result: datascript.q(...qArgs)})
}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)
