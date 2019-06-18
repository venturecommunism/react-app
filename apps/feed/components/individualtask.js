import React, { Fragment } from 'react'
import {
  Text,
  Button,
} from 'react-native'

import ContextPicker from './contextpicker'
import { ListItem } from '../../rncore/components/styledComponents'

const IndividualTask = ({contexts, inboxitem, Trash, changeType}) =>
  <Fragment>
    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
    <Button onPress={Trash} title={"Trash"}/>
    <Button onPress={changeType} title={"Change Type"}/>
    <ContextPicker contexts={contexts} inboxitem={inboxitem} />
  </Fragment>

export default IndividualTask
