import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import Login from '../../login/components/logincomponent'
import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

import CreateTask from '../../createtask/components/createtask'

const App = () =>
  <View>
    <ScrollView>
      <Login />
      <Calendar />
      <PickerInbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
