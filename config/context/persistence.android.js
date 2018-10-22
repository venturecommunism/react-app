import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { setItem, getItem, getAllItems, deleteItem } from 'react-native-sensitive-info'
import transact from '../transact'
import uuid from '../uuid'

function chunk(arr, chunkSize) {
  var R = []
  for (var i=0,len=arr.length; i<len; i+=chunkSize)
    R.push(arr.slice(i,i+chunkSize))
  return R
}

function breakmessage(message, chunkSize) {
  let brokenmessage = []
  let contents = chunk(message, chunkSize)
  contents.map(item => brokenmessage[uuid()] = item)
  return brokenmessage
}

const clear = () => {
  getAllItems({
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'
  }).then(values => {
      Object.keys(values).map( val => {
        deleteItem(val, {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain'
        })
      })
    })
    .catch(err => console.log(err))
}

export const sync = (message) => {
  go(function* () {
    var syncCh = chan()
    getItem('syncpoint-A', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
      .then(syncpointA => {
        syncpointA ? putAsync(syncCh, syncpointA) : putAsync(syncCh, 'none')
      })
    let syncpointA = yield take(syncCh)
    syncpointA == 'none' ? setSync('syncpoint-A', message) : ''
    getItem('syncpoint-B', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
      .then(syncpointB => {
        syncpointB ? putAsync(syncCh, syncpointB) : putAsync(syncCh, 'none')
      })
    let syncpointB = yield take(syncCh)
    syncpointB == 'none' ? setSync('syncpoint-B', message) : putAsync(syncCh, 'ok')
    var ack = yield take(syncCh)
    if (syncpointA > syncpointB) {
      getItem(syncpointB, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
      })
        .then(oldsync => {
          putAsync(syncCh, oldsync)
        })
      var oldkeys = yield take(syncCh)
      swapSync('syncpoint-B', 'syncpoint-A', oldkeys, message)
    }
    else if (syncpointB >= syncpointA) {
      console.log("B was greater than or equal to A")
      getItem(syncpointA, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
      })
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
    setItem(syncpoint, JSON.stringify(message.syncpoint), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
    setItem(JSON.stringify(message.syncpoint), JSON.stringify(Object.keys(brokenmessage)), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]), {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
      })
    })

    setItem('syncpoint', syncpoint, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }

  const swapSync = (newsync, oldsync, oldkeys, message) => {
    console.log('invoking swapsync')
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    console.log('setting ', newsync, ' to: ', message.syncpoint)
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, JSON.stringify(brokenmessage[uuid]), {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain'
      })
    })
    setItem(JSON.stringify(message.syncpoint), JSON.stringify([...JSON.parse(oldkeys), ...Object.keys(brokenmessage)]), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
    setItem(newsync, JSON.stringify(message.syncpoint), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })

    setItem('syncpoint', newsync, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }
}

export const loadsyncpoint = (conn) => {
  // clear()
  go(function* () {
    var loadCh = chan()
    getItem('syncpoint-A', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
      .then(syncpointA => {
        syncpointA ? putAsync(loadCh, syncpointA) : putAsync(loadCh, 'none')
       })
    let syncpointA = yield take(loadCh)
    getItem('syncpoint-B', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
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
    getItem(point, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
      .then(uuids => {
        var jsonuuids = JSON.parse(uuids)
        jsonuuids.map( uuid => {
          getItem(uuid, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
          })
            .then(item => {
              body.push(...JSON.parse(item))
              checkkeys.push(uuid)
              if (checkkeys.length == JSON.parse(uuids).length) {
                console.log('loading syncpoint: ', point)
                var single_tx = []
                body.map(s => {
                  single_tx.push([':db/add', s.e, s.a, s.v])
                })
                transact(conn, single_tx, {'remoteuser': 'system'})
              }
            })
        })
      })
  }
}
