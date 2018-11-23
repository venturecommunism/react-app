import React from 'react'

import { FloatingButton } from '../../rncore/components/styledComponents'

import Inputs from './taskinput'
import Status from './status'

const CreateTask = () =>
  <FloatingButton>
    <Inputs />
    <Status />
  </FloatingButton>

export default CreateTask
