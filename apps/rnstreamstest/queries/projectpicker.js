const query =
`[:find ?desc ?date ?status ?uuid ?confirmid ?e
  :where
[?e "description" ?desc]
[?e "entry" ?date]
[?e "status" ?status]
[?e "status" "pending"]
[?e "uuid" ?uuid]
[?e "type" "project"]
[(get-else $ ?e "confirmationid" "none") ?confirmid]
]`

export default query
