import transact from '../../rncore/commands/transact'
import general from './general'
import createtaskactions from './createtaskactions'
// import stellardemoactions from './stellardemoactions'
import loginactions from './login'
import createtask from '../../rndemo/commands/createtask'
import pickerinbox from '../../rncore/commands/pickerinbox'

const actions = {
  transact,
  general,
  createtaskactions,
  loginactions,
  createtask,
  pickerinbox
}

export default actions
