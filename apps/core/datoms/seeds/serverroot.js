  /**
   * Define some components
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'Subcomponent',
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
      'componentsname': 'Root',
      'componentstype': 'root',
      'componentid': 'core'
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
      componentid: 'rootcomponentcleanup_serverversion',
      componentsname: 'Root component (with a query that works for Server)',
      query: `[:find ?e ?e ?e ?desc
               :where [?e ?attrib ?desc]]`,
      sortfields: `[2, 0]`,
      sortorders: `[DESC, ASC]`
    },
    { ':db/id': -14,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-16, -2, -9, -11]
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
            description: e.target.value,
            date: date,
            status: 'pending',
            uuid: 'uuid-' + date
          }])
          e.target.value = ""
        }
      }`
    },
    { ':db/id': -17,
      moduleid: 'servercore',
      modulename: 'Core module (server version)',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
    {
      ':db/id': -18,
      'componentsname': 'Server Root',
      'componentstype': 'root',
      'componentid': 'servercore'
    },
  ]

export default componentdatoms
