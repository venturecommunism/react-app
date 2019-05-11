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
      end: '',
      recognized: '',
      started: '',
      results: [],
      formvalue: '',
    }

    Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  onSpeechEnd(e) {
    this.setState({
      end: '√',
    })
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
      formvalue: e.value[0],
    })
  }

  async _startRecognition(e) {
    this.setState({
      end: '',
      recognized: '',
      started: '',
      results: [],
      formvalue: '',
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
<Text>{!this.state.end && this.state.started && 'Listening...'}</Text>
        {this.state.results && <Inputs task={this.state.formvalue} />}
        {this.state.results.length > 1 && this.state.results.map((result, index) => <Button key={index} title={result} onPress={() => this.setState({formvalue: result})} value={result}></Button>
        )}
        <Button
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
        <Status />
      </FloatingButton>
    )
  }
}

