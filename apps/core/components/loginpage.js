import React, {Component} from 'react'
import {
  ScrollView,
  Text,
  View
} from 'react-native'

import Timer from '../../rndemo/components/mapPropsStream'
import GitHubDemo from '../../rndemo/components/componentFromStream'
import Demo from '../../rndemo/components/index'

import Module from '../../core/containers/module'
const Mod = Module()
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
        <Timer/>
        <GitHubDemo/>
        <Mod moduleid={"calendar"} />
        <Mod moduleid={"projectspicker"} />
        <Mod moduleid={"inbox"} />
        <Mod moduleid={"somedaymaybe"} />
      </ScrollView>
      <Demo />
    </View>
    }
  </View>
)

export default Root
