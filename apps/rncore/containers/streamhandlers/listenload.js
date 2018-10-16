import datascript from 'datascript'

import { Observable, from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream
} from 'recompose'
import { isEmpty } from 'lodash'

const initialQuery = (props, queries) => {
  const {conn} = props.context()
  const db = datascript.db(conn)
  const loadertext = [["Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]]

  var inbox = datascript.q(queries[0], db)
  var calendar = datascript.q(queries[1], db)
  var result = {inbox, calendar}
  if (!isEmpty(inbox) && !isEmpty(calendar)) {
    return [result]
  } else {
    return [{inbox: [["Should load a status indicator here...", "blank", "blank", "something-for-key-prop"]], calendar: [["Should load...", "blank", "blank", "something-for-key-prop"]]}]
  }
}

const dsQuery = (props, queries) => Observable.create(function(observer) {
  const {conn} = props.context()
  datascript.listen(conn, function(report) {
    const db = datascript.db(conn)
    const inbox = datascript.q(queries[0], db)
    const calendar = datascript.q(queries[1], db)
    observer.next({inbox: inbox, calendar: calendar})
  })
})

const listenload = (queries) => mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        isEmpty(props.dsQuery.calendar) || isEmpty(props.dsQuery.inbox)
        ? from(initialQuery(props, queries)).pipe(
//              tap(result => console.log("might be empty", result)),
              tap(result => props.setDsQuery( result )),
              map(result => ({ ...props, result, status: 'SUCCESS' })),
              startWith({ status: 'REQUEST', ...props })
            )
        : dsQuery(props, queries).pipe(
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
