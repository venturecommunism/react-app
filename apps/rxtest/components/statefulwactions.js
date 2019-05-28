import { useDeps } from 'react-simple-di'
import { compose } from 'recompose'

import React from 'react'

import {
  View,
  Text,
  TextInput
} from 'react-native'
import { Button } from '../../rncore/components/styledComponents'

const depsToPropsMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions,
  tx:      actions.transact.tx,
  localtx: actions.localtx.tx,
  rxTx:    actions.rxtx.tx,
})

class StatefulComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attribute: '',
      value: ''
    }
  }
  render() {
    const COMMANDS = this.props.actions().rxtest
    return (
      <View>
          <View key={this.props.item.e+this.props.item.attrib+this.props.item.value}>
            <Text>a: {this.props.item.attrib}</Text>
            <Button
              title={"Remove Attribute"}
              onPress={() => COMMANDS.removeattribute(this.props.item.uuid, this.props.item.attrib, this.props.item.value)}
              accessibilityLabel={"Remove Attribute"} />
            <TextInput
              value = {this.state.value}
              onChangeText={(value) => this.setState({ value })}
              onSubmitEditing = {() => console.log(this.state.value)}
              placeholder = {this.props.item.value} />
            <Text>----</Text>
          </View>
     </View>
   )
 }
}

const StatefulComponentWithActions = compose(
  useDeps(depsToPropsMapper)
)(StatefulComponent)

export default StatefulComponentWithActions
