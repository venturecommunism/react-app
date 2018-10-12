import React from 'react'

import StreamsTest from '../rncore/components/index'

export default (injectDeps, { AppRegistry }) =>
  AppRegistry.registerComponent('RCTWebRTCDemo', () => injectDeps(StreamsTest))
