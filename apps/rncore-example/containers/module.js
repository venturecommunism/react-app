import DataContainer from '../../rncore/containers/appbuilder'
import ActionsMapper from '../../core/containers/actionsmapper'
import RecursiveComponent from '../../rncore/components/component'

const Module = (action = 'general', component = RecursiveComponent, container = DataContainer, mapper = ActionsMapper) => {
  return container(mapper(action, component))
}

export default Module
