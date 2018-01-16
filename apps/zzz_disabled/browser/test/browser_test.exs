defmodule BrowserTest do
  use ExUnit.Case
  doctest Browser

  test "greets the world" do
    assert Browser.hello() == :world
  end
end
