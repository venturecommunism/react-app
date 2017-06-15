defmodule PhoenixInterface.DatomicChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:datomic", _params, socket) do
    Datomic.Channel.join(socket)
  end

  def handle_in("new:msg", %{"body" => %{"syncpoint" => latest_tx}, "user" => user}, socket) do
    IO.puts "MSG FALSE"

    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    IO.puts edn
    grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
    Enum.each(grouped_tx, fn({_, x}) -> IO.puts push socket, "new:msg", %{"user" => "system", "body" => x} end)

    push socket, "join", %{status: "connected"}
    broadcast! socket, "new:msg", %{user: user, body: %{"syncpoint": false, "user": user}}
    {:reply, {:ok, %{msg: %{"syncpoint": false, "user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", %{"body" => %{"data" => data, "meta" => meta}, "user" => user}, socket) do
    IO.inspect "transact"
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    IO.inspect "no message"
    {:noreply, socket}
  end
end
