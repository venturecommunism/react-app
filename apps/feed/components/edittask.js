import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from 'react-native'

import { ListContainer, ListItemView } from '../../rncore/components/styledComponents'
import Inputs from './taskedit'

export default class EditTask extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formvalue: '',
    }
  }

  render() {
    return <ListItemView>
        <Inputs uuid={this.props.uuid} task={this.state.formvalue} />
      </ListItemView>
    }
}
