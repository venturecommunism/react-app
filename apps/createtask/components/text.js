import { useDeps } from 'react-simple-di'

import React from 'react'
import { compose } from 'recompose'
import {
  View,
  TextInput,
  Text
} from 'react-native'

import textHandler from '../containers/text'

const TextThing = ({ actions, text, handleChange }) =>
  <View>
    <TextInput onSubmitEditing={() => actions().createtask.addtogroup(text)} value={text} onChange={handleChange} placeholder={'add data'} />
  </View>

export default compose(
  useDeps(),
  textHandler,
)(TextThing)
