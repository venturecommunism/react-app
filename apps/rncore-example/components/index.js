import React from 'react'
import {
  View
} from 'react-native'

import Module from '../../rncore/containers/module'
const Mod = Module()
const CreateTaskModule = Module('createtaskactions')

const Root = ({result}) => (
  <View>
    <Mod moduleid={"newrootcore"} />
{/*    <CreateTaskModule moduleid={"createtask"} />
    <Mod moduleid={"core"} />
    <Mod moduleid={"servercore"} />
*/}
  </View>
)

export default Root
