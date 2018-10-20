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

    IO.puts "latest tx"
    IO.inspect latest_tx

    latest_tx = cond do
      latest_tx == "none" ->
        1
      true ->
        String.to_integer(latest_tx)
    end

    datomicsubscription = Enum.map(subscription, fn(x) ->
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

    IO.inspect listfrommapset

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
end

