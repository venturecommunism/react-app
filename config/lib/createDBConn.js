import datascript from 'datascript'
window.d = datascript

import CoreAppSchema from '../../apps/core/datoms/schema/coreappschema'
import ComponentsSchema from '../../apps/core/datoms/schema/componentsschema'
import ModuleSchema from '../../apps/core/datoms/schema/moduleschema'

import datoms from '../../apps/core/datoms/seeds/datoms'
import secretdatoms from '../../apps/core/datoms/seeds/secretdatoms'
import refdatoms from '../../apps/core/datoms/seeds/refdatoms'
import componentdatoms from '../../apps/core/datoms/seeds/componentdatoms'

export default () => {
  const Schema = {
    ...CoreAppSchema,
    ...ComponentsSchema,
    ...ModuleSchema
  }
  const conn = datascript.create_conn(Schema)

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn, datoms)
  datascript.transact(conn, secretdatoms)
  datascript.transact(conn, refdatoms)
//  datascript.transact(conn, componentdatoms)
  return conn
}
