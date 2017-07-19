import {initContext} from './config/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

// import stellarModule from './apps/stellar'
import timetrackerModule from './apps/timetracker'
import coreModule from './apps/core'
import demoModule from './apps/demo'
import chatgameModule from './apps/chatgame'
import querybuilder from './apps/querybuilder'

// app.loadModule(stellarModule)
app.loadModule(timetrackerModule)
app.loadModule(coreModule)
app.loadModule(demoModule)
app.loadModule(chatgameModule)
app.loadModule(querybuilder)
app.init()
