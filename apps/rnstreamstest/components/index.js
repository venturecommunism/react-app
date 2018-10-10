import React from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'

import { render } from 'react-dom'

import { MemoryRouter as Router, Route } from 'react-router-dom'

import Container from '../containers/maincontainer'
import MainComponent from './maincomponent'

import { withRouter } from 'react-router-dom'
import listenload from '../containers/streamhandlers/listenload'
import selectUser from '../containers/streamhandlers/selectuser'
const streamhandlers = [withRouter, listenload, selectUser]

const StreamComponent = Container(MainComponent, streamhandlers)

const App = () => (
  <Router>
    <ScrollView>
      <Text>RXJS recompose Demo</Text>
      <Route path="/:user?" render={() => <StreamComponent />} />
    </ScrollView>
  </Router>
)

export default App
