import { from, of } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStream,
  createEventHandler
} from 'recompose'
import { isEmpty } from 'lodash'

const context = mapPropsStream(props$ => {
  // how the handler is set here but not used and has to use another handler (set_theproject) looks all wrong
  const { stream: project$, handler: projectSelect } = createEventHandler()
  return props$.pipe(
    switchMap(props => {
      return project$
        .pipe(
          // tap(project => console.log(Object.keys(props))),
          tap(project => props.set_theproject(project)),
          startWith(
            props.theproject
         ))
        .pipe(map(selectedProject => ({ ...props })))
    })
  )
})

export default context
