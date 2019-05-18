defmodule Datomic.ParseDatascriptTransaction do
  require Logger

  def first([[":db/retract"|_it]|_t] = list) do
    confirmationline = Enum.find(list, fn(element) ->
      match?([_, _, "confirmationid", _], element)
    end)

IO.puts "confirmationline"
IO.inspect confirmationline

    List.delete(list, confirmationline)
    |> Enum.map(fn from_client ->
      # add an initial ":" for datomic since it's not used in datascript
      [op, idifier, key, val] = from_client
      if String.starts_with?(key, ":"), do: [op, idifier, key, val], else: [op, idifier, ":" <> key, val]
    end)
    |> Enum.map(fn from_client ->
      # add an initial ":" for datomic since it's not used in datascript
      [op, [idifierkey, idifier], key, val] = from_client
      if String.starts_with?(idifierkey, ":"), do: [op, [idifierkey, idifier], key, val], else: [op, [":" <> idifierkey, idifier], key, val]
    end)
    |> Exdn.from_elixir!
  end

  def first(arg) do
    IO.puts "incoming"
    IO.inspect arg

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
