defmodule DatomicExportTest do
  use ExUnit.Case
  doctest DatomicExport

  test "greets the world" do
    assert DatomicExport.hello() == :world
  end
end
