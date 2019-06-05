import React, { Fragment } from 'react'
import {
  Text,
  Button,
} from 'react-native'

import { ListItem } from '../../rncore/components/styledComponents'

const IndividualTask = ({inboxitem, Trash, changeType}) =>
  <Fragment>
    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
    <Button onPress={Trash} title={"Trash"}/>
    <Button onPress={changeType} title={"Change Type"}/>
  </Fragment>

export default IndividualTask
