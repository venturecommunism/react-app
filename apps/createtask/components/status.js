import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'
import React, { Fragment } from 'react'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from '../../rncore/components/styledComponents'

const Calendar = ({
  actions,
  connectionstate,
}) => {
  return (
    <PageWrapper>
      <UserContainer>
{connectionstate.status != 'online' &&
              <View>
                <Fragment>
                  <ListContainer>
                    <Text>{connectionstate.status}</Text>
                  </ListContainer>
               </Fragment>
            </View>
}
      </UserContainer>
    </PageWrapper>
  )
}

export default createDatomQLContainer(
  Calendar,
  datomql`
    state status_connectionstate {
[:find ?status
  :where
[(get-else $ ?e "status" "initializing...") ?status]
]
    }
  `
)
