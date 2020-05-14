import {datascript as ds, mori, helpers} from 'datascript-mori'
import {isObservable, BehaviorSubject} from 'rxjs'

import {
  tap,
  map,
  skip,
  scan,
  zip,
  distinctUntilChanged
} from 'rxjs/operators'

const {core: dscljs} = ds
const {hashMap, vector, get, equals, toJs} = mori
const {DB_AFTER, DB_BEFORE, TX_DATA, TX_META} = helpers

function nextTx(tx$, ...tx) {
  const conn = tx$.getValue()
  conn ? console.log("conn", JSON.stringify(Object.keys(conn))) : ''
  // if (conn && conn.length == 1) console.log(toJs(tx[0]))
  const report = conn ? get(conn[0], DB_AFTER) : null
  // console.log("report", report)

  report ? tx.conn = report : null
  tx$.next(tx)
}

function createTxStream() {
  return new BehaviorSubject()
}

function connect(db) {
  const tx$ = createTxStream()

  const initialreport = hashMap(
    DB_AFTER, db,
    DB_BEFORE, db,
    TX_DATA, vector(),
    TX_META, ['initial']
  )

  const report$ = tx$
    .pipe(
      // tap( tx => console.log("tx", tx) ),
      map( tx => tx && tx[0] && tx[1] ? [ helpers.entities_to_clj( tx[0] ), helpers.entities_to_clj( tx[1] ) ] : tx ),
      scan(
      (report, tx) => {
        // console.log("REPORT", report)
        const conn = tx && tx.conn ? tx.conn : get(report, DB_AFTER)
        // console.log("report", toJs(conn))
        // tx ? console.log("gotit", dscljs.with$(thingie, ...tx)) : console.log("no tx")

const outcome = tx ? dscljs.with$(conn, ...tx) : 'none'
// tx ? console.log("tx", toJs(tx[0])) : ''
// console.log("outcome", outcome)
// !tx ? console.log("initialreport", toJs(initialreport)['db-after']) : ''

        return tx ? dscljs.with$(conn, ...tx) : initialreport
      },
      initialreport
    ))

  const validtx$ = tx$
    .pipe(
      zip(report$, (s1, s2) => s1),
    )

  return {
    report$,
    tx$,
    validtx$
  }
}

function createAnyQueryStream(queryFunc, distinctUntilChangedFunc = equals) {
  return function wrapper(...args) {
    const [reportOrDb$, ...rest] = this && isObservable(this) ?
      [this, ...args] :
      args
    return reportOrDb$
      .pipe(
        map(reportOrDb => queryFunc(
          dscljs.db_QMARK_(reportOrDb) ? reportOrDb : get(reportOrDb, DB_AFTER),
          ...rest
        )),
        distinctUntilChanged(distinctUntilChangedFunc)
      )
  }
}

const q$ = createAnyQueryStream(
  function q(db, query, ...sources) {
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
