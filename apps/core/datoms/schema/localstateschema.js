const Schema = {
    "project": {
      ':db/unique': ':db.unique/identity',
      ':db/cardinality': ':db.cardinality/one'
    },
    "id": {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    "uuid": {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },

    "localstate/moduleid": {
      ':db/unique': ':db.unique/identity',
      ':db/cardinality': ':db.cardinality/one'
    },
    "localstate/selectlist": {
      ':db/cardinality': ':db.cardinality/many'
    }
}

export default Schema
