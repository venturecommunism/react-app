import PropTypes from 'prop-types'

import {
  withContext,
  getContext,
  mapProps,
  setDisplayName,
  wrapDisplayName,
  hoistStatics
} from 'recompose'

const defaultMapper = (context, actions) => ({
  context: () => context,
  actions: () => actions
})

export function useDeps(mapper = defaultMapper) {
  return BaseComponent => {
    const displayName = wrapDisplayName(BaseComponent, 'UseDeps')

    let BaseComponentDeps = BaseComponent

    BaseComponentDeps = hoistStatics(mapProps(props => {
      const { context, actions } = props
      const mappedProps = mapper(context, actions)

      const others = {}
      for (const key in props) {
        if (props.hasOwnProperty(key) && key !== 'context' && key !== 'actions') {
          others[key] = props[key]
        }
      }

      return Object.assign({}, others, mappedProps)
    }))(BaseComponentDeps)

    BaseComponentDeps = hoistStatics(getContext({
      context: PropTypes.object,
      actions: PropTypes.object
    }))(BaseComponentDeps)

    return setDisplayName(displayName)(BaseComponentDeps)
  }
}

export function injectDeps(context, _actions) {
  const actions = {}
  for (const key in _actions) {
    if (_actions.hasOwnProperty(key)) {
      const actionMap = _actions[key]
      const newActionMap = {}
      for (const actionName in actionMap) {
        if (actionMap.hasOwnProperty(actionName)) {
          newActionMap[actionName] = actionMap[actionName].bind(null, context)
        }
      }
      actions[key] = newActionMap
    }
  }

  return BaseComponent => {
    const displayName = wrapDisplayName(BaseComponent, 'WithDeps')

    const BaseComponentWithContext = hoistStatics(withContext({
      context: PropTypes.object,
      actions: PropTypes.object
    }, () => ({ context, actions })))(BaseComponent)

    return setDisplayName(displayName)(BaseComponentWithContext)
  }
}
