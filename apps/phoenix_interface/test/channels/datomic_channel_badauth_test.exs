defmodule PhoenixInterface.BadAuthDatomicChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.AuthChannel
  alias PhoenixInterface.DatomicChannel

  setup do
    randomid = "FaceLazerHorse"

    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(AuthChannel, "auth:" <> randomid)

    ref = push socket, "new:msg", %{"body" => %{"email" => System.get_env("SERVER_DB_EMAIL"), "password" => System.get_env("SERVER_DB_PASSWORD")}, "user" => randomid}
    assert_push "new:msg", %{jwt: jwt}, 5_000_000
    assert_push "join", %{status: "connected"}, 5_000_000
    assert_reply ref, :ok, %{msg: %{"user": _randomid}}

    badjwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjIiLCJleHAiOjE1MjgwNzYyNTUsImlhdCI6MTUyNzgxNzA1NSwiaXNzIjoiUGhlb25peEF1dGgiLCJqdGkiOiJlNjczZGIxNS1lMWViLTQ1OTAtYWQzZC05ZjY4ZTFmYjRlZjUiLCJwZW0iOnt9LCJzdWIiOiJVc2VyOjIiLCJ0eXAiOiJ0b2tlbiJ9.jqB2PKPnquxUxWK6kLPTW9CMe_p0BnQbydgNgvWz0rtPvVXgysxpuT37jXoWjr80pPIybLosVxfCpJnbUKB5aQ"

    {:ok, socket: socket, randomid: randomid, jwt: jwt, badjwt: badjwt}
  end

  test "successfully joins the data channel with good token", %{randomid: randomid, jwt: jwt} do
    {:ok, _reply, socket} = socket("user_id", %{some: :assign})
    |> subscribe_and_join(
      DatomicChannel,
      "datomic:" <> randomid,
      %{"guardian_token" => jwt}
    )

    ref = push socket, "new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => randomid}
    assert_reply ref, :ok, _something, 50_000_000
  end

  test "bad token", %{randomid: randomid, badjwt: badjwt} do
    {:error, reply} = socket("user_id", %{some: :assign})
    |> subscribe_and_join(
      DatomicChannel,
      "datomic:" <> randomid,
      %{"guardian_token" => badjwt}
    )

    assert reply == %{error: :invalid_token}
  end

  test "just claims, no token", %{randomid: randomid} do
    {:error, reply} = socket("user_id", %{some: :assign})
    |> subscribe_and_join(
      DatomicChannel,
      "datomic:" <> randomid,
      %{:claims => "claim1", :resource => "resource1"}
    )

    assert reply == %{reply: "missing JWT"}
  end
end
