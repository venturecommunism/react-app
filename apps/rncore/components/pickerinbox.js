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
          {filterprojects && filterprojects.map(item => <View key={item[3]}><Text>- {item[0]}</Text></View>)}
          <Text>{JSON.stringify(selectedState)}</Text>
          <Text>{filterprojects.length > 0 && filterprojects.length}</Text>

          {projects.map(item => (
              <ListItemView key={item[3]}>

              <Button
              title={item[0]}
              onPress={() => localtx({project: item[3]})}
              accessibilityLabel={item[0]} />


              </ListItemView>
              ))}
          </ListContainer>
          <Button
          title={"Reset"}
          onPress={clear}
          accessibilityLabel={"Reset"} />
            <ListContainer>
            {inbox.map(inboxitem => (
                    <ListItemView key={inboxitem[3]}>

                {state.inboxitem != '' && state.uuid == inboxitem[3] &&
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


                    <CheckBox checked={values.indexOf(inboxitem[3]) > -1} key={inboxitem[3]} taskid={inboxitem[3]} 
                    onChange={() => actions().pickerinbox.dostuff(values, add, remove, inboxitem[3])} />

                    <ListItem>{inboxitem[0]}</ListItem>
                    <Button onPress={() => setState({ inboxitem: inboxitem[0], uuid: inboxitem[3] })} title={"Change Type"}/>
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
