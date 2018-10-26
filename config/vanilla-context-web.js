import d from 'datascript'
const ds = {}
ds.js = d

import {mori, helpers} from 'datascript-mori'
import {connect, nextTx, q$, entity$} from './vanilla-rx-datascript'
import {
  skipWhile,
  filter
} from 'rxjs/operators'

// const {js: djs, core: dcljs} = ds
const {DB_ID, DB_ADD, TX_DATA, TX_META, DB_AFTER, DB_BEFORE, DB_UNIQUE, DB_UNIQUE_IDENTITY} = helpers
const {hashMap, vector, parse, toJs, equals, isMap, hasKey, isSet, set, get, find, map, nth, count} = mori

const pushObservableToList = (observable$, list) => observable$.subscribe(val => list.push(val))

const db = ds.js.empty_db()
const {report$, tx$} = connect(db)
const response$ = q$(
  report$,
 `[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]`
//  parse(`[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]`)
)

const responseFromBind$ = q$.call(
  this,
  report$,
 `[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]`
//  parse(`[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]`)
)

// const responseFromBind$ = report$::q$(parse(`[:find ?n ?a :where [?e "name" ?n] [?e "age" ?a]]`))

var reportList = [],
  responseList = [],
  responseFromBindList = [];


pushObservableToList(report$, reportList)
pushObservableToList(response$, responseList)
pushObservableToList(responseFromBind$, responseFromBindList)

nextTx(tx$, [[":db/add", 1, "name", "Ivan"], [":db/add", 1, "age", 17]])
nextTx(tx$, [{":db/id": 2, "name": "Igor", "age": 35}])

/*
nextTx(tx$, vector(
  vector(DB_ADD, 1, "name", "Ivan"),
  vector(DB_ADD, 1, "age", 17)
));
nextTx(tx$, vector(
  hashMap(
    DB_ID, 2,
    "name", "Igor",
    "age", 35
  )
));
*/

const firstReport = reportList[0]
console.log('first test', hasKey(firstReport, TX_DATA))

export const initContext = () => {
  return {
    conn: 'conn',
    transact: 'transact',
  }
}
