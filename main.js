import {createApp} from './config/lib/mantra'
import {initContext} from './config/context-web'

const app = createApp(initContext())

import coreModule from './apps/core'
import rnDemoModule from './apps/rndemo'

app.loadModule(coreModule)
app.loadModule(rnDemoModule)

app.init()
