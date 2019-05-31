#!/bin/sh

cd ~/react-app/apps/datomic_link
mix compile

cd ~/react-app/apps/datomic_utils/priv/datomic_utils
#lein run drop-db deleteme
#lein run show-dbs
#lein run create-db deleteme
#lein run show-dbs

cd ~/react-app/apps/datomic_schema_import
#mix run lib/schema.exs

cd ~/react-app/apps/datomic_transact
#mix run lib/group.exs
#mix run lib/task.exs
#mix run lib/project.exs
#mix run lib/retract.exs

cd ~/react-app/apps/phoenix_interface
mix run lib/testthings.exs
