import React from 'react'

const PlainResultComponent = ({ result, actions }) => (
  <div>
    <h3>General </h3>
      <h4># of Items: {result.length}</h4>

      <input onKeyUp={actions.keyupaddtask} />

      {result.map((item, i) => (
        <ul>
          {[...Array(item.length)].map((x, i) =>
            <li key={`${item[i]}`}>{`${item[i]}`}</li>
          )}
        </ul>
      ))}
  </div>
)

export default PlainResultComponent
