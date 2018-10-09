  /**
   * Define some components
   */

  const componentdatoms = [
    { ':db/id': -1,
      moduleid: 'projectshelper',
      modulename: 'Projects helper',
      moduleactionsets: -4,
      rootcomponent: -3
    },
    {
      ':db/id': -2,
      'componentsname': 'Projects helper',
      'componentstype': 'root',
      'componentid': 'projectshelper'
    },
    { ':db/id': -3,
      componentid: 'someid-projectshelper',
      componentsname: 'New Projectshelper (this needs to be unique) component (cleanup)',
      query: `[:find (count ?desc) ?e ?e ?e ?confirmid ?e ?e
               :where [?e2 "description" ?desc]
                      [?e2 "entry" ?date]
                      [?e2 "status" ?status]
                      [?e "uuid" ?projuuid]
                      [?e "type" "project"]
                      [?e2 "uuid" ?uuid]
                      [?e2 "project" ?projuuid]
                      [(get-else $ ?e "confirmationid" "none") ?confirmid]]`,
      sortfields: `[1, 0]`,
      sortorders: `[DESC, ASC]`,
      limit: 10
    },
    { ':db/id': -4,
      actionsetid: 'general-mustbeunique-projectshelper',
      modulename: 'General actions projectshelper (unique?)'
    },
    {
      ':db/id': -5,
      'componentsname': 'projectshelper newroot.js Subcomponent',
      'componentsparents': [-2],
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -6,
      'componentsname': 'Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -7,
      'componentsname': 'Second Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -8,
      'componentsname': 'Third Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -10,
      'componentsname': 'Fourth Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -12,
      'componentsname': 'Fifth Data Component (fourth in the main)-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -20,
      'componentsname': 'Sixth Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
    {
      ':db/id': -21,
      'componentsname': 'Seventh Data Component-ph',
      'componentsparents': [-2],
      'componentstype': 'data'
    },
  ]

export default componentdatoms
