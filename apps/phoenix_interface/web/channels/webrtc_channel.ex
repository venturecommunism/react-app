defmodule PhoenixInterface.WebRtcChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:webrtc", _params, socket) do
    {:noreply, socket}
  end

  def handle_in("new:msg", %{"body" => %{"id" => id}, "user" => user}, socket) do
    IO.inspect "2"
    {:noreply, socket}
  end

  def handle_in("new:msg", msg, socket) do
    IO.inspect "no message"
    {:noreply, socket}
  end
end
