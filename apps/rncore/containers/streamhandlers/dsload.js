import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js

import { Observable, from, of, interval, timer } from 'rxjs'
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

import { isEmpty } from 'lodash'

const firstitemloadertext = [["FIRST ITEM Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]
const seconditemloadertext = [["SECOND ITEM Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]

const initialQuery = (props, queries) => {
  const initqueryloadertext = [["INIT QUERY Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]
  const {conn} = props.context()
  const db = datascript.db(conn)
  const loadertext = [["Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]
  var result = {}
  var latencyloader = {}
  queries.forEach(metadata => Object.keys(metadata).forEach(prop => result[prop] = datascript.q(metadata[prop], db, props.selectedState.project)))
  queries.forEach(metadata => Object.keys(metadata).forEach(prop => latencyloader[prop] = initqueryloadertext))
  return Object.keys(result).some(k => !isEmpty(result[k])) ? [result] : [latencyloader]
}

const listenQuery = (props, queries) => Observable.create(function(observer) {
  const {globalstate} = props.context()
  const {conn} = props.context()
  var THEPROJECT

  datascript.listen(globalstate, function(report) {
    const statequery = `
[:find ?project :where
[?e "project" ?project]
]
    `
    // global in scope, but local because it comes from the client
    const localstate = datascript.q(statequery, datascript.db(globalstate))
    THEPROJECT = localstate[0] ? localstate[0][0] : null
    // console.log("PROJ-LISTEN")
    const listenqueryloadertext = [["GLOBALSTATE LISTEN QUERY Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]
    const db = datascript.db(conn)
    var result = {}
    var latencyloader = {}
    queries.forEach(metadata => Object.keys(metadata).forEach(prop => result[prop] = datascript.q(metadata[prop], db, THEPROJECT)))
    queries.forEach(metadata => Object.keys(metadata).forEach(prop => latencyloader[prop] = listenqueryloadertext))
    return Object.keys(result).some(k => !isEmpty(result[k])) ? observer.next(result) : observer.next(latencyloader)
  })

  datascript.listen(conn, function(report) {
    const statequery = `
[:find ?v :where
[?e "project" ?v]
]
    `
    const theproj = datascript.q(statequery, datascript.db(globalstate))
    var THEPROJECT = (theproj[0] && theproj[0][0]) ? theproj[0][0] : null
    // console.log("CONN LISTEN")
    const listenqueryloadertext = [["CONN LISTEN QUERY Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]
    const db = datascript.db(conn)
    var result = {}
    var latencyloader = {}
    queries.forEach(metadata => Object.keys(metadata).forEach(prop => result[prop] = datascript.q(metadata[prop], db, THEPROJECT)))
    queries.forEach(metadata => Object.keys(metadata).forEach(prop => latencyloader[prop] = listenqueryloadertext))
    return Object.keys(result).some(k => !isEmpty(result[k])) ? observer.next(result) : observer.next(latencyloader)
  })
})

const dsload = (queries) => mapPropsStream(props$ => {
  const dsQ$ = props$.pipe(
    // tap(props => console.log("TEH PROPS", props)),
    switchMap(
      props => from(initialQuery(props, queries))
        .pipe(
          debounce(() => timer(500)),
          // map(dsQuery => ({...props, dsQuery})),
          // distinctUntilChanged(),
          startWith(props => ({dsQuery: {calendaritems: firstitemloadertext, filterprojects: firstitemloadertext, projects: firstitemloadertext}, ...props }))
        )
        .pipe(
//          map(dsQuery => ({dsQuery, ...props})),
          skip(1)
        )
    )
  )

  const dsListenQuery$ = props$.pipe(
    // tap(props => console.log("TEH PROPS", props)),
    switchMap(
      props => listenQuery(props, queries)
        .pipe(
          debounce(() => timer(600)),
          // map(dsQuery => ({...props, dsQuery})),
          // tap(props => console.log(props)),
          // distinctUntilChanged(),
          startWith(props => ({dsQuery: {calendaritems: seconditemloadertext, filterprojects: seconditemloadertext, projects: seconditemloadertext}, ...props }))
        )
        .pipe(
//          map(dsQuery => ({dsQuery, ...props})),
          skip(1)
        )
    )
  )

//  return dsListenQuery$.pipe(
//    tap(thing => console.log("dsListen", thing)),
//  )
//  return dsQ$.pipe(
//    tap(thing => console.log("THING", thing)),
//  )
  return props$.pipe(
//    tap(props => console.log("COMBINED", props)),
    combineLatest(dsListenQuery$, dsQ$, (props, dsQuery) => ({
      ...props,
      dsQuery
    }))
  )
})

export default dsload
