import { State } from 'react-powerplug'
import {
  View,
  Text,
  Button
} from 'react-native'

import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'
import { PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from './styledComponents'

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
          <State initial={{ favorite: "", picked: "" }}>
            {({ state, setState }) => (
              <View>
                <Fragment>
                  <ListContainer>
                    {dsQuery.map(item => (
                      <ListItemView key={item[3]}>

                      <Button
                        title={item[0]}
                        onPress={() => setState({ favorite: item[0], picked: new Date().toLocaleTimeString()})}
                        accessibilityLabel={item[0]} />


                      </ListItemView>
                    ))}
                  </ListContainer>

                 <Button
                 title={"Reset"}
                 onPress={() => setState({ favorite: '', picked: ''})}
                 accessibilityLabel={"Reset"} />

                 <ListContainer>
                   {dsQuery.map(proj => (
                     <ListItemView key={proj[3]}>
                       <ListItem>{proj[0]}</ListItem>
                     </ListItemView>
                   ))}
                 </ListContainer>
               </Fragment>

               { state && state.favorite && state.picked
               ? <View>
                   <Text>
                     {state.favorite} + {state.picked}
                   </Text>
                 </View>
               : null}
            </View>
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
