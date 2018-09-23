/**
 * A query for returning names
 * of all users in the graph
 */
const allUserQuery =  `[:find ?desc ?date ?status ?uuid
                        :where [?e "description" ?desc]
                               [?e "entry" ?date]
                               [?e "status" ?status]
                               [?e "uuid" ?uuid]]`

export default allUserQuery
