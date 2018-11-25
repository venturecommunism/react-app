import transact from './transact'
import general from './general'
import createtask from '../../createtask/commands/createtask'
import pickerinbox from '../../rncore/commands/pickerinbox'
import localtx from '../../rncore/commands/localtx'
import rxtx from '../../rncore/commands/rxtx'
import loginactions from '../../login/commands/login'

const actions = {
  transact,
  general,
  createtask,
  pickerinbox,
  localtx,
  rxtx,
  loginactions,
}

export default actions
