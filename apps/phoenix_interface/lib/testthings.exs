import Datomic.Channel
topic = "someproc"
DatomicGenServer.start_link(Application.get_env(:datomic, :database), true, [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple(topic)}])

server_latest_tx_query = "[:find (max 1 ?tx) :where [?tx :db/txInstant]]"
{:ok, "[[[" <> server_latest_tx_with_extra} = DatomicGenServer.q(via_tuple(topic), server_latest_tx_query, [], [:options, {:client_timeout, 100_000}])
"\n]]]" <> reversed = String.reverse(server_latest_tx_with_extra)
server_latest_tx = String.reverse(reversed)
IO.puts "latest tx FROM SERVER"
IO.inspect server_latest_tx
transaction_since_schema = 13194139534315
transaction_since_schema = 13194139534320
transaction_since_schema = 13194139534378

username = "someone@someplace.com"
subscription = [
  ["[:find ?desc ?date ?status ?uuid ?confirmid ?due ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"wait\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [?e \"due\" ?due]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
   "[5, 0]", "[DESC, ASC]", 10],
  ["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"type\" \"project\"]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
   "[1, 0]", "[DESC, ASC]", 10],
  ["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"project\")]\n                      [(missing? $ ?e \"type\")]\n                      [(missing? $ ?e \"wait\")]\n                      [(missing? $ ?e \"due\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
   "[1, 0]", "[DESC, ASC]", 10],
  ["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"wait\" ?wait]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
   "[1, 0]", "[DESC, ASC]", 10],
  ["[:find ?desc ?date ?status ?uuid\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"uuid\" ?uuid]]",
   "[2, 0]", "[DESC, ASC]", 10]
]

query = "[:find ?e ?a ?v ?tx ?op :in $ ?log ?t1 :where [(tx-ids ?log " <> Integer.to_string(transaction_since_schema + 1) <> " nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
{:ok, edn} = DatomicGenServer.qlog(via_tuple(topic), query, 13194139534314, [], [:options, {:client_timeout, 100_000}])
grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
IO.puts "grouped tx"
IO.inspect grouped_tx

"""
Enum.map(subscription, fn(x) ->
  IO.puts "datoms convert"
  {:ok, reversiblequery} = DatomicQueryTranslator.translatetodatoms(Enum.at(x,0), username)
  query = Exdn.from_elixir! reversiblequery
  IO.puts "query"
  IO.inspect query
  # {:ok, edn} = DatomicGenServer.qlog(via_tuple(topic), query, 13194139534314, [], [:options, {:client_timeout, 100_000}])
  # grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
  # IO.puts "grouped tx"
  # IO.inspect grouped_tx
end)
"""

    # "none" sets the latest_tx to 1 but may be another way
    latest_tx = 1
    # translates into a since query for each subscription, then unifies
    finaloutput = Enum.map(subscription, fn(x) ->
      {:ok, reversiblequery} = DatomicQueryTranslator.translatetosince(Enum.at(x,0), username)
      query = Exdn.from_elixir! reversiblequery
      {:ok, edn} = DatomicGenServer.since(via_tuple(topic), query, latest_tx, [:options, {:client_timeout, 100_000}])
      Exdn.to_reversible edn
    end)
    |> RecUnion.recursiveunion

    # turns the mapset into a list in order to find the greatest tx. can maybe do this in the query itself
    listfrommapset = MapSet.to_list(finaloutput)
    |> Enum.sort_by(fn x -> Enum.at(x,3) end)
    |> Enum.reverse

    # say you're still at none if there's nothing in the list, otherwise grab the transaction number
    final_tx = cond do
      listfrommapset == [] ->
        'none'
      true ->
        Enum.at(Enum.at(listfrommapset, 0), 3)
    end

    # turn it into EDN
    {:ok, superfinaloutput} = Exdn.from_elixir finaloutput
    # put it into the transaction form for the client
    absolutelastfinal = Datomic.TxForm.parse(superfinaloutput)
    |> Enum.map(fn x ->
      %{
        "a" => x["a"],
        "e" => x["e"],
        "op" => x["op"],
        "tx" => server_latest_tx,
        "v" => x["v"]
      }
    end)
    |> Enum.group_by(fn x ->
      x["tx"]
    end)

    IO.puts "absolute last final"
    IO.inspect absolutelastfinal

    query = """
[:find ?e ?aname ?v ?tx ?op :in $ ?log ?t1 :where
[(tx-ids ?log 
"""
<> Integer.to_string(latest_tx + 1) <>
"""
 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]
[?e \":group\" ?some_group_uuid] [?oo2 \":members\" \"" <> username <> "\"] [?oo2 \":id\" ?some_group_uuid] [?a \":db/ident\" ?aname]]
"""

    query = "[:find ?e ?aname ?v ?tx ?op :in $ ?log ?t1 :where
[(tx-ids ?log " <> Integer.to_string(transaction_since_schema + 1) <> " nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]
[?e \":group\" ?some_group_uuid] [?oo2 \":members\" \"" <> username <> "\"] [?oo2 \":id\" ?some_group_uuid] [?a \":db/ident\" ?aname]]"

#    query = "[:find ?e ?aname ?v ?tx ?op :in $ ?log ?t1 :where
#[(tx-ids ?log " <> Integer.to_string(transaction_since_schema + 1) <> " nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]
#[?a \":db/ident\" ?aname]]"

      {:ok, edn} = DatomicGenServer.qlog(via_tuple(topic), query, 13194139534314, [], [:options, {:client_timeout, 100_000}])
      Exdn.to_reversible edn
IO.puts "output"
      IO.inspect edn

# it might be that datoms changing between subscriptions don't get picked up? not sure
# figure out why one of the fields gets cut off on datoms
# sometimes on datoms sync i don't see a description
# there must be some difference between datoms sync and since query on the client

