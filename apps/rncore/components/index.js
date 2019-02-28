import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'

import React from 'react'
import {
  View,
  ScrollView
} from 'react-native'

import Groups from '../../groups/components/groups'
import TextThing from '../../createtask/components/text'
import Login from '../../login/components/logincomponent'
import Feed from '../../feed/components/index'

import CreateTask from '../../createtask/components/createtask'

const App = () =>
  <View>
    <ScrollView>
      <Login />
      <Feed />
      <Groups />
      <TextThing />
    </ScrollView>
    <CreateTask/>
  </View>

export default App

/*
export default createDatomQLContainer(
  App,
  datomql`
    state index_loginstate {
[:find ?status
  :where
[(get-else $ ?e "status" "prelogin") ?status]
]
    }
  `
)
*/
