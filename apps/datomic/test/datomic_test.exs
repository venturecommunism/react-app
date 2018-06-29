defmodule DatomicTest do
  use ExUnit.Case
  doctest Datomic

  setup do
    socket = %{topic: "faketopic"}
    randomid = "LazerFaceGirl"
    subscription = System.get_env("TEST_SUBSCRIPTION")
    subscription = [["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"wait\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"wait\" ?wait]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"uuid\" ?uuid]]"]]
    {:ok, socket: socket, randomid: randomid, subscription: subscription}
  end

  test "turns a list of queries into a sync/subscribe", %{socket: socket, randomid: randomid, subscription: subscription} do
    {status, response} = Datomic.Channel.join(socket, randomid)
    assert status == :ok
    assert is_map(response)

    edn = Datomic.Channel.sync("none", subscription, socket)
    assert is_map(edn)
  end
end
