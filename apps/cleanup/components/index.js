import React from 'react'

import DataContainer from '../containers/generalcontainer'
import RecursiveComponent from './recursive'
const Recursive = DataContainer(RecursiveComponent)

const RecursiveWrapper = () => (
  <Recursive componentid={"rootcomponentcleanup"} />
)

export default RecursiveWrapper

