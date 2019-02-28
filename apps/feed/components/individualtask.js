import React from 'react'
import {
  View,
  Text
} from 'react-native'

const IndividualTask = ({task}) =>
  <View>
    <Text>{JSON.stringify(task)}</Text>
  </View>

export default IndividualTask
