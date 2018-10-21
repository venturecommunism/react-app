import React from 'react'
import { AppRegistry } from 'react-native'

import StreamsTest from '../rncore/components/index'

export default (injectDeps) =>
  AppRegistry.registerComponent('RCTWebRTCDemo', () => injectDeps(StreamsTest))
