import Datomic.Channel
topic = "someproc"
DatomicGenServer.start_link(Application.get_env(:datomic, :database), true, [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple(topic)}])

server_latest_tx_query = "[:find (max 1 ?tx) :where [?tx :db/txInstant]]"
{:ok, "[[[" <> server_latest_tx_with_extra} = DatomicGenServer.q(via_tuple(topic), server_latest_tx_query, [], [:options, {:client_timeout, 100_000}])
"\n]]]" <> reversed = String.reverse(server_latest_tx_with_extra)
server_latest_tx = String.reverse(reversed)

IO.puts "latest tx FROM SERVER"
IO.inspect server_latest_tx

transaction_since_schema = 13194139534314

query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 :where [(tx-ids ?log ?t1 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
{:ok, edn} = DatomicGenServer.qlog(via_tuple(topic), query, 13194139534314, [], [:options, {:client_timeout, 100_000}])
grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
