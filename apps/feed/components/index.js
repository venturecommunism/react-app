import React from 'react'
import {
  View
} from 'react-native'

import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

const App = () =>
  <View>
    <Calendar />
    <PickerInbox />
    <SomedayMaybe />
  </View>

export default App
