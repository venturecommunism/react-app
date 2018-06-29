defmodule PhoenixInterface.DatomicChannelTest do
  use PhoenixInterface.ChannelCase

  alias PhoenixInterface.AuthChannel
  alias PhoenixInterface.DatomicChannel

  setup do
    randomid = "GirlLazerGirl"

    subscription = System.get_env("TEST_SUBSCRIPTION")
    subscription = [["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"wait\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"wait\" ?wait]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid\n               :where [?e \"description\" ?desc]\n                      [?e \"date\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"uuid\" ?uuid]]"],["[:find ?e ?e ?e ?desc\n               :where [?e ?attrib ?desc]]"]]

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

    {:ok, socket: socket, randomid: randomid, subscription: subscription}
  end

  test "new:msg syncs and fetches data", %{socket: socket, randomid: randomid, subscription: subscription} do
    ref = push socket, "new:msg", %{"body" => %{"syncpoint" => "none", "subscription" => subscription}, "user" => randomid}
    assert_reply ref, :ok, _something, 50_000_000
  end
end
