// add useDeps back in afterwards
import { useDeps } from 'react-simple-di'

import listenload from './streamhandlers/listenload'

import PropTypes from 'prop-types'
import { Observable } from 'rxjs'
import {
  compose,
  withState,
  withHandlers,
  setObservableConfig,
  withContext
} from 'recompose'

import {
  addUserLike,
  addUserDislike,
  deleteUserDislike,
  deleteUserLike
} from '../commands/asyncData'

setObservableConfig({
  fromESObservable: config => new Observable(config.subscribe),
  toESObservable: stream => stream
})

export default (component, query) => compose(
  withState('dsQuery', 'updateDsQuery', []),
  withHandlers({
    setDsQuery: ({ updateDsQuery }) => users => updateDsQuery(state => users),
    addLike: ({ updateUserList }) => (user, like) => addUserLike(user, like),
    addDislike: ({ updateUserList }) => (user, dislike) => addUserDislike(user, dislike),
    deleteLike: ({ updateUserList }) => (user, like) =>
      deleteUserLike(user, like.id).then(() =>
        updateUserList(state => [
          ...state.map(i => {
            if (i.user === user) {
              i.likes = i.likes.filter(i => i.id !== like.id)
            }
            return i
          })
        ])
      ),
    deleteDislike: ({ updateUserList }) => (user, dislike) =>
      deleteUserDislike(user, dislike.id).then(() =>
        updateUserList(state => [
          ...state.map(i => {
            if (i.user === user) {
              i.dislikes = i.dislikes.filter(i => i.id !== dislike.id)
            }
            return i
          })
        ])
      )
  }),
  // moved useDeps() here so streamhandlers (like listenload) would have context
  useDeps(),
  listenload(query),
  withContext(
    { updateFunctions: PropTypes.object, user: PropTypes.object },
    ({ selectedUser, addLike, addDislike, deleteLike, deleteDislike }) => ({
      user: selectedUser,
      updateFunctions: { addLike, addDislike, deleteLike, deleteDislike }
    })
  ),
)(component, query)
