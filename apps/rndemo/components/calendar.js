import React from 'react'
import {
  View,
  Text,
} from 'react-native'

import Container from '../../rncore/containers/timercontainer'

const CalendarComponent = ({result}) => (
  <View>
    <Text>{result}</Text>
  </View>
)

const Calendar = Container(CalendarComponent)

export default Calendar
