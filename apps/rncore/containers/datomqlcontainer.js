import { useDeps } from 'react-simple-di'
import './ObservableConfig'
import listenload from './streamhandlers/listenload'

import {
  compose,
  withState,
  withHandlers,
} from 'recompose'

export default (component, ...queries) => compose(
  withState('dsQuery', 'updateDsQuery', {inbox: [], calendar: []}),
  withHandlers({
    setDsQuery: ({ updateDsQuery }) => data => updateDsQuery(state => data),
  }),
  useDeps(),
  listenload(queries),
)(component, ...queries)
