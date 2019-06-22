import edn from 'jsedn'

import {datascript as ds, mori, helpers} from 'datascript-mori'
const datascript = ds.js

const {core: dscljs} = ds

import {q$} from '../../../../config/rx-datascript'
const {DB_ID, DB_ADD, TX_DATA, TX_META, DB_AFTER, DB_BEFORE, DB_UNIQUE, DB_UNIQUE_IDENTITY} = helpers
const {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, get, find, nth, count, reduce} = mori
const morimap = helpers.map

import { isObservable, Observable, from, of, interval, timer, combineLatest } from 'rxjs'
import {
  switchMap,
  map,
  startWith,
  tap,
  catchError,
  merge,
  distinctUntilChanged,
  combineLatest as pipeCombineLatest,
  debounce,
  skip,

  debounceTime,
} from 'rxjs/operators'
import {
  mapPropsStream,
  createEventHandler,
} from 'recompose'

const singlequery = (props$, query, morearguments, queryname, labels, filename, stateordata) => props$.pipe(
  // could be optimized for single query with or without arguments
  switchMap(props => {
    const { report$, localreport$ } = props.context()
    // concat two parts of the query from morearguments
    const statequery = `[:find ?uuid :where [?e "${morearguments[0]}" ?uuid]]`

    const findclause = `:find ?` + morearguments.join(" ?")
    var whereclause = ''
    morearguments.forEach((item, i) => whereclause += `[?e${i+1} "${morearguments[i]}" ?${morearguments[i]}] `)
    // console.log('whereclause', whereclause)
    const whole_query = morearguments[0] ? `[` + findclause + ` :where ` + whereclause + `]` : `[:find ?uuid :where [?e "${morearguments[0]}" ?uuid]]`
    //console.log(whole_query)

    const parsedquery = edn.parse(whole_query)
    //  console.log(parsedquery)
    // get a labeler function

    var localstatelabels = []

    var i = 1
    if (parsedquery.val[0].name != ":find") { throw 'no initial find' }
    while (parsedquery.val[i].name.charAt(0) != ":") {
      localstatelabels.push(parsedquery.val[i].name.slice(1))
      i++
    }

    // console.log('localstatelabels', localstatelabels)

    const eidsquery = `[:find ?uuid :where [?e "uuid" ?uuid] [?e "type" "project"] [(missing? $ ?e "project")]]`

    const somequery$ = q$(localreport$, parse(whole_query))
      .pipe(
        // tap(res => console.log("whole query", whole_query)),
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log("whole_query plain response", res)),
        // map(res => locallabel(res)),
        //tap(res => console.log("checking somequery", res)),
        startWith([]),
      )

    const usernamequery$ = q$(localreport$, parse(`[:find ?owner :where [?e "owner" ?owner]]`))
      .pipe(
        // tap(res => console.log("whole qurrry", whole_query)),
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        tap(res => console.log("plain response", res)),
        map(res => locallabel(res)),
        tap(res => console.log("checking somequery", res)),
        startWith([]),
      )

    const eidsreport$ = q$(report$, parse(eidsquery))
      .pipe(
        map(res => toJs(res)),
        startWith([]),
      )

    const fusereport$ = report$
      .pipe(
        pipeCombineLatest(somequery$, (s1, s2) => ({s1, s2})),
      )

    const usernamefusereport$ = report$
      .pipe(
        pipeCombineLatest(usernamequery$, (s1, s2) => ({s1, s2})),
      )

    const fusepull$ = report$
      .pipe(
        pipeCombineLatest(eidsreport$, (s1, s2) => ({s1, s2})),
      )

    function newq(somereport$, query) {
      return somereport$
        .pipe(
          // tap(({s1, s2}) => console.log("pre-args", s1, s2)),
          map(({s1, s2}) => ({s1, args: s2[0] ? s2[0] : [null]})),
          // tap(({s1, args}) => console.log("ARGS", filename, queryname, args)),
          map(({s1, args}) => dscljs.q(query, get(s1, DB_AFTER), ...args) ),
          distinctUntilChanged(mori.equals)
        )
    }

    function usernameq(somereport$, query) {
      return somereport$
        .pipe(
          // tap(res => console.log("filename: ", filename)),
          map(({s1, s2}) => ({s1, args: s2[0] ? s2[0] : [null]})),
          // tap(({s1, args}) => console.log("LOG ARGS", filename, queryname, args)),
          map(({s1, args}) => dscljs.q(query, get(s1, DB_AFTER), ...args) ),
          distinctUntilChanged(mori.equals)
        )
    }

    const pullquery = `
      [:find (pull $ ?e [* {"project" ...}])
       :in $ ?projects
       :where [$ ?e "project" ?projects]]`

    const pull_many_syntax = parse(`[* {"_project" ...}]`)
    const lookuprefs = parse(`[]`)

    const change = (array) => parse(JSON.stringify([].concat( ...array.map(item => item.map(subitem => ["uuid", subitem])) )))

    function newpull(somereport$, query) {
      return somereport$
        .pipe(
          // tap(res => console.log("filename: ", filename)),
          map(({s1, s2}) => ({s1, args: change(s2)})),
          // tap(res => console.log(filename, queryname)),
          map(({s1, args}) => dscljs.pull_many(get(s1, DB_AFTER), pull_many_syntax, args) ),
          distinctUntilChanged(mori.equals)
        )
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

    return stateordata == 'plaininboxquery'
    ? usernameq(fusereport$, parse(query))
      .pipe(
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log(filename)),
        map(jsres => label(jsres)),
        startWith([]),
      )
    : stateordata == 'query'
    ? newq(fusereport$, parse(query))
      .pipe(
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log(filename, queryname, res)),
        map(jsres => label(jsres)),
        startWith([]),
      )
    : stateordata == 'state'
    ? q$(localreport$, parse(query))
      .pipe(
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log(filename)),
        map(jsres => label(jsres)),
        map(jsres => jsres[0] ? jsres[0] : []),
        startWith([]),
      )
    : stateordata == 'pull'
    ? newpull(fusepull$, parse(pullquery))
      .pipe(
        // tap(res => console.log(filename)),
        map(res => toJs(res)),
        // tap(res => console.log(filename)),
        startWith([]),
      )
     : console.log(stateordata)
}))

const multiquery = (props$, queries) => {
  var multiquery = {}
  Object.keys(queries).map(query => multiquery[query] = singlequery(props$, queries[query].query, queries[query].arguments, query, queries[query].labels, queries[query].filename, queries[query].stateordata))
  return multiquery
}

const dsload = (queries) => mapPropsStream(props$ => {

  const { handler, stream } = createEventHandler()
  const value$ = stream.pipe(
    map(e => e),
    startWith('Do')
  )

  const getvalue$ = value$.pipe(
    map(e => e),
    startWith('')
  )

value$.subscribe(console.log)

  const dsQ$ = multiquery(props$, queries)
  const keys = Object.keys(dsQ$)
  const values = Object.values(dsQ$)
//  return props$.pipe(
    return combineLatest(props$, value$, ...values, (props, value, ...values) => {
      var returnobj = {...props}
      keys.forEach( (key, i) => returnobj[key] = values[i] )
      return {...returnobj, value, handler}
  })
  .pipe(
    // debounceTime(70),
    switchMap(props => {
      return of(props)
    })
  )
//)
})

export default dsload
