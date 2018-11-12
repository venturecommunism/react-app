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
  mapPropsStreamWithConfig,
} from 'recompose'

const rxjsconfig = {
  fromESObservable: config => new Observable(config.subscribe),
  toESObservable: stream => stream
}

const mapPropsStream = mapPropsStreamWithConfig(rxjsconfig)

const singlequery = (props$, query, morearguments, queryname, labels, filename) => props$.pipe(
  // could be optimized for single query with or without arguments
  switchMap(props => {

    const {report$, localreport$} = props.context()

    const statequery = `[:find ?uuid :where [?e "${morearguments[0]}" ?uuid]]`

    const somequery$ = q$(localreport$, parse(statequery))
      .pipe(
        // tap(res => console.log(filename)),
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
          // tap(res => console.log("filename: ", filename)),
          map(({s1, s2}) => ({s1, args: s2[0] ? s2[0] : [null]})),
          // tap(res => console.log(filename, queryname)),
          map(({s1, args}) => dscljs.q(query, get(s1, DB_AFTER), ...args) ),
          distinctUntilChanged(mori.equals)
        )
    }

    const label = (res) => {
      // console.log(filename, res)
      var labeled = []
      res.forEach(item => {
        var sublabeled = {}
        item.forEach((subitem, i) => {
          // console.log(i, filename)
          sublabeled[labels[i]] = subitem
        })
        labeled.push(sublabeled)
      })
      return labeled
    }

    return newq(fusereport$, parse(query))
      .pipe(
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log(filename)),
        map(jsres => label(jsres)),
        startWith([]),
      )
}))

const multiquery = (props$, queries) => {
  var multiquery = {}
  Object.keys(queries).map(query => multiquery[query] = singlequery(props$, queries[query].query, queries[query].arguments, query, queries[query].labels, queries[query].filename))
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
