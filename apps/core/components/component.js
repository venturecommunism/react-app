import React from 'react'

import badmapreduce from '../lib/newbadmapreduce'

const RecursiveResultComponent = ({ result, actions, moduleroot, title }) => (
  <div>
    <h1>{title}</h1>
    {badmapreduce(result, actions, moduleroot)}
  </div>
)

export default RecursiveResultComponent
