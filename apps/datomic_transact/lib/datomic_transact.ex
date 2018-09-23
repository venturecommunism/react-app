import Datomic.Channel

defmodule DatomicTransact do
  def transact(data_to_add) do
    DatomicGenServer.transact(via_tuple("someproc"), data_to_add, [:options, {:client_timeout, 100_000}])
  end
end
