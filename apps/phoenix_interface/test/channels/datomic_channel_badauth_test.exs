defmodule PhoenixInterface.BadAuthDatomicChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.AuthChannel
  alias PhoenixInterface.DatomicChannel

  setup do
    randomid = "FaceLazerHorse"
    IO.inspect "this has to be actually mocked to be a real mock subscription. otherwise schema could fail"
    mocksubscription = [
  [
    ["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"wait\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
     "[1, 0]", "[DESC, ASC]", 10],
    ["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"wait\" ?wait]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]",
     "[1, 0]", "[DESC, ASC]", 10]
  ],
  [
    ["[:find ?desc ?date ?status ?uuid\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"uuid\" ?uuid]]",
     "[2, 0]", "[DESC, ASC]", 10]
  ]
]


    {:ok, _, socket} =
      socket("user_id", %{some: :assign})
      |> subscribe_and_join(AuthChannel, "auth:" <> randomid)

    ref = push socket, "new:msg", %{"body" => %{"email" => System.get_env("SERVER_DB_EMAIL"), "password" => System.get_env("SERVER_DB_PASSWORD")}, "user" => randomid}
    assert_push "new:msg", %{jwt: jwt}, 5_000_000
    assert_push "join", %{status: "connected"}, 5_000_000
    assert_reply ref, :ok, %{msg: %{"user": _randomid}}

    badjwt = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJVc2VyOjIiLCJleHAiOjE1MjgwNzYyNTUsImlhdCI6MTUyNzgxNzA1NSwiaXNzIjoiUGhlb25peEF1dGgiLCJqdGkiOiJlNjczZGIxNS1lMWViLTQ1OTAtYWQzZC05ZjY4ZTFmYjRlZjUiLCJwZW0iOnt9LCJzdWIiOiJVc2VyOjIiLCJ0eXAiOiJ0b2tlbiJ9.jqB2PKPnquxUxWK6kLPTW9CMe_p0BnQbydgNgvWz0rtPvVXgysxpuT37jXoWjr80pPIybLosVxfCpJnbUKB5aQ"

    {:ok, socket: socket, randomid: randomid, jwt: jwt, badjwt: badjwt, subscription: mocksubscription}
  end

  test "successfully joins the data channel with good token", %{randomid: randomid, jwt: jwt, subscription: subscription} do
    {:ok, _reply, socket} = socket("user_id", %{some: :assign})
    |> subscribe_and_join(
      DatomicChannel,
      "datomic:" <> randomid,
      %{"guardian_token" => jwt}
    )

    ref = push socket, "new:msg", %{"body" => %{"syncpoint" => "none", "subscription" => subscription}, "user" => randomid}

    # this only looks for the first transaction
    IO.inspect "needs mock data in the event there aren't any transactions"
    assert_push "new:msg", %{"user" => "system", "body" => somedatoms}, 5_000_000

    assert is_list(somedatoms)
    Enum.map(somedatoms, fn(x) ->
      # not sure what to make these but this is the data structure right now
      assert !is_list(x)
      assert is_map(x)
    end)

    assert_push "join", %{status: "connected"}, 5_000_000
    assert_broadcast "new:msg", %{user: user, body: %{"syncpoint": false, "user": user}}, 5_000_000

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
