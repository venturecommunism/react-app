defmodule Link do
  def start do
    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db-3",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )
  end
end
