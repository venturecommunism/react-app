defmodule DatomicQueryTranslatorTest do
  use ExUnit.Case
  doctest DatomicQueryTranslator

  setup do
    subscription = [["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [(missing? $ ?e \"wait\")]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"status\" \"pending\"]\n                      [?e \"uuid\" ?uuid]\n                      [?e \"wait\" ?wait]\n                      [(get-else $ ?e \"confirmationid\" \"none\") ?confirmid]\n                      [(get-else $ ?e \"dat.sync.remote.db/id\" \"none\") ?remoteid]]"],["[:find ?desc ?date ?status ?uuid\n               :where [?e \"description\" ?desc]\n                      [?e \"entry\" ?date]\n                      [?e \"status\" ?status]\n                      [?e \"uuid\" ?uuid]]"],["[:find ?e ?e ?e ?desc\n               :where [?e ?attrib ?desc]]"]]
    {:ok, subscription: subscription}
  end

  test "translates a datascript query to a datomic query" do
    datascriptquery = """
      [:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?e
       :where [?e "description" ?desc]
              [?e "entry" ?date]
              [?e "status" ?status]
              [?e "status" "pending"]
              [?e "uuid" ?uuid]
              [(missing? $ ?e "wait")]
              [(get-else $ ?e ":confirmationid" "none") ?confirmid]
              [(get-else $ ?e "dat.sync.remote.db/id" "none") ?remoteid]]
    """
    datomicquery = """
      [:find ?desc ?date ?status ?uuid ?e
       :where [?e ":description" ?desc]
              [?e ":entry" ?date]
              [?e ":status" ?status]
              [?e ":status" "pending"]
              [?e ":uuid" ?uuid]
              [(missing? $ ?e ":wait")]]
    """
    _sortfields = "1,0"
    _sortorders = "DESC, ASC"
    _limit = 10
    {status, response} = DatomicQueryTranslator.translate(datascriptquery)
    assert status == :ok
    assert is_list(Exdn.to_elixir! datomicquery)
    assert is_list(Exdn.to_reversible datomicquery)
    assert response == Exdn.to_reversible datomicquery
  end

  test "translates a list of datascript queries starting with the first", %{subscription: subscription} do
#    IO.inspect Enum.at(Enum.at(subscription, 0), 0)
    {status, _response} = DatomicQueryTranslator.translate(Enum.at(Enum.at(subscription,0),0))
    assert status == :ok
#    IO.inspect _response
  end

  test "translate the second", %{subscription: subscription} do
    {status, _response} = DatomicQueryTranslator.translate(Enum.at(Enum.at(subscription,1),0))
    assert status == :ok
  end

  test "translate the third", %{subscription: subscription} do
    {status, _response} = DatomicQueryTranslator.translate(Enum.at(Enum.at(subscription,2),0))
    assert status == :ok
  end

  test "translate the fourth", %{subscription: subscription} do
    {status, _response} = DatomicQueryTranslator.translate(Enum.at(Enum.at(subscription,3),0))
    assert status == :ok
  end

  test "translate the first to datoms", %{subscription: subscription} do
    {status, _response} = DatomicQueryTranslator.translatetodatoms(Enum.at(Enum.at(subscription,3),0))
    assert status == :ok
  end
end
