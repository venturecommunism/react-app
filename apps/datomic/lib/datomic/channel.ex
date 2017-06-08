defmodule Datomic.Channel do
  def join(socket) do
    DatomicGenServer.start_link(
      "datomic:free://localhost:4334/responsive-db-2",
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )
    {:ok, socket}
  end
end

