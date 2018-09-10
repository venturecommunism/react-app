import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  Alert,
  ActivityIndicator
} from 'react-native'

import Module from '../../core/containers/module'
const Mod = Module()
const CreateTaskModule = Module('createtaskactions')
const StellarDemoModule = Module('stellardemoactions')
import LoginComponent from './logincomponent'
const Login = Module('loginactions', LoginComponent, 'none')

const Root = ({result, actions}) => (
  <View>
    { (!result[0] || result[0][0] != 11) ?
    <View>
      <Login />
    </View>
    :
    <View> 
      <ScrollView>
        <Mod moduleid={"inbox"} />
        <Mod moduleid={"somedaymaybe"} />
      </ScrollView>
      <View style={{position: 'fixed', right: 5, bottom: 5, width: 200}}>
        <CreateTaskModule moduleid="createtask" />
      </View>
      {/*
      <StellarDemoModule moduleid={"stellardemo"} />
      <Mod moduleid={"core"} />
      <Mod moduleid={"servercore"} />
      */}
    </View>
    }
  </View>
)

export default Root
