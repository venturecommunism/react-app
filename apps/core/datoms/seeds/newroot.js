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
      'componentsname': 'newroot.js NewRoot',
      'componentstype': 'root',
      'componentid': 'newrootcore'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component',
      'componentsparents': -1,
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
      query: `[:find ?desc ?date ?status ?uuid ?confirmid
               :where [?u "description" ?desc]
                      [?u "entry" ?date]
                      [?u "status" ?status]
                      [?u "uuid" ?uuid]
                      [(get-else $ ?u "confirmationid" "none") ?confirmid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -14,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-16, -19]
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
      moduleid: 'newrootcore',
      modulename: 'Root Core module',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
    { ':db/id': -19,
      componentsname: 'makeproject',
      componentstype: 'action',
      componentsparents: -5,
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
  ]

export default componentdatoms
