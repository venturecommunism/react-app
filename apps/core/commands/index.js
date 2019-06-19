import contextpicker from '../../rncore/commands/whiteboard'
import edittask from '../../rncore/commands/edittask'
import rxtx from '../../rncore/commands/rxtx'
import localtx from '../../rncore/commands/localtx'
import transact from '../../rncore/commands/transact'
import general from './general'
// import createtaskactions from './createtaskactions'
// import stellardemoactions from './stellardemoactions'
import loginactions from '../../login/commands/login'
import createtask from '../../createtask/commands/createtask'
import pickerinbox from '../../rncore/commands/pickerinbox'
import rxtest from '../../rncore/commands/rxtest'

const actions = {
  contextpicker,
  edittask,
  rxtx,
  localtx,
  transact,
  general,
//  createtaskactions,
  loginactions,
  createtask,
  pickerinbox,
  rxtest,
}

export default actions
