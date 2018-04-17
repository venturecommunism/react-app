import React from 'react'
import {
  View,
  Text
} from 'react-native'

import Module from '../../core/containers/module'
const Mod = Module()
const CreateTaskModule = Module('createtaskactions')
const StellarDemoModule = Module('stellardemoactions')

const Root = ({result, actions}) => (
  <View>
    <Text onClick={actions.login_page} >test:
      <ul>
      {result.map(([e, v]) => (
        <li key={e + v}>{`${e} and localstate/state and ${v}`}</li>
      ))}
      </ul>
    </Text>
{/*
    <Mod moduleid={"loginpage"} />
    <View style={{position: 'fixed', right: 5, bottom: 5, width: 200}}>
      <CreateTaskModule moduleid="createtask" />
    </View>
    <StellarDemoModule moduleid={"stellardemo"} />
    <Mod moduleid={"core"} />
    <Mod moduleid={"servercore"} />
*/}
  </View>
)

export default Root
