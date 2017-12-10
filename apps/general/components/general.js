import React from 'react'

import RecursiveResultComponent from './recursive'

const GeneralResultComponent = ({ result, actions }) => (
  <div>
    <h3>General </h3>
      <h4># of Items: {result.length}</h4>

      <input onKeyUp={actions.keyupaddtask} />

      <RecursiveResultComponent component={result} />

      {result.map((item, i) => (
        <ul>
          {[...Array(item.length)].map((x, i) =>
            <li key={`${item[i]}`}>{`${item[i]}`}</li>
          )}
        </ul>
      ))}
  </div>
)

export default GeneralResultComponent
