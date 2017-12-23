defmodule WebAgentTest do
  use ExUnit.Case
  doctest WebAgent

  test "greets the world" do
    assert WebAgent.hello() == :world
  end
end
