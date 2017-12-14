import datascript from 'datascript'

import {
  injectDeps
} from './injectdeps';


// a query to pull in components and their queries. more later
const cQuery = `
  [:find ?e2 ?modid ?action ?function ?actionsetid ?actionid
   :where [?e3 "moduleid" ?modid]
          [?e3 "moduleactionsets" ?e2]
          [?e2 "moduleactions" ?action]
          [?e2 "actionsetid" ?actionsetid]
          [?action "moduleactionfunction" ?function]
          [?action "actionid" ?actionid]]`

export default class App {
  constructor(context) {
    if (!context) {
      const message = `Context is required when creating a new app.`;
      throw new Error(message);
    }

    this.context = context;
    this.actions = {};
    this._routeFns = [];
  }

  _bindContext(_actions) {
    const actions = {};
    for (let key in _actions) {
      if (_actions.hasOwnProperty(key)) {
        const actionMap = _actions[key];
        const newActionMap = {};
        for (let actionName in actionMap) {
          if (actionMap.hasOwnProperty(actionName)) {
            newActionMap[actionName] =
              actionMap[actionName].bind(null, this.context);
          }
        }
        actions[key] = newActionMap;
      }
    }

    return actions;
  }

  loadModule(module) {
    this._checkForInit();

    if (!module) {
      const message = `Should provide a module to load.`;
      throw new Error(message);
    }

    if (module.__loaded) {
      const message = `This module is already loaded.`;
      throw new Error(message);
    }

    if (module.routes) {
      if (typeof module.routes !== 'function') {
        const message = `Module's routes field should be a function.`;
        throw new Error(message);
      }

      this._routeFns.push(module.routes);
    }

//    const actions = module.actions || {};
    const actions = {}
    actions.general = {}

    const db = datascript.db(this.context.conn)
    // arguments to a components query
    const cArgs = [cQuery, db]
    const query = datascript.q(...cArgs)

    actions[query[0][4]][query[0][5]] = new Function(`return ` + `${query[0][3]}`)

actions[query[0][4]][query[0][5]] = new Function(
    `return function ` + query[0][5] + 
    `() {
       alert('Hi!')
     }`
)()


    if (module.actions.general.keyupaddtask === actions.general.keyupaddtask) {
//      alert('true')
    } else {
      console.log('module.actions', module.actions)
      console.log('actions', actions)
      console.log('actions', actions.general.keyupaddtask)
    }

    this.actions = {
      ...this.actions,
      ...actions
    };

    if (module.load) {
      if (typeof module.load !== 'function') {
        const message = `module.load should be a function`;
        throw new Error(message);
      }

      // This module has no access to the actions loaded after this module.
      const boundedActions = this._bindContext(this.actions);
      module.load(this.context, boundedActions);
    }

    module.__loaded = true;
  }

  init() {
    this._checkForInit();

    for (const routeFn of this._routeFns) {
      const inject = comp => {
        return injectDeps(this.context, this.actions)(comp);
      };

      routeFn(inject, this.context, this.actions);
    }

    this._routeFns = [];
    this.__initialized = true;
  }

  _checkForInit() {
    if (this.__initialized) {
      const message = `App is already initialized`;
      throw new Error(message);
    }
  }
}
