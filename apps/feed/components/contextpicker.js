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
      {contexts.map( context => <ListItemView style={{'backgroundColor': context.uuid == inboxitem.context ? 'red' : 'blue'}} key={context.uuid}><Button onPress={context.uuid != inboxitem.context ? () => actions().contextpicker['selectcontext'](inboxitem, context.uuid) : () => console.log('this context is already set')} title={context['desc-count'] ? context.desc + ' (' + context['desc-count'] + ')' : context.desc } /></ListItemView> )}
    </ListContainer>
  </Fragment>

export default compose(
  useDeps(),
)(ContextPicker)
