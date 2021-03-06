import { set, get, clear, update, keys, del } from 'idb-keyval'

import uuid from '../uuid'

const delItem = (key) => del(key)
const getKeys = () => keys()
const setItem = (key, val) => set(key, val)
const getItem = (key) => get(key)

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

const updateItem = (key, func) => {
  console.log('update fired')
  update(key, func)
}

export {
  delItem,
  getKeys,
  updateItem,
  setItem,
  getItem,
  clear,
  breakmessage,
}
