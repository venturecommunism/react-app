import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import TopPad from '../../rncore/components/TopPad'
import DataContainer from '../../core/containers/appbuilder'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from '../../rncore/components/component'
const Module = DataContainer(ActionsMapper('general', RecursiveComponent))
const CreateTaskModule = DataContainer(ActionsMapper('createtaskactions', RecursiveComponent))
const StellarDemoModule = DataContainer(ActionsMapper('stellardemoactions', RecursiveComponent))

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <TopPad>
    <ScrollView>
      <Module moduleid={"newrootcore"} />
    </ScrollView>
    <View style={{position: 'fixed', right: 5, bottom: 5, width: 200}}>
      <CreateTaskModule moduleid="createtask" />
    </View>

{/*
    <StellarDemoModule moduleid={"stellardemo"} />
    <Module moduleid={"core"} />
    <Module moduleid={"servercore"} />
*/}
  </TopPad>
)

export default Root
