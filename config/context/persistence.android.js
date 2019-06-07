import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { getItem, setItem, clear, breakmessage } from './persistence2'
import uuid from '../uuid'

export { clear }

export const sync = (message, username) => {
  go(function* () {
    var syncCh = chan()
    getItem('syncpoint-B'+username)
      .then(syncpointB => {
        syncpointB ? putAsync(syncCh, syncpointB) : putAsync(syncCh, 'none')
      })
    let syncpointB = yield take(syncCh)
    syncpointB == 'none' ? setSync('syncpoint-B'+username, message) : putAsync(syncCh, 'ok')
    var ack = yield take(syncCh)

    getItem(syncpointB)
      .then(oldsync => {
        putAsync(syncCh, oldsync)
      })

    var oldkeys = yield take(syncCh)
    // console.log("about to swapsync")
    swapSync('syncpoint-B'+username, 'syncpoint-A'+username, oldkeys, message, username)
  })

  const setSync = (syncpoint, message, username) => {
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    // console.log('setting ', syncpoint, ' to: ', message.syncpoint)
    setItem(syncpoint, JSON.stringify(message.syncpoint))
    setItem(JSON.stringify(message.syncpoint), JSON.stringify(Object.keys(brokenmessage)))
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]))
    })

    setItem('syncpoint'+username, syncpoint)
  }

  const swapSync = (newsync, oldsync, oldkeys, message, username) => {
    console.log('invoking swapsync')
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', newsync, ' to: ', message.syncpoint)
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]))
    })
    setItem(JSON.stringify(message.syncpoint), JSON.stringify([...JSON.parse(oldkeys), ...Object.keys(brokenmessage)]))
    setItem(newsync, JSON.stringify(message.syncpoint))

    setItem('syncpoint'+username, newsync)
  }
}

export const loadsyncpoint = (maintransact, username) => {
  // clear()
  go(function* () {
    var loadCh = chan()
    getItem('syncpoint-B'+username)
      .then(syncpointB => {
        syncpointB ? putAsync(loadCh, syncpointB) : putAsync(loadCh, 'none')
      })
    let syncpointB = yield take(loadCh)
    putAsync(loadCh, 'ok')
    var ack = yield take(loadCh)
    loadSync(syncpointB)
  })

  const loadSync = (point) => {
    let body = []
    let checkkeys = []
    getItem(point)
      .then(uuids => {
        var jsonuuids = JSON.parse(uuids)
        jsonuuids.map( uuid => {
          getItem(uuid)
            .then(item => {
              body.push(...JSON.parse(item))
              checkkeys.push(uuid)
              if (checkkeys.length == JSON.parse(uuids).length) {
                console.log('loading syncpoint: ', point)
                var single_tx = []
                body.map(s => {
                  var operation = s.op == true ? ":db/add" : ":db/retract"
                  single_tx.push([operation, s.e, s.a, s.v])
                })
                maintransact(single_tx, {'remoteuser': 'system'})
              }
            })
        })
      })
      .catch(err => console.log(err))
  }
}
