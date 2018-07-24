defmodule TriplTest do
  use ExUnit.Case
  doctest Tripl

  test "greets the world" do
    assert Tripl.hello() == :world
  end
end
