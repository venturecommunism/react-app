import React from 'react'

const RecursiveResultComponent = ({ pullcomponents }) => (
  <div>
      <div>
        <h1>Top Header</h1>
        {pullcomponents.map(subitem =>
          <div key={subitem.name} >
            <span>Name: {subitem.name}</span>
            <pre>Follows: {JSON.stringify(subitem._follows, null, 2)}</pre>
            {subitem._follows && subitem._follows.map(subsubitem =>
              <div><p>{subsubitem.name}</p>
                { subsubitem._follows && <RecursiveResultComponent pullcomponents={subsubitem._follows} /> }
              </div>
            )}
          </div>
        )}
      <h1>Bottom Header</h1>
      </div>
  </div>
)

export default RecursiveResultComponent

