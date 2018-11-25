defmodule ImportFromEdn do
  def import(filename) do
    DatomicLink.start
    fullpath = "priv/files/" <> filename
    {:ok, body} = File.read(fullpath)

    elixir_contents = Exdn.to_reversible body
    orderedcontents = Enum.sort_by(elixir_contents, fn [e, a, v, tx, added] ->
      {tx, added, e, a, v}
    end)
    |> Enum.chunk_by(fn [_, _, _, tx, _] ->
      tx
    end)

    # first four transactions are pre-installed datomic schema
    drop_first_four = Enum.drop(orderedcontents, 4)

    {user_defined_schema, user_data} = Enum.partition(drop_first_four, fn(outer) ->
      Enum.find(outer, fn(inner) ->
        match?([_, :"db/ident", _, _, _], inner)
      end)
    end)    

    # make sure nothing else has a ":db/ident" i.e. all schema transactions are at the beginning of drop_first_four

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

IO.puts "user data"
IO.inspect(Enum.at(user_data, 0))

    schema = Exdn.to_reversible schema

    user_data = Enum.drop(user_data, 2)

    eav_form_transactions = Enum.map(user_data, fn transaction ->
      Enum.map(transaction, fn [e, a, v, tx, true] ->
        schemaentry = Enum.find(schema, nil, fn [attribute | [vtype | _tail]] ->
          attribute == a
#          attribute == String.to_atom(a)
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
            [:"db/add", "datomic.tx", a, v]
#            [:"db/add", tx, a, {:tag, :inst, v}]
#            [:"db/add", tx, String.to_atom(a), {:tag, :inst, v}]
#          [_, :"db.type/instant", _, _] ->
#            [":db/add", e, a, {:tag, :inst, v}]
#            [":db/add", e, String.to_atom(a), {:tag, :inst, v}]
          _ ->
            [":db/add", "tempid", a, v]
#            [":db/add", e, String.to_atom(a), v]
        end
      end)
      |> Exdn.from_elixir!
    end)


    Enum.each(eav_form_transactions, fn data_to_add ->
      IO.inspect data_to_add
      {:ok, msg} = DatomicTransact.transact(data_to_add)
      IO.inspect(msg, printable_limit: :infinity)
      Process.sleep(700)
    end)
  end
end
