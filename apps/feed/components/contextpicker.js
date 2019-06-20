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

import { ListContainer, ListItemView, ListItem } from '../../rncore/components/styledComponents'

const ContextPicker = ({
  actions,
  status,
  message,
  inboxitem,
  contexts
}) =>
  <Fragment>
    <ListContainer>
      {/* contexts.map( context => <ListItemView key={context.uuid}><ListItem>{JSON.stringify(context)}</ListItem></ListItemView> ) */}
      {contexts.map( context =>
      <Fragment key={context.uuid}>
        <ListItemView style={{'backgroundColor': context.uuid == inboxitem.context ? 'red' : 'blue'}} ><Button onPress={context.uuid != inboxitem.context ? () => actions().contextpicker['selectcontext'](inboxitem, context.uuid) : () => console.log('this context is already set')} title={context['e3-count'] ? context.desc + ' (' + context['e3-count'] + ')' : context.desc } /></ListItemView>
      </Fragment>
      )}
    </ListContainer>
  </Fragment>

export default compose(
  useDeps(),
)(ContextPicker)
