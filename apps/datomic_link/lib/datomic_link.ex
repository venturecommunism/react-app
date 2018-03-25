defmodule DatomicLink do
  def start do
    DatomicGenServer.start_link(
      Application.get_env(:datomic, :database),
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:name, DatomicGenServerLink}]
    )
  end
end
