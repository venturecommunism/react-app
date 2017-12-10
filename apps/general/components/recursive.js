import React from 'react'

const RecursiveResultComponent = ({ component }) => (
  <div>
      <div>
        {component.map(subitem =>
          <div key={subitem[1]} >
            <span>{subitem[0]}</span>
            {subitem[0] && <RecursiveResultComponent component={subitem[0]} />}
          </div>
        )}
      </div>
  </div>
)

export default RecursiveResultComponent

