import React, { Fragment } from 'react'
import {
  Text,
  Button,
  StyleSheet,
} from 'react-native'

import ContextPicker from './contextpicker'
import { ListContainer, ListItem } from '../../rncore/components/styledComponents'

const IndividualTask = ({contexts, inboxitem, Trash, changeType}) =>
  <Fragment>
    <ListContainer style={styles.listcontainer} >
      <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
      <Button onPress={Trash} title={"Trash"}/>
      <Button onPress={changeType} title={"Change Type"}/>
      <ContextPicker style={styles.contextpicker} contexts={contexts} inboxitem={inboxitem} />
    </ListContainer>
  </Fragment>

const styles = StyleSheet.create({
  listcontainer: {
//    flex: 1
  },
  contextpicker: {
//    flex: 1
  },
})

export default IndividualTask
