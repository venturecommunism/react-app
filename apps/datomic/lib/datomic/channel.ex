defmodule Datomic.Channel do
  def join(socket, unique_user_id) do
    %{topic: topic} = socket
    DatomicGenServer.start_link(
      Application.get_env(:datomic, :database),
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple(topic)}]
    )
    {:ok, socket}
  end

  def via_tuple(process_per_topic) do
    {:via, :gproc, {:n, :l, {:topic, process_per_topic}}}
  end

  def sync("none", socket) do
    IO.puts "MSG FALSE"
    %{topic: topic} = socket

    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    {:ok, edn} = DatomicGenServer.q(via_tuple(topic), query, [], [:options, {:client_timeout, 100_000}])
    IO.puts edn
    grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
  end

  def sync(latest_tx, socket) do
    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 :where [(tx-ids ?log ?t1 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
    {:ok, edn} = DatomicGenServer.qlog(DatomicGenServerLink, query, latest_tx - 1 , [], [:options, {:client_timeout, 100_000}])
    IO.puts "test"
    grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
  end
end

