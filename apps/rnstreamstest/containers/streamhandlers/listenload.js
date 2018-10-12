import datascript from 'datascript'

import { Observable, from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream
} from 'recompose'
import { isEmpty } from 'lodash'

const initialQuery = (props, query) => {
  const {conn} = props.context()
  const db = datascript.db(conn)
  const result = datascript.q(query, db)
  if (!isEmpty(result)) {
    return [result]
  } else {
    return [[["Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]]
  }
}

const dsQuery = (props, query) => Observable.create(function(observer) {
  const {conn} = props.context()
  datascript.listen(conn, function(report) {
    const db = datascript.db(conn)
    const result = datascript.q(query, db)
    observer.next(result)
  })
})

const listenload = (query) => mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        isEmpty(props.dsQuery)
        ? from(initialQuery(props, query)).pipe(
//              tap(result => console.log("might be empty", result)),
              tap(result => props.setDsQuery(result)),
              map(result => ({ ...props, result, status: 'SUCCESS' })),
              startWith({ status: 'REQUEST', ...props })
            )
        : dsQuery(props, query).pipe(
          // tap(result => console.log(Object.keys(props))),
          tap(result => props.setDsQuery(result)),
          map(result => ({ ...props, result, status: 'SUCCESS' })),
          startWith({ status: 'REQUEST', ...props }),
          map(props => ({ ...props, status: 'SUCCESS' }))
        )
    ),
    catchError(() => ({ status: 'ERROR', message: 'Looks like our service is down' }))
  )
)

export default listenload
