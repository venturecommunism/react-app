import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from './styledComponents'
import { State } from 'react-powerplug'

const SomedayMaybe = ({
  actions,
  status,
  message,
  dsQuery,
}) => {
  return (
    <PageWrapper>
      <UserContainer>

          <State initial={{ favorite: "", picked: "" }}>
            {({ state, setState }) => (
              <View>
                <Fragment>
                  <ListContainer>
                    {dsQuery.somedaymaybes.map(item => (
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
                   {dsQuery.somedaymaybes.map(proj => (
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

      </UserContainer>
    </PageWrapper>
  )
}

export default createDatomQLContainer(
  SomedayMaybe,
  datomql`
    query somedaymaybe_somedaymaybes {
[:find ?desc ?date ?status ?uuid ?confirmid ?wait
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[?e "wait" ?wait]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]
    }
  `
)
