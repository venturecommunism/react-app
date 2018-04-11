import React from 'react'
import {
  View
} from 'react-native'

import Module from '../containers/module'
const Mod = Module(undefined, undefined)

const Root = ({result}) => (
  <View>
    <Mod moduleid={"newrootcore"} />
  </View>
)

export default Root
