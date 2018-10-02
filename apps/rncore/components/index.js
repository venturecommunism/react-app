import React from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'

import Calendar from '../../rndemo/components/componentFromStream/index'
import TopPad from '../../rncore/components/TopPad'
import Demo from '../../rndemo/components/index'
import Module from '../../rncore/containers/module'
const Mod = Module()

const Root = ({result}) => (
  <View>
    <ScrollView>
      <Calendar />
      <Mod moduleid={"inbox"} />
      <Mod moduleid={"somedaymaybe"} />
    </ScrollView>
    <Demo />
  </View>
)

export default Root
