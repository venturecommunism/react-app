defmodule DatomicQuery do
  import Datomic.Channel
  require Logger

  def query(query) do
    DatomicLink.start
    case DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}]) do
      {:ok, edn} ->
        {:ok, edn}
      {:error, response} ->
        Logger.debug response
        {:error, response}
    end
  end

  def mock do
    {_status, pid} = DatomicLink.start
    case DatomicGenServer.mock(pid, :somealias, [:options, {:client_timeout, 100_000}]) do
      {:ok, response} ->
#        DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
        {:ok, response}
      {:error, response} ->
        Logger.debug response
        {:error, response}
    end
  end

  def unmock do
    case DatomicGenServer.unmock(via_tuple("someproc"), [:options, {:client_timeout, 100_000}]) do
      {:ok, response} ->
#        DatomicGenServer.q(via_tuple("someproc"), query, [], [:options, {:client_timeout, 100_000}])
        {:ok, response}
      {:error, response} ->
        Logger.debug response
        {:error, response}
    end
  end
end
