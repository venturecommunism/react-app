import React from 'react'
import {
  Button,
  DatePickerAndroid,
  TimePickerAndroid
} from 'react-native'

const datetimepicker = async (buttonaction, taskid) => {
  try {
    const {action, year, month, day} = await DatePickerAndroid.open({
      date: new Date()
    });
    if (action !== DatePickerAndroid.dismissedAction) {
      timepicker(buttonaction, taskid, year, month, day)
    }
  } catch ({code, message}) {
    alert(message)
    console.warn('Cannot open date picker', message);
  }
}

const timepicker = async (buttonaction, taskid, year, month, day) => {
  try {
    const {action, hour, minute} = await TimePickerAndroid.open({
      is24Hour: false
    });
    if (action !== TimePickerAndroid.dismissedAction) {
      buttonaction(taskid, year, month, day, hour, minute)
    }
  } catch ({code, message}) {
    alert(message)
    console.warn('Cannot open time picker', message);
  }
}

const DateTimePicker = ({buttonaction, taskid, placeholder}) =>
  <Button title={placeholder} onPress={() => datetimepicker(buttonaction, taskid)} />

export default DateTimePicker
