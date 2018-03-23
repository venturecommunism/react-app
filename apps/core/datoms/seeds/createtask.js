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
      'componentid': 'createtask'
    },
    { ':db/id': -3,
      actionsetid: 'createtaskactions',
      modulename: 'Create task actions',
      moduleactions: -5
    },
    {
      ':db/id': -5,
      'componentsname': 'create_task',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact}, text) {
        var date = new Date().getTime().toString()
        transact(conn, [{
          ':db/id': -1,
          description: text,
          entry: date,
          status: 'pending',
          uuid: 'uuid-' + date
        }])
      }`
    },
  ]

export default componentdatoms
