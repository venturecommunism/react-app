import React from 'react'

import DataContainer from '../../cleanup/container'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from '../../cleanup/component'
const Recursive = DataContainer(ActionsMapper('general', RecursiveComponent))

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

const Root = ({result}) => (
  <Recursive componentid={"rootcomponentcleanup"} />
)

export default Root
