import React from 'react'

const RecursiveResultComponent = ({ pullcomponents }) => (
  <div>
      <div>
        <pre>{JSON.stringify(pullcomponents, null, 2)}</pre>
        <h6>Top Header</h6>
        {pullcomponents.map(subitem =>
          <div key={subitem.componentsname} >
            <span>Name: {subitem.componentsname}</span>
            <pre>Parents: {JSON.stringify(subitem._componentsparents, null, 2)}</pre>
            {subitem._componentsparents && subitem._componentsparents.map(subsubitem =>
              <div><p>{subsubitem.componentsname}</p>
                   <p>{subsubitem.componentstype}</p>
                { subsubitem._componentsparents && <RecursiveResultComponent pullcomponents={subsubitem._componentsparents} /> }
              </div>
            )}
          </div>
        )}
      <h6>Bottom Header</h6>
      </div>
  </div>
)

export default RecursiveResultComponent

