import React from 'react'

import { FloatingButton } from './styledComponents'

import ActionsMapper from '../../core/containers/actionsmapper'

import Inputs from '../../rndemo/components/taskinput'
const InputsContainer = ActionsMapper('createtask', Inputs)

import Status from './status'

const CreateTask = () =>
  <FloatingButton>
    <InputsContainer/>
    <Status />
  </FloatingButton>

export default CreateTask
