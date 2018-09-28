import React from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform
} from 'react-native'

import DataContainer from '../../rncore/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import allUserQuery from '../queries/alluser'
import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(ActionsMapper('followertree', PlainResultComponent))

const InputsContainer = ActionsMapper('createtask', Inputs)

import Inputs from './taskinput'

const styles = Platform.OS === 'android' ? StyleSheet.create({
  floatingMenuButtonStyle: {
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#FF0000',
    width: 200,
    left: 160,
  }
}) : StyleSheet.create({
  floatingMenuButtonStyle: {
    position: 'fixed',
    right: 5,
    bottom: 5,
    width: 200,
    backgroundColor: '#FF0000',
  }
})

const Demo = () => (
  <View>
{/*    <ScrollView style={{backgroundColor: '#FFFF00'}}>
      <Text>Demo</Text>
      <AllUsersDataContainer query={allUserQuery} />
    </ScrollView> */}
    <View style={styles.floatingMenuButtonStyle}>
      <InputsContainer />
    </View>
  </View>
)

export default Demo
