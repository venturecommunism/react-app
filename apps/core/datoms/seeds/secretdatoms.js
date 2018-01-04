  const secretdatoms = [
    {
      ':db/id': -1,
      name: 'Stringified Result',
      query: `[:find ?user
 :where [?u "name"]
        [?u "name" ?user]]`
    },
    {
      ':db/id': -1,
      name: 'Secrets',
      'app/secrets': ['app/secrets', 'app/credentials']
    }
  ]


export default secretdatoms
