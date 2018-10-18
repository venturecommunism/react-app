import createDatomQLContainer from './datomqlcontainer'

function datomql (strings, ...values) {

/*
  var someresult = strings.reduce((result, string, i) => {
    return `${result}${string}${values[i] || ''}`
  }, '')
*/

  const templateliteral = arguments[0][0]

  function getvar(txt) {
    let var1
    // ignore space and non-space (including newlines)
    let re1='[\s\S]*'	// match on filler
    // finds things like 'query' and 'maincomponent_todos'
    let re2='((?:[a-z][a-z0-9_]*))'	// Variable Name 1

    let match = new RegExp(re1+re2,["i"]).exec(txt)
    if (match != null) {
      var1 = match[1]
    }
    return var1
  }

  const operation = getvar(templateliteral)
  const op_removed = templateliteral.replace(operation, '')
  const filename_prop = getvar(op_removed)
  const split_prop_filename = filename_prop.split("_")
  const filename = split_prop_filename[0]
  // console.log(filename)
  const prop = split_prop_filename[1]
  const query_with_braces = op_removed.replace(filename_prop, '')
  const startquery_one_brace = query_with_braces.split("{").pop()

  const item = {}
  const modstrings = strings.map((elem, i) => i == 0 ? startquery_one_brace : elem)

  const finalstrings = modstrings.map((elem, i) => i == modstrings.length - 1
    ? elem
        .split("").reverse().join("")
        .split("}")
        .pop()
        .split("").reverse().join("")
    : elem)

//  item[prop] = {finalstrings, values}

  var someresult = finalstrings.reduce((result, string, i) => {
    return `${result}${string}${values[i] || ''}`
  }, '')

  item[prop] = someresult
  return item
}

export { createDatomQLContainer, datomql }
