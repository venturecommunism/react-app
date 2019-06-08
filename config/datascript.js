import { setItem, getItem } from './context/persistence2'

import uuid from './uuid'

import { datascript as ds, mori, helpers } from 'datascript-mori'
import { connect, nextTx } from './rx-datascript'
const datascript = ds.js

import { maindb, localstate } from './lib/createDBConn'

const conn = maindb()
const globalstate = localstate() // global but not remote

const local = connect(datascript.db(globalstate))
const localreport$ = local.report$
const localtx$ = local.tx$

const main = connect(datascript.db(conn), localtx$)
const report$ = main.report$
const tx$ = main.tx$
const validtx$ = main.validtx$

const maintransact = (data_to_add, meta) => {
  // disable metadata to test transactions locally


if (!meta || meta == null) {
//console.log('wait', data_to_add)
//alert('wait')
}

// console.log("behaviorsubject", tx$.value)
// console.log("is it a bsub", report$.value)

  // confid is the confirmationid. it will be put in meta so that the server can send it back and it will be mapped onto data_to_add so that
  // when it does come back it can be updated / removed
  // set the meta if it's unset. need to track how confirmationid and uuid (for a tx) are used

  // if it's a retraction but not retracting the confirmationid (e.g. length exactly 4 and about the confirmationid) do something else
  if (data_to_add[0] && data_to_add[0][0] && data_to_add[0].length != 4 && data_to_add[0][2] != 'confirmationid' && data_to_add[0][0] ==  ":db/retract") {
    retract(data_to_add, meta)
    return
  }

  var meta

  // if there's no metadata and it's just a simple transaction
  // need to improve this logic
  if (meta == null && data_to_add[0][":db/id"] == -1) {
    meta = {
      type: "basic transaction",
      // this is where the confirmationid gets set so that the server knows about it
      confirmationid: data_to_add[0].confirmationid,
      // for some reason this uuid has to be here and in the data_to_add.map in order to sync with the server
      uuid: data_to_add[0].uuid
    }
  }

  var confirmationid

  if (data_to_add.some(r => {
    if (r[2] == 'confirmationid') {
// console.log('picking a confirmationid', r[3])
      confirmationid = r[3]
      return true
    }
  }))
  if (meta == null && data_to_add[0][0] == ":db/retract") {
    meta = {
      type: "confirmation",
      // this is where the confirmationid gets set so that the server knows about it
      confirmationid: confirmationid,
      // for some reason this uuid has to be here and in the data_to_add.map in order to sync with the server
      uuid: data_to_add[0][1][1]
    }
  }

  if (meta == null) {
// console.log("meta was null")
    meta = {
      type: "basic transaction",
      // this is where the confirmationid gets set so that the server knows about it
      confirmationid: data_to_add[0].confirmationid ? data_to_add[0].confirmationid : confirmationid,
      // for some reason this uuid has to be here and in the data_to_add.map in order to sync with the server
      uuid: data_to_add[0].uuid
    }
  }

  // this bit puts "local transaction" on meta.secrets if ANYTHING says localstate
  if (data_to_add.some(r => {
    if (Object.keys(r).some(x=>x.match(/^localstate\//i))) return true
  })) {
    meta.secrets = "local transaction"
    data_to_add[0].uuid = "6497bbee-9739-42a0-908c-c49fc3d6a07d"
  }

  // if there's some datom (in a basic transaction only?) without a uuid, it's a problem
  if (meta.type == "basic transaction" && data_to_add.some(r => {
    if (Object.keys(r).every(x => x != 'uuid')) {
      return true
    }
  })) {
    console.log("problem data", data_to_add)
    alert("can't transact")
    return
  }

  data_to_add.map(datom => {
    // not sure whether to add the confirmationid since it should (sometimes?) be added already
    data_to_add[0].confirmationid ? datom.confirmationid = data_to_add[0].confirmationid : ''
    // this uuid is needed in order to sync with the server
    data_to_add[0].uuid ? datom.uuid = data_to_add[0].uuid : ''
  })

  var stringified_data_to_add = JSON.stringify(data_to_add)

  var existing_offline_txns
  getItem('offline-transactions').then(
    txns => {
      var existing_offline_txns = txns ? JSON.parse(txns) : undefined
      if (existing_offline_txns == undefined) existing_offline_txns = []
      var offline_tx_to_persist
      if (!meta.remoteuser) {
        var confirmationid = confirmationid ? confirmationid : meta.confirmationid
        offline_tx_to_persist = [data_to_add, meta, confirmationid]
        existing_offline_txns.push(offline_tx_to_persist)
        console.log("existing_offline_txns", existing_offline_txns)
        setItem('offline-transactions', JSON.stringify(existing_offline_txns))
console.log("set as", JSON.stringify(existing_offline_txns))
      }
    }
  )
  .catch(err => console.log(err))

  return nextTx(tx$, data_to_add, meta)
//  return nextTx(tx$, helpers.entities_to_clj(data_to_add), helpers.entities_to_clj(meta))
}

const retract = (data_to_add, meta) => {
  if (!meta) {
    var meta = {
      type: "retraction",
      // this is where the confirmationid gets set so that the server knows about it
      confirmationid: confirmationid,
      // for some reason this uuid has to be here and in the data_to_add.map in order to sync with the server
      uuid: data_to_add[0][1][1]
    }
  }

  // adds the confirmation id (but this should be removed from the transaction on the server)
  data_to_add.push([":db/add", ["uuid", data_to_add[0][1][1]], "confirmationid", confirmationid])
  return nextTx(tx$, data_to_add, meta)
}

const localtransact = (data_to_add, meta) => {
  return nextTx(localtx$, helpers.entities_to_clj(data_to_add, helpers.entities_to_clj(meta)))
}

const vectortransact = (data_to_add, meta) => {
  return nextTx(tx$, data_to_add, helpers.entities_to_clj(meta))
}

export default datascript
export {
  conn,
  globalstate,
  connect,
  nextTx,
  maintransact,
  localtransact,
  vectortransact,
  report$,
  tx$,
  validtx$,
  localreport$,
  localtx$,
  mori,
  helpers,
}
