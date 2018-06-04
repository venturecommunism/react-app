defmodule DatomicTransactTest do
  use ExUnit.Case
  doctest DatomicTransact
  import Datomic.Channel
  require DatomicQuery

  setup do
    assert Application.get_env(:datomic_gen_server, :allow_datomic_mocking?) == true
    {status, response} = DatomicQuery.mock
    assert status == :ok
    assert response == :somealiasthingie
    :ok
  end

  test "valid mock connection queries do mock good things" do
    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :description ?aname]]"
    {status, response} = DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
    assert status == :ok
    parsed_response = Exdn.to_elixir! response
    assert match?(%MapSet{}, parsed_response)
    assert MapSet.size(parsed_response) == 255
    list_parsed_response = MapSet.to_list(parsed_response)
    assert length(list_parsed_response) == 255
    assert is_list(list_parsed_response)
  end

  test "valid mock connection transactions create data" do
    data_to_add = "[{ :description \"test out a description for datomock\" }]"
    DatomicTransact.transact(data_to_add)

    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :description ?aname]]"
    {status, response} = DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
    assert status == :ok
    parsed_response = Exdn.to_elixir! response
    assert match?(%MapSet{}, parsed_response)
    assert MapSet.size(parsed_response) == 256
    list_parsed_response = MapSet.to_list(parsed_response)
    assert length(list_parsed_response) == 256
    assert is_list(list_parsed_response)
  end

  test "that we can unmock the database" do
    {status, response} = DatomicQuery.unmock
    assert status == :ok
    assert response == :unmocked
  end

  test "that the number of elements is back to where it was" do
    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :description ?aname]]"
    {status, response} = DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
    assert status == :ok
    parsed_response = Exdn.to_elixir! response
    assert match?(%MapSet{}, parsed_response)
    assert MapSet.size(parsed_response) == 255
    list_parsed_response = MapSet.to_list(parsed_response)
    assert length(list_parsed_response) == 255
    assert is_list(list_parsed_response)
  end
end
