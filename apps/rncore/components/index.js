import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'

import React from 'react'
import {
  View,
  ScrollView,
} from 'react-native'

import BackButtonDemo from '../../feed/components/backbuttonpreventer'
import Contacts from '../../feed/components/contacts'
import Test from '../../rxtest/components/index'
import Search from '../../clientsearch/components/index'
import Groups from '../../groups/components/groups'
import TextThing from '../../createtask/components/text'
import Login from '../../login/components/logincomponent'
import Feed from '../../feed/components/index'
import ContextChooser from '../../contexts/components/contextchooser'
import Clear from './cleardata'

import CreateTask from '../../createtask/components/createtask'

const App = () =>
  <View>
    <ScrollView>
      <BackButtonDemo />
      <Contacts />
      <Test />
      <Search />
      <Login />
      <Feed />
      <Groups />
      <TextThing />
      <ContextChooser />
      <Clear />
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
