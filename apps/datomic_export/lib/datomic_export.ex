defmodule DatomicExport do
  def export do
    filename = "export.txt"
    export(filename)
  end

  def export(filename) do
    query = """
    [:find ?e ?aname    ?v     ?tx ?op
     :where 
          [?e ?a        ?v     ?tx ?op]
          [?a :db/ident ?aname]
    ]
    """
    {:ok, contents} = DatomicQuery.query(query)

    fullpath = "priv/files/" <> filename
    {:ok, file} = File.open fullpath, [:write]

    elixir_contents = Exdn.to_reversible contents
    orderedcontents = Enum.sort_by(elixir_contents, fn [e, a, v, tx, added] ->
      {tx, added, e, a, v}
    end)
    |> Enum.chunk_by(fn [_, _, _, tx, _] ->
      tx
    end)

    somethinghead = Enum.at(orderedcontents, 0)
IO.inspect somethinghead
#IO.inspect orderedcontents

#    IO.binwrite file, Poison.encode!(orderedcontents, pretty: true)
    IO.binwrite file, contents
    File.close file
  end
end
