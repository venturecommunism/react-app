import React from 'react'
import 'resize-observer-polyfill/dist/ResizeObserver.global'
import {
  View,
  Text
} from 'react-native'

import Login from './loginpage'
import TopPad from '../../rncore/components/TopPad'
import Module from '../../core/containers/module'
const Mod = Module()

import Timer from '../../rndemo/components/mapPropsStream/index'
import GitHubDemo from '../../rndemo/components/componentFromStream/index'
import Demo from '../../rndemo/components/index'

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
    <Timer/>
    <GitHubDemo/>
    <Demo/>
    <LoginContainer query={loginstate}/>
  </View>
)

export default Root
