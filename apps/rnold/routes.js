import React from 'react'
import { View, Text } from 'react-native'

import { DBConnProvider } from '../../config/lib/helpers/legacy/dbConnProvider.js'

import Core from '../rncore/components/index'

export default function (injectDeps, { AppRegistry }, context, actions) {
//  const conn = context.conn
  const App = () => (
    <View>
      <Core />
    </View>
  )

  const AppCtx = injectDeps(App)
  AppRegistry.registerComponent('RCTWebRTCDemo', () => AppCtx)
}
