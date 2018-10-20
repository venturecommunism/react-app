defmodule Datomic.Channel do
  require Logger

  def join(socket, _unique_user_id) do
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

  def sync(latest_tx, subscription, socket) do
    %{topic: topic} = socket

    datomicsubscription = Enum.map(subscription, fn(x) ->
      latest_tx = String.to_integer(latest_tx)
      {:ok, reversiblequery} = DatomicQueryTranslator.translatetodatoms(Enum.at(x,0))
      query = Exdn.from_elixir! reversiblequery
      {:ok, edn} = DatomicGenServer.q(via_tuple(topic), query, [ Exdn.from_elixir!({:list, [{:symbol, :"datomic.api/since"}, {:symbol, :"datomic_gen_server.peer/*db*"}, latest_tx ]})], [:options, {:client_timeout, 100_000}])
      Exdn.to_reversible edn
    end)

    finaloutput = RecUnion.recursiveunion(datomicsubscription)

    listfrommapset = MapSet.to_list(finaloutput)
    |> Enum.sort_by(fn x ->
      Enum.at(x,3)
    end)
    |> Enum.reverse

    final_tx = Enum.at(Enum.at(listfrommapset, 0), 3)

    {:ok, superfinaloutput} = Exdn.from_elixir finaloutput
    Datomic.TxForm.parse(superfinaloutput)
    |> Enum.map(fn x ->
      %{
        "a" => x["a"],
        "e" => x["e"],
        "op" => x["op"],
        "tx" => final_tx,
        "v" => x["v"]
      }
    end)
    |> Enum.group_by(fn x ->
      x["tx"]
    end)
  end

  def sync("none", subscription, socket) do
    Logger.debug "MSG FALSE"
    %{topic: topic} = socket

    datomicsubscription = Enum.map(subscription, fn(x) ->
      {:ok, reversiblequery} = DatomicQueryTranslator.translatetocurrentstate(Enum.at(x,0))
#      {:ok, reversiblequery} = DatomicQueryTranslator.translatetodatoms(Enum.at(x,0))
      query = Exdn.from_elixir! reversiblequery
      {:ok, edn} = DatomicGenServer.q(via_tuple(topic), query, [], [:options, {:client_timeout, 100_000}])
      Exdn.to_reversible edn
    end)

    finaloutput = RecUnion.recursiveunion(datomicsubscription)

    finaloutput = MapSet.new(finaloutput, fn(x) ->
      x ++ [1, true]
    end)

    {:ok, finaloutput} = Exdn.from_elixir finaloutput

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
#    {:ok, edn} = DatomicGenServer.q(via_tuple(topic), query, [], [:options, {:client_timeout, 100_000}])
    # IO.inspect is_binary(edn), label: "edn returns a string"
#    Logger.debug fn -> edn end

#    _grouped_tx = Datomic.TransactionLogQueryLogger.parse(finaloutput) |> Enum.group_by( fn(x) -> x["tx"] end )
    Datomic.TxForm.parse(finaloutput) |> Enum.group_by(fn x ->
      x["tx"]
    end)
  end

  def sync(latest_tx, _socket) do
    query = "[:find ?e ?a ?v ?tx ?op :in ?log ?t1 :where [(tx-ids ?log ?t1 nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]]"
    {:ok, edn} = DatomicGenServer.qlog(DatomicGenServerLink, query, latest_tx - 1 , [], [:options, {:client_timeout, 100_000}])
    IO.puts "test"
    _grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
  end
end

