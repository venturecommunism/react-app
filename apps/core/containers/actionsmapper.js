import { composeAll } from '../../../config/lib/mantra'
import { useDeps } from '../../../config/lib/helpers/usedeps'

export default (actionset, component) => composeAll(
  useDeps(actionset)
)(component)
