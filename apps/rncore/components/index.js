import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import BlankView from './blankview'

import CreateTask from './createtask'

import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

const App = () =>
  <View>
    <ScrollView>
      <BlankView />
      <Calendar />
      <PickerInbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
