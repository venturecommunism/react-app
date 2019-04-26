import Voice from 'react-native-voice'

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  AppRegistry,
} from 'react-native'

import { FloatingButton } from '../../rncore/components/styledComponents'

import Inputs from './taskinput'
import Status from './status'

export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      recognized: '',
      started: '',
      results: [],
    }

    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    })
  }

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    })
  }

  onSpeechResults(e) {
    this.setState({
      results: e.value,
    })
  }

  async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    })
    try {
      await Voice.start('en-US')
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    return (
      <FloatingButton>
        {this.state.results && <Inputs task={this.state.results[0]} />}
        {this.state.results.length > 1 && this.state.results.map((result, index) => <Button key={index} title={result} onPress={() => console.log('test')} value={result}></Button>
        )}
        <Button
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
        <Status />
      </FloatingButton>
    )
  }
}

