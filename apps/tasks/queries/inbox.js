/**
 * A query for returning names
 * of all users in the graph
 */
const inboxQuery = `
  [:find ?desc ?date ?status ?uuid
   :where [?u "description" ?desc]
          [?u "date" ?date]
	  [?u "status" ?status]
	  [?u "uuid" ?uuid]]`

export default inboxQuery
