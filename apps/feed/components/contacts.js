import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'
import React, { Fragment } from 'react'

import { TouchableOpacity } from 'react-native'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from '../../rncore/components/styledComponents'
import { State } from 'react-powerplug'

import call from '../../phonecalls/commands/phonecalls'
import EditTask from '../../feed/components/edittask'

const Contacts = ({
  actions,
  status,
  message,
  contacts,
}) => {
  var pattern = '(?:(?:\\+?1\\s*(?:[.-]\\s*)?)?(?:\\(\\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\\s*\\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\\s*(?:[.-]\\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\\s*(?:[.-]\\s*)?([0-9]{4})(?:\\s*(?:#|x\\.?|ext\\.?|extension)\\s*(\d+))?'
  contacts.map( item => console.log(item.desc.match(pattern)))
  contacts.map( item => console.log(item.desc.replace(item.desc.match(pattern)[0], "").trim()))
  return (
    <PageWrapper>
      <UserContainer>
              <View>
                <Fragment>
                 <ListContainer>
                   {contacts.map(proj => (
                     <ListItemView key={proj.uuid}>
                       <ListItemView><EditTask uuid={proj.uuid} /></ListItemView>
                       <ListItemView><TouchableOpacity onPress={() => call(proj.desc.match(pattern)[0])}><Text>{proj.desc.match(pattern)[0]}</Text></TouchableOpacity></ListItemView>
                       <ListItem>{proj.desc.replace(proj.desc.match(pattern)[0], "")}</ListItem>
                     </ListItemView>
                   ))}
                 </ListContainer>
               </Fragment>
            </View>
      </UserContainer>
    </PageWrapper>
  )
}

export default createDatomQLContainer(
  Contacts,
  datomql`
    query contacts_contacts {
[:find ?desc ?date ?status ?uuid ?confirmid ?e
  :where
[?e "type" "person"]
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]
    }
  `
)
