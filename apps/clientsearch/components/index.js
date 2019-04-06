import React from 'react'
import {
  View,
  Text,
  TextInput
} from 'react-native'

import { mapPropsStream, createEventHandler } from 'recompose'
import { combineLatest } from 'rxjs'
import { map, startWith } from 'rxjs/operators'

import User from './user'

const App = mapPropsStream(prop$ => {
  const { handler, stream } = createEventHandler();
  const value$ = stream.pipe(
    map(e => e),
    startWith('')
  )
  return combineLatest(prop$, value$).pipe(
    map(([props, value]) => ({...props, value, handler}))
  )
})

const Component = ({value, handler}) => (
  <View>
    <TextInput
      placeholder = "GitHub username"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      value = {value}
      onSubmitEditing = {() => console.log('submit')}
      onChangeText = {handler}
    />
    <User user={value} />
  </View>
)

export default App(Component)
