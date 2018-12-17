defmodule DatomicQueryTranslator do
  def translatetosince(query_list, username) do
    datomic_query = rejoined(since_cleanupfind(splitwithclauses(splitwhere(Exdn.to_reversible query_list)), username))
    {:ok, datomic_query}
  end
  def translatetocurrentstate(query_list) do
    datomic_query = rejoined(currentstate_cleanupfind(splitwithclauses(splitwhere(Exdn.to_reversible query_list))))
    {:ok, datomic_query}
  end

  def translatetodatoms(query_list) do
    datomic_query = rejoined(datoms_cleanupfind(splitwithclauses(splitwhere(Exdn.to_reversible query_list))))
    {:ok, datomic_query}
  end

  def translate(query_list) do
    # spwh = splitwhere(Exdn.to_reversible query_list)
    # _reversed_datascript_query = Enum.concat(elem(spwh, 0), elem(spwh, 1))

    datomic_query = rejoined(cleanupfind(splitwithclauses(splitwhere(Exdn.to_reversible query_list))))
    {:ok, datomic_query}
  end

  defp splitwhere(query_list) do
    wherepos = query_list
    |> Enum.find_index(fn(x) -> x == :where end)

    Enum.split(query_list, wherepos)
  end

  defp splitwithclauses(splitbywhere) do
    splitwclauses = Enum.split_with(elem(splitbywhere, 1), fn(x) -> useorrejectwhere(x) end)
    {elem(splitbywhere, 0), elem(splitwclauses, 0), elem(splitwclauses, 1)}
  end

  defp cleanupfind(argsplitwithclauses) do
    splitwclauses = Enum.split_with(elem(argsplitwithclauses, 0), fn(x) -> !useorrejectfind(x) end)
    mappedfind = Enum.map(elem(argsplitwithclauses, 2), fn(x) -> processwhereclause(x) end)
    {elem(splitwclauses, 0), mappedfind, elem(splitwclauses, 1)}
  end

  defp since_cleanupfind(argsplitwithclauses, username) do
    splitwclauses = Enum.split_with(elem(argsplitwithclauses, 0), fn(x) -> !useorrejectfind(x) end)
    mappedfind = Enum.map(elem(argsplitwithclauses, 2), fn(x) -> processwhereclause(x) end)
    atomswclauses = [:find, {:symbol, :"?e"}, {:symbol, :"?aname"}, {:symbol, :"?v"}, {:symbol, :"?tx"}, {:symbol, :"?op"}, :in, {:symbol, :"$"}, {:symbol, :"$since"}]

    read_permissions = [[{:symbol, :"?e"}, ":group", {:symbol, :"?some_group_uuid"}], [{:symbol, :"?oo2"}, ":members", username], [{:symbol, :"?oo2"}, ":id", {:symbol, :"?some_group_uuid"}]]

    newmappedfind = mappedfind ++ read_permissions ++ [[{:symbol, :"$since"}, {:symbol, :"?e"}, {:symbol, :"?a"}, {:symbol, :"?v"}, {:symbol, :"?tx"}, {:symbol, :"?op"}]] ++ [[{:symbol, :"$"}, {:symbol, :"?a"}, {:symbol, :"db/ident"}, {:symbol, :"?aname"}]]
    {atomswclauses, newmappedfind, elem(splitwclauses, 1)}
  end

  defp datoms_cleanupfind(argsplitwithclauses) do
    splitwclauses = Enum.split_with(elem(argsplitwithclauses, 0), fn(x) -> !useorrejectfind(x) end)
    mappedfind = Enum.map(elem(argsplitwithclauses, 2), fn(x) -> processwhereclause(x) end)
    atomswclauses = [:find, {:symbol, :"?e"}, {:symbol, :"?aname"}, {:symbol, :"?v"}, {:symbol, :"?tx"}, {:symbol, :"?op"}]
    newmappedfind = mappedfind ++ [{:symbol, :"?e"}, {:symbol, :"?a"}, {:symbol, :"?v"}, {:symbol, :"?tx"}, {:symbol, :"?op"}] ++ [{:symbol, :"?a"}, {:symbol, :"db/ident"}, {:symbol, :"?aname"}]
    {atomswclauses, newmappedfind, elem(splitwclauses, 1)}
  end

  defp currentstate_cleanupfind(argsplitwithclauses) do
    splitwclauses = Enum.split_with(elem(argsplitwithclauses, 0), fn(x) -> !useorrejectfind(x) end)
    mappedfind = Enum.map(elem(argsplitwithclauses, 2), fn(x) -> processwhereclause(x) end)
    atomswclauses = [:find, {:symbol, :"?e"}, {:symbol, :"?aname"}, {:symbol, :"?v"}]
    newmappedfind = mappedfind ++ [[symbol: :"?e", symbol: :"?a", symbol: :"?v"]] ++ [[symbol: :"?a", symbol: :"db/ident", symbol: :"?aname"]]
    {atomswclauses, newmappedfind, elem(splitwclauses, 1)}
  end

  defp processwhereclause([{:symbol, symbol} | last]) do
    [{:symbol, symbol} | processsecondinwhereclause(last)]
  end

  defp processwhereclause([list: clause]) do
    [list: specialclause(clause)]
  end

  defp processwhereclause(list) do
    list
  end

  defp specialclause([{:symbol, :missing?} | missingclause]) do
    [{:symbol, :missing?} | missingclause(missingclause)]
  end

  defp missingclause([{:symbol, database}, {:symbol, attribute}, string]) when is_binary(string) do
    [{:symbol, database}, {:symbol, attribute}, ":" <> string]
  end

  defp processsecondinwhereclause([first | last]) when is_binary(first) do
    [addcolontostring(first) | last]
  end

  defp processsecondinwhereclause([first | last]) do
    [first | last]
  end

  defp addcolontostring(x) when is_binary(x) do
    ":" <> x
  end

  defp addcolontostring(x) do
    x
  end

  defp rejoined(cleanupfind) do
    Enum.concat(elem(cleanupfind, 0), elem(cleanupfind, 1))
  end

  defp useorrejectfind({:symbol, :"?confirmid"}) do
    :true
  end

  defp useorrejectfind({:symbol, :"?remoteid"}) do
    :true
  end

  defp useorrejectfind(_anythingelse) do
    :false
  end

  defp useorrejectwhere([list: [{:symbol, :"get-else"}, {:symbol, :"$"}, {:symbol, :"?e"}, ":confirmationid", "none"], symbol: :"?confirmid"]) do
    :true
  end

  defp useorrejectwhere([list: [{:symbol, :"get-else"}, {:symbol, :"$"}, {:symbol, :"?e"}, "confirmationid", "none"], symbol: :"?confirmid"]) do
#    IO.puts "doesn't have a semi-colon"
    :true
  end

  defp useorrejectwhere([list: [{:symbol, :"get-else"}, {:symbol, :"$"}, {:symbol, :"?e"}, "dat.sync.remote.db/id", "none"], symbol: :"?remoteid"]) do
    :true
  end

  defp useorrejectwhere(_anythingelse) do
    :false
  end
end

