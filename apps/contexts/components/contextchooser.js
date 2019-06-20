import { createDatomQLContainer, datomql } from '../../rncore/containers/datomql'
import React, { Fragment } from 'react'

import { Set } from 'react-powerplug'

import { View, Button, Text, PageWrapper, ListContainer, ListItem, ListItemView, Loader, UserContainer } from '../../rncore/components/styledComponents'

import EditTask from '../../feed/components/edittask'
import DoTask from '../../feed/components/dotask'

const ContextChooser = ({
  actions,
  status,
  message,
  contexts,
  tasksbycontext,
}) => {
  return (
              <View>


        <Set initial={[]}>
        {({ values, add, remove, clear }) => (

<Fragment>
<ListContainer>
{tasksbycontext.map(task => (
  <ListItemView key={task.uuid}>
  { values.indexOf(task.context) > -1
  ? <DoTask inboxitem={task} />
  : <Fragment></Fragment>
  }
  </ListItemView>
))}
</ListContainer>



                  <ListContainer>
                    {contexts.map(item => (
                      <ListItemView key={item.uuid}>
                      { values.indexOf(item.uuid) > -1 ?
                      <View>
                        <ListItemView><EditTask uuid={item.uuid} /></ListItemView>
                        <Button
                          title={ values.indexOf(item.uuid) > -1 ? '@' + item.desc + ' (active)' : '@' + item.desc}
                          onPress={() => remove(item.uuid)}
                          accessibilityLabel={item.desc} />
                      </View>
                      :
                      <View>
                        <ListItemView><EditTask uuid={item.uuid} /></ListItemView>
                        <Button
                          title={ values.indexOf(item.uuid) > -1 ? '@' + item.desc + ' (active)' : '@' + item.desc}
                          onPress={() => add(item.uuid)}
                          accessibilityLabel={item.desc} />
                      </View>
 }
                      </ListItemView>
                    ))}
                  </ListContainer>
</Fragment>
       )}
       </Set>
            </View>
  )
}

export default createDatomQLContainer(
  ContextChooser,
  datomql`
    query choosecontext_contexts {
[:find ?desc ?date ?status ?uuid ?confirmid ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[?e "type" "context"]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]
    }
  `,
  datomql`
    query choosecontext_tasksbycontext {
[:find ?desc ?date ?status ?uuid ?confirmid ?context ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[?e "context" ?context]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]
    }
  `

)
