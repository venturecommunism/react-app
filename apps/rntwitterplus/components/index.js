import React from 'react'

import {
  View
} from 'react-native'

import DataContainer from '../../rncore/containers/datacontainer'
import ActionsMapper from '../../rncore/containers/actionsmapper'

import allTweetsQuery from '../queries/alltweets'

import PlainResultComponent from './plainresult'
const AllTweetsDataContainer = DataContainer(PlainResultComponent)

export default () => (
  <View>
    <AllTweetsDataContainer query={allTweetsQuery} />
  </View>
)
