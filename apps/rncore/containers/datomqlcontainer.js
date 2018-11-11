import { useDeps } from 'react-simple-di'
import '../../rncore/containers/ObservableConfig'
import state from './streamhandlers/state'
import moriload from './streamhandlers/moriload'

import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

/*
const initKeys = (...queries) => {
  var initstate = {}
  initstate.queries = {}
  queries.forEach(j => j.forEach(k => Object.keys(k).forEach(l => initstate.queries[l] = k[l])))
  return initstate
}
*/

const depsToPropsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  tx:      actions.transact.tx,
  localtx: actions.localtx.tx,
  rxTx:    actions.rxtx.tx,
})

export default (component, ...queries) => compose(
  useDeps(depsToPropsMapper),
  state,
  moriload(Object.assign({}, ...queries)),
)(component, queries)
