import React from 'react'

import RecursiveResultComponent from './recursive'

const GeneralResultComponent = ({ result, actions, pullcomponentsresult }) => (
  <div>
    <h3>General </h3>
      <h4># of Items: {result.length}</h4>

      <input onKeyUp={actions.keyupaddtask} />

      <h1>Top Level</h1>
      <RecursiveResultComponent result={result} pullcomponents={pullcomponentsresult} />
      <h1>Bottom Level</h1>

      {/* result.map((item, i) => (
        <ul>
          {[...Array(item.length)].map((x, i) =>
            <li key={`${item[i]}`}>{`${item[i]}`}</li>
          )}
        </ul>
      )) */}
  </div>
)

export default GeneralResultComponent
