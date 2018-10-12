import { switchMap, map, startWith } from 'rxjs/operators'
import { mapPropsStream, createEventHandler } from 'recompose'

const textHandler = mapPropsStream(props$ => {
  const { stream: onInput$, handler: handleChange } = createEventHandler()
  const text$ = onInput$.pipe(
    // tap(e => console.log(e)),
    map(e => e),
    startWith('')
  )
  return props$.pipe(
    switchMap(props => text$.pipe(map(text => ({ ...props, text, handleChange }))))
  )
})

export default textHandler
