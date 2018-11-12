import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { View, Text, Button, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer, DateTime, Modal, CheckBox } from './styledComponents'
import { Set, State } from 'react-powerplug'

const PickerInbox = ({
    actions,
    tx,
    localtx,
    status,
    message,
    filterprojects,
    projects,
    inbox,
    selectedState,
    stateSelect,
    }) => {
  return (
      <PageWrapper>
      <UserContainer>

        <State initial={{ favorite: "", uuid: "" }}>
        {({ state, setState }) => (

        <Set initial={[]}>
        {({ values, add, remove, clear }) => (
          <View>
          <Fragment>
          <ListContainer>
          {filterprojects && filterprojects.map(item => <View key={item.uuid}><Text>- {item.desc}</Text></View>)}
          <Text>{JSON.stringify(selectedState)}</Text>
          <Text>{filterprojects.length > 0 && filterprojects.length}</Text>

          {projects.map(item => (
              <ListItemView key={item.uuid}>

              <Button
              title={item.desc}
              onPress={() => actions().pickerinbox.addtoproject(item.uuid, values, clear)}
              accessibilityLabel={item.desc} />


              </ListItemView>
              ))}
          </ListContainer>
          <Button
          title={"Reset"}
          onPress={clear}
          accessibilityLabel={"Reset"} />
            <ListContainer>
            {inbox.map(inboxitem => (
                    <ListItemView key={inboxitem.uuid}>

                {state.inboxitem != '' && state.uuid == inboxitem.uuid &&
                <Modal
                transparent={false}
                onRequestClose={() => console.log('closed modal')}
                >
                <Text>{state.inboxitem}</Text>
                <Button title={"Make Project"} onPress={ () => tx({type: "project"}, state.uuid) }/>
                <Button title={"Make Context"} onPress={() => tx({type: "context"}, state.uuid) }/>
                <DateTime placeholder={"Add to Calendar"} taskid={state.uuid}/>
                <Button title={"deactivate Modal"} onPress={() => setState({ inboxitem: '', uuid: ''})}/>
                </Modal> }


                    <CheckBox checked={values.indexOf(inboxitem.uuid) > -1} key={inboxitem.uuid} taskid={inboxitem.uuid}
                    onChange={() => actions().pickerinbox.dostuff(values, add, remove, inboxitem.uuid)} />

                    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
                    <Button onPress={() => setState({ inboxitem: inboxitem.desc, uuid: inboxitem.uuid })} title={"Change Type"}/>
                    </ListItemView>
                    ))}
        </ListContainer>
          </Fragment>

          { values
            ? <View>
              <Text>
              {JSON.stringify(values)}
            </Text>
              </View>
              : null}
        </View>


          )}
      </Set>

          )}
      </State>


      </UserContainer>
        </PageWrapper>
        )
}

export default createDatomQLContainer(
    PickerInbox,
    datomql`
    query pickerinbox_inbox {
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
    query pickerinbox_projects {
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
    `,
    datomql`
    query pickerinbox_filterprojects {
    [:find ?desc ?date ?status ?uuid ?confirmid ?e
    :in $ ?project
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "project" ?project]
    [(missing? $ ?e "wait")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `
    )
