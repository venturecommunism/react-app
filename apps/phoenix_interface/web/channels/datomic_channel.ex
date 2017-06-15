defmodule PhoenixInterface.DatomicChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:datomic", _params, socket) do
    Datomic.Channel.join(socket)
  end

  def handle_in("new:msg", %{"body" => %{"syncpoint" => latest_tx}, "user" => user}, socket) do
    IO.inspect latest_tx
    Datomic.Channel.sync(latest_tx, socket)
    |> Enum.each(fn({_, x}) -> IO.puts push socket, "new:msg", %{"user" => "system", "body" => x} end)

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
