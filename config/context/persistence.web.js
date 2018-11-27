import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { getItem, setItem, clear, breakmessage } from './persistence2'
import uuid from '../uuid'

export const sync = (message, username) => {
  go(function* () {
    var syncCh = chan()
    getItem('syncpoint-A'+username)
      .then(syncpointA => {
        syncpointA ? putAsync(syncCh, syncpointA) : putAsync(syncCh, 'none')
      })
    let syncpointA = yield take(syncCh)
    syncpointA == 'none' ? setSync('syncpoint-A'+username, message, username) : ''
    getItem('syncpoint-B'+username)
      .then(syncpointB => {
        syncpointB ? putAsync(syncCh, syncpointB) : putAsync(syncCh, 'none')
      })
    let syncpointB = yield take(syncCh)
    syncpointB == 'none' ? setSync('syncpoint-B'+username, message, username) : putAsync(syncCh, 'ok')
    var ack = yield take(syncCh)
    if (syncpointA > syncpointB) {
      getItem(syncpointB)
        .then(oldsync => {
          putAsync(syncCh, oldsync)
        })
      var oldkeys = yield take(syncCh)
      swapSync('syncpoint-B'+username, 'syncpoint-A'+username, oldkeys, message, username)
    }
    else if (syncpointB >= syncpointA) {
      console.log("B was greater than or equal to A")
      getItem(syncpointA)
        .then(oldsync => {
          putAsync(syncCh, oldsync)
        })
      var oldkeys = yield take(syncCh)
      console.log("about to swapsync")
      swapSync('syncpoint-A'+username, 'syncpoint-B'+username, oldkeys,  message, username)
    }
    else {
      throw 'error'
    }
  })

  const setSync = (syncpoint, message, username) => {
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', syncpoint, ' to: ', message.syncpoint)
    setItem(syncpoint, message.syncpoint)
    setItem(message.syncpoint, Object.keys(brokenmessage))
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, brokenmessage[uuid])
    })

    setItem('syncpoint'+username, syncpoint)
  }

  const swapSync = (newsync, oldsync, oldkeys, message, username) => {
    console.log('invoking swapsync')
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', newsync, ' to: ', message.syncpoint)
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, brokenmessage[uuid])
    })
    setItem(message.syncpoint, [...oldkeys, ...Object.keys(brokenmessage)])
    setItem(newsync, message.syncpoint)

    setItem('syncpoint'+username, newsync)
  }
}

export const loadsyncpoint = (maintransact, username) => {
  // clear()
  go(function* () {
    var loadCh = chan()
    getItem('syncpoint-A'+username)
      .then(syncpointA => {
        syncpointA ? putAsync(loadCh, syncpointA) : putAsync(loadCh, 'none')
       })
    let syncpointA = yield take(loadCh)
    getItem('syncpoint-B'+username)
      .then(syncpointB => {
        syncpointB ? putAsync(loadCh, syncpointB) : putAsync(loadCh, 'none')
      })
    let syncpointB = yield take(loadCh)
    syncpointA != 'none' && syncpointB == 'none' ? loadSync(syncpointA) : ''
    putAsync(loadCh, 'ok')
    var ack = yield take(loadCh)
    if (syncpointA > syncpointB) {
      loadSync(syncpointA)
    }
    else if (syncpointB > syncpointA) {
      loadSync(syncpointB)
    }
    else if (syncpointA == syncpointB) {
      loadSync(syncpointA)
    }
    else {
      throw 'error'
    }
  })

  const loadSync = (point) => {
    let body = []
    let checkkeys = []
    getItem(point)
      .then(uuids => {
        uuids.map( uuid => {
          getItem(uuid)
            .then(item => {
              body.push(...item)
              checkkeys.push(uuid)
              if (checkkeys.length == uuids.length) {
                console.log('loading syncpoint: ', point)
                var single_tx = []
                body.map(s => {
                  single_tx.push([':db/add', s.e, s.a, s.v])
                })
                maintransact(single_tx, {'remoteuser': 'system'})
              }
            })
        })
      })
  }
}
