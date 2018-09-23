defmodule DatomicImportTest do
  use ExUnit.Case
  doctest DatomicImport
  import Datomic.Channel
  require DatomicQuery
  require DatomicTransact

  test "transacting" do
    data = "this string"
IO.inspect    DatomicTransact.transact(data)
    assert 1 == 1
  end
end
