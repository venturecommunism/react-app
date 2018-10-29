import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from './styledComponents'
import { State } from 'react-powerplug'

const BlankView = ({
  actions,
  status,
  message,
  calendaritems,
  inbox,
  rxTx,
}) => {
  return (
    <PageWrapper>
      <UserContainer>

<ListContainer>
{calendaritems.map(item =>
<ListItemView key={item[0]}>
  <ListItem>{item[1]}</ListItem>
  <ListItem>{item[0]}</ListItem>
</ListItemView>
)}
</ListContainer>

<ListContainer>
{inbox.map(item =>
<ListItemView key={item[0]}>
  <ListItem>{item[1]}</ListItem>
  <ListItem>{item[0]}</ListItem>
</ListItemView>
)}
</ListContainer>


          <State initial={{ favorite: "", picked: "" }}>
            {({ state, setState }) => (
              <View>
                <Fragment>

                 <Button
                 title={"Reset"}
                 onPress={() => rxTx({ something: 'this', uuid: 'that'}) }
                 accessibilityLabel={"Reset"} />

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

//export default BlankView

export default createDatomQLContainer(
  BlankView,
  datomql`
    query somefile_calendaritems {
[:find ?uuid ?something ?e
  :where
[?e "something" ?something]
[?e "uuid" ?uuid]
]
    }
  `,
datomql`
query somefile_inbox {
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

)

