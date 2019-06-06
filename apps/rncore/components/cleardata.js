import { clear } from '../../../config/context/persistence'

import React from 'react'
import {
  Button
} from 'react-native'

const ClearData = () =>
  <Button title={"Clear Data"} onPress={() => clear()} />

export default ClearData
