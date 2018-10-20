import { get as getItem, set as setItem, clear } from 'idb-keyval'
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
  clear()
  let brokenmessage = breakmessage(message.body, 20)
  console.log('syncpoint', message.syncpoint)
  setItem('syncpoint', message.syncpoint)
  setItem(message.syncpoint, Object.keys(brokenmessage))
  Object.keys(brokenmessage).map(uuid => {
    setItem(uuid, brokenmessage[uuid])
  })
}

export const loadsyncpoint = (conn) => {
  getItem('syncpoint')
    .then(syncpoint => {
      let body = []
      let checkkeys = []
      console.log(syncpoint)
      getItem(syncpoint)
        .then(uuids => {
          uuids.map( uuid => {
            getItem(uuid)
              .then(item => {
                body.push(...item)
                checkkeys.push(uuid)
                if (checkkeys.length == uuids.length) {
                  var single_tx = []
                  body.map(s => {
                    single_tx.push([':db/add', s.e, s.a, s.v])
                  })
                  transact(conn, single_tx, {'remoteuser': 'system'})
                }
              })
          })
      })
    })
}
