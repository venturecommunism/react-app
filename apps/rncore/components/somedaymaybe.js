import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from './styledComponents'
import { State } from 'react-powerplug'

const SomedayMaybe = ({
  actions,
  status,
  message,
  somedaymaybes,
}) => {
  return (
    <PageWrapper>
      <UserContainer>

          <State initial={{ favorite: "", picked: "" }}>
            {({ state, setState }) => (
              <View>
                <Fragment>
                  <ListContainer>
                    {somedaymaybes.map(item => (
                      <ListItemView key={item.uuid}>

                      <Button
                        title={item.desc}
                        onPress={() => setState({ favorite: item.desc, picked: new Date().toLocaleTimeString()})}
                        accessibilityLabel={item.desc} />


                      </ListItemView>
                    ))}
                  </ListContainer>

                 <Button
                 title={"Reset"}
                 onPress={() => setState({ favorite: '', picked: ''})}
                 accessibilityLabel={"Reset"} />

                 <ListContainer>
                   {somedaymaybes.map(proj => (
                     <ListItemView key={proj.uuid}>
                       <ListItem>{proj.desc}</ListItem>
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
