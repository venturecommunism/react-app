defmodule PhoenixInterface.DatomicChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.AuthChannel
  alias PhoenixInterface.DatomicChannel

  setup do
    randomid = "GirlLazerGirl"

    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(AuthChannel, "auth:" <> randomid)

    ref = push socket, "new:msg", %{"body" => %{"email" => System.get_env("SERVER_DB_EMAIL"), "password" => System.get_env("SERVER_DB_PASSWORD")}, "user" => randomid}
    assert_push "new:msg", %{jwt: jwt}, 5_000_000
    assert_push "join", %{status: "connected"}, 5_000_000
    assert_reply ref, :ok, %{msg: %{"user": _randomid}}

    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(DatomicChannel, "datomic:" <> randomid, %{"guardian_token" => jwt})

    {:ok, socket: socket, randomid: randomid}
  end

  test "new:msg syncs and fetches data", %{socket: socket, randomid: randomid} do
    ref = push socket, "new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => randomid}
    assert_reply ref, :ok, _something, 50_000_000
  end
end
