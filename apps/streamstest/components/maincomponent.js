import React, {Fragment} from 'react'

import { PageWrapper, ListContainer, ListItem, Loader, UserContainer, TableContainer } from './styledComponents'

import InfoTablesContainer from '../containers/infocontainer'
import LikesComponent from '../components/likes'
import DislikesComponent from '../components/dislikes'

import modalHandler from '../containers/streamhandlers/modal'
import textHandler from '../containers/streamhandlers/text'

const streamhandlers = [modalHandler, textHandler]

const Likes = InfoTablesContainer(LikesComponent, streamhandlers)
const Dislikes = InfoTablesContainer(DislikesComponent, streamhandlers)

// 1) remote state (userList, status, message)
// 2) remote actions (actions)
// 3) local state (selectedUser, match)
// 4) local actions (userSelect, history)

const MainComponent = ({
  actions,
  status,
  userList,
  selectedUser,
  userSelect,
  message,
  match,
  history
}) => {
  const commands = actions().general
  const { params: { user: userParam = 1 } } = match
  if (selectedUser) {
    userParam !== selectedUser.user && history.push(`/${selectedUser.user}`)
  }
  return (
    <PageWrapper>
      <UserContainer>
        {status === 'SUCCESS' ? (
          <Fragment>
            <h3 onClick={() => commands.test()}>Users</h3>
            <ListContainer style={{ height: '500px' }}>
              {userList.map((user, i) => (
                <ListItem key={i} onClick={() => userSelect(user)} selected={user === selectedUser}>
                  <p>{user.user}</p>
                </ListItem>
              ))}
            </ListContainer>
          </Fragment>
        ) : (
          <Loader status={status} message={message} />
        )}
      </UserContainer>
      {selectedUser && <TableContainer>
                         <Likes />
                         <Dislikes />
                       </TableContainer>
      }
    </PageWrapper>
  )
}

export default MainComponent
