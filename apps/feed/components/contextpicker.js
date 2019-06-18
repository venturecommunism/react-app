import React, { Fragment } from 'react'
import {
  Text,
  Button,
  Platform,
  StyleSheet,
} from 'react-native'

const ContextPicker = ({
  actions,
  status,
  message,
  inboxitem,
  contexts
}) =>
  <Fragment>
    {contexts.map( context => <Button title={context.desc} /> )}
  </Fragment>

export default ContextPicker
