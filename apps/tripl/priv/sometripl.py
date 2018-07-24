#!/usr/bin/python

from tripl import tripl
import uuid

schema = {'cft.seq:timepoint': {'db:valueType': 'db.type:ref',
                                'db:cardinality': 'db.cardinality:many'},
          'cft.seq:subject': {'db:valueType': 'db.type:ref'}}

ts = tripl.TripleStore(schema=schema, default_cardinality='db.cardinality:one')

ts.dump('output.json')

ts2 = tripl.TripleStore.load('output.json')
