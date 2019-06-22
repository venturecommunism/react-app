import { datomql } from '../containers/datomql'

import moriload from '../containers/streamhandlers/moriload'

import { combineLatest } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'

import { compose, mapPropsStream, createEventHandler } from 'recompose'
import { useDeps } from '../../../config/lib/mantra/deps'

import React from 'react'
import {
  Button,
  Text,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'

import BackButtonDemo from '../../feed/components/backbuttonpreventer'
import Contacts from '../../feed/components/contacts'
import Test from '../../rxtest/components/index'
import Search from '../../clientsearch/components/index'
import Groups from '../../groups/components/groups'
import Feed from '../../feed/components/index'
import ContextChooser from '../../contexts/components/contextchooser'

import Login from '../../login/components/logincomponent'
import CreateTask from '../../createtask/components/createtask'
import Clear from '../../rncore/components/cleardata'

/*
const screen = mapPropsStream(props$ => {
  const { handler, stream } = createEventHandler()
  const value$ = stream.pipe(
    map(e => e),
    startWith('Process')
  )
  return combineLatest(props$, value$).pipe(
    tap(([props, value]) => console.log("something", value)),
    map(([props, value]) => ({...props, value, handler}))
  )
})
*/

const App = ({
  value,
  handler,
}) =>
  <View>
    <ScrollView>
      <Button onPress={() => handler('Process')} title={'Process'} />
      <View style={value != 'Process' ? styles.hider : styles.nothidden}>
        <Feed />
      </View>
      <Button onPress={() => handler('Organize')} title={'Organize'} />
      <View style={value != 'Organize' ? styles.hider : styles.nothidden}>
        <Feed />
      </View>
      <Button onPress={() => handler('Do')} title={'Do'} />
      <View style={value != 'Do' ? styles.hider : styles.nothidden}>
        <ContextChooser />
      </View>
      <Button onPress={() => handler('Misc')} title={'Misc'} />
      <View style={value != 'Misc' ? styles.hider : styles.nothidden}>
        <Contacts />
        <Test />
        <Search />
        <Groups />
        <Clear />
      </View>
      <Login />
    </ScrollView>
    <CreateTask />
    <BackButtonDemo />
  </View>

const styles = StyleSheet.create({
  hider: {
    'display': 'none'
  },
  nothidden: {
    'display': 'flex'
  }
})

const queries =   [datomql`
    query calendar_calendaritems {
[:find ?desc ?date ?status ?uuid ?confirmid ?due ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
[?e "due" ?due]
]
    }
  `]

// this and the moriload changes were intended to unbreak the rxjs datascript on android. now it goes really slow
export default compose(
  useDeps(),
  // screen,
  moriload(Object.assign({}, ...queries)),
)(App)

