  /**
   * Define some components
   */

  const componentdatoms = [
    {
      ':db/id': -1,
      'componentsname': 'newroot.js Subcomponent2',
      'componentsparents': [-5, -18],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -4,
      'componentsname': 'Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -5,
      'componentsname': 'Someday-Maybe',
      'componentstype': 'root',
      'componentid': 'somedaymaybe'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
     { ':db/id': -13,
      componentid: 'somedaymaybequery2',
      componentsname: 'New Root component (cleanup)2',
      query: `[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait
               :where [?e "description" ?desc]
                      [?e "entry" ?date]
                      [?e "status" ?status]
                      [?e "status" "pending"]
                      [?e "uuid" ?uuid]
                      [?e "wait" ?wait]
                      [(get-else $ ?e "confirmationid" "none") ?confirmid]
                      [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`,
      limit: 10
    },
    { ':db/id': -14,
      actionsetid: 'general2',
      modulename: 'General actions2',
      moduleactions: [-16, -19, -22]
    },
    { ':db/id': -15,
      routeid: 'home',
      modulename: 'Core module2'
    },
    { ':db/id': -16,
      componentsname: 'keyupaddtask2',
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
      moduleid: 'somedaymaybe',
      modulename: 'Root Core module2',
      moduleactionsets: -14,
      rootcomponent: -13,
      routes: -15
    },
    { ':db/id': -19,
      componentsname: 'taskcompletedbutton2',
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
      'componentsname': 'Sixth Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    {
      ':db/id': -21,
      'componentsname': 'Seventh Data Component2',
      'componentsparents': [-5, -18],
      'componentstype': 'data'
    },
    { ':db/id': -22,
      componentsname: 'tasksomedaymaybebutton2',
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
