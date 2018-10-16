import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { SimpleView, SimpleText, SimpleButton, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer, DateTime, Modal } from './styledComponents'
import { State, Toggle } from 'react-powerplug'

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
        <State initial={{ favorite: "", uuid: "" }}>
        {({ state, setState }) => (
          <Toggle initial={false}>
          {({ on, toggle }) => (
            <SimpleView>
            <Fragment>
            <ListContainer>

                {on && state.favorite != '' && state.uuid != '' &&
                <Modal
                transparent={false}
                onRequestClose={() => console.log('closed modal')}
                >
                <SimpleText>{state.favorite}</SimpleText>
                <SimpleButton title={"Make Project"} onPress={() => console.log('okay')}/>
                <SimpleButton title={"Make Context"} onPress={() => console.log('okay2')}/>
                <DateTime placeholder={"Add to Calendar"} buttonaction={() => actions.general.test} taskid={state.uuid}/>
                <SimpleButton title={"deactivate Modal"} onPress={toggle}/>
                </Modal> }


            {dsQuery.map(item => (
                <ListItemView key={item[3]}>
               {state && state.uuid && state.uuid == item[3] ? <SimpleButton onPress={toggle} title={"Change Type"}/> : null }

              <SimpleButton
              title={item[0]}
            onPress={() => setState({ favorite: item[0], uuid: item[3] })}
            accessibilityLabel={item[0]} />


              </ListItemView>
              ))}
          </ListContainer>

            <SimpleButton
            title={"Reset"}
          onPress={() => setState({ favorite: '', uuid: '' })}
          accessibilityLabel={"Reset"} />

            <ListContainer>
            {dsQuery.map(proj => (
                  <ListItemView key={proj[3]}>
                  <ListItem>{proj[0]}</ListItem>
                  </ListItemView>
                  ))}
          </ListContainer>
            </Fragment>

            { state && state.favorite && state.uuid
              ? <SimpleView>
                <SimpleText>
                {state.favorite} + {state.uuid}
              </SimpleText>
                </SimpleView>
                : null}
          </SimpleView>

            )}
        </Toggle>

          )}
      </State>
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
    query inbox_inboxitem {
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
