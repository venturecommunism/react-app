const query = 
`[:find ?desc ?date ?status ?uuid ?confirmid ?wait
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[?e "wait" ?wait]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]`

export default query
