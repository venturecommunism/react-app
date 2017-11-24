/**
 * A query for returning names
 * of all users in the graph
 */
const allUserQuery = `
  [:find ?user
   :where [?u "name"]
          [?u "name" ?user]]`

const allProjectsQuery = `
[:find
        ?description 
        ?workflow 
        ?status 
        ?istheprojecttype 
        ?id 
        ?dbident 
        ?rank 
        ?owner 
        ?entry 
        ?jsonldcontext 
        ?e2 
        ?desc2
        ?entry2
 :where
[?e ?attrib]
[?e "workflow" ?workflow]
[?e "status" ?status]
[?e "id" ?id]
[?e "jsonldcontext" ?jsonldcontext]
[?e "description" ?description]
[?e "db:ident" ?dbident]
[?e "rank" ?rank]
[?e "owner" ?owner]
[?e "entry" ?entry]
[?e "type" ?istheprojecttype]

[?e2 "project" ?id]
[?e2 "description" ?desc2]
[?e2 "entry" ?entry2]

        [?e "type" "project"]]
`

export default allProjectsQuery
