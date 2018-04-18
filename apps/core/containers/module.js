import DataContainer from '../../core/containers/appbuilder'
import ActionsMapper from '../../core/containers/actionsmapper'
import RecursiveComponent from '../../rncore/components/component'

const Module = (action = 'general', component = RecursiveComponent, container = DataContainer, mapper = ActionsMapper) => {

  if (container != 'none') {
    return container(mapper(action, component))
  } else if (container == 'none') {
    return mapper(action, component)
  }
}

export default Module
