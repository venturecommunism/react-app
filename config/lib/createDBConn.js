import datascript from 'datascript'
window.d = datascript

import CoreAppSchema from '../../apps/core/datoms/schema/coreappschema'
import ComponentsSchema from '../../apps/core/datoms/schema/componentsschema'
import ModuleSchema from '../../apps/core/datoms/schema/moduleschema'

import taskscategories from '../../apps/core/datoms/seeds/taskscategories'
import secretdatoms from '../../apps/core/datoms/seeds/secretdatoms'
import followerdatoms from '../../apps/core/datoms/seeds/followerdatoms'

import clientroot from '../../apps/core/datoms/seeds/clientroot'
import serverroot from '../../apps/core/datoms/seeds/serverroot'
import createtask from '../../apps/core/datoms/seeds/createtask'

const maindb = () => {
  const Schema = {
    ...CoreAppSchema,
  }
  const conn = datascript.create_conn(Schema)

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn, taskscategories)
  datascript.transact(conn, secretdatoms)
  datascript.transact(conn, followerdatoms)
  return conn
}

const componentdb = () => {
  const SchemaComp = {
    ...ComponentsSchema,
    ...ModuleSchema
  }
  const conn_db = datascript.create_conn(SchemaComp)

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn_db, createtask)
  datascript.transact(conn_db, clientroot)
  datascript.transact(conn_db, serverroot)
  return conn_db
}


export {maindb, componentdb}
