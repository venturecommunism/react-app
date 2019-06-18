import {go, chan, take, put, timeout, putAsync} from 'js-csp'

import { getItem, setItem, clear, breakmessage, getKeys } from './persistence2'
import uuid from '../uuid'

export { clear }

export const sync = (message, username) => {
  go(function* () {
// first get all the keys and look for any syncpoint-y things

    var syncCh = chan()
    getItem('syncpoint-B'+username)
      .then(syncpointB => {
        syncpointB ? putAsync(syncCh, syncpointB) : putAsync(syncCh, 'none')
      })
    let syncpointB = yield take(syncCh)
    syncpointB == 'none' ? setSync('syncpoint-B'+username, message, username) : putAsync(syncCh, 'ok')
    var ack = yield take(syncCh)


// get rid of this
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
    setItem(syncpoint, message.syncpoint)

    setItem(username+'-syncpoint-'+message.syncpoint, [...Object.keys(brokenmessage)])
    setItem(message.syncpoint, Object.keys(brokenmessage))
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, brokenmessage[uuid])
    })

    setItem('syncpoint'+username, syncpoint)
  }

  const swapSync = (newsync, oldsync, oldkeys, message, username) => {
    // console.log('invoking swapsync')
    // clear()
    let brokenmessage = breakmessage(message.body, 20)
    // console.log('setting ', newsync, ' to: ', message.syncpoint)
    Object.keys(brokenmessage).map(uuid => {
      setItem(uuid, brokenmessage[uuid])
    })

    setItem(username+'-syncpoint-'+message.syncpoint, [...Object.keys(brokenmessage)])
  }
}

export const loadsyncpoint = (maintransact, username) => {
  // clear()

  var thekeys
  getKeys().then(keys => {

    thekeys = keys
    var offlinetxarray = thekeys.filter( (item) => {
      if (typeof item == 'string') {
        var re = new RegExp('offlinetxn-')
        if (item.match(re, ["i"])) return true
      } else {
        return false
      }
    })
    // console.log("offlinetxarray", offlinetxarray)

    var filteredarray = thekeys.filter( (item) => {
      if (typeof item == 'string') {
        var re = new RegExp(username+'-syncpoint-')
        if (item.match(re, ["i"])) return true
      } else {
        return false
      }
    })
    // console.log("sync filtered array", filteredarray)
    filteredarray.sort().forEach( (item, i) => loadSync(item, i, filteredarray.length) )

  })


  const loadSync = (point, index, length) => {
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
//                console.log('loading syncpoint: ', point)
                var single_tx = []
// console.log("body in loadsync", body)
                body.map(s => {
                  var operation = s.op == true ? ":db/add" : ":db/retract"
                  single_tx.push([operation, s.e, s.a, s.v])
                })
                maintransact(single_tx, {'remoteuser': 'system'})
              }
            })
        })
      })
      .then( (something) => {
      if (index == length - 1) {


  var thekeys
  getKeys().then(keys => {

    thekeys = keys
    var offlinetxarray = thekeys.filter( (item) => {
      if (typeof item == 'string') {
        var re = new RegExp('offlinetxn-')
        if (item.match(re, ["i"])) return true
      } else {
        return false
      }
    })
    // console.log("offlinetxarray", offlinetxarray)


    offlinetxarray.forEach( (offlinetxn) => {
          let body = []
          let checkkeys = []
          getItem(offlinetxn)
            .then(item => {
              body.push(JSON.parse(item)[0])
              var single_tx = []
body.map(s => {
  console.log("a thing", s)
  // var tx = JSON.parse(s)
  maintransact(s, {'type': 'basic transaction'})
})
    })
  })

})


}
      })
      .catch(err => console.log(err))
  }
}
