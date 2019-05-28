import edn from 'jsedn'

import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js

const {core: dscljs} = ds

import {q$} from '../../../../config/rx-datascript'
const {DB_ID, DB_ADD, TX_DATA, TX_META, DB_AFTER, DB_BEFORE, DB_UNIQUE, DB_UNIQUE_IDENTITY} = helpers
const {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, get, find, nth, count, reduce} = mori
const morimap = helpers.map

import { isObservable, Observable, from, of, interval, timer, merge } from 'rxjs'
import {
  debounceTime,
  switchMap,
  map,
  startWith,
  tap,
  catchError,
  distinctUntilChanged,
  debounce,
  skip,
} from 'rxjs/operators'
import {
  mapPropsStream,
  createEventHandler,
} from 'recompose'
import { combineLatest } from 'rxjs'

const loading$ = of({testitems: [{e: "1", desc: "yo"}], name: 'Loading...'})

const dsload = (queries) => mapPropsStream(props$ => {

  const { handler, stream } = createEventHandler();
  const value$ = stream.pipe(
    map(e => e),
    startWith('test')
  )

  const getvalue$ = value$.pipe(
    map(e => e),
    startWith('')
  )

      const querything = `[:find ?desc ?e ?attrib ?value ?uuid :where [?e ?attrib ?value] [?e "uuid" ?uuid] [?e "description" ?desc] [?e "description" "something"]]`
//  const whole_query = queries.testitems.query

  const parsedquery = edn.parse(querything)

  var localstatelabels = []

  var i = 1
  if (parsedquery.val[0].name != ":find") { throw 'no initial find' }
  while (parsedquery.val[i].name.charAt(0) != ":") {
    localstatelabels.push(parsedquery.val[i].name.slice(1))
    i++
  }

  const locallabel = (res) => {
    // console.log(filename, res)
    var labeled = []
    res.forEach(item => {
      var sublabeled = {}
      item.forEach((subitem, i) => {
        // console.log(i, filename)
        sublabeled[localstatelabels[i]] = subitem
      })
      labeled.push(sublabeled)
    })
    return labeled
  }

  return combineLatest(props$, getvalue$).pipe(
    debounceTime(700),
    map(([props, getvalue]) => ({props, getvalue, handler})),
    switchMap(({props, getvalue, handler}) => {
      const {report$} = props.context()

      const withvarsquerything = `[:find ?desc ?e ?attrib ?value ?uuid :where [?e "uuid" ?uuid] [?e ?attrib ?value] [?e "description" ?desc] [?e "description" "${getvalue}"]]`

      return merge(
        loading$,
        q$(report$, parse(withvarsquerything))
        .pipe(
          map(res => toJs(res)),
          map(res => ({...props, getvalue, handler, testitems: locallabel(res)})),
          startWith(props => ({testitems: [{e: "1", desc: "yo"}], ...props }))
        )
      )
  }),
)
})

export default dsload
