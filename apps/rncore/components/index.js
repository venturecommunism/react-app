import React from 'react'
import {
  ScrollView
} from 'react-native'

import Calendar from './calendar'
import Inbox from './inbox'
import SomedayMaybe from './somedaymaybe'

const App = () =>
  <ScrollView>
    <Calendar />
    <Inbox />
    <SomedayMaybe />
  </ScrollView>

export default App
