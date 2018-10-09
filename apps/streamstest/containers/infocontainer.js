import PropTypes from 'prop-types'
import {
  compose,
  getContext
} from 'recompose'

export default (component, streamhandlers) => compose(
  ...streamhandlers,
  getContext({ updateFunctions: PropTypes.object, user: PropTypes.object })
)(component, streamhandlers)
