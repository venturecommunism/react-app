import React from 'react'
import {
  View
} from 'react-native'

import DataContainer from '../../core/containers/appbuilder'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from '../../rncore/components/component'
const Module = DataContainer(ActionsMapper('general', RecursiveComponent))
const CreateTaskModule = DataContainer(ActionsMapper('createtaskactions', RecursiveComponent))
const StellarDemoModule = DataContainer(ActionsMapper('stellardemoactions', RecursiveComponent))

import CreateTask from '../../tasks/components/createtask'

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <View>
    <Module moduleid={"newrootcore"} />
    <CreateTaskModule moduleid={"createtask"} />
{/*
    <StellarDemoModule moduleid={"stellardemo"} />
    <Module moduleid={"core"} />
    <Module moduleid={"servercore"} />
*/}
  </View>
)

export default Root
