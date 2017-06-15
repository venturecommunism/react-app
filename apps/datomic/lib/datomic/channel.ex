defmodule Datomic.Channel do
  def join(socket) do
    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db-2",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )
    {:ok, socket}
  end

  def sync(latext_tx, socket) do
    IO.puts "MSG FALSE"

    query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?a :db/ident ?aname]]"

#    {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
    IO.puts edn
    grouped_tx = Datomic.TransactionLogQueryLogger.parse(edn) |> Enum.group_by( fn(x) -> x["tx"] end )
  end
end

