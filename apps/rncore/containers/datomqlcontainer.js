import { useDeps } from 'react-simple-di'
import './ObservableConfig'
import listenload from './streamhandlers/listenload'

import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

export default (component, query) => compose(
  withState('dsQuery', 'updateDsQuery', []),
  withHandlers({
    setDsQuery: ({ updateDsQuery }) => users => updateDsQuery(state => users),
  }),
  useDeps(),
  listenload(query),
)(component, query)
