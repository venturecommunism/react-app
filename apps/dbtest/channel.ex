5) put the since query in its own thing
6) add the qlog and make it its own thing
7) if it's none or server_latest - client_latest is less than 40, do the since query
8) otherwise do the qlog query
9) make sure the since sync sends back the latest tx the server knows about

  def sync(latest_tx, subscription, username, socket) do
    %{topic: topic} = socket

    server_latest_tx_query = "[:find (max 1 ?tx) :where [?tx :db/txInstant]]"

    {:ok, "[[[" <> server_latest_tx_with_extra} = DatomicGenServer.q(via_tuple(topic), server_latest_tx_query, [], [:options, {:client_timeout, 100_000}])
    "\n]]]" <> reversed = String.reverse(server_latest_tx_with_extra)
    server_latest_tx = String.reverse(reversed)

    IO.puts "latest tx FROM SERVER"
    IO.inspect server_latest_tx

    IO.puts "latest tx"
    IO.inspect latest_tx

    latest_tx = cond do
      latest_tx == "none" ->
        1
      true ->
        String.to_integer(latest_tx)
    end

    datomicsubscription = Enum.map(subscription, fn(x) ->
      {:ok, reversiblequery} = DatomicQueryTranslator.translatetosince(Enum.at(x,0), username)
      query = Exdn.from_elixir! reversiblequery
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

