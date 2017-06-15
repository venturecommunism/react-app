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

  def first([], map) do
    IO.inspect Exdn.from_elixir! ([map])
  end

  def first([head | tail], map) do
    %{"v" => v, "a" => a} = head
    newmap = %{String.to_atom(a) => v}
    IO.puts '2nd newmap is'
    IO.inspect newmap
    nextmap = Map.merge(map, newmap)
    first(tail, nextmap)
  end

  def first([head | tail]) do
    %{"v" => v, "a" => a} = head
    newmap = %{String.to_atom(a) => v}
    IO.puts 'newmap is'
    IO.inspect newmap
    first(tail, newmap)
  end
end

