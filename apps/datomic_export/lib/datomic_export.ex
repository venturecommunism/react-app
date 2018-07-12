defmodule DatomicExport do
  def export do
    query = """
    [:find ?e ?aname    ?v     ?tx ?op
     :where 
          [?e ?a        ?v     ?tx ?op]
          [?a :db/ident ?aname]
    ]
    """
    {:ok, contents} = DatomicQuery.query(query)
    {:ok, file} = File.open "priv/files/export.txt", [:write]
    IO.binwrite file, contents
    File.close file
  end
end
