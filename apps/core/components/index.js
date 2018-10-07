import React from 'react'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {
  View
} from 'react-native'

import Login from './loginpage'
import Module from '../../core/containers/module'
const Mod = Module()

const loginstate = `
  [:find ?e ?v
   :where [?e "localstate/state" ?v]]`

import SmallContainer from '../../core/containers/datacontainer'

const LoginContainer = Module('loginactions', Login, SmallContainer)

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <View>
    <LoginContainer query={loginstate}/>
  </View>
)

export default Root
