import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { getItem, setItem, clear, breakmessage } from './persistence2'
import uuid from '../uuid'

export const sync = (message) => {
  go(function* () {
    var syncCh = chan()
    getItem('syncpoint-A')
      .then(syncpointA => {
        syncpointA ? putAsync(syncCh, syncpointA) : putAsync(syncCh, 'none')
      })
    let syncpointA = yield take(syncCh)
    syncpointA == 'none' ? setSync('syncpoint-A', message) : ''
    getItem('syncpoint-B')
      .then(syncpointB => {
        syncpointB ? putAsync(syncCh, syncpointB) : putAsync(syncCh, 'none')
      })
    let syncpointB = yield take(syncCh)
    syncpointB == 'none' ? setSync('syncpoint-B', message) : putAsync(syncCh, 'ok')
    var ack = yield take(syncCh)
    if (syncpointA > syncpointB) {
      getItem(syncpointB)
        .then(oldsync => {
          putAsync(syncCh, oldsync)
        })
      var oldkeys = yield take(syncCh)
      swapSync('syncpoint-B', 'syncpoint-A', oldkeys, message)
    }
    else if (syncpointB >= syncpointA) {
      console.log("B was greater than or equal to A")
      getItem(syncpointA)
        .then(oldsync => {
          putAsync(syncCh, oldsync)
        })
      var oldkeys = yield take(syncCh)
      console.log("about to swapsync")
      swapSync('syncpoint-A', 'syncpoint-B', oldkeys,  message)
    }
    else {
      throw 'error'
    }
  })

  const setSync = (syncpoint, message) => {
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', syncpoint, ' to: ', message.syncpoint)
    setItem(syncpoint, JSON.stringify(message.syncpoint))
    setItem(JSON.stringify(message.syncpoint), JSON.stringify(Object.keys(brokenmessage)))
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]))
    })

    setItem('syncpoint', syncpoint)
  }

  const swapSync = (newsync, oldsync, oldkeys, message) => {
    console.log('invoking swapsync')
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', newsync, ' to: ', message.syncpoint)
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]))
    })
    setItem(JSON.stringify(message.syncpoint), JSON.stringify([...JSON.parse(oldkeys), ...Object.keys(brokenmessage)]))
    setItem(newsync, JSON.stringify(message.syncpoint))

    setItem('syncpoint', newsync)
  }
}

export const loadsyncpoint = (maintransact) => {
  // clear()
  go(function* () {
    var loadCh = chan()
    getItem('syncpoint-A')
      .then(syncpointA => {
        syncpointA ? putAsync(loadCh, syncpointA) : putAsync(loadCh, 'none')
       })
    let syncpointA = yield take(loadCh)
    getItem('syncpoint-B')
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
                  single_tx.push([':db/add', s.e, s.a, s.v])
                })
                maintransact(single_tx, {'remoteuser': 'system'})
              }
            })
        })
      })
  }
}
