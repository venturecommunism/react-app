import React from 'react'

const badmapreduce = function (result, components) {
  console.log("RESULT", result)
  console.log("COMPONENTS", components)

  var filledcomponents = new Array()

    for (var i = 0; i < result.length; i++) {
      var singlecomponent = new Array()
      var l = 0
//      for (var j = 0; j < result[i].length; j++) {
        for (var k = 0; k < components._componentsparents.length; k++) {
//          console.log("ALPHABET", i, j, k, l)
          console.log("COMPONENTS", components._componentsparents[k])
          components._componentsparents[k].componentstype == 'data' ? singlecomponent.push(result[i][l]) && l++ : singlecomponent.push(components._componentsparents[k]) && (console.log(result[i][l]) && l++)
        }
//      }
      filledcomponents.push(singlecomponent)
    }

  return <div>

    {filledcomponents.map( item =>
      item.map( singlecomponent =>
        <div>{singlecomponent.componentstype && (singlecomponent.componentstype == 'action') ? <button onClick={
          new Function(`return ` +
            `${singlecomponent.componentsfunction}`
          )()
        } >{singlecomponent.componentsname}</button> : singlecomponent.componentsname ? singlecomponent.componentsname : singlecomponent }</div>
      )
    )}

  </div>
}

export default badmapreduce
