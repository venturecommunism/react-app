import edn from 'jsedn'
import createDatomQLContainer from './datomqlcontainer'

function datomql (strings, ...values) {
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

  var someresult = finalstrings.reduce((result, string, i) => {
    return `${result}${string}${values[i] || ''}`
  }, '')

  const parsedquery = edn.parse(someresult)
  const findIndex = (val) => parsedquery.val.findIndex(i => i.name === val)

  item[prop] = {}
  item[prop].query = someresult
  item[prop].arguments = []
  item[prop].labels = []

  if (findIndex(":in") > 0) {
    for (var q = findIndex(":in") + 1; q < findIndex(":where"); q++) {
      if (parsedquery.val[q].name != "$" && parsedquery.val[q].name.charAt(0) == "?") {
        item[prop].arguments.push(parsedquery.val[q].name.slice(1))
      }
    }
  }

  var i = 1
  if (parsedquery.val[0].name != ":find") { throw 'no initial find' }
  while (parsedquery.val[i].name.charAt(0) != ":") {
    item[prop].labels.push(parsedquery.val[i].name.slice(1))
    i++
  }

  return item
}

export { createDatomQLContainer, datomql }
