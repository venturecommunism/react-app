/**
 * A query for returning names
 * of all users in the graph
 */
const Q =  `[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait
             :where [?e "description" ?desc]
                    [?e "entry" ?date]
                    [?e "status" ?status]
                    [?e "status" "pending"]
                    [?e "uuid" ?uuid]
                    [?e "wait" ?wait]
                    [(get-else $ ?e "confirmationid" "none") ?confirmid]
                    [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]`

export default Q
