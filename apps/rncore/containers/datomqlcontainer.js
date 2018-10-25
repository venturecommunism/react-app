import { useDeps } from 'react-simple-di'
import '../../rncore/containers/ObservableConfig'
import state from './streamhandlers/state'
import dsload from './streamhandlers/dsload'

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

const depsToPropsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  tx:      actions.transact.tx
})

export default (component, ...queries) => compose(
//  withState('dsQuery', 'updateDsQuery', initkeys(...queries)),
//  withHandlers({
//    setDsQuery: ({ updateDsQuery }) => data => updateDsQuery(state => data),
//  }),

// can't use this because it's different for each container you wrap
// but maybe if we put this higher up in the ONE BIG container
// also don't say 'blankproject'

// withState('theproject', 'update_theproject', 'blankproject'),
//  withHandlers({
//    set_theproject: ({ update_theproject }) => data => update_theproject(state => data),
//  }),

  useDeps(depsToPropsMapper),
  state,
  dsload(queries),
)(component, ...queries)
