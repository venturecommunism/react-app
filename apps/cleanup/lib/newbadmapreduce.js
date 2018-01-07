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

  // this list can be added to in order to debug more fields or datoms
  var arr = ["1.1", "1.2", "1.3"]

  var switchelements =
    filledcomponents.map( function(item, pIndex) {
      return item.map( function(singlecomponent, sIndex) {
        var key = pIndex + "." + sIndex

        switch(item[sIndex].componentstype) {
          case undefined:
          case null:
arr.includes(key) ? console.log("SWITCH1 key is:", key, item[sIndex]) : void(0)
            return <div key={key}>{item[sIndex]}</div>
          case "action":
arr.includes(key) ? console.log("SWITCH1 key is:", key, item[sIndex]) : void(0)
            return <button key={key} onClick={actions[item[sIndex].componentsname]} >{item[sIndex].componentsname}</button>
          case item[sIndex].componentsname:
arr.includes(key) ? console.log("SWITCH2 key is:", key, item[sIndex]) : void(0)
            return <div key={key}>{item[sIndex].componentsname}</div>
          default:
arr.includes(key) ? console.log("SWITCH3 key is:", key, item[sIndex]) : void(0)
            return <div key={key}>{item[sIndex].componentsname}</div>
        }

      })
    })

  var elements =
    filledcomponents.map( function (item, pIndex) {
      return item.map( function (singlecomponent, sIndex) {
        var key = pIndex + "." + sIndex

        if (item[sIndex].componentstype == 'action') {
arr.includes(key) ? console.log("MAIN1 key is:", key, item[sIndex]) : void(0)
          return <button key={key} onClick={actions[item[sIndex].componentsname]} >{item[sIndex].componentsname}</button>
        }
        else if (item[sIndex].componentsname) {
arr.includes(key) ? console.log("MAIN2 key is:", key, item[sIndex]) : void(0)
          return <div key={key}>{item[sIndex].componentsname}</div>
        } else {
arr.includes(key) ? console.log("MAIN3 key is:", key, item[sIndex]) : void(0)
          return <div key={key}>{item[sIndex]}</div>
        }

      })
    })

  return <div style={{margin:'0 20px', padding:'0 20px'}}>{switchelements}</div>
}

export default badmapreduce

// sort of an example of a switch statement
// https://stackoverflow.com/questions/37782776/using-for-loops-and-switch-cases-in-react-to-dynamically-render-different-compon#40374851
