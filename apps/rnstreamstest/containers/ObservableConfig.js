import { Observable } from 'rxjs'
import {
  setObservableConfig
} from 'recompose'

setObservableConfig({
  fromESObservable: config => new Observable(config.subscribe),
  toESObservable: stream => stream
})

