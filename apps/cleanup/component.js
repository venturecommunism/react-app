import React from 'react'

import badmapreduce from './lib/newbadmapreduce'

const RecursiveResultComponent = ({ result, actions, pullcomponents }) => (
  <div>
    {pullcomponents.map(subitem =>
      <div style={{margin:'0 0', padding:'0 0'}} key={subitem.componentsname} >
        <span>Name: {subitem.componentsname}</span>
        {result && badmapreduce(result, actions, subitem)}
      </div>
    )}
  </div>
)

export default RecursiveResultComponent
