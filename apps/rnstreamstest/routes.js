import React from 'react'
import { View, Text } from 'react-native'

import { DBConnProvider } from '../../config/lib/helpers/legacy/dbConnProvider.js'

import StreamsTest from '../rnstreamstest/components/index'

export default function (injectDeps, { AppRegistry }, context, actions) {
//  const conn = context.conn
  const App = () => (
    <View>
      <StreamsTest />
    </View>
  )

  const AppCtx = injectDeps(App)
  AppRegistry.registerComponent('RCTWebRTCDemo', () => AppCtx)
}


