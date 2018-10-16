import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import CreateTask from './createtask'

import Calendar from './calendar'
import Inbox from './inbox'
import SomedayMaybe from './somedaymaybe'

const App = () =>
  <View>
    <ScrollView>
      <Calendar />
      <Inbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
