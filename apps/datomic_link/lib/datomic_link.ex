defmodule DatomicLink do
  import Datomic.Channel

  def start do
    DatomicGenServer.start_link(
      Application.get_env(:datomic, :database),
      true,
      [{:timeout, 20_000}, {:default_message_timeout, 20_000}, {:registry, via_tuple("someproc")}]
    )
  end
end
