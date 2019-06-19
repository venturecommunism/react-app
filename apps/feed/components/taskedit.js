import { useDeps } from 'react-simple-di'
import {
  compose,
} from 'recompose'

import React from 'react'
import {
  Text,
  View,
  TextInput,
  StyleSheet
} from 'react-native'

class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { formvalue: "" }
  }
  componentDidUpdate(prevProps) {
    if (this.props.task !== prevProps.task) {
      this.setState({ formvalue: this.props.task })
    }
  }
  handleInput = (text) => {
    this.setState({ formvalue: text })
  }
  edittask = (formvalue, uuid) => {
    this.props.actions().edittask['edittask'](formvalue, uuid)
    this.setState({ formvalue: "" })
  }
  render() {
      return <View>
        <TextInput style={styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your task here."
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          value = {this.state.formvalue}
          onSubmitEditing = {() => this.edittask(this.state.formvalue, this.props.uuid)}
          onChangeText = {this.handleInput}
        />
      </View>
    }
}

const styles = StyleSheet.create({
  input: {
    margin: 0,
    height: 40,
    width: 140,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
})

export default compose(
  useDeps(),
)(Inputs)
