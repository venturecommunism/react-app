import { useDeps } from 'react-simple-di'
import '../../rncore/containers/ObservableConfig'
import state from './streamhandlers/state'
import moriload from './streamhandlers/moriload'

import {
  compose,
} from 'recompose'

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
