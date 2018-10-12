import createDatomQLContainer from './datomqlcontainer'

function datomql () {
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
  var query_with_braces = op_removed.replace(filename_prop, '')
  var one_brace_query = query_with_braces.split("{").pop();
  const query =
    one_brace_query
      .split("").reverse().join("")
      .split("}")
      .pop()
      .split("").reverse().join("")
  return query
}

export { createDatomQLContainer, datomql }
