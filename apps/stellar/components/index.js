import React from 'react'

import ActionsMapper from '../../core/containers/actionsmapper'

import StellarComponent from './stellar'

const StellarContainer = ActionsMapper('stellarcommands', StellarComponent)

const Stellar = () => (
  <div>
    <StellarContainer entityIds={[['name', 'Jane']]} />
  </div>
)

export default Stellar
