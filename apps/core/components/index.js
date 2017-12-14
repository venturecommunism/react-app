import React from 'react'

import DataContainer from '../../cleanup/container'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from '../../cleanup/component'
const Module = DataContainer(ActionsMapper('general', RecursiveComponent))

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <div>
    <Module moduleid={"core"} />
    <Module moduleid={"servercore"} />
  </div>
)

export default Root
