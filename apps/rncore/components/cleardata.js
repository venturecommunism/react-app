import { clear } from '../../../config/context/persistence'

import React from 'react'
import {
  View,
  Text,
  Button
} from 'react-native'

const ClearData = () => (
  <View>
    <Button title={"Clear Data"} onPress={() => clear()} />
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
    <Text> </Text>
  </View>
)

export default ClearData
