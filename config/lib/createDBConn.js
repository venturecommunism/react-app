import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
window.d = datascript

import CoreAppSchema from '../../apps/core/datoms/schema/coreappschema'
import LocalStateSchema from '../../apps/core/datoms/schema/localstateschema'
import ComponentsSchema from '../../apps/core/datoms/schema/componentsschema'
import ModuleSchema from '../../apps/core/datoms/schema/moduleschema'

import taskscategories from '../../apps/core/datoms/seeds/taskscategories'
import secretdatoms from '../../apps/core/datoms/seeds/secretdatoms'

import followerdatoms from '../../apps/core/datoms/seeds/followerdatoms'
import dummydata from '../../apps/core/datoms/seeds/dummydata'

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
    ...CoreAppSchema
  }
  const conn = datascript.create_conn(Schema)

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  // TODO: make it so the login procedure does not depend on these
  datascript.transact(conn, taskscategories)
  datascript.transact(conn, secretdatoms)
  datascript.transact(conn, followerdatoms)
  return conn
}

const fakedb = () => {
  const Schema = {
    ...CoreAppSchema
  }
  const conn_fake_db = datascript.create_conn(Schema)

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn_fake_db, taskscategories)
  datascript.transact(conn_fake_db, secretdatoms)
  datascript.transact(conn_fake_db, followerdatoms)
  datascript.transact(conn_fake_db, dummydata)
  return conn_fake_db
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

const localstate = () => {
  const LocalSchema = {
    ...LocalStateSchema
  }

  const conn_localstate_db = datascript.create_conn(LocalSchema)
  return conn_localstate_db
}

export {maindb, fakedb, componentdb, localstate}
