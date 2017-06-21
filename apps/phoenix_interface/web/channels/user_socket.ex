defmodule PhoenixInterface.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "rooms:lobby", PhoenixInterface.UserChannel
  channel "rooms:datomic", PhoenixInterface.DatomicChannel
  channel "rooms:auth", PhoenixInterface.AuthChannel
  channel "rooms:webrtc", PhoenixInterface.WebRtcChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
