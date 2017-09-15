defmodule DatomicSchemaImport do
  IO.inspect DatomicLink.start

schema_to_add = """
[{                         :db/ident :description
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A description"}

                          {:db/ident :entry
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The date of entry"}

                          {:db/ident :context
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The context a task will be done in"}

                          {:db/ident :db:ident
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A substitute for db:ident from tripl.py"}

                          {:db/ident :uuid
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Universal Unique Identifier"}

                          {:db/ident :owner
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The owner of the task"}

                          {:db/ident :status
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The status of a task such as pending or completed"}

                          {:db/ident :rank
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The rank or order of importance"}

                         {:db/ident :tags
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Tags"}

                         {:db/ident :jsonldcontext
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "JSON-LD style context"}

                         {:db/ident :workflow
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Workflow state in the UI"}

                         {:db/ident :project
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Project"}

                         {:db/ident :id
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A unique identifier from mongo"}]

"""
  IO.inspect {:ok, _transaction_result} = DatomicGenServer.transact(DatomicGenServerLink, schema_to_add, [:options, {:client_timeout, 100_000}])

end
