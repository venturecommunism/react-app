import { from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { isEmpty } from 'lodash'

const context = mapPropsStream(props$ => {
  const { stream: state$, handler: stateSelect } = createEventHandler()
  return props$.pipe(
    switchMap(props => {
      return state$
        .pipe(
          // tap(project => console.log(Object.keys(props))),
          // map(project => ({ ...props, status: 'SUCCESS' })),
          startWith(
            {project: "blankproject"}
         ))
        .pipe(map(selectedState => ({ ...props, selectedState, stateSelect })))
    })
  )
})

export default context
