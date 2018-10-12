const query = 
`[:find ?desc ?date ?status ?uuid ?confirmid ?due ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[(missing? $ ?e "wait")]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
[?e "due" ?due]
]`

export default query
