import { useDeps } from 'react-simple-di'
import {
  compose,
} from 'recompose'

import React, { Fragment } from 'react'
import {
  Text,
  Button,
  Platform,
  StyleSheet,
} from 'react-native'

import { ListContainer, ListItemView } from '../../rncore/components/styledComponents'

const ContextPicker = ({
  actions,
  status,
  message,
  inboxitem,
  contexts
}) =>
  <Fragment>
    <ListContainer>
    {contexts.map( context => <ListItemView key={context.uuid}><Button onPress={() => actions().contextpicker['selectcontext'](inboxitem, context.uuid)} title={context.desc} /></ListItemView> )}
    </ListContainer>
  </Fragment>

export default compose(
  useDeps(),
)(ContextPicker)
