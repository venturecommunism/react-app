import React from 'react'
import {
  View,
  Text,
  ScrollView
} from 'react-native'

import StreamsTest from '../../rnstreamstest/components/index'
import Timer from '../../rndemo/components/mapPropsStream/index'
import GitHubDemo from '../../rndemo/components/componentFromStream/index'
import TopPad from '../../rncore/components/TopPad'
import Demo from '../../rndemo/components/index'
import Module from '../../rncore/containers/module'
const Mod = Module()

const Root = ({result}) => (
  <View>
    <ScrollView>
      <StreamsTest/>
      <Timer/>
      <GitHubDemo/>
      <Mod moduleid={"calendar"} />
      <Mod moduleid={"projectspicker"} />
      <Mod moduleid={"inbox"} />
      <Mod moduleid={"somedaymaybe"} />
    </ScrollView>
    <Demo />
  </View>
)

export default Root
