import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'
import { PageWrapper, ListContainer, ListItem, Loader, UserContainer } from './styledComponents'

const PickerInbox = ({
  status,
  message,
  dsQuery,
}) => {
  return (
    <PageWrapper>
      <UserContainer>
        {status === 'SUCCESS' ? (
          <Fragment>
            <ListContainer>
              {dsQuery.map(item => (
                <ListItem key={item[3]}>
                  {item[1]}
                </ListItem>
              ))}
            </ListContainer>
            <ListContainer>
              {dsQuery.map(proj => (
                <ListItem key={proj[3]}>
                  {proj[1]}
                </ListItem>
              ))}
            </ListContainer>
          </Fragment>
        ) : (
          <Fragment>
            <Loader status={status} message={message} />
            <Loader status={status} message={message} />
          </Fragment>
        )}
      </UserContainer>
    </PageWrapper>
  )
}

export default createDatomQLContainer(
  PickerInbox,
  datomql`
    query maincomponent_inboxitem {
[:find ?desc ?date ?status ?uuid ?confirmid ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[(missing? $ ?e "project")]
[(missing? $ ?e "type")]
[(missing? $ ?e "wait")]
[(missing? $ ?e "due")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]
    }
  `
)
