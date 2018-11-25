import { setItem as set, getItem as get, getAllItems, deleteItem } from 'react-native-sensitive-info'

import uuid from '../uuid'

const jsonkeys = ['syncpoint']

const setItem = (key, value) => {
  if (jsonkeys.indexOf(key) > -1) { 
    return set(key, JSON.stringify(value), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }
  else {
    return set(key, value, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }
}

const getItem = (key) => {
  if (jsonkeys.indexOf(key) > -1) {
    return get(key, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }
  else {
    return get(key, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain'
    })
  }
}

const clear = () => {
  getAllItems({
    sharedPreferencesName: 'mySharedPrefs',
    keychainService: 'myKeychain'
  }).then(values => {
      Object.keys(values).map( val => {
        deleteItem(val, {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain'
        })
      })
    })
    .catch(err => console.log(err))
}

const chunk = (arr, chunkSize) => {
  var R = []
  for (var i=0,len=arr.length; i<len; i+=chunkSize)
    R.push(arr.slice(i,i+chunkSize))
  return R
}

const breakmessage = (message, chunkSize) => {
  let brokenmessage = []
  let contents = chunk(message, chunkSize)
  contents.map(item => brokenmessage[uuid()] = item)
  return brokenmessage
}

export {
  setItem,
  getItem,
  clear,
  breakmessage,
}
