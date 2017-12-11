import React from 'react'

const RecursiveResultComponent = ({ result, pullcomponents }) => (
  <div>
      <div>
        <pre>{JSON.stringify(pullcomponents, null, 2)}</pre>
        <h6 style={{margin:'0 20px', padding:'0 20px'}} >Top Header</h6>
        {pullcomponents.map(subitem =>
          <div style={{margin:'0 20px', padding:'0 20px'}} key={subitem.componentsname} >
            <span style={{margin:'0 20px', padding:'0 20px'}} >Name: {subitem.componentsname}</span>
            {/* <pre style={{margin:'0 20px', padding:'0 20px'}} >Parents: {JSON.stringify(subitem._componentsparents, null, 2)}</pre> */}


            {subitem._componentsparents && subitem._componentsparents.map((subsubitem, index) =>
              <div>

{/* <p style={{margin:'0 20px', padding:'0 20px'}} >{subsubitem.componentsname}</p>
<p style={{margin:'0 20px', padding:'0 20px'}} >{subsubitem.componentstype}</p> */}

<div>

{ subsubitem && subsubitem.componentstype == 'data' && result[index] != undefined && result[index][0] != undefined ? <div><p>{subsubitem.componentsname}:</p> <p>{result[index][0]} + index </p></div> : '' }

{ subsubitem && subsubitem.componentstype == 'action' ? <div><p>{subsubitem.componentsname}:</p> <button onClick={ new Function(`return ` +
    `${subsubitem.componentsfunction}`
  )()
  } >{subsubitem.componentsname}</button></div> : '' }

{ subsubitem && subsubitem.componentstype == 'subcomponent' && subsubitem._componentsparents && <div><p>{subsubitem.componentsname}:</p> <RecursiveResultComponent pullcomponents={subsubitem._componentsparents} /></div> }

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
