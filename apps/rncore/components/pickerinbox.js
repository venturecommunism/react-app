import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { SimpleView, SimpleText, SimpleButton, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer, DateTime, AriaModal, CheckBox } from './styledComponents'
import { Set } from 'react-powerplug'

const PickerInbox = ({
    actions,
    status,
    message,
    dsQuery,
    }) => {
  return (
      <PageWrapper>
      <UserContainer>
      {status === 'SUCCESS' ? (
        <Set initial={[]}>
        {({ values, add, remove, clear }) => (
          <SimpleView>
          <Fragment>
          <ListContainer>
          {dsQuery.projects.map(item => (
              <ListItemView key={item[3]}>
              <SimpleButton
              title={item[0]}
              onPress={() => actions().pickerinbox.addtoproject(item[0], values, clear)}
              accessibilityLabel={item[0]} />
              </ListItemView>
              ))}
          </ListContainer>
          <SimpleButton
          title={"Reset"}
          onPress={clear}
          accessibilityLabel={"Reset"} />
            <ListContainer>
            {dsQuery.inbox.map(inboxitem => (
                    <ListItemView key={inboxitem[3]}>
                    <CheckBox checked={values.indexOf(inboxitem[3]) > -1} key={inboxitem[3]} taskid={inboxitem[3]} 
                    onChange={() => actions().pickerinbox.dostuff(values, add, remove, inboxitem[3])} label={inboxitem[0]} />

                    <ListItem>{inboxitem[0]}</ListItem>
                    </ListItemView>
                    ))}
        </ListContainer>
          </Fragment>

          { values
            ? <SimpleView>
              <SimpleText>
              {JSON.stringify(values)}
            </SimpleText>
              </SimpleView>
              : null}
        </SimpleView>

          )}
      </Set>

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
    query inbox {
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
    `,
    datomql`
    query projects {
    [:find ?desc ?date ?status ?uuid ?confirmid ?e
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "type" "project"]
    [(missing? $ ?e "wait")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `
    )
