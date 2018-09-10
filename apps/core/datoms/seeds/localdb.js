  /**
   * Define some query data.
   */


// should check if single quotes on field names are needed
  const componentdatoms = [
    { ':db/id': -1,
      'moduleid': 'loginpage',
      'modulename': 'Log in',
      'moduleactionsets': -3,
      'rootcomponent': -2
    },
    { ':db/id': -2,
      'componentsname': 'Login Root component',
      'componentstype': 'root',
      'componentid': 'loginpage'
    },
/*
    { ':db/id': -3,
      actionsetid: 'loginactions',
      modulename: 'Login actions',
      moduleactions: -5
    },
    {
      ':db/id': -5,
      'componentsname': 'login_page',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({conn, transact, putAsync, chUnPass}, username, password) {
        putAsync(chUnPass, {email: username, password: password})
//        console.log("did it")
//        transact(conn, [{
//          ':db/id': -1,
//          'localstate/state': 'loggingin'
//        }])
      }`
    },
*/
  ]

export default componentdatoms
