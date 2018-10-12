import { from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream
} from 'recompose'
import { isEmpty } from 'lodash'
import {
  fetchUsers
} from '../../commands/asyncData'

const load = mapPropsStream(props$ =>
  props$.pipe(
    switchMap(
      props =>
        isEmpty(props.dsQuery)
          ? from(fetchUsers()).pipe(
              tap(users => props.setDsQuery(users)),
              map(users => ({ ...props, users, status: 'SUCCESS' })),
              startWith({ status: 'REQUEST', ...props })
            )
          : of(props).pipe(map(props => ({ ...props, status: 'SUCCESS' })))
    ),
    catchError(() => ({ status: 'ERROR', message: 'Looks like our service is down' }))
  )
)

export default load
