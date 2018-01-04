const Schema = {
    'modulename': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'moduleid': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/unique': ':db.unique/identity'
    },
    'rootcomponent': {
      ':db/cardinality': ':db.cardinality/one',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactionsets': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
    'moduleactions': {
      ':db/cardinality': ':db.cardinality/many',
      ':db/valueType': ':db.type/ref'
    },
}

export default Schema
