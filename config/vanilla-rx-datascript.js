import dscljs from 'datascript'
import {datascript as dsmori, mori, helpers} from 'datascript-mori'
import {isObservable, BehaviorSubject} from 'rxjs'

import {
  tap,
  map,
  skip,
  scan,
  distinctUntilChanged
} from 'rxjs/operators'

const {core} = dsmori
const {hashMap, vector, get, equals} = mori
const {DB_AFTER, DB_BEFORE, TX_DATA, TX_META} = helpers

function nextTx(tx$, ...tx) {
  tx$.next(tx)
}

function createTxStream() {
  return new BehaviorSubject().pipe(
    skip(1)
  )
}

function connect(db) {
  const tx$ = createTxStream()

  const report$ = tx$
    .pipe(
      scan(
      (report, tx) => dscljs.db_with(get(report, DB_AFTER), ...tx),
      hashMap(
        DB_AFTER, db,
        DB_BEFORE, db,
        TX_DATA, vector(),
        TX_META, `INITIAL`
      )
    ))

  return {
    report$,
    tx$,
  }
}

function createAnyQueryStream(queryFunc, distinctUntilChangedFunc = equals) {
  return function wrapper(...args) {
    const [reportOrDb$, ...rest] = this && isObservable(this) ?
      [this, ...args] :
      args
    return reportOrDb$
      .pipe(
        tap(reportOrDb => console.log(core.db_QMARK_(reportOrDb))),
        map(reportOrDb => queryFunc(
          // core.db_QMARK_(reportOrDb) ? reportOrDb : get(reportOrDb, DB_AFTER),
          get(reportOrDb, DB_AFTER),
          ...rest
        )),
        distinctUntilChanged(distinctUntilChangedFunc)
      )
  }
}

const q$ = createAnyQueryStream(
  function q(db, query, ...sources) {
    // thinks db is some random number because some combination of vanilla javascript db_with
    // and get(report, DB_AFTER) from mori doesn't work and probably possible
    console.log("DB", db)
    return dscljs.q(query, db, ...sources)
  }
)
const entity$ = createAnyQueryStream(
  function entity(db, eid) {
    return dscljs.entity(db, eid)
  },
  () => false
)
const filter$ = createAnyQueryStream(
  function filter(db, filterFunc) {
    return dscljs.filter(db, filterFunc)
  }
)
const pull$ = createAnyQueryStream(
  function pull(db, selector, eid) {
    return dscljs.pull(db, selector, eid)
  }
)
const pullMany$ = createAnyQueryStream(
  function pullMany(db, selector, eids) {
    return dscljs.pull_many(db, selector, eids)
  }
)
const datoms$ = createAnyQueryStream(
  function datoms(db, ...args) {
    return dscljs.datoms(db, ...args)
  }
)
const seekDatoms$ = createAnyQueryStream(
  function seekDatoms(db, ...args) {
    return dscljs.seek_datoms(db, ...args)
  }
)
const indexRange$ = createAnyQueryStream(
  function indexRange(db, ...args) {
    return dscljs.index_range(db, ...args)
  }
)

export {
  createAnyQueryStream,
  connect,
  nextTx,
  q$,
  entity$,
  filter$,
  pull$,
  pullMany$,
  datoms$,
  seekDatoms$,
  indexRange$,
}
