/**
 * A query for returning names
 * of all users in the graph
 */
const pullProjectsQuery = `'["name", {"_follows" ...}]', [['name', 'Jane']]`
const madeintoarrayPullProjectsQuery = `[` + pullProjectsQuery + `]`

export default madeintoarrayPullProjectsQuery
