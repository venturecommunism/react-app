import {
  switchMap,
  tap,
  map,
  startWith
} from 'rxjs/operators'
import { mapPropsStream, createEventHandler } from 'recompose'

const textHandler = mapPropsStream(props$ => {
  const { stream: onInput$, handler: handleChange } = createEventHandler()
  const text$ = onInput$.pipe(
    tap(e => console.log(e.nativeEvent.text)),
    map(e => e.nativeEvent.text),
    startWith('')
  )
  return props$.pipe(
    switchMap(props => text$.pipe(map(text => ({ ...props, text, handleChange }))))
  )
})

export default textHandler
