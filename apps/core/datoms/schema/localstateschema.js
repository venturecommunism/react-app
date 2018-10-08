const Schema = {
    "localstate/moduleid": {
      ':db/unique': ':db.unique/identity',
      ':db/cardinality': ':db.cardinality/one' 
    },
    "localstate/selectlist": {
      ':db/cardinality': ':db.cardinality/many'
    }
}

export default Schema
