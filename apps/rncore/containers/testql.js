import edn from 'jsedn'
import createDatomQLContainer from './datomqlcontainer'

function datomql (strings, ...values) {
  const templateliteral = arguments[0][0]

  function getvar(txt) {
    let var1
    // ignore space and non-space (including newlines)
    let re1='[\\s+]*'	// match on filler
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
  // console.log(filename_prop)
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
  // console.log("init query", someresult)
  console.log("parsed query", parsedquery)

console.log("YOW")
  for (var g = 0; g < parsedquery.val.length; g++) {
    console.log("item")
    console.log(parsedquery.val[g])
  }

  const findIndex = (val) => parsedquery.val.findIndex(i => i.name === val)

  item[prop] = {}
  item[prop].query = someresult
  item[prop].arguments = []
  item[prop].labels = []

console.log("findIndex(:in)", findIndex(":in"))
console.log("findIndex(:where)", findIndex(":where"))

  if (findIndex(":in") > 0) {
    for (var q = findIndex(":in") + 1; q < findIndex(":where"); q++) {
      if (parsedquery.val[q].name != "$" && parsedquery.val[q].name.charAt(0) == "?") {
        item[prop].arguments.push(parsedquery.val[q].name.slice(1))
      }
    }
  }

//  var i = 1
  if (parsedquery.val[0].name != ":find") { throw 'no initial find' }

  var firstcolon = findIndex(":in") > 0 ? findIndex(":in") : findIndex(":where")
  for (var i = 0; i < firstcolon; i++) { // begin for loop
console.log("i", i, parsedquery.val[i])
  if (!parsedquery.val[i].name && parsedquery.val[i]['val'].length == 2) {
    console.log(parsedquery.val[i].val[0].name)
    console.log(parsedquery.val[i].val[1].name.slice(1))
    console.log("some other object with no name, perhaps because it's got parentheses, specifically with two terms in the parentheses, such as 'count ?items'", parsedquery.val[i])
    item[prop].labels.push(parsedquery.val[i].val[1].name.slice(1) + '-' + parsedquery.val[i].val[0].name)
    i++
  } else {
    if (parsedquery.val[i].name.charAt(0) != ":") {
console.log(parsedquery.val[i].name.slice(1))
      item[prop].labels.push(parsedquery.val[i].name.slice(1))
      i++
    }
  }
} // end for loop

  item[prop].filename = filename
  item[prop].stateordata = operation

console.log("TOTAL", item)
  return item
}

export { createDatomQLContainer, datomql }
