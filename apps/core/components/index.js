import React from 'react'

import logo from '../../layout/components/images/fivepetal.svg'
import '../../layout/components/styles/app.css'
import '../../layout/components/styles/index.css'

import General from '../../general/components/index'
import Tasks from '../../tasks/components/index'
// import Demo from '../../demo/components/index'
// import ChatGame from '../../chatgame/components/index'
import QueryBuilder from '../../querybuilder/components/index'

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/
import TimeTracker from '../../timetracker/components/index'
import StellarTestnet from '../../stellar/components/index'

const Root = ({result}) => (
  <div>{ !result ? <div>
    <div className='App-header'>
      {/* <StellarTestnet />
      <TimeTracker />
      <img src={logo} className='App-logo' alt='logo' /> */}
      <h2>Under Construction</h2>
    </div>
    <p className='App-intro'>
      To get started, edit <code>src/modules/core/components/index.js</code> and save to reload.
    </p>
    <General />
    <Tasks />
    <QueryBuilder />
 </div> : <div>
    <div className='App-header'>
      <img src={logo} className='App-logo' alt='logo' />
    </div>
    <p className='App-intro'>
    </p>
    </div>
    }
  </div>
)

export default Root
