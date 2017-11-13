import React from 'react'

import DataContainer from '../../core/containers/datacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import projectsQuery from '../queries/projects'
import ProjectsComponent from './projects'

const Projects = DataContainer(ActionsMapper('projects', ProjectsComponent))

const Tasks = () => (
  <div>
    <Projects query={projectsQuery} />
  </div>
)

export default Tasks
