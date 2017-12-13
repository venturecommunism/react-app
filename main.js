import {createApp} from './config/lib/mantra'
import {initContext} from './config/context'

const app = createApp(initContext())

import coreModule from './apps/core'

app.loadModule(coreModule)
app.init()
