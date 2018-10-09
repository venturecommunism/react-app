import React from 'react'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import { render } from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import Container from '../containers/maincontainer'
import MainComponent from './maincomponent'

import { withRouter } from 'react-router-dom'
import load from '../containers/streamhandlers/load'
import selectUser from '../containers/streamhandlers/selectuser'
const streamhandlers = [withRouter, load, selectUser]

const StreamComponent = Container(MainComponent, streamhandlers)

const App = () => (
  <BrowserRouter>
    <div>
      <h2>RXJS recompose Demo</h2>
      <Route path="/:user?" render={() => <StreamComponent />} />
    </div>
  </BrowserRouter>
)

export default App
