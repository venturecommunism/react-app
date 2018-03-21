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
    display: 'none',
    fontSize: 20,
    fontWeight: 'bold',
  },
})

const badmapreduce = function (result, actions, moduleroot) {
  const doswitch = function (key, component) {
    switch(component.componentstype) {
      case undefined:
      case null:
        // this better be a string
        return <View key={key}><Text>{component}</Text></View>
      case "action":
        return <Inputs key={key} actions={actions} component={component} />
//        return <Button key={key} title={component.componentsname} key={key} onPress={actions[component.componentsname]} accessibilityLabel={component.componentsname} />
      case "subcomponent":
        // just return the component's name in subcomponents for now
        return <Text key={key} style={styles.titleText}>{component.componentsname}</Text>
      case "textarea":
        return <TextInput key={key} multiline={true} numberOfLines={4} key={key} placeholder={component.placeholder} />
      default:
        // we didn't find a component type but it's not a string. consider this an error
        console.warn("Unhandled component type in switch statement at apps/core/libs/badmapreduce.js (or where ever it is)")
        return <View key={key}><Text>Error: {JSON.stringify(component, null, 2)}</Text></View>
    }
  }

  var elements =
    moduleroot.map( function(onesetofdatafilledcomponents, pIndex) {
      return <View key={pIndex} style={{paddingBottom: 10}}>{onesetofdatafilledcomponents.map( function(component, sIndex) {
        var key = pIndex + "." + sIndex
        return doswitch(key, component)
      })}</View>
    })
  return <View>{elements}</View>
}

export default badmapreduce

