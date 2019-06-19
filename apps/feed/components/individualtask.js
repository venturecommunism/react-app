import React, { Fragment } from 'react'
import {
  Text,
  Button,
} from 'react-native'

import ContextPicker from './contextpicker'
import { ListContainer, ListItem } from '../../rncore/components/styledComponents'

const IndividualTask = ({
  contexts,
  defaultcontextcount,
  inboxitem,
  Trash,
  changeType
}) =>
  <Fragment>
    <ListContainer>
      <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
      <Button onPress={Trash} title={"Trash"}/>
      <Button onPress={changeType} title={"Change Type"}/>
      <ContextPicker contexts={defaultcontextcount} inboxitem={inboxitem} />
      <ContextPicker contexts={contexts} inboxitem={inboxitem} />
    </ListContainer>
  </Fragment>

export default IndividualTask
