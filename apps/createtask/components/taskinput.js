import Tts from 'react-native-tts'

import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'

import config from '../../../config/config'

import React from 'react'
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
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
      if (this.props.task != null) { Tts.speak(this.props.task) }
    }
  }

  handleInput = (text) => {
    this.setState({ formvalue: text })
  }
  submittask = (formvalue, username) => {
    this.props.actions().createtask['createtask'](formvalue, username)
    this.setState({ formvalue: "" })
  }
  render(){
    return (
      <View style = {styles.container}>
        <TextInput style = {styles.input}
          underlineColorAndroid = "transparent"
          placeholder = "Enter your task here."
          placeholderTextColor = "#9a73ef"
          autoCapitalize = "none"
          value = {this.state.formvalue}
          onSubmitEditing = {() => this.submittask(this.state.formvalue, this.props.state.username)}
          onChangeText = {this.handleInput}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText:{
    color: 'white'
  },
  titleText: {
    display: 'flex',
    fontSize: 20,
  },
})

export default createDatomQLContainer(
  Inputs,
  datomql`
    state taskinput_state {
[:find ?username :where
[(get-else $ ?e "email" "${config.username}") ?username]
]
    }
  `
)

