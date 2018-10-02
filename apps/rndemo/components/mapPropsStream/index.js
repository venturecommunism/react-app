import React from 'react';
import {
  Text,
  View
} from 'react-native'

import { mapPropsStream } from 'recompose'
import { combineLatest, timer } from 'rxjs'
import { map } from 'rxjs/operators'

const enhance = mapPropsStream(props$ => {
  const timeElapsed$ = timer(0, 1000)

  return combineLatest(props$, timeElapsed$).pipe(
    map(([props, timeElapsed]) => ({
      ...props,
      timeElapsed
    }))
  )
})

const Timer = enhance(({timeElapsed}) =>
  <View>
    <Text>{timeElapsed}</Text>
  </View>
)

export default Timer
