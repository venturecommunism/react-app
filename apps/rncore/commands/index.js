import transact from './transact'
import general from './general'
import createtask from '../../rncore/commands/createtask'
import pickerinbox from '../../rncore/commands/pickerinbox'
import localtx from '../../rncore/commands/localtx'
import rxtx from '../../rncore/commands/rxtx'

const actions = {
  transact,
  general,
  createtask,
  pickerinbox,
  localtx,
  rxtx,
}

export default actions
