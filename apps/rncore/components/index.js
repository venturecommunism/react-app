import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

import CreateTask from './createtask'

const App = () =>
  <View>
    <ScrollView>
      <Calendar />
      <PickerInbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
