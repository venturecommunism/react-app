import React from 'react'

import DataContainer from '../../core/containers/appbuilder'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from './component'
const Module = DataContainer(ActionsMapper('general', RecursiveComponent))
const CreateTaskModule = DataContainer(ActionsMapper('createtaskactions', RecursiveComponent))

import CreateTask from '../../tasks/components/createtask'

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <div>
    <Module moduleid={"newrootcore"} />
    <CreateTaskModule moduleid={"createtask"} />
    <Module moduleid={"core"} />
    <Module moduleid={"servercore"} />
  </div>
)

export default Root
