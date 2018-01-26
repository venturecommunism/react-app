import {createApp} from './config/lib/mantra'
import {initContext} from './config/context-mobile'

const app = createApp(initContext())

import rnCoreModule from './apps/rncore'
import rnDemoModule from './apps/rndemo'
import rnTwitterplusModule from './apps/rntwitterplus'

app.loadModule(rnCoreModule)
app.loadModule(rnDemoModule)
app.loadModule(rnTwitterplusModule)

app.init()
