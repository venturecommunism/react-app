import { composeAll } from 'mantra-core'
import { useDeps } from '../../../config/lib/helpers/usedeps'

export default (actionset, component) => composeAll(
  useDeps(actionset)
)(component)
