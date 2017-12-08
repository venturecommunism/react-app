import React from 'react'

const PlainResultComponent = ({ result, actions }) => (
  <div>
    <h3>Inbox </h3>
      <h4>{result.length}</h4>

<button onClick={actions.add_new_task_to_inbox}>Add item</button>

{/* this one picks out uniques to only display those, e.g. for project headers as here */}
      {result.map((item, index) => (
        <p>{ !index || (result[index][0] != result[index - 1][0]) ? <h3 key={item[0]}>{item[0]}</h3> 

: ''}
<ul>
          {/* <li key={`${item[1]}`}>{`${item[1]}`}</li>
          <li key={`${item[2]}`}>{`${item[2]}`}</li>
          <li key={`${item[3]}`}>{`${item[3]}`}</li>
          <li key={`${item[4]}`}>{`${item[4]}`}</li>
          <li key={`${item[5]}`}>{`${item[5]}`}</li>
          <li key={`${item[6]}`}>{`${item[6]}`}</li>
          <li key={`${item[7]}`}>{`${item[7]}`}</li>
          <li key={`${item[8]}`}>{`${item[8]}`}</li>
          <li key={`${item[9]}`}>{`${item[9]}`}</li>
          <li key={`${item[10]}`}>{`${item[10]}`}</li> */}
          <li key={`${item[11]}`}>{`${item[11]}`}</li>
</ul>

</p>
      ))}
  </div>
)

export default PlainResultComponent
