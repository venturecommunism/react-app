import React from 'react'

import PullDataContainer from '../containers/pulldatacontainer'
import DataContainer from '../containers/tasksdatacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import pullProjectsQuery from '../queries/pullprojects'
import projectsQuery from '../queries/projects'

import PullProjectsComponent from './pullprojects'
import ProjectsComponent from './projects'

const PullProjects = PullDataContainer(PullProjectsComponent)
const Projects = DataContainer(ActionsMapper('projects', ProjectsComponent))

const Tasks = () => (
  <div>
    <PullProjects pullquery={pullProjectsQuery} />
    <Projects query={projectsQuery} />
  </div>
)

export default Tasks
