import React from 'react'
import {
  View,
  Text
} from 'react-native'

import badmapreduce from '../lib/newbadmapreduce'

const RecursiveResultComponent = ({ result, actions, moduleroot, title }) => (
  <View>
    <Text style={{display: 'none'}}>{title}</Text>
    {badmapreduce(result, actions, moduleroot)}
  </View>
)

export default RecursiveResultComponent
