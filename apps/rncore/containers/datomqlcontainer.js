import { useDeps } from 'react-simple-di'
import './ObservableConfig'
import listenload from './streamhandlers/listenload'

import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

const initkeys = (...queries) => {
  var initstate = {}
  queries.forEach(j => Object.keys(j).forEach(k => initstate[k] = []))
  return initstate
}

export default (component, ...queries) => compose(
  withState('dsQuery', 'updateDsQuery', initkeys(...queries)),
  withHandlers({
    setDsQuery: ({ updateDsQuery }) => data => updateDsQuery(state => data),
  }),
  useDeps(),
  listenload(queries),
)(component, ...queries)
