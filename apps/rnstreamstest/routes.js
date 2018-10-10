import React from 'react'

import StreamsTest from '../rnstreamstest/components/index'

export default (injectDeps, { AppRegistry }) =>
  AppRegistry.registerComponent('RCTWebRTCDemo', () => injectDeps(StreamsTest))
