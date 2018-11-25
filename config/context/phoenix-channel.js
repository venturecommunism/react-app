import { getItem, setItem } from './persistence2'

import { mori } from '../datascript'
import { q$ } from '../rx-datascript'

import config from '../config'
import { from, Observable } from 'rxjs'
import {
  skip,
  flatMap,
  map,
  tap,
  switchMap,
} from 'rxjs/operators'

import { Socket } from 'phoenix'

const DataChannel = (url, room, user, token) =>
//  q$(localreport$, mori.parse(`[:find ?email ?password :where [?e "email" ?email] [?e2 "password" ?password]]`))
  from([user])
    .pipe(
      flatMap(result =>
        from(getItem('token')).pipe(map(token => ({ user, token })))),
      flatMap(({ user, token }) =>
        from(getItem('syncpoint')).pipe(map(syncspot => !syncspot || syncspot == null ? ({user, token, syncspot: 'syncpoint-X'}) : ({ user, token, syncspot })))),
      tap(thing => console.log(thing)),
      flatMap(({ user, token, syncspot }) =>
        from(getItem(syncspot)).pipe(map(syncpoint => !syncpoint || syncpoint == null ? ({user, token, syncpoint: 'none'}) : ({ user, token, syncpoint: JSON.parse(syncpoint) })))),
      flatMap(({ user, token, syncpoint }) =>
        new Observable(observer => {
          const socket = new Socket(url)
          socket.connect()
          const chan = socket.channel(room + ':' + user, { user, guardian_token: token })
          chan.onError( () => observer.next({ type: 'error', error: 'offline' }) )
          chan.join()
            .receive('ignore', () => console.log(room, 'Access denied.'))
            .receive('ok', () => observer.next({ type: 'join', socket, chan, user: user, send: send, syncpoint: syncpoint }))
            .receive('timeout', () => console.log(room, 'Must be a MongoDB.'))
          chan.on('new:msg', msg => observer.next({ type: 'new:msg', msg }))
          const send = (message) => {
            chan.push('new:msg', {body: message, user}, 10000)
              .receive('ok', (msg) => observer.next({type: 'ok', msg}))
              .receive('error', (reasons) => observer.next({ type: 'error', error: reasons, room: room }))
              .receive('timeout', () => observer.next({ type: 'timeout', error: 'slow much?', room: room }))
          }
        })
      )
    ) // pipe end

const AuthChannel = (url, room, user, localreport$, token) => q$(localreport$, mori.parse(`[:find ?email ?password :where [?e "email" ?email] [?e2 "password" ?password]]`))
    .pipe(
      // skipping one waits to load user data from localstate. not skipping loads from config.js
      // skip(1),
      switchMap(queryresult =>
        new Observable(observer => {
          // console.log("QUERY RESULT", mori.toJs(queryresult))
          const jsresult = mori.toJs(queryresult)
          const auth_join_msg = {email: jsresult[0] && jsresult[0][0] ? jsresult[0][0] : config.username, password: jsresult[0] && jsresult[0][1] ? jsresult[0][1] : config.password}
          const user = jsresult[0] && jsresult[0][0] ? jsresult[0][0] : config.username
          const socket = new Socket(url)
          socket.connect()
          const chan = socket.channel(room + ':' + user, { user, token })
          chan.join()
            .receive('ignore', () => console.log(room, ': Access denied.'))
            .receive('ok', () => observer.next({ type: 'join', socket, chan, user: user, send: send, auth_join_msg: auth_join_msg }))
            .receive('timeout', () => observer.next({ type: 'error', error: room + ' timeout: Sad trombone.' }))
          chan.on('new:msg', msg => observer.next({ type: 'msg', msg: msg, auth_join_msg: auth_join_msg }))
          const send = (message) => {
            chan.push('new:msg', {body: message, user}, 10000)
              .receive('ok', (msg) => observer.next({ type: 'ok', msg: msg }))
              .receive('error', (reasons) => console.log('flop', reasons))
              .receive('timeout', () => console.log('slow much?'))
          }
          return { send }
        })
      )
    ) // pipe end

export {
  DataChannel,
  AuthChannel,
}
