import React, { Fragment } from 'react'
import {
  Text,
  Button,
} from 'react-native'

import ContextPicker from './contextpicker'
import { ListContainer, ListItem } from '../../rncore/components/styledComponents'

const DoTask = ({
  inboxitem,
}) =>
  <Fragment>
    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
  </Fragment>

export default DoTask
