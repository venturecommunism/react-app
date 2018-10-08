  /**
   * Define some components
   */

  const componentdatoms = [
    { ':db/id': -1,
      moduleid: 'projectspicker',
      modulename: 'Projects list',
      moduleactionsets: -4,
      rootcomponent: -3
    },
    {
      ':db/id': -2,
      'componentsname': 'Projects picker',
      'componentstype': 'root',
      'componentid': 'projectspicker'
    },
    { ':db/id': -3,
      componentid: 'someid-projectspicker',
      componentsname: 'New Projectspicker (this needs to be unique) component (cleanup)',
      query: `[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e
               :where [?e "description" ?desc]
                      [?e "entry" ?date]
                      [?e "status" ?status]
                      [?e "status" "pending"]
                      [?e "uuid" ?uuid]
                      [?e "type" "project"]
                      [(get-else $ ?e "confirmationid" "none") ?confirmid]
                      [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`,
      limit: 10
    },
    { ':db/id': -4,
      actionsetid: 'general-mustbeunique',
      modulename: 'General actions (unique?)',
      moduleactions: [-19, -22, -23]
    },
    {
      ':db/id': -5,
      'componentsname': 'projectspicker newroot.js Subcomponent',
      'componentsparents': [-2],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -6,
      'componentsname': 'Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -7,
      'componentsname': 'Second Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    { ':db/id': -19,
      componentsname: 'placeinproject',
      componentstype: 'action',
      componentsparents: -2,
      actiontype: 'simplebutton',
      placeholder: 'Place in project'
    },
    {
      ':db/id': -20,
      'componentsname': 'Sixth Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -21,
      'componentsname': 'Seventh Data Component',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
  ]

export default componentdatoms
