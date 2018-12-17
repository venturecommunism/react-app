import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import Groups from '../../groups/components/groups'
import TextThing from '../../createtask/components/text'
import Login from '../../login/components/logincomponent'
import Calendar from './calendar'
import PickerInbox from './pickerinbox'
import SomedayMaybe from './somedaymaybe'

import CreateTask from '../../createtask/components/createtask'

const App = () =>
  <View>
    <ScrollView>
<Groups />
<TextThing />
      <Login />
      <Calendar />
      <PickerInbox />
      <SomedayMaybe />
    </ScrollView>
    <CreateTask/>
  </View>

export default App
