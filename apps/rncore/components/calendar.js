import { createDatomQLContainer, datomql } from '../containers/datomql'
import React, {Fragment} from 'react'

import { SimpleView, SimpleButton, SimpleText, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from './styledComponents'
import { State } from 'react-powerplug'

const Calendar = ({
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
              <SimpleView>
                <Fragment>
                  <ListContainer>
                    {dsQuery.map(item => (
                      <ListItemView key={item[3]}>

                      <SimpleButton
                        title={item[0]}
                        onPress={() => setState({ favorite: item[0], picked: new Date().toLocaleTimeString()})}
                        accessibilityLabel={item[0]} />


                      </ListItemView>
                    ))}
                  </ListContainer>

                 <SimpleButton
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
               ? <SimpleView>
                   <SimpleText>
                     {state.favorite} + {state.picked}
                   </SimpleText>
                 </SimpleView>
               : null}
            </SimpleView>
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
  Calendar,
  datomql`
    query calendar_calendaritems {
[:find ?desc ?date ?status ?uuid ?confirmid ?due ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
[?e "due" ?due]
]
    }
  `
)
