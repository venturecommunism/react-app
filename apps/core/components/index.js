import React from 'react'

import DataContainer from '../../cleanup/container'
import ActionsMapper from '../containers/actionsmapper'
import RecursiveComponent from '../../cleanup/component'
const Recursive = DataContainer(ActionsMapper('general', RecursiveComponent))

import logo from '../../layout/components/images/fivepetal.svg'
import '../../layout/components/styles/app.css'
import '../../layout/components/styles/index.css'

/**
**  MAKING A NEW MODULE
**  1. Import a new component and place it within the Root component
**  (go to step 2 at apps/timetracker/components/index.js)
**/

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
    {/* this Recursive component is the main thing */}
    <Recursive componentid={"rootcomponentcleanup"} />
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
