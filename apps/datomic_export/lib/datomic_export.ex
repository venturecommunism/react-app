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

    orderedcontents = Enum.sort_by(contents, fn [e, a, v, tx, added] ->
      {tx, added, e, a, v}
    end)
    |> Enum.chunk_by(fn [_, _, _, tx, _] ->
      tx
    end)

    IO.binwrite file, Poison.encode!(orderedcontents, pretty: true)
    File.close file
  end
end
