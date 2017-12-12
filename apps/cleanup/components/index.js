import React from 'react'

import DataContainer from '../containers/generalcontainer'
import GeneralComponent from './general'
const General = DataContainer(GeneralComponent)

const GeneralWrapper = () => (
  <div>
    <General componentid={"rootcomponentcleanup"} />
  </div>
)

export default GeneralWrapper

