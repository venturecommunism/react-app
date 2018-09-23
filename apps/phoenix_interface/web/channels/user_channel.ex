defmodule PhoenixInterface.UserChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:lobby", _params, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", msg, socket) do
    {:noreply, socket}
  end
end
