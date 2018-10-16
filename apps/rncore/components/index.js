import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import CreateTask from './createtask'

import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import Inbox from './inbox'
import SomedayMaybe from './somedaymaybe'

const App = () =>
  <View>
    <ScrollView>
      <Calendar />
      <PickerInbox />
      <Inbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
