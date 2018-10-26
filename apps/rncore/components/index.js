import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import CreateTask from './createtask'

import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

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
