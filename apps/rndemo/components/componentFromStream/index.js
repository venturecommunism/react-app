import React from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native'

import { componentFromStream, createEventHandler } from 'recompose';
import { combineLatest, timer } from 'rxjs';
import { map, merge, startWith } from 'rxjs/operators';
import User from './User';
import './observableConfig';

const App = componentFromStream(prop$ => {
  const timeElapsed$ = timer(0, 50000).pipe(
    map(x => x)
  )

  const { handler, stream } = createEventHandler();
  const value$ = stream.pipe(
    map(e => e.nativeEvent.text.trim()),
    startWith('')
  );

  return combineLatest(prop$, value$, timeElapsed$).pipe(
    map(([props, value, timeElapsed]) => (
      <View>
        <Text>{timeElapsed}</Text>
        <TextInput onChange={handler} placeholder="GitHub username" />
        <User user={value} />
      </View>
    ))
  );
});

export default App
