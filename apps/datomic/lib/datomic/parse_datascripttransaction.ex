defmodule Datomic.ParseDatascriptTransaction do
  require Logger

  def first(arg) do
    Enum.map(arg, fn from_client ->
      # delete keys from the client
      from_client = Map.delete(from_client, "confirmationid")
      |> Map.delete(":db/id")

      # add an initial ":" for datomic since it's not used in datascript
      from_client = for {key, val} <- from_client, into: %{} do
        if String.starts_with?(key, ":"), do: {key, val}, else: {":" <> key, val}
      end
    end)
    |> Exdn.from_elixir!
  end
end
