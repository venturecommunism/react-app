import React from 'react'

const badmapreduce = function (result, actions, components) {
  var filledcomponents = new Array()
  for (var i = 0; i < result.length; i++) {
    var singlecomponent = new Array()
    var l = 0
    for (var k = 0; k < components._componentsparents.length; k++)
    {
      components._componentsparents[k].componentstype == 'data' ?
      singlecomponent.push(result[i][l]) && l++ :
      singlecomponent.push(components._componentsparents[k])
    }
    filledcomponents.push(singlecomponent)
  }

  var switchelements =
    filledcomponents.map( function(item, pIndex) {
      return item.map( function(singlecomponent, sIndex) {
        var key = pIndex + "." + sIndex

        switch(item[sIndex].componentstype) {
          case "action":
            return <button onClick={actions[item[sIndex].componentsname]} >{item[sIndex].componentsname}</button>
          case item[sIndex].componentsname:
            return <div>{item[sIndex].componentsname}</div>
          default:
            return <div>{item[sIndex]}</div>
        }

      })
    })

  var elements =
    filledcomponents.map( function (item, pIndex) {
      return item.map( function (singlecomponent, sIndex) {
        var key = pIndex + "." + sIndex

        if (item[sIndex].componentstype == 'action') {
          return <button onClick={actions[item[sIndex].componentsname]} >{item[sIndex].componentsname}</button>
        }
        else if (item[sIndex].componentsname) {
          return <div>{item[sIndex].componentsname}</div>
        } else {
          return <div>{item[sIndex]}</div>
        }

      })
    })

  return <div style={{margin:'0 20px', padding:'0 20px'}}>{switchelements}</div>
}

export default badmapreduce

// sort of an example of a switch statement
// https://stackoverflow.com/questions/37782776/using-for-loops-and-switch-cases-in-react-to-dynamically-render-different-compon#40374851
