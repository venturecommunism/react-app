import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js

const transact = (conn, data_to_add, meta) => {
  // disable metadata to test transactions locally

  // confid is the confirmationid. it will be put in meta so that the server can send it back and it will be mapped onto data_to_add so that
  // when it does come back it can be updated / removed
  // set the meta if it's unset. need to track how confirmationid and uuid (for a tx) are used
  if (!meta) {
    var meta = {
      type: "basic transaction",
      // this is where the confirmationid gets set so that the server knows about it
      confirmationid: data_to_add[0].confirmationid,
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

  var tx_report = datascript.transact(conn, data_to_add, meta)
}

export default transact
