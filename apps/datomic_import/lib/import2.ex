IO.inspect Link.start

{:ok, json} = ConvertJson.get_json("test.json")
[{_id, record}] = Map.to_list(json)

# IO.inspect record

stringit = fn arg when is_list(arg) ->
  case Enum.count(arg) do
    1 ->
      [head | tail] = arg
      ~s("#{head}")
    _ ->
  case Enum.find_value(arg, "no floats", &is_float/1) do
    _ ->
#      List.to_string Enum.map(arg, fn(x) -> ~s(\"#{x}\") end)
      Enum.join(Enum.map(arg, fn(x) -> ~s("#{x}") end), " ")
    _ ->
      List.to_string Enum.map(arg, fn(x) -> Float.to_string x end)
  end
  end
end

list = Enum.map(record, fn({x,y}) -> IO.inspect ~s(:#{x} #{stringit.(y)}) end)
# Enum.map(record, fn({x,y}) -> IO.inspect ":"<>x<>" ["<>stringit.(y)<>"]" end)

join = Enum.join(list, " ")

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

                         {:db/ident :id
                           :db/valueType :db.type/string
                           :db/cardinality :db.cardinality/many
                           :db/doc "A unique identifier from mongo"}]

"""
IO.inspect {:ok, _transaction_result} = DatomicGenServer.transact(DatomicGenServerLink, schema_to_add, [:options, {:client_timeout, 100_000}])

data_to_add = ~s([{ #{join} }])

IO.inspect {:ok, _transaction_result} = DatomicGenServer.transact(DatomicGenServerLink, data_to_add, [:options, {:client_timeout, 100_000}])
