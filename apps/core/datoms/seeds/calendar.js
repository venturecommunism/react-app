  /**
   * Define some components
   */

  const componentdatoms = [
    { ':db/id': -1,
      moduleid: 'calendar',
      modulename: 'calendar - this field and the moduleid must be unique',
      moduleactionsets: -4,
      rootcomponent: -3,
      routes: -15
    },
    {
      ':db/id': -2,
      'componentsname': 'Calendar (must be unique)',
      'componentstype': 'root',
      'componentid': 'calendar'
    },
    { ':db/id': -3,
      componentid: 'calendar-uniquefield-newrootcomponentcleanup',
      componentsname: 'Calendar (unique)',
      query: `[:find ?desc ?date ?status ?uuid ?confirmid ?due ?remoteid ?e
               :where [?e "description" ?desc]
                      [?e "entry" ?date]
                      [?e "status" ?status]
                      [?e "status" "pending"]
                      [?e "uuid" ?uuid]
                      [(missing? $ ?e "wait")]
                      [(get-else $ ?e "confirmationid" "none") ?confirmid]
                      [?e "due" ?due]
                      [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]`,
      sortfields: `[5, 0]`,
      sortorders: `[DESC, ASC]`,
      limit: 10
    },
    { ':db/id': -4,
      actionsetid: 'general-mustbeunique-maybe',
      modulename: 'General actions',
      moduleactions: [-11, -12, -13]
    },
    {
      ':db/id': -5,
      'componentsname': 'Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -6,
      'componentsname': 'Second Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -7,
      'componentsname': 'Third Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -9,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Sixth Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    { ':db/id': -11,
      componentsname: 'datetimepicker',
      componentstype: 'action',
      componentsparents: -2,
      actiontype: 'datetimepicker',
      placeholder: 'Due'
    },
    { ':db/id': -12,
      componentsname: 'taskcompletedbutton',
      componentstype: 'action',
      componentsparents: -2,
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
    { ':db/id': -13,
      componentsname: 'tasksomedaymaybebutton',
      componentstype: 'action',
      componentsparents: -2,
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
