import React from 'react'

const badmapreduce = function (result, actions, moduleroot) {
  const doswitch = function (key, component) {
    switch(component.componentstype) {
      case undefined:
      case null:
        // this better be a string
        return <div key={key}>{component}</div>
      case "action":
        return <button key={key} onClick={actions[component.componentsname]} >{component.componentsname}</button>
      case "subcomponent":
        // just return the component's name in subcomponents for now
        return <div key={key}>{component.componentsname}</div>
      case "textarea":
console.log(component.placeholder)
        return <textarea key={key} placeholder={component.placeholder} />
      default:
        // we didn't find a component type but it's not a string. consider this an error
        console.warn("Unhandled component type in switch statement at apps/core/libs/badmapreduce.js (or where ever it is)")
        return <div style={{fontSize: "2em", color: '#FF0000'}} key={key}>Error: <pre>{JSON.stringify(component, null, 2)}</pre></div>
    }
  }

  var elements =
    moduleroot.map( function(onesetofdatafilledcomponents, pIndex) {
      return onesetofdatafilledcomponents.map( function(component, sIndex) {
        var key = pIndex + "." + sIndex
        return doswitch(key, component)
      })
    })
  return <div style={{margin:'0 20px', padding:'0 20px'}}>{elements}</div>
}

export default badmapreduce

