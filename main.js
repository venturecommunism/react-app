import {initContext} from './core/configs/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './core/modules/core'
import demoModule from './core/modules/demo'
import chatgameModule from './core/modules/chatgame'
import querybuilder from './core/modules/querybuilder'

app.loadModule(coreModule)
app.loadModule(demoModule)
app.loadModule(chatgameModule)
app.loadModule(querybuilder)
app.init()

