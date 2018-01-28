import React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types'

const getDisplayName = Component => (
  Component.displayName || Component.name || 'Component'
);

export function injectDeps(context, _actions) {
  const actions = {};
  for (let key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      const actionMap = _actions[key];
      const newActionMap = {};
      for (let actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context);
        }
      }
      actions[key] = newActionMap;
    }
  }

  return function (Component) {
    class ComponentWithDeps extends React.Component {
      static childContextTypes = {
        context: PropTypes.object,
        actions: PropTypes.object
      }

      static getChildContext = () => {
        return {
          context,
          actions
        }
      }

      render() {
        return (<Component {...this.props} />);
      }
    }

    ComponentWithDeps.displayName = `WithDeps(${getDisplayName(Component)})`;
    return hoistStatics(ComponentWithDeps, Component);
  };
}

const defaultMapper = (context, actions) => ({
  query: null,
  err: null,
  actions: actions,
  context: () => context,
});

export function useDeps(name, mapper = defaultMapper) {
  return function (Component) {
    class ComponentUseDeps extends React.Component {
      render() {
        const {context} = this.context;
/*
if (name == 'timepicker') {
sweetAlert("context", Object.keys(this.context) + "name: " + name + "name keys: " + Object.keys(this.context.actions[name]))
}
*/
        const actions = this.context.actions[name]
/*
if (!actions) {
sweetAlert("name", name)
}
*/
        const mappedProps = mapper(context, actions);

//        if (mappedProps.actions().name() == 'sidebar') {
//          sweetAlert("mp", Object.keys(mappedProps.actions()))
//        }

        const newProps = {
          ...this.props,
          ...mappedProps
        };

        return (<Component {...newProps} />);
      }

      static contextTypes = {
        context: PropTypes.object,
        actions: PropTypes.object
      }
    }

    ComponentUseDeps.displayName = `UseDeps(${getDisplayName(Component)})`;
    return hoistStatics(ComponentUseDeps, Component);
  };
}
