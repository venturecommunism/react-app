import React, { Fragment } from 'react'
import {
  Text,
  Button,
} from 'react-native'

import { ListItem } from '../../rncore/components/styledComponents'

const IndividualTask = ({inboxitem, onPress}) =>
  <Fragment>
    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
    <Button onPress={onPress} title={"Change Type"}/>
  </Fragment>

export default IndividualTask
