  /**
   * Define some components
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'newroot.js Subcomponent',
      'componentsparents': [-5, -18],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -5,
      'componentsname': 'Inbox',
      'componentstype': 'root',
      'componentid': 'inbox'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
     { ':db/id': -13,
      componentid: 'newrootcomponentcleanup',
      componentsname: 'New Root component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?u
               :where [?u "description" ?desc]
                      [?u "entry" ?date]
                      [?u "status" ?status]
                      [?u "status" "pending"]
                      [?u "uuid" ?uuid]
                      [(missing? $ ?u "wait")]
                      [(get-else $ ?u "confirmationid" "none") ?confirmid]
                      [(get-else $ ?u "dat.sync.remote.db/id" "none") ?remoteid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -14,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-16, -19, -22]
    },
    { ':db/id': -15,
      routeid: 'home',
      modulename: 'Core module'
    },
    { ':db/id': -16,
      componentsname: 'keyupaddtask',
      componentstype: 'action',
      componentsfunction: `({conn, transact}, e) {
        if (e.which === 13) {
          var date = new Date().getTime()
          transact(conn, [{
            ':db/id': -1,
            description: 'keyup addtask test',
            date: date,
            status: 'pending',
            uuid: 'uuid-' + date
          }])
        }
      }`
    },
    { ':db/id': -17,
      moduleid: 'inbox',
      modulename: 'Root Core module',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
    { ':db/id': -19,
      componentsname: 'taskcompletedbutton',
      componentstype: 'action',
      componentsparents: -5,
      actiontype: 'simplebutton',
      placeholder: 'Done',
      componentsfunction: `({conn, transact}, e) {
console.log(e)
          var date = new Date().getTime()
          transact(conn, [{
            uuid: e,
            status: 'completed'
          }])
      }`
    },
    {
      ':db/id': -20,
      'componentsname': 'Sixth Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -21,
      'componentsname': 'Seventh Data Component',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    { ':db/id': -22,
      componentsname: 'tasksomedaymaybebutton',
      componentstype: 'action',
      componentsparents: -5,
      actiontype: 'simplebutton',
      placeholder: 'Someday-Maybe',
      componentsfunction: `({conn, transact}, e) {
console.log(e)
          var date = new Date().getTime()
          transact(conn, [{
            uuid: e,
            wait: 'somedaymaybe'
          }])
      }`
    },
  ]

export default componentdatoms
