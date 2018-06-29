defmodule DatomicQueryTest do
  use ExUnit.Case
  doctest DatomicQuery

  test "valid queries do good things" do
    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :description ?aname]]"
    {status, response} = DatomicQuery.query(query)
    assert status == :ok
    assert is_binary(response)
  end

  test "invalid queries do bad things" do
    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a v ?tx ?op] [?e :description ?aname]]"
    {status, response} = DatomicQuery.query(query)
    assert status == :error
    assert is_binary(response)
  end

  test "datoms query" do
    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"
    {status, response} = DatomicQuery.query(query)
    assert status == :ok
    assert is_binary(response)
  end

  test "datoms query filtered by some other query" do
    query = """
             [:find ?e ?aname ?v ?tx ?op
              :where [?e ?a ?v ?tx ?op]
                     [?a :db/ident ?aname]
                     [?e ":description" ?desc]
                     [?e ":entry" ?date]
                     [?e ":status" ?status]
                     [?e ":status" "pending"]
                     [?e ":uuid" ?uuid]
                     [(missing? $ ?e ":wait")]]
    """
    {status, response} = DatomicQuery.query(query)
    assert status == :ok
    assert is_binary(response)
  end

  test "inbox query" do
    _datascriptquery = """
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
    query = """
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
    _limit = 10
    {status, response} = DatomicQuery.query(query)
    assert status == :ok
    assert is_binary(response)
  end

  test "somedaymaybe query" do
    _datascriptquery = """
      [:find ?desc ?date ?status ?uuid ?confirmid ?remoteid ?wait
       :where [?u "description" ?desc]
              [?u "entry" ?date]
              [?u "status" ?status]
              [?u "status" "pending"]
              [?u "uuid" ?uuid]
              [?u "wait" ?wait]
              [(get-else $ ?u "confirmationid" "none") ?confirmid]
              [(get-else $ ?u "dat.sync.remote.db/id" "none") ?remoteid]]
    """
    query = """
      [:find ?desc ?date ?status ?uuid ?wait
       :where [?u ":description" ?desc]
              [?u ":entry" ?date]
              [?u ":status" ?status]
              [?u ":status" "pending"]
              [?u ":uuid" ?uuid]
              [?u ":wait" ?wait]]
    """
    _sortfields = "1,0"
    _sortorders = "DESC, ASC"
    _limit = 10
    {status, response} = DatomicQuery.query(query)
    assert status == :ok
    assert is_binary(response)
  end
end
