import { useDeps } from 'react-simple-di'
import './ObservableConfig'
import project from './streamhandlers/project'
import listenload from './streamhandlers/listenload'

import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

import PropTypes from 'prop-types'

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

 withState('theproject', 'update_theproject', 'blankproject'),
  withHandlers({
    set_theproject: ({ update_theproject }) => data => update_theproject(state => data),
  }),

  useDeps(),
  listenload(queries),
  project,
)(component, ...queries)
