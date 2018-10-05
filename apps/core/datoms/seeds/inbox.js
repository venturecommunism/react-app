  /**
   * Define some components
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'newroot.js Subcomponent',
      'componentsparents': [-5],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component',
      'componentsparents': [-5],
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
      'componentsparents': [-5],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': [-5],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-5],
      'componentstype': 'data'
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-5],
      'componentstype': 'data'
    },
     { ':db/id': -13,
      componentid: 'newrootcomponentcleanup',
      componentsname: 'New Root component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e
               :where [?e "description" ?desc]
                      [?e "entry" ?date]
                      [?e "status" ?status]
                      [?e "status" "pending"]
                      [?e "uuid" ?uuid]
                      [(missing? $ ?e "wait")]
                      [(get-else $ ?e "confirmationid" "none") ?confirmid]
                      [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`,
      limit: 10
    },
    { ':db/id': -14,
      actionsetid: 'general',
      modulename: 'General actions',
      moduleactions: [-18, -19, -22]
    },
    { ':db/id': -15,
      routeid: 'home',
      modulename: 'Core module'
    },
    { ':db/id': -17,
      moduleid: 'inbox',
      modulename: 'Root Core module',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
    { ':db/id': -18,
      componentsname: 'datetimepicker',
      componentstype: 'action',
      componentsparents: -5,
      actiontype: 'datetimepicker',
      placeholder: 'Due'
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
      'componentsparents': [-5],
      'componentstype': 'data'
    },
    {
      ':db/id': -21,
      'componentsname': 'Seventh Data Component',
      'componentsparents': [-5],
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
