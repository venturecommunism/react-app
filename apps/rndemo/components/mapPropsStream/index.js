import React from 'react';
import {
  Text,
  View
} from 'react-native'

import { mapPropsStream } from 'recompose'
import { combineLatest, timer } from 'rxjs'
import { map } from 'rxjs/operators'

const TimerContainer = mapPropsStream(props$ => {
  const timeElapsed$ = timer(0, 1000)

  return combineLatest(props$, timeElapsed$).pipe(
    map(([props, timeElapsed]) => ({
      ...props,
      timeElapsed
    }))
  )
})

const TimerComponent = ({timeElapsed}) =>
  <View>
    <Text>{timeElapsed}</Text>
  </View>

const Timer = TimerContainer(TimerComponent)

export default Timer
