import React from 'react'
import { mapPropsStream } from 'recompose'
import { merge, of } from 'rxjs'
import {
  catchError,
  debounceTime,
  delay,
  filter,
  map,
  pluck,
  switchMap
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import Error from './error'
import Component from './component'

const formatUrl = user => `https://api.github.com/users/${user}`

const User = mapPropsStream(props$ => {
  const loading$ = of({name: 'Loading...'})

  const getUser$ = props$.pipe(
    debounceTime(700),
    pluck('user'),
    filter(user => user && user.length),
    map(formatUrl),
    switchMap(url =>
      merge(
        loading$,
        ajax(url).pipe(
          pluck('response'),
          delay(200),
          map(props => props),
          catchError(error => of(error) )
        )
      )
    )
  )

  return getUser$
})

export default User(Component)
