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

  test "valid mock queries do mock good things" do
#    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :description ?aname]]"
#    {status, response} = DatomicQuery.mock(query)
#    assert Application.get_env(:datomic_gen_server, :allow_datomic_mocking?) == true
#    assert status == :ok
#    assert is_binary(response)
#    parsed_response = Exdn.to_elixir! response
#    assert match?(%MapSet{}, parsed_response)
#    assert MapSet.size(parsed_response) == 255
#    list_parsed_response = MapSet.to_list(parsed_response)
#    IO.inspect list_parsed_response
#    assert is_list(list_parsed_response)
  end
end
