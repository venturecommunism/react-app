defmodule RecUnion do
  def recursiveunion([head | []]) do
    head
  end
  def recursiveunion([head | tail]) do
    MapSet.union(head, recursiveunion(tail))
  end
end

