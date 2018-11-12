import { from, of, Observable } from 'rxjs'
import { switchMap, map, startWith, tap, catchError } from 'rxjs/operators'
import {
  mapPropsStreamWithConfig,
  createEventHandlerWithConfig
} from 'recompose'
import { isEmpty } from 'lodash'

const rxjsconfig = {
  fromESObservable: config => new Observable(config.subscribe),
  toESObservable: stream => stream
}

const mapPropsStream = mapPropsStreamWithConfig(rxjsconfig)
const createEventHandler = createEventHandlerWithConfig(rxjsconfig)

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
