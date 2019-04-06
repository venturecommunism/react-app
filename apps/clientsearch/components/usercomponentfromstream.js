import React from 'react'
import { componentFromStream } from 'recompose'
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

const User = componentFromStream(prop$ => {
  const loading$ = of(<h3>Loading...</h3>)

  const getUser$ = prop$.pipe(
    debounceTime(700),
    pluck('user'),
    filter(user => user && user.length),
    map(formatUrl),
    switchMap(url =>
      merge(
        loading$,
        ajax(url).pipe(
          pluck('response'),
          delay(1500),
          map(Component),
          catchError(error => of(<Error {...error} />))
        )
      )
    )
  )

  return getUser$
})

export default User
