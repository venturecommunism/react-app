/**
 * A query for returning names
 * of all users in the graph
 */
const inboxQuery = `
  [:find ?desc ?date
   :where [?u "description"]
          [?u "description" ?desc]
          [?u "date" ?date]]`

export default inboxQuery
