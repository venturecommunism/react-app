defmodule DatomicImport do
  def import do
    filename = "import.txt"
    DatomicImport.import(filename)
  end

  def import(filename) do
    DatomicLink.start
    fullpath = "priv/files/" <> filename
    {:ok, body} = File.read(fullpath)
    json = Poison.Parser.parse!(body)
    # the first five are initial data including one schema
    json_dropping_first_few = Enum.drop(json, 5)

    {:ok, schema} = DatomicQuery.query("""
      [:find ?attribute ?valuetype ?cardinality ?documentation
       :where [?e :db/ident ?attribute]
              [?e :db/valueType ?vt]
              [?vt :db/ident ?valuetype]
              [?e :db/cardinality ?cv]
              [?cv :db/ident ?cardinality]
              [?e :db/doc ?documentation]
      ]
    """)

    eav_form_transactions = Enum.map(json_dropping_first_few, fn transaction ->
      Enum.map(transaction, fn [e, a, v, tx, true] ->
        schemaentry = Enum.find(schema, nil, fn [attribute | [vtype | _tail]] ->
          attribute == String.to_atom(a)
        end)


#    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 :where [(tx-ids ?log ?t1 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
#    {:ok, edn} = DatomicGenServer.qlog({:via, :gproc, {:n, :l, {:topic, "someproc"}}}, query, 1000000000000000 - 1 , [], [:options, {:client_timeout, 100_000}])
#    IO.inspect edn, limit: :infinity
#    Process.sleep(60000)


#txes = DatomicQuery.query("""
#[:find ?a
# :where [118 ?a _ _ _]
#]
#"""
#)
#IO.inspect txes
#Process.sleep(600000)

        case schemaentry do
          [:"db/txInstant", _, _, _] ->
            [:"db/add", tx, String.to_atom(a), {:tag, :inst, v}]
          [_, :"db.type/instant", _, _] ->
            [":db/add", e, String.to_atom(a), {:tag, :inst, v}]
          _ ->
            [":db/add", e, String.to_atom(a), v]
        end
      end)
      |> Exdn.from_elixir!
    end)

    Enum.each(eav_form_transactions, fn data_to_add ->
      IO.inspect data_to_add
      {:error, msg} = DatomicTransact.transact(data_to_add)
      IO.inspect(msg, printable_limit: :infinity)
      Process.sleep(60000)
    end)
  end
end
