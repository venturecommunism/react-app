import { createDatomQLContainer, datomql } from '../../rxtest/containers/datomql'
import React from 'react'

import {
  View,
  Text,
  TextInput
} from 'react-native'

import StatefulComponentWithActions from './statefulwactions'
import User from '../../clientsearch/components/user'

const Component = ({
  actions,
  status,
  message,
  testitems,
  value,
  handler
}) => {
  return (
    <View>
    <TextInput
      placeholder = "Match description"
      placeholderTextColor = "#9a73ef"
      autoCapitalize = "none"
      value = {value}
      onSubmitEditing = {() => console.log('submit')}
      onChangeText = {handler}
    />
    <User user={value} />
      {testitems && testitems.length > 0 && <Text>Results</Text>}
        {testitems && testitems.map(item => (
          <View key={item.e+item.attrib+item.value}>
          <StatefulComponentWithActions item={item} />
          </View>
         ))}
    </View>
  )
}

export default createDatomQLContainer(
  Component,
  datomql`
    query index_testitems {
[:find ?desc ?e ?uuid
  :where
[?e "description" "test"]
[?e "description" ?desc]
[?e "uuid" ?uuid]
]
    }
  `
)

