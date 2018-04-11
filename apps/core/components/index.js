import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import Login from './loginpage'
import TopPad from '../../rncore/components/TopPad'
import Module from '../../core/containers/module'
const Mod = Module()
const CreateTaskModule = Module('createtaskactions')
const StellarDemoModule = Module('stellardemoactions')

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <TopPad>
    <Login />
    <View style={{position: 'fixed', right: 5, bottom: 5, width: 200}}>
      <CreateTaskModule moduleid="createtask" />
    </View>
{/*
    <StellarDemoModule moduleid={"stellardemo"} />
    <Mod moduleid={"core"} />
    <Mod moduleid={"servercore"} />
*/}
  </TopPad>
)

export default Root
