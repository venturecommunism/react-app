import { useDeps, compose, composeAll } from 'mantra-core'
import datascript from 'datascript'

const dataComposer = ({ context, componentid }, onData) => {
  // pull in the datascript connection and log of previous transactions from the context (see mantra spec for what the context is)
  const {conn, log} = context()

  // get the database from the connection
  var db = datascript.db(conn)

  // a query to pull in components and their queries. more later
  const cQuery = `
    [:find ?query
     :where [?e "query" ?query]
            [?e "componentid" "${componentid}"]]`

  // arguments to a components query
  const cArgs = [cQuery, db]
  // fetching the query you actually want from the query about components
  const query = datascript.q(...cArgs)[0][0]
  // arguments for the actual query we want
  const qArgs = [query, db]

// recursive multidimensional array sort being formed. TODO: change the structure to match datascript output (arrays all the way down)
try {

  if( typeof helper == 'undefined' ) {
    var helper = { } ;
  }

  helper.arr = {
    /**
     * Function to sort multidimensional array
     * 
     * param {array} [arr] Source array
     * param {array} [columns] List of columns to sort
     * param {array} [order_by] List of directions (ASC, DESC)
     * returns {array}
     */
    multisort: function(arr, columns, order_by) {
      if(typeof columns == 'undefined') {
        columns = []
        for(x=0;x<arr[0].length;x++) {
          columns.push(x);
        }
      }

      if(typeof order_by == 'undefined') {
        order_by = []
        for(x=0;x<arr[0].length;x++) {
          order_by.push('ASC');
        }
      }

      function multisort_recursive(a,b,columns,order_by,index) {  
        var direction = order_by[index] == 'DESC' ? 1 : 0;

        var is_numeric = !isNaN(a[columns[index]]-b[columns[index]]);

        var x = is_numeric ? a[columns[index]] : a[columns[index]].toLowerCase();
        var y = is_numeric ? b[columns[index]] : b[columns[index]].toLowerCase();

/*
// TODO: replace helper with something tha will work for non-numerics
            if(!is_numeric) {
                x = helper.string.to_ascii(a[columns[index]].toLowerCase(),-1),
                y = helper.string.to_ascii(b[columns[index]].toLowerCase(),-1);
            }
*/
        if(x < y) {
          return direction == 0 ? -1 : 1;
        }

        if(x == y)  {
          return columns.length-1 > index ? multisort_recursive(a,b,columns,order_by,index+1) : 0;
        }

        return direction == 0 ? 1 : -1;
      }

      return arr.sort(function (a,b) {
        return multisort_recursive(a,b,columns,order_by,0);
      })
    }
  }

  var peoples = [
      {name: 'Jean', lastname: 'Rodrigues', points: 30},
      {name: 'Sara', lastname: 'Hope', points: 30},
      {name: 'Igor', lastname: 'Leroy', points: 25},
      {name: 'Foo', lastname: 'Bar', points: 55}
  ]

  // sort this list by points, if points is equal, sort by name.
  var result = helper.arr.multisort(peoples, ['points', 'name'], ['DESC','ASC'])
  console.log(result)
  // TODO: add back in the actual datascript query we want once multidimensional sorts work
  // result = datascript.q(...qArgs)
  onData(null, {result})
} catch (error) {
  alert(error)
  onData(null, {error})
}

}

export default (component) => composeAll(
  compose(dataComposer),
  useDeps()
)(component)
