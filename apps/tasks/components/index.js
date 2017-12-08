import React from 'react'

import PullDataContainer from '../containers/pulldatacontainer'
import DataContainer from '../containers/tasksdatacontainer'
import ActionsMapper from '../../core/containers/actionsmapper'

import inboxQuery from '../queries/inbox'
import pullProjectsQuery from '../queries/pullprojects'
import projectsQuery from '../queries/projects'

import InboxComponent from './inbox'
import PullProjectsComponent from './pullprojects'
import ProjectsComponent from './projects'

const Inbox = DataContainer(ActionsMapper('inbox', InboxComponent))
const PullProjects = PullDataContainer(PullProjectsComponent)
const Projects = DataContainer(ActionsMapper('projects', ProjectsComponent))

const Tasks = () => (
  <div>
    <Inbox query={inboxQuery} />
    <PullProjects pullquery={pullProjectsQuery} />
    <Projects query={projectsQuery} />
  </div>
)

export default Tasks
