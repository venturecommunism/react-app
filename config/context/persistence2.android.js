import { setItem as set, getItem as get } from 'react-native-sensitive-info'

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


export {
  setItem,
  getItem,
}
