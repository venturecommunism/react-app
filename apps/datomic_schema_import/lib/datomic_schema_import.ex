import Datomic.Channel

defmodule DatomicSchemaImport do
  def importall do
    DatomicSchemaImport.importfirstschema
    DatomicSchemaImport.importoneoff
    DatomicSchemaImport.importthird
  end

  def importthird do
third_schema = """

[
                          {:db/id "datomic.tx"
                           :db/txInstant #inst "1970-01-01"}

{                         :db/ident :group
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "Group some content belongs to"}

{                         :db/ident :members
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Members of a group"}

]
"""
schemaimport(third_schema)
  end

  def importoneoff do
# one off schema were not in the original data imported from previous versions of the task manager but are being used to build new features
one_off_schema = """

[
                          {:db/id "datomic.tx"
                           :db/txInstant #inst "1970-01-01"}

{                         :db/ident :wait
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/doc "Hides a task until the wait period is over"}
]
"""
    schemaimport(one_off_schema)
  end

  def importfirstschema do

schema_to_add = """
[
                          {:db/id "datomic.tx"
                           :db/txInstant #inst "1970-01-01"}

                          {:db/ident :description
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
                           :db/cardinality :db.cardinality/one
                           :db/unique :db.unique/identity
                           :db/doc "A substitute for db:ident from tripl.py"}

                          {:db/ident :uuid
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/one
                           :db/unique :db.unique/identity
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

                         {:db/ident :payload
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Some extra JSON data legacy of mongodb"}

                         {:db/ident :type
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Different data types in the task manager"}

                         {:db/ident :contextcategory
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Categories to hold contexts"}

                         {:db/ident :contextaor
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Areas of Responsibility that specific contexts may be found under"}

                         {:db/ident :energylevel
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Energy level required for a task (may be context or state dependent)"}

                         {:db/ident :aor
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Area of Responsibility. Every project must belong to one AOR"}

                         {:db/ident :weeklyreviewchecked
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Whether something has been checked at the Weekly Review"}

                         {:db/ident :duration
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Estimate of how much time a task will take"}

                         {:db/ident :wip
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Work in Progress. A tool to limit how many tasks are seen at any given time."}

                         {:db/ident :timerank
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "An estimate of the rank order tasks might be done in linear time."}

                         {:db/ident :checklistid
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Checklist a task belongs to"}

                         {:db/ident :checked
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Whether a task is checked on the checklist"}

                         {:db/ident :due
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Time and date a task or relevant note is due."}

                         {:db/ident :alarmorder
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The order in time of a series of alarms."}

                         {:db/ident :nextalarm
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The next alarm in a series."}

                         {:db/ident :timer
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "The amount of time remaining on an alarm."}

                         {:db/ident :defaultcontext
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A suggested context for tasks already belonging to the project."}

                         {:db/ident :navigatingto
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "What you're navigating to."}

                         {:db/ident :contextlocation
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Latitude/Longitude for a context."}

                         {:db/ident :yval
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Y value of the user's scroll position."}

                         {:db/ident :username
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Email or username."}

                         {:db/ident :created
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "Date of creation."}

                         {:db/ident :id
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A unique identifier from mongo"}]

"""
    schemaimport(schema_to_add)
  end

  def schemaimport(schema_to_add) do
  IO.inspect DatomicLink.start

  IO.inspect {:ok, _transaction_result} = DatomicGenServer.transact(via_tuple("someproc"), schema_to_add, [:options, {:client_timeout, 100_000}])

  end
end
