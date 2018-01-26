import {createApp} from './config/lib/mantra'
import {initContext} from './config/context-web'

const app = createApp(initContext())

import coreModule from './apps/core'

app.loadModule(coreModule)

app.init()
