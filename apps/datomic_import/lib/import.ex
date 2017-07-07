defmodule DoStuff do
  some_edn = """
    [{
  """
  <>

  """
    :this that
  """

  <>
  """
    }]
  """

  reversible = Exdn.to_reversible some_edn
  IO.inspect reversible
  reversible

  # Link.start
  # resp = IO.inspect DatomicGenServer.transact(DatomicGenServerLink, edn, [:options, {:client_timeout, 100_000}])
end
