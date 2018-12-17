import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'
import React, { Fragment } from 'react'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from '../../rncore/components/styledComponents'
import { State } from 'react-powerplug'

const Groups = ({
  actions,
  status,
  message,
  calendaritems,
}) => {
  return (
    <PageWrapper>
      <UserContainer>

          <State initial={{ favorite: "", picked: "" }}>
            {({ state, setState }) => (
              <View>
                <Fragment>
                  <ListContainer>
                    {calendaritems.map(item => (
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
                   {calendaritems.map(proj => (
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
  Groups,
  datomql`
    query groups_calendaritems {
[:find ?uuid ?desc ?e
  :where
[?e "description" ?desc]
[?e "uuid" ?uuid]
[?e "group" "somegroup"]
]
    }
  `
)
