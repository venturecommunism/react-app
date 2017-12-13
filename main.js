import {initContext} from './config/context'
import {createApp} from './config/lib/mantra'

const context = initContext()
const app = createApp(context)

import coreModule from './apps/core'

app.loadModule(coreModule)
app.init()
