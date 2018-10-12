import React from 'react'
import {
  StyleSheet
} from 'react-native'

// https://javascriptplayground.com/functional-stateless-components-react/

class Inputs extends React.Component {
  constructor(props) {
    super(props)
    this.state = { formvalue: "" }
  }

  handleInput = (text) => {
    this.setState({ formvalue: text })
  }
  submittask = (formvalue) => {
    this.props.actions[this.props.component.componentsname](formvalue)
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
          onSubmitEditing = {() => this.submittask(this.state.formvalue)}
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

export default Inputs
