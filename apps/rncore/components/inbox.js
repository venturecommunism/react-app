import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { View, Text, Button, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer, DateTime, Modal } from './styledComponents'
import { State, Toggle } from 'react-powerplug'

const PickerInbox = ({
    actions,
    status,
    message,
    inboxitems,
    }) => {
  return (
      <PageWrapper>
      <UserContainer>
      {status === 'SUCCESS' ? (
        <State initial={{ favorite: "", uuid: "" }}>
        {({ state, setState }) => (
          <Toggle initial={false}>
          {({ on, toggle }) => (
            <View>
            <Fragment>
            <ListContainer>

                {on && state.favorite != '' && state.uuid != '' &&
                <Modal
                transparent={false}
                onRequestClose={() => console.log('closed modal')}
                >
                <Text>{state.favorite}</Text>
                <Button title={"Make Project"} onPress={() => console.log('okay')}/>
                <Button title={"Make Context"} onPress={() => console.log('okay2')}/>
                <DateTime placeholder={"Add to Calendar"} buttonaction={() => actions.general.test} taskid={state.uuid}/>
                <Button title={"deactivate Modal"} onPress={toggle}/>
                </Modal> }


            {inboxitems.map(item => (
                <ListItemView key={item.uuid}>
               {state && state.uuid && state.uuid == item.uuid ? <Button onPress={toggle} title={"Change Type"}/> : null }

              <Button
              title={item.desc}
            onPress={() => setState({ favorite: item.desc, uuid: item.uuid })}
            accessibilityLabel={item.desc} />


              </ListItemView>
              ))}
          </ListContainer>

            <Button
            title={"Reset"}
          onPress={() => setState({ favorite: '', uuid: '' })}
          accessibilityLabel={"Reset"} />

            <ListContainer>
            {dsQuery.inboxitems.map(proj => (
                  <ListItemView key={proj.uuid}>
                  <ListItem>{proj.desc}</ListItem>
                  </ListItemView>
                  ))}
          </ListContainer>
            </Fragment>

            { state && state.favorite && state.uuid
              ? <View>
                <Text>
                {state.favorite} + {state.uuid}
              </Text>
                </View>
                : null}
          </View>

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
    query inbox_inboxitems {
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
