import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js

const {core: dscljs} = ds

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

const singlequery = (props$, query, morearguments, queryname) => props$.pipe(
  // could be optimized for single query with or without arguments
  switchMap(props => {
    const {report$, localreport$} = props.context()

    const statequery = `[:find ?uuid :where [?e "${morearguments[0]}" ?uuid]]`
    const somequery$ = q$(localreport$, parse(statequery))
      .pipe(
        map(res => toJs(res)),
        startWith([]),
      )

    const fusereport$ = report$
      .pipe(
        combineLatest(somequery$, (s1, s2) => ({s1, s2})),
      )

    function newq(somereport$, query) {
      return somereport$
        .pipe(
          map(({s1, s2}) => ({s1, args: s2[0] ? s2[0] : [null]})),
          map(({s1, args}) => dscljs.q(query, get(s1, DB_AFTER), ...args) ),
          distinctUntilChanged(mori.equals)
        )
    }

    return newq(fusereport$, parse(query))
      .pipe(
        map(res => toJs(res)),
        startWith([]),
      )
}))

const multiquery = (props$, queries) => {
  var multiquery = {}
  Object.keys(queries).map(query => multiquery[query] = singlequery(props$, queries[query].query, queries[query].arguments, query))
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
