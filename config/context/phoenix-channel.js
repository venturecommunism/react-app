import { putAsync } from 'js-csp'
import { Socket } from 'phoenix'

const TIMEOUT = 10000

export default (url, room, user, onChat, cspChan, report$, maintransact, guardian_token) => {
  // construct a socket
  const socket = new Socket(url)

  // configure the event handlers
  socket.onOpen(event => console.log(room, 'Connected.'))
  socket.onError(event => console.log(room, 'Cannot connect.'))
  socket.onClose(event => console.log(room, 'Goodbye.'))

  // open a connection to the server
  socket.connect()

  // configure a channel into a room - https://www.youtube.com/watch?v=vWFX4ylV_ko
  const chan = socket.channel(room, { user, guardian_token })

  // join the channel and listen for admittance
  chan.join()
    .receive('ignore', () => console.log(room, 'Access denied.'))
    .receive('ok', () => console.log(room, 'Access granted.'))
    .receive('timeout', () => console.log(room, 'Must be a MongoDB.'))

  // add some channel-level event handlers
  chan.onError(event => console.log('Channel blew up.'))
  chan.onClose(event => console.log('Channel closed.'))

  // when we receive a new chat message, just trigger the appropriate callback
  chan.on('new:msg', msg => onChat && onChat(report$, maintransact, msg))

  // you can can listen to multiple types
  chan.on('user:entered', msg => console.log('say hello to ', msg))

  // a function to shut it all down
  const close = () => socket.disconnect()

  // a function to send a message
  const send = (message) => {
    chan.push('new:msg', {body: message, user}, TIMEOUT)
      .receive('ok', (msg) => onChat && onChat(report$, maintransact, {ok: msg}))
      .receive('error', (reasons) => console.log('flop', reasons))
      .receive('timeout', () => console.log('slow much?'))
    putAsync(cspChan, message)
  }

  // reveal a couple ways to drive this bus
  return { close, send }
}
