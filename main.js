import {initContext} from './config/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './apps/core'
import tasksModule from './apps/tasks'
// import stellarModule from './apps/stellar'
// import timetrackerModule from './apps/timetracker'
// import demoModule from './apps/demo'
// import chatgameModule from './apps/chatgame'
import querybuilder from './apps/querybuilder'

app.loadModule(coreModule)
app.loadModule(tasksModule)
// app.loadModule(stellarModule)
// app.loadModule(timetrackerModule)
// app.loadModule(demoModule)
// app.loadModule(chatgameModule)
app.loadModule(querybuilder)
app.init()
