defmodule DatomicLinkTest do
  use ExUnit.Case
  doctest DatomicLink

  test "the truth" do
    {status, reply} = DatomicLink.start
    assert status == :ok
    assert is_pid(reply)
  end
end
