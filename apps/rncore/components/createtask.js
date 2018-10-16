import React from 'react'

import { FloatingButton } from './styledComponents'

import ActionsMapper from '../../core/containers/actionsmapper'

import Inputs from '../../rndemo/components/taskinput'
const InputsContainer = ActionsMapper('createtask', Inputs)

const CreateTask = () =>
  <FloatingButton>
    <InputsContainer/>
  </FloatingButton>

export default CreateTask
