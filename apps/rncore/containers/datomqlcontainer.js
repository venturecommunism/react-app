import { useDeps } from 'react-simple-di'
import '../../rncore/containers/ObservableConfig'
import state from './streamhandlers/state'
import moriload from './streamhandlers/moriload'

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
  tx:      actions.transact.tx,
  localtx: actions.localtx.tx,
  rxTx:    actions.rxtx.tx,
})

export default (component, ...queries) => compose(
  useDeps(depsToPropsMapper),
  state,
  moriload(Object.assign({}, ...queries)),
  // make sure both these Object.assigns are correct
)(component, Object.assign({}, ...queries))
