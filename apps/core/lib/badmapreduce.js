import React from 'react'

const badmapreduce = function (result, actions, components) {
  var filledcomponents = new Array()
    for (var i = 0; i < result.length; i++) {
      var singlecomponent = new Array()
      var l = 0
        for (var k = 0; k < components._componentsparents.length; k++) {
          components._componentsparents[k].componentstype == 'data' ? singlecomponent.push(result[i][l]) && l++ : singlecomponent.push(components._componentsparents[k])
        }
      filledcomponents.push(singlecomponent)
    }
  return <div>

  {filledcomponents.map( item =>
    item.map( singlecomponent =>
      <div>{singlecomponent.componentstype && (singlecomponent.componentstype == 'action') ? <button onClick={actions[singlecomponent.componentsname]} >{singlecomponent.componentsname}</button> : singlecomponent.componentsname ? singlecomponent.componentsname : singlecomponent }</div>
    )
  )}
  </div>
}

export default badmapreduce
