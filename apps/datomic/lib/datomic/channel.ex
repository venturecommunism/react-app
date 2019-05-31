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

  def sync(latest_tx, subscription, username, socket) do
    %{topic: topic} = socket
    server_latest_tx_query = "[:find (max 1 ?tx) :where [?tx :db/txInstant]]"

    {:ok, "[[[" <> server_latest_tx_with_extra} = DatomicGenServer.q(via_tuple(topic), server_latest_tx_query, [], [:options, {:client_timeout, 100_000}])
    "\n]]]" <> reversed = String.reverse(server_latest_tx_with_extra)
    server_latest_tx = String.to_integer(String.reverse(reversed))

    IO.puts "latest tx FROM SERVER"
    IO.inspect server_latest_tx

    IO.puts "latest tx"
    IO.inspect latest_tx

    %{topic: topic} = socket

    IO.puts "is latest_tx an integer?"
    IO.inspect is_integer(latest_tx)

    latest_tx = cond do
      latest_tx == "none" ->
        "none"
      true ->
        String.to_integer(latest_tx)
    end

    cond do
      latest_tx == "none" ->
        since(latest_tx, server_latest_tx, subscription, username, topic)
      server_latest_tx - latest_tx >= 40 ->
        since(latest_tx, server_latest_tx, subscription, username, topic)
      server_latest_tx - latest_tx < 40 ->
        qlog(latest_tx, username, topic)
    end
  end

  def since(latest_tx, server_latest_tx, subscription, username, topic) do
    latest_tx = cond do
      latest_tx == "none" ->
        1
      true ->
        latest_tx
    end

    datomicsubscription = Enum.map(subscription, fn(x) ->
      {:ok, reversiblequery} = DatomicQueryTranslator.translatetosince(Enum.at(x,0), username)
      query = Exdn.from_elixir! reversiblequery
#      {:ok, qedn} = DatomicGenServer.q(via_tuple(topic), otherquery, [ Exdn.from_elixir!({:list, [{:symbol, :"datomic.api/since"}, {:symbol, :"datomic_gen_server.peer/*db*"}, latest_tx ]})], [:options, {:client_timeout, 100_000}])
      {:ok, edn} = DatomicGenServer.since(via_tuple(topic), query, latest_tx, [:options, {:client_timeout, 100_000}])
      Exdn.to_reversible edn
    end)

    finaloutput = RecUnion.recursiveunion(datomicsubscription)

    listfrommapset = MapSet.to_list(finaloutput)
    |> Enum.sort_by(fn x ->
      Enum.at(x,3)
    end)
    |> Enum.reverse

    final_tx = cond do
      listfrommapset == [] ->
        'none'
      true ->
        Enum.at(Enum.at(listfrommapset, 0), 3)
    end

    # changing final_tx to server_latest_tx
    {:ok, superfinaloutput} = Exdn.from_elixir finaloutput
    Datomic.TxForm.parse(superfinaloutput)
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
  end

  def qlog(latest_tx, username, topic) do
    query = "[:find ?e ?aname ?v ?tx ?op :in $ ?log ?t1 :where
             [(tx-ids ?log " <> Integer.to_string(latest_tx + 1) <> " nil) [?tx ...]] [(tx-data ?log ?tx) [[?e ?a ?v _ ?op]]]
             [?e \":group\" ?some_group_uuid] [?oo2 \":members\" \"" <> username <> "\"] [?oo2 \":id\" ?some_group_uuid] [?a \":db/ident\" ?aname]]"

    {:ok, edn} = DatomicGenServer.qlog(via_tuple(topic), query, 13194139534314, [], [:options, {:client_timeout, 100_000}])

    base_one = byte_size("\#{")
    <<_::binary-size(base_one), rest::binary>> = edn
    base_two = byte_size(rest) - byte_size("\}\n")
    <<inner::binary-size(base_two), _::binary>> = rest
    final_list = Exdn.to_elixir! "[" <> inner <> "]"

    MyLogQueryList.chopfirst(final_list) |> Enum.group_by( fn(x) -> x["tx"] end)
  end
end

