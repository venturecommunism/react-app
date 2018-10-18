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
  var result = {}
  queries.forEach(metadata => Object.keys(metadata).forEach(prop => result[prop] = datascript.q(metadata[prop], db, props.theproject)))
  return [result]
}

const dsQuery = (props, queries) => Observable.create(function(observer) {
  const {conn} = props.context()
  datascript.listen(conn, function(report) {
    const db = datascript.db(conn)
    var result = {}
    queries.forEach(metadata => Object.keys(metadata).forEach(prop => result[prop] = datascript.q(metadata[prop], db, props.theproject)))
    return observer.next(result)
  })
})

const listenload = (queries) => mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        props.theproject || Object.keys(props.dsQuery).every(k => isEmpty(props.dsQuery[k]) )
        ? from(initialQuery(props, queries)).pipe(
            tap(result => props.set_theproject(props.PLACEHOLDERPROP)),
            // tap(result => console.log("might be empty", result)),
            tap(result => props.setDsQuery( result )),
            map(result => ({ ...props, result, status: 'SUCCESS' })),
              startWith({ status: 'REQUEST', ...props })
          )
        : dsQuery(props, queries).pipe(
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
