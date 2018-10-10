// this container is getting replaced by recompose

import datascript from 'datascript'

import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'

const dataComposer = ({ context, actions}, onData) => {
  const {conn} = context()

  try {
    datascript.listen(conn, function(report) {
      const db = datascript.db(conn)
      const q  = `[:find ?name ?e
                   :where [?e "name" ?name]]`
      const result = datascript.q(q, db)
      onData(null, {result})
    })
  } catch (error) {
    alert(error)
    onData(null, {error})
  }
}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
