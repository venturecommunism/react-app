import React from 'react'
import {
  Text,
  View,
  ScrollView
} from 'react-native'

import 'resize-observer-polyfill/dist/ResizeObserver.global'
import { render } from 'react-dom'

import { MemoryRouter as Router, Route } from 'react-router-dom'

import Container from '../containers/maincontainer'
import MainComponent from './maincomponent'

import { withRouter } from 'react-router-dom'
import load from '../containers/streamhandlers/load'
import selectUser from '../containers/streamhandlers/selectuser'
const streamhandlers = [withRouter, load, selectUser]

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
