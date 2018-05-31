defmodule PhoenixInterface.DatomicChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.DatomicChannel

  setup do
    randomid = "GirlLazerGirl"

    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(DatomicChannel, "datomic:" <> randomid)

    {:ok, socket: socket, randomid: randomid}
  end

  test "new:msg does something", %{socket: socket, randomid: randomid} do
    ref = push socket, "new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => randomid}
    assert_reply ref, :ok, _something, 50_000_000
  end
end
