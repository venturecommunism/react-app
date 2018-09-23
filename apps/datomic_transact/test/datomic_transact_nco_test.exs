defmodule DatomicTransactNCOTest do
  use ExUnit.Case
  doctest DatomicTransact
  import Datomic.Channel
  require DatomicQuery

  setup do
    assert Application.get_env(:datomic_gen_server, :allow_datomic_mocking?) == true
    {status, _response} = DatomicQuery.mock
    assert status == :ok

    query = """
             [
              :find  ?casecode ?amount ?date ?phone ?firstname ?lastname

              :where [?e   :law/phone           ?phone]
                     [?e   :law/firstname       ?firstname]
                     [?e   :law/lastname        ?lastname]

                     [?e2  :law/person          ?e]
                     [?e2  :law/casecode        ?casecode]

                     [?e3  :law/person          ?e]
                     [?e3  :law/amount 		?amount]
                     [?e3  :law/date 		?date]

                     [?e4  :law/case            ?e2]
                     [?e4  :law/promisetopay 	"true"]
             ]
            """

    data_to_add = """ 
    [
      { :db/id "person1"
        :law/firstname "Firstnamington"
        :law/lastname "Lastnamingham"
        :law/email "thisemail@thatdomain.com"
        :law/phone "2125551111"
        :db/doc "An entry in the contacts list" 
      }

      { :db/id "case1"
        :law/person "person1"
        :law/casecode "XYZ-CASECODE"
        :db/doc "A case with a case code and an entry for a main contact"
      }

      { :db/id "person1balance"
        :law/amount "-800"
        :law/person "person1"
        :law/date "01/01/2000"
        :db/doc "A bank balance for someone in the contacts list"
      }

      { :db/id "phonecall1"
        :law/case "case1"
        :law/promisetopay "true"
        :description "This is some text notes on the phone call"
        :db/doc "A call in the phone call log"
      }
    ]
    """

    schema_to_add = """
      [
        { :db/ident       :law/person
          :db/valueType   :db.type/ref
          :db/cardinality :db.cardinality/one
          :db/doc         "Person/Contact" }

        { :db/ident       :law/case
          :db/valueType   :db.type/ref
          :db/cardinality :db.cardinality/one
          :db/doc         "Case" }

        { :db/ident       :law/firstname
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc         "First name of a person" }

        { :db/ident       :law/lastname
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc         "Last name of a person" }

        { :db/ident       :law/amount
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc         "Amount that was paid" }

        { :db/ident       :law/casecode
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/unique      :db.unique/identity
          :db/doc         "A unique case or project code" }

        { :db/ident       :law/nco
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/unique      :db.unique/identity
          :db/doc         "An NCO" }

        { :db/ident       :law/email
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/many
          :db/doc         "Email" }

        { :db/ident       :law/phone   
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/many
          :db/doc         "Phone number" }

        { :db/ident       :law/date
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc         "Date" }

        { :db/ident       :law/attorney 
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one 
          :db/doc         "Attorney" }

        { :db/ident       :law/promisetopay
          :db/valueType   :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc         "A promise to pay" }
      ]
    """

    {:ok, query: query, data_to_add: data_to_add, schema_to_add: schema_to_add}
  end

  test "valid mock connection transactions create schema data and inserts an entry", %{query: query, data_to_add: data_to_add, schema_to_add: schema_to_add} do
    {status, response} = DatomicTransact.transact(schema_to_add)

    assert status == :ok
    parsed_response = Exdn.to_elixir! response
    assert is_map(parsed_response)

    {status, _response} = DatomicTransact.transact(data_to_add)
    assert status == :ok

    {status, response} = DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
    assert status == :ok
    parsed_response = Exdn.to_elixir! response
    assert match?(%MapSet{}, parsed_response)
    assert MapSet.size(parsed_response) == 1
    list_parsed_response = MapSet.to_list(parsed_response)
assert list_parsed_response == "testoutput"
    assert length(list_parsed_response) == 1
    assert is_list(list_parsed_response)
  end

  test "that we can unmock the database" do
    {status, response} = DatomicQuery.unmock
    assert status == :ok
    assert response == :unmocked
  end
end
