import general from './general'
import createtask from '../../createtask/commands/createtask'
import pickerinbox from './pickerinbox'
import contextpicker from './whiteboard'
import edittask from './edittask'
import transact from './transact'
import rxtx from './rxtx'
import localtx from './localtx'
import loginactions from '../../login/commands/login'

const actions = {
  general,
  createtask,
  pickerinbox,
  contextpicker,
  edittask,
  transact,
  rxtx,
  localtx,
  loginactions,
}

export default actions

