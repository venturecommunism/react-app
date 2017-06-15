defmodule PhoenixInterface.DatomicChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:datomic", _params, socket) do
    Datomic.Channel.join(socket)
  end

  def handle_in("new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => user}, socket) do
    IO.inspect "syncpoint"
    {:noreply, socket}
  end

  def handle_in("new:msg", %{"body" => %{"data" => data, "meta" => meta}, "user" => user}, socket) do
    IO.inspect "4"
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    IO.inspect "no message"
    {:noreply, socket}
  end
end
