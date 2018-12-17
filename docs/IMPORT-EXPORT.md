# Export a database

# For right now you have to do source .env every time you switch databases

cd apps/datomic_export
iex -S mix
DatomicExport.export('something.txt')

cp priv/files/something.txt ../datomic_import/priv/files

cd ../datomic_utils/priv/datomic_utils
lein run show-dbs
lein run create-db tmpimpexp

cd ../../../datomic_schema_import
iex -S mix
DatomicSchemaImport.importall

cd ../../../datomic_import
iex -S mix
DatomicImport.import("something.txt")
