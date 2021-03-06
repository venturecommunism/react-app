import { switchMap, map, startWith } from 'rxjs/operators'
import {
  mapPropsStream,
  createEventHandler,
} from 'recompose'

const selectUser = mapPropsStream(props$ => {
  const { stream: selected$, handler: userSelect } = createEventHandler()
  return props$.pipe(
    switchMap(props => {
      const { match: { params: { user: userInURL = 1 } } } = props
      return selected$
        .pipe(
          startWith(
            props.dsQuery && userInURL
              ? props.dsQuery.find(userInList => userInList.user === userInURL)
              : props.dsQuery[0]
          )
        )
        .pipe(map(selectedUser => ({ ...props, selectedUser, userSelect })))
    })
  )
})

export default selectUser
