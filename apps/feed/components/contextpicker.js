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
    {contexts.map( context => <ListItemView key={context.uuid}><Button onPress={() => console.log('contextpicker press')} title={context.desc} /></ListItemView> )}
    </ListContainer>
  </Fragment>

export default ContextPicker
