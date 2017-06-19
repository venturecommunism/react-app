import { Socket } from 'phoenix'
// import datascript from 'datascript'

// import url from './url'

const TIMEOUT = 10000
// const LOBBY = 'rooms:lobby'

export default (url, room, user, onChat) => {
  // construct a socket
  const socket = new Socket(url)

  // configure the event handlers
  socket.onOpen(event => console.log(room, 'Connected.'))
  socket.onError(event => console.log(room, 'Cannot connect.'))
  socket.onClose(event => console.log(room, 'Goodbye.'))

  // open a connection to the server
  socket.connect()

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  const chan = socket.channel(room, { user })

  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log(room, 'Access denied.'))
    .receive('ok', () => console.log(room, 'Access granted.'))
    .receive('timeout', () => console.log(room, 'Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(conn, msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()

  // a function to send a message
  const send = (message) => {
console.log('trying to send')
    chan.push('new:msg', {body: message, user}, TIMEOUT)
      .receive('ok', (msg) => console.log('sent'))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
  }

  // reveal a couple ways to drive this bus
  return { close, send }
}

/*

  function syncfunc() {
    console.log('Access Granted. Syncing...')
    var obj = {}
    obj.email = 'john@phoenix-trello.com'
    obj.password = '12345678'
//    send(obj)
    var query = `[:find ?latest_tx :where [?e "app/sync" ?latest_tx]]`
    var syncpoint = datascript.q(query, datascript.db(conn))
//    syncpoint[0] ? console.log(syncpoint[0][0]) : console.log('no syncpoint')
    if (syncpoint[0]) {
      send({"syncpoint": syncpoint[0][0]})
    } else {
      send({"syncpoint": "none"})
    }
  }

*/
