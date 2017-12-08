import React from 'react'

const PlainResultComponent = ({ result, actions }) => (
  <div>
    <h3>Inbox </h3>
      <h4># of Items: {result.length}</h4>

      <button onClick={actions.add_new_task_to_inbox}>Add item</button>

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
