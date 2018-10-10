import datascript from 'datascript'

import { Observable, from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream
} from 'recompose'
import { isEmpty } from 'lodash'

const initialQuery = (props) => {
  const {conn} = props.context()
  const db = datascript.db(conn)
  const q  = `[:find ?name ?e
               :where [?e "name" ?name]]`
  const result = datascript.q(q, db)
  return [result]
}

const dsQuery = (props) => Observable.create(function(observer) {
  const {conn} = props.context()
  datascript.listen(conn, function(report) {
    const db = datascript.db(conn)
    const q  = `[:find ?name ?e
                 :where [?e "name" ?name]]`
    const result = datascript.q(q, db)
    observer.next(result)
  })
})

const load = mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        isEmpty(props.userList)
        ? from(initialQuery(props)).pipe(
              tap(users => props.setUserList(users)),
              map(users => ({ ...props, users, status: 'SUCCESS' })),
              startWith({ status: 'REQUEST', ...props })
            )
        : dsQuery(props).pipe(
          // tap(result => console.log(Object.keys(props))),
          tap(result => props.setUserList(result)),
          map(result => ({ ...props, result, status: 'SUCCESS' })),
          startWith({ status: 'REQUEST', ...props }),
          map(props => ({ ...props, status: 'SUCCESS' }))
        )
    ),
    catchError(() => ({ status: 'ERROR', message: 'Looks like our service is down' }))
  )
)

export default load
