import datascript from 'datascript'
window.d = datascript

import CoreAppSchema from '../../apps/core/datoms/schema/coreappschema'
import LocalStateSchema from '../../apps/core/datoms/schema/localstateschema'
import ComponentsSchema from '../../apps/core/datoms/schema/componentsschema'
import ModuleSchema from '../../apps/core/datoms/schema/moduleschema'

import taskscategories from '../../apps/core/datoms/seeds/taskscategories'
import secretdatoms from '../../apps/core/datoms/seeds/secretdatoms'
import followerdatoms from '../../apps/core/datoms/seeds/followerdatoms'

import calendar from '../../apps/core/datoms/seeds/calendar'
import projectspicker from '../../apps/core/datoms/seeds/projectspicker'
import inbox from '../../apps/core/datoms/seeds/inbox'
import somedaymaybe from '../../apps/core/datoms/seeds/somedaymaybe'
import clientroot from '../../apps/core/datoms/seeds/clientroot'
import serverroot from '../../apps/core/datoms/seeds/serverroot'
import createtask from '../../apps/core/datoms/seeds/createtask'
import stellardemo from '../../apps/core/datoms/seeds/stellardemo'

import localdb from '../../apps/core/datoms/seeds/localdb'

const maindb = () => {
  const Schema = {
    ...CoreAppSchema,
    ...LocalStateSchema
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
  datascript.transact(conn_db, calendar)
  datascript.transact(conn_db, projectspicker)
  datascript.transact(conn_db, inbox)
  datascript.transact(conn_db, somedaymaybe)
  datascript.transact(conn_db, createtask)
  datascript.transact(conn_db, clientroot)
  datascript.transact(conn_db, serverroot)
  datascript.transact(conn_db, stellardemo)
  datascript.transact(conn_db, localdb)
  return conn_db
}

export {maindb, componentdb}
