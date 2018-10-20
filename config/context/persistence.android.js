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

export const sync = (message) => {
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
  let brokenmessage = breakmessage(message.body, 20)
  setItem('syncpoint', JSON.stringify(message.syncpoint), {
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
}

export const loadsyncpoint = (conn) => {
  getItem('syncpoint',{
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'
  }).then(syncpoint => {
    let body = []
    let checkkeys = []
    console.log("SYNCPOINT", syncpoint)
    getItem(syncpoint,{
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    }).then(uuids => {
      console.log("UUIDS", uuids)
      var jsonuuids = JSON.parse(uuids)
      jsonuuids.map ( uuid => {
        getItem(uuid,{
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain'
        })
          .then(item => {
            body.push(...JSON.parse(item))
            checkkeys.push(uuid)
            if (checkkeys.length == JSON.parse(uuids).length) {
              var single_tx = []
              body.map(s => {
                single_tx.push([':db/add', s.e, s.a, s.v])
              })
              transact(conn, single_tx, {'remoteuser': 'system'})
            }
          })
      })
    })
    .catch(err => console.log(err))
  })
}
