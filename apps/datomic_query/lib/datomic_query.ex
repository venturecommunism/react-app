defmodule DatomicQuery do
  IO.inspect "hello"
  IO.inspect DatomicLink.start


  query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :db/doc ?aname]]"

#  {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
  {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
  IO.puts edn
end
