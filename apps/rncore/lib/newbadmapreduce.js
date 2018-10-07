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

import DateTimePicker from '../components/datetimepicker'
import Inputs from '../components/inputs'
import CheckBox from '../components/checkbox'

const badmapreduce = function (result, actions, moduleroot) {
  const doswitch = function (pIndex, sIndex, component) {
    var key = pIndex + "." + sIndex
    switch(component.componentstype) {
      case undefined:
      case null:
        // this better be a string
        return <View key={key}><Text>{component}</Text></View>
      case "action":
        switch(component.actiontype) {
          case "simplebutton":
            return <Button key={key} title={component.placeholder} onPress={() => actions[component.componentsname](result[pIndex][3])} accessibilityLabel={component.placeholder} />
          case "checkbox":
            return <CheckBox key={key} onChange={() => actions[component.componentsname](result[pIndex][3])} label={component.placeholder} />
          case "datetimepicker":
            return <DateTimePicker placeholder={component.placeholder} buttonaction={actions[component.componentsname]} key={key} taskid={result[pIndex][3]} />
          case undefined:
          case null:
          default:
            return <Button key={key} title={component.componentsname} key={key} onPress={() => actions[component.componentsname](result[pIndex][3])} accessibilityLabel={component.componentsname} />
        }
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
      return <View key={pIndex} style={{paddingBottom: 10}}><View style={result[pIndex][4] != 'none' ? {'backgroundColor': 'red'} : ''}>{onesetofdatafilledcomponents.map( function(component, sIndex) {
        return doswitch(pIndex, sIndex, component)
      })}</View></View>
    })
  return <View>{elements}</View>
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

export default badmapreduce

