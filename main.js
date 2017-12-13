import {initContext} from './config/context'
import {createApp} from 'mantra-core'

const context = initContext()
const app = createApp(context)

import coreModule from './apps/core'

app.loadModule(coreModule)
app.init()
