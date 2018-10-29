import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js
import {q$} from '../../../../config/rx-datascript'
const {DB_ID, DB_ADD, TX_DATA, TX_META, DB_AFTER, DB_BEFORE, DB_UNIQUE, DB_UNIQUE_IDENTITY} = helpers
const {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, get, find, nth, count, reduce} = mori
const morimap = helpers.map

import { isObservable, Observable, from, of, interval, timer } from 'rxjs'
import {
  switchMap,
  map,
  startWith,
  tap,
  catchError,
  combineLatest,
  merge,
  distinctUntilChanged,
  debounce,
  skip,
} from 'rxjs/operators'
import {
  mapPropsStream,
} from 'recompose'

const singlequery = (props$, query, queryname) => props$.pipe(
  switchMap(props => {
    const {report$} = props.context()
    return q$(report$, parse(query))
      .pipe(
        map(res => toJs(res)),
        startWith([]),
        // map(dsQuery => ({...props, dsQuery})) // could do this in combineLatest instead
      )
}))

const multiquery = (props$, queries) => {
  var multiquery = {}
  Object.keys(queries).map(query => multiquery[query] = singlequery(props$, queries[query], query))
  return multiquery
}

const dsload = (queries) => mapPropsStream(props$ => {
  const dsQ$ = multiquery(props$, queries)
  const keys = Object.keys(dsQ$)
  const values = Object.values(dsQ$)
  return props$.pipe(
    combineLatest(...values, (props, ...values) => {
      var returnobj = {...props}
      keys.forEach( (key, i) => returnobj[key] = values[i] )
      return returnobj
  }))
})

export default dsload
