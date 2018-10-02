import React from 'react'
import {
  Text
} from 'react-native'

import { timer } from 'rxjs'

import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'

const dataComposer = ({ context, query }, onData) => {
  var seconds = Math.floor( new Date() / 1000 )
  var subscribe = timer(1000, 1000).subscribe(val =>
    onData(null, {result: seconds + val})
  )
  return () => { subscribe.unsubscribe() }
}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)
