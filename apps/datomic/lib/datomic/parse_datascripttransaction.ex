defmodule Datomic.ParseDatascriptTransaction do
  def first(arg) do
    IO.puts 'arg 1'
    IO.inspect arg
    newlist = ParseDatascriptSublistToMap.first(arg)
  end
end

defmodule ParseDatascriptSublistToMap do
  def second([head | tail], newmap) do
    IO.puts "head"
    IO.inspect head
    IO.inspect tail
    IO.inspect newmap
    newmap = %{"e" => head, "a" => ":db/doc"}
    # second(tail, newmap)
  end

  def first([], list) do
    IO.inspect Exdn.from_elixir! (list)
  end

  def first([], map) do
    IO.inspect Exdn.from_elixir! ([map])
  end

  def first([%{"e" => e, "a" => a, "v" => v, "tx" => tx, "added" => added} = head | tail], list) do
    case head do
      %{"added" => true} ->
        IO.puts "added was true"
        datom = [":db/add", e, String.to_atom(a), v]
      %{"added" => false} ->
        IO.puts "added was false"
        datom = [":db/retract", e, String.to_atom(a), v]
    end
    IO.puts "got another datom"
    first(tail, [datom] ++ list)
  end

  def first([head | tail], map) do
    %{"v" => v, "a" => a} = head
    newmap = %{String.to_atom(a) => v}
    IO.puts '2nd newmap is'
    IO.inspect newmap
    nextmap = Map.merge(map, newmap)
    first(tail, nextmap)
  end

  def first([%{"e" => e, "a" => a, "v" => v, "tx" => tx, "added" => added} = head | tail]) do
    case head do
      %{"added" => true} ->
        IO.puts "added was true"
        datom = [":db/add", e, String.to_atom(a), v]
      %{"added" => false} ->
        IO.puts "added was false"
        datom = [":db/retract", e, String.to_atom(a), v]
    end
    IO.puts "got first datom"
    first(tail, [datom])
  end

  def first([head | tail]) do
    %{"v" => v, "a" => a} = head
    newmap = %{String.to_atom(a) => v}
    IO.puts 'newmap is'
    IO.inspect newmap
    first(tail, newmap)
  end
end

