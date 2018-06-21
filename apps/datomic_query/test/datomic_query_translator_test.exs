defmodule DatomicQueryTranslatorTest do
  use ExUnit.Case
  doctest DatomicQuery

  test "translates a datascript query to a datomic query" do
    datascriptquery = """
      [:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?u
       :where [?u "description" ?desc]
              [?u "entry" ?date]
              [?u "status" ?status]
              [?u "status" "pending"]
              [?u "uuid" ?uuid]
              [(missing? $ ?u "wait")]
              [(get-else $ ?u ":confirmationid" "none") ?confirmid]
              [(get-else $ ?u "dat.sync.remote.db/id" "none") ?remoteid]]
    """
    datomicquery = """
      [:find ?desc ?date ?status ?uuid ?u
       :where [?u ":description" ?desc]
              [?u ":entry" ?date]
              [?u ":status" ?status]
              [?u ":status" "pending"]
              [?u ":uuid" ?uuid]
              [(missing? $ ?u ":wait")]]
    """
    _sortfields = "1,0"
    _sortorders = "DESC, ASC"
    {status, response} = DatomicQuery.Translator.translate(datascriptquery)
    assert status == :ok
    assert is_list(Exdn.to_elixir! datomicquery)
    assert is_list(Exdn.to_reversible datomicquery)
    assert response == Exdn.to_reversible datomicquery
  end
end
