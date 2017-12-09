import React from 'react'

import DataContainer from '../containers/generalcontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import GeneralComponent from './general'

const General = DataContainer(ActionsMapper('inbox', GeneralComponent))

const GeneralWrapper = () => (
  <div>
    <General componentid={"comp"} />
  </div>
)

export default GeneralWrapper
