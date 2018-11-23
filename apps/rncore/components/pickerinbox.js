import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, { Fragment } from 'react'

import { View, Text, Button, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer, DateTime, Modal, CheckBox } from './styledComponents'
import { Set, State } from 'react-powerplug'

const PickerInbox = ({
    actions,
    tx,
    localtx,

    pull,
    project,

    plainprojects,
    drilldownprojects,
    plaininbox,
    drilldowninbox,
    }) => {
  const COMMANDS = actions().pickerinbox
  return (
      <PageWrapper>
      <UserContainer>

        <State initial={{ projectlevel: "none", uuid: "" }}>
        {({ state, setState }) => (

        <Set initial={[]}>
        {({ values, add, remove, clear }) => (
          <View>
          <Fragment>
          <ListContainer>
            <Text>Pull: {JSON.stringify(pull)}</Text>
            <Text>Up One: {JSON.stringify(project.upone)}</Text>
            <Text>Project: {JSON.stringify(project.uuid)}</Text>
            <Text>Sub-Project count: {drilldownprojects.length}</Text>

          {project.uuid != 'none' &&
              <Button
              title={"Up"}
              onPress={() => COMMANDS.uponeproject(project.uuid, project.upone)}
              accessibilityLabel={"Up One Project"} />
          }


          {project.uuid == 'none' && plainprojects.map(item => (
              <ListItemView key={item.uuid}>

              <Button
              title={item.desc}
              onPress={() => COMMANDS.addtoproject(item.uuid, values, clear)}
              accessibilityLabel={item.desc} />

              </ListItemView>
              ))}

          {drilldownprojects.map(item => (
              <ListItemView key={item.uuid}>

              <Button
              title={item.desc}
              onPress={() => COMMANDS.addtoproject(item.uuid, values, clear)}
              accessibilityLabel={item.desc} />

              </ListItemView>
              ))}



          </ListContainer>
          <Button
          title={"Reset"}
          onPress={clear}
          accessibilityLabel={"Reset"} />
            <ListContainer>
            {project.uuid == 'none' && <Text>Inbox</Text> }
            {project.uuid == 'none' && plaininbox.map(inboxitem => (
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
                    onChange={() => COMMANDS.checkboxchange(values, add, remove, inboxitem.uuid)} />

<ListItem>{inboxitem.owner}</ListItem>
                    <ListItem style={inboxitem.confirmid != 'none' ? {backgroundColor: 'red'} : ''} >{inboxitem.desc}</ListItem>
                    <Button onPress={() => setState({ inboxitem: inboxitem.desc, uuid: inboxitem.uuid })} title={"Change Type"}/>
                    </ListItemView>
                    ))}

            {project.uuid != 'none' && <Text>Sub-Inbox</Text> }
            {project.uuid != 'none' && drilldowninbox.map(inboxitem => (
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
                    onChange={() => COMMANDS.checkboxchange(values, add, remove, inboxitem.uuid)} />

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
    query pickerinbox_plaininbox {
    [:find ?desc ?date ?status ?uuid ?confirmid ?owner ?e
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "owner" ?owner]
    [(missing? $ ?e "project")]
    [(missing? $ ?e "type")]
    [(missing? $ ?e "wait")]
    [(missing? $ ?e "due")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `,
    datomql`
    query pickerinbox_drilldowninbox {
    [:find ?desc ?date ?status ?uuid ?confirmid ?e
    :in $ ?project
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "project" ?project]
    [(missing? $ ?e "type")]
    [(missing? $ ?e "wait")]
    [(missing? $ ?e "due")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `,
    datomql`
    query pickerinbox_plainprojects {
    [:find ?desc ?date ?status ?uuid ?confirmid ?e
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "type" "project"]
    [(missing? $ ?e "project")]
    [(missing? $ ?e "wait")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `,
    datomql`
    query pickerinbox_drilldownprojects {
    [:find ?desc ?date ?status ?uuid ?confirmid ?e
    :in $ ?project
    :where
    [?e "description" ?desc]
    [?e "entry" ?date]
    [?e "status" ?status]
    [?e "status" "pending"]
    [?e "uuid" ?uuid]
    [?e "type" "project"]
    [?e "project" ?project]
    [(missing? $ ?e "wait")]
    [(get-else $ ?e "confirmationid" "none") ?confirmid]
    ]
    }
    `,
    datomql`
    state pickerinbox_project {
    [:find ?uuid ?upone
    :where
    [(get-else $ ?e2 "uponeproject" "none") ?upone]
    [(get-else $ ?e "project" "none") ?uuid]
    ]
    }
    `,
    datomql`
    pull pickerinbox_pull {
    [:find ?uuid
    :where
    ]
    }
    `,
    )
