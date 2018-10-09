import { switchMap, map, scan, startWith } from 'rxjs/operators'
import { mapPropsStream, createEventHandler } from 'recompose'

const modalHandler = mapPropsStream(props$ => {
  const { stream: isOpen$, handler: toggleModal } = createEventHandler()
  return props$.pipe(
    switchMap(props =>
      isOpen$.pipe(
        startWith(false),
        scan(bool => !bool),
        map(isOpen => ({ ...props, isOpen, toggleModal }))
      )
    )
  )
})

export default modalHandler
