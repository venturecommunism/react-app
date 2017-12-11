import React from 'react'

const RecursiveResultComponent = ({ result, pullcomponents }) => (
  <div>
      <div>
        {/* <pre>{JSON.stringify(pullcomponents, null, 2)}</pre> */}
        <h6 style={{margin:'0 20px', padding:'0 20px'}} >Top Header</h6>
        {pullcomponents.map(subitem =>
          <div style={{margin:'0 20px', padding:'0 20px'}} key={subitem.componentsname} >
            <span style={{margin:'0 20px', padding:'0 20px'}} >Name: {subitem.componentsname}</span>
            <pre style={{margin:'0 20px', padding:'0 20px'}} >Parents: {JSON.stringify(subitem._componentsparents, null, 2)}</pre>


            {subitem._componentsparents && subitem._componentsparents.map((subsubitem, index) =>
              <div>

<p style={{margin:'0 20px', padding:'0 20px'}} >{subsubitem.componentsname}</p>
<p style={{margin:'0 20px', padding:'0 20px'}} >{subsubitem.componentstype}</p>

<div>

{ subsubitem && subsubitem.componentstype != 'action' && result[index] != undefined && result[index][0] != undefined ? JSON.stringify(result[index][0]) + index : '' }

{ subsubitem && subsubitem.componentstype == 'action' ? <button onClick={() => alert(result[index])} >Result[index]</button> : '' }

{ subsubitem && subsubitem.componentstype == 'subcomponent' && subsubitem._componentsparents && <RecursiveResultComponent pullcomponents={subsubitem._componentsparents} /> }

</div>

              </div>
            )}
          </div>


        )}
      <h6 style={{margin:'0 20px', padding:'0 20px'}} >Bottom Header</h6>
      </div>
  </div>
)

export default RecursiveResultComponent
