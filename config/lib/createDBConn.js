import datascript from 'datascript'
window.d = datascript

export default () => {
/**
 * Define a schema for a graph of users (with the names declared to be
 * unique which allows better performance, along with being able to easily lookup
 * an entity by this unique identifier)
 *
 * The users are connected by the 'follows' attribute (which is defined as a
 * reference type, with a cardinality of 'many' since someone can follow more
 * than one person.)
 */
  const Schema = {
    name: {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    follows: {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'shoppingcart/thing': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/fullscreen': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/credentials': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'app/secrets': {
      ':db/cardinality': ':db.cardinality/many'
    },
    'app/sync': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },

/**
components schema
*/

    'componentsname': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'componentsparents': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'componentstype': {
      ':db/cardinality': ':db.cardinality/one'
    },

/**
end components schema
*/

/**
module schema
*/

    'modulename': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'moduleid': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'rootcomponent': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactionsets': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactions': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },


/**
end module schema
*/
  }

  /**
   * Create connection to db (that's been instantiated with the schema above.)
   */
  const conn = datascript.create_conn(Schema)

  /**
   * Define some query data.
   */
  const datoms = [
    {
      ':db/id': -1,
      name: 'Reactive Test Query',
      query: `[:find ?e ?val
 :where [?e "db/doc"]
        [?e "db/doc" ?val]]`
    },
    {
      ':db/id': -2,
      name: 'Inbox',
      query: `[:find ?e ?entry ?id ?created ?username ?uuid ?desc ?ident ?status
 :where [?e "workflow" "/tw-ui/0.inbox"]
        [?e "entry" ?entry]
        [?e "id" ?id]
        [?e "created" ?created]
        [?e "username" ?username]
        [?e "uuid" ?uuid]
        [?e "description" ?desc]
        [?e "db:ident" ?ident]
        [?e "status" ?status]]`
    },
    {
      ':db/id': -3,
      name: 'Calendar',
      query: `[:find ?status ?uuid ?entry ?description ?due ?e
 :where [?e "status" ?status]
        [?e "uuid" ?uuid]
        [?e "entry" ?entry]
        [?e "description" ?description]
        [?e "due" ?due]]`
    },
    {
      ':db/id': -4,
      name: 'Contexts',
      query: `[:find ?e ?context ?desc ?type
 :where [?e "context"]
        [?e "description" ?desc]
        [?e "type" ?type]
        [?e "context" ?context]]`
    },
    {
      ':db/id': -5,
      name: 'Areas of Responsibility',
      query: `[:find ?e ?desc
 :where [?e "description" ?desc]
        [?e "tags" "aor"]]`
    },
    { ':db/id': -6,
      componentid: 'comp',
      query: `[:find ?desc ?date ?status ?uuid
   :where [?u "description" ?desc]
          [?u "date" ?date]
          [?u "status" ?status]
          [?u "uuid" ?uuid]]`
    },
  ]

  const secretdatoms = [
    {
      ':db/id': -1,
      name: 'Stringified Result',
      query: `[:find ?user
 :where [?u "name"]
        [?u "name" ?user]]`
    },
    {
      ':db/id': -1,
      name: 'Secrets',
      'app/secrets': ['app/secrets', 'app/credentials']
    }
  ]

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'Subcomponent',
      'componentsparents': -5,
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -2,
      'componentsname': 'Action used in multiple places',
      'componentsparents': [-1, -5],
      'componentstype': 'action',
      'componentsfunction': `() => alert('One action')`
    },
    {
      ':db/id': -3,
      'componentsname': 'Another Action',
      'componentsparents': -1,
      'componentstype': 'action',
      'componentsfunction': `() => alert('Another action')`
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component',
      'componentsparents': -5,
      'componentstype': 'data'
    },
    {
      ':db/id': -5,
      'componentsname': 'Root',
      'componentstype': 'root'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component',
      'componentsparents': -1,
      'componentstype': 'data'
    },
    {
      ':db/id': -7,
      'componentsname': 'A third action',
      'componentsparents': -1,
      'componentstype': 'action',
      'componentsfunction': `() => alert('Third action')`
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': -5,
      'componentstype': 'data'
    },
    {
      ':db/id': -9,
      'componentsname': 'A fourth action',
      'componentsparents': -5,
      'componentstype': 'action',
      'componentsfunction': `() => alert('Fourth action')`
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': -5,
      'componentstype': 'data'
    },
    {
      ':db/id': -11,
      'componentsname': 'A fifth action',
      'componentsparents': -5,
      'componentstype': 'action',
      'componentsfunction': `() => alert('Fifth action')`
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': -5,
      'componentstype': 'data'
    },
    { ':db/id': -13,
      componentid: 'rootcomponentcleanup',
      componentsname: 'Root component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid
               :where [?u "description" ?desc]
                      [?u "date" ?date]
                      [?u "status" ?status]
                      [?u "uuid" ?uuid]]`
    },
    { ':db/id': -14,
      componentid: 'rootcomponentcleanup_serverversion',
      componentsname: 'Root component (with a query that works for Server)',
      query: `[:find ?u ?u ?u ?desc
               :where [?u ?attrib ?desc]]`
    },
    { ':db/id': -15,
      moduleid: 'core',
      modulename: 'Core module',
      moduleactionsets: -16,
      rootcomponent: -13,
      routes: -17
    },
    { ':db/id': -16,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: -18
    },
    { ':db/id': -17,
      routeid: 'home',
      modulename: 'Core module'
    },
    { ':db/id': -18,
      actionid: 'keyupaddtask',
      moduleactionfunction: `

    function keyupaddtask({context}, e) {
      var conn = context.conn,
          transact = context.transact;

      if (e.which === 13) {
        var date = new Date().getTime();
        transact(conn, [{
          ':db/id': -1,
          description: e.target.value,
          date: "" + date,
          status: "pending",
          uuid: "uuid-" + date
        }]);
        e.target.value = "";
      }
    }


`
    },
  ]

  /**
   * Define some seed data; including some `follower` references (that make
   * use of a temporary id to point to other entities within the array.)
   */
  const refdatoms = [
    {
      ':db/id': -1,
      name: 'John',
      follows: -3
    },
    {
      ':db/id': -2,
      name: 'David',
      follows: [-3, -1]
    },
    {
      ':db/id': -3,
      name: 'Jane'
    },
  ]

  /**
   * Transact in the data, to be stored and indexed by datascript for performant
   * querying.
   */
  datascript.transact(conn, datoms)
  datascript.transact(conn, secretdatoms)
  datascript.transact(conn, refdatoms)
  datascript.transact(conn, componentdatoms)
  return conn
}
