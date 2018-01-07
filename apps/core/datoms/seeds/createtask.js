  /**
   * Define some query data.
   */


// should check if single quotes on field names are needed
  const componentdatoms = [
    { ':db/id': -1,
      'moduleid': 'createtask',
      'modulename': 'Create task',
      'moduleactionsets': -3,
      'rootcomponent': -2
    },
    { ':db/id': -2,
      'componentsname': 'Create task Root component',
      'componentstype': 'root',
      'componentid': 'createtask',
    },
    { ':db/id': -3,
      actionsetid: 'createtaskactions',
      modulename: 'Create task actions',
      moduleactions: -4
    },
    {
      ':db/id': -4,
      'componentsname': 'createtask',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, e) {
        var date = new Date().getTime()
        transact(conn, [{
          ':db/id': -1,
          description: 'create task test',
          date: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
        e.target.value = ""
      }`
    },
    {
      ':db/id': -1,
      'componentsname': 'Subcomponent',
      'componentsparents': -2,
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -4,
      'componentsname': 'textareatocreatetask',
      'componentsparents': -2,
      'componentstype': 'textarea',
      'placeholder': "Enter your text here."
    },
  ]

export default componentdatoms
