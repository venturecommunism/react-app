import React from 'react'
import { View, Text } from 'react-native'

import Demo from '../rndemo/components/index'

export default function (injectDeps, { AppRegistry }, context, actions) {
  const conn = context.conn
  const App = () => (
    <View>
      <Demo />
    </View>
  )

  const AppCtx = injectDeps(App)
  AppRegistry.registerComponent('RCTWebRTCDemo', () => App)
}
