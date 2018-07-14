defmodule DatomicUtilsTest do
  use ExUnit.Case
  doctest DatomicUtils

  test "greets the world" do
    assert DatomicUtils.hello() == :world
  end
end
