defmodule DatomicQuery do
  DatomicLink.start

  query = "[:find ?e ?aname ?v ?tx ?op :where [?e ?a ?v ?tx ?op] [?e :project ?aname]]"

#  {:error, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
  {:ok, edn} = DatomicGenServer.q(DatomicGenServerLink, query, [], [:options, {:client_timeout, 100_000}])
  edn
end
