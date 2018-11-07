import { set, get } from 'idb-keyval'

const setItem = (key, val) => set(key, val)
const getItem = (key) => get(key)

export {
  setItem,
  getItem,
}
