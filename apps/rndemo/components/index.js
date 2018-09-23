import React from 'react'
import { View, Text } from 'react-native'

import DataContainer from '../../rncore/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import allUserQuery from '../queries/alluser'
import PlainResultComponent from './plainresult'
const AllUsersDataContainer = DataContainer(ActionsMapper('followertree', PlainResultComponent))

const Demo = () => (
  <View>
    <Text>Demo</Text>
    <AllUsersDataContainer query={allUserQuery} />
  </View>
)

export default Demo
