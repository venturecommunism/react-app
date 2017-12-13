import React from 'react'

import badmapreduce from './lib/badmapreduce'

const RecursiveResultComponent = ({ result, actions, pullcomponents }) => (
  <div>

    <input onKeyUp={actions.keyupaddtask} />

    {pullcomponents.map(subitem =>
      <div style={{margin:'0 20px', padding:'0 20px'}} key={subitem.componentsname} >
        <span>Name: {subitem.componentsname}</span>
        {result && badmapreduce(result, subitem)}
      </div>
    )}
  </div>
)

export default RecursiveResultComponent
