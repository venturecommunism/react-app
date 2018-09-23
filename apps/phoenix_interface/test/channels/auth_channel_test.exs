defmodule PhoenixInterface.AuthChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.AuthChannel

  setup do
    randomid = "GirlLazerGirl"

    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(AuthChannel, "auth:" <> randomid)

    {:ok, socket: socket, randomid: randomid}
  end

  test "new:msg incorrect password does not log in to auth", %{socket: socket, randomid: randomid} do
    ref = push socket, "new:msg", %{"body" => %{"email" => "someone@wrongdomain.com", "password" => "badpassword"}, "user" => randomid}
    assert_reply ref, :error, _msg, 5_000_000
  end

  test "new:msg correct password logs in to auth", %{socket: socket, randomid: randomid} do
    ref = push socket, "new:msg", %{"body" => %{"email" => System.get_env("SERVER_DB_EMAIL"), "password" => System.get_env("SERVER_DB_PASSWORD")}, "user" => randomid}
    assert_push "new:msg", %{jwt: _jwt}, 5_000_000
    assert_push "join", %{status: "connected"}, 5_000_000
    assert_reply ref, :ok, %{msg: %{"user": _randomid}}
  end
end
