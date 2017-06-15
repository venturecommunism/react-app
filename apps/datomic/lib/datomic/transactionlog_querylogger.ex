defmodule Datomic.TransactionLogQueryLogger do
  def parse(msg) do
    base_one = byte_size("\#{")
    <<_::binary-size(base_one), rest::binary>> = msg
    base_two = byte_size(rest) - byte_size("\}\n")
    <<inner::binary-size(base_two), _::binary>> = rest
    final_list = Exdn.to_elixir! "[" <> inner <> "]"
    MyLogQueryList.chopfirst(final_list)
  end
end

defmodule MyLogQueryList do
  def second([], list) do
    list
  end

  def second([ head | [] ], list) do
    list ++ [MyLogQuerySublistToMap.first(head)]
  end

  def second([ head | tail ], list) do
    newlist = list ++ [MyLogQuerySublistToMap.first(head)]
    second(tail, newlist)
  end

  def first([ head | tail ]) do
    newlist = [MyLogQuerySublistToMap.first(head)]
    second(tail, newlist)
  end

  def chopfirst([]) do
    []
  end

  def chopfirst([ _ | tail ]) do
    first(tail)
  end
end

defmodule MyLogQuerySublistToMap do
  def fifth([ head | [] ], map) do
    nextmap = %{"op" => head}
    Map.merge(map, nextmap)
  end

  def fourth([ head | tail ], map) do
    nextmap = %{"tx" => head}
    newmap = Map.merge(map, nextmap)
    fifth(tail, newmap)
  end

  def third([ head | tail ], map) do
    nextmap = %{"v" => head}
    newmap = Map.merge(map, nextmap)
    fourth(tail, newmap)
  end

  def second([ head | tail ], map) do
    nextmap = %{"a" => head}
    newmap = Map.merge(map, nextmap)
    third(tail, newmap)
  end

  def first([ head | tail ]) do
    newmap = %{"e" => head}
    second(tail, newmap)
  end
end

