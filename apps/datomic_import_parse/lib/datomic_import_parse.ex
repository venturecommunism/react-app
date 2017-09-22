defmodule ImportData do
IO.puts "test"
  def stringit(arg) when is_list(arg) do
    IO.puts "beginning stringit"
    IO.inspect arg

    case Enum.count(arg) do
      1 ->
        [head | _tail] = arg
          case head do
            head when is_number(head) ->
              ~s("#{head}")
            _ ->
IO.puts "CONDITION ONE"
IO.inspect        ~s("#{head}")
IO.inspect        hopefullygettingridofescapeproblems = Exdn.from_elixir! head
IO.inspect hopefullygettingridofescapeproblems === ~s("#{head}")
   #     Process.sleep(1000)
        ~s("#{head}")
        ~s(#{hopefullygettingridofescapeproblems})
        end
      _ ->
      case Enum.find_value(arg, "no floats", &is_float/1) do
        _ ->
IO.puts "CONDITION TWO"
          # List.to_string Enum.map(arg, fn(x) -> ~s(\"#{x}\") end)
          "["<>Enum.join(Enum.map(arg, fn(x) -> ~s("#{x}") end), " ")<>"]"
        _ ->
IO.puts "CONDITION THREE"
          List.to_string Enum.map(arg, fn(x) -> Float.to_string x end)
      end
    end
  end

  def fixit(arg) do
    case arg do
      "_id" ->
        fixit("id")
      "__context" ->
        fixit("jsonldcontext")
      _ ->
        IO.inspect arg
    end
  end

  def parse([], inc) do
    IO.inspect inc
    IO.puts "stop"
  end

  def convert_to_datomic({x,y}) do
    case x do
      "tags" ->
        IO.puts "Caught tags"
        IO.inspect ~s(:#{ImportData.fixit x} #{ImportData.stringit y})
      "contextaor" ->
        IO.puts "Caught contextaor"
        IO.inspect ~s(:#{ImportData.fixit x} #{ImportData.stringit y})
      _ ->
        IO.inspect ~s(:#{ImportData.fixit x} #{ImportData.stringit y})
    end
  end

# fn({x,y}) -> IO.inspect ~s(:#{ImportData.fixit x} #{ImportData.stringit y}) end

  def parse(list, inc) do
    [{id, record} | tail] = list

    case id do
      "db.cardinality:default" ->
        ImportData.parse(tail,inc)
      ":db:cardinality" ->
        ImportData.parse(tail,inc)
      "db.refs:lazy" ->
        ImportData.parse(tail,inc)
      "db:cardinality" ->
        ImportData.parse(tail,inc)
      "db.schema:types" ->
        ImportData.parse(tail,inc)
      "db:schema" ->
        ImportData.parse(tail,inc)
      "db:valueType" ->
        ImportData.parse(tail,inc)
      "db.schema:attributes" ->
        IO.inspect inc
        Process.sleep(2000)
        ImportData.parse(tail,inc)
      _ ->
    IO.puts "the id:"
    IO.inspect id
    IO.puts "the record:"
#    list = Enum.map(record, fn({x,y}) -> IO.inspect ~s(:#{ImportData.fixit x} #{ImportData.stringit y}) end)
    list = Enum.map(record, fn({x, y}) -> IO.inspect convert_to_datomic({x,y}) end)
    join = Enum.join(list, " ")
    data_to_add = ~s([{ #{join} }])
    
    IO.puts "data to add:"
    IO.inspect data_to_add
    IO.inspect "adding data"
    IO.inspect {:ok, _transaction_result} = DatomicTransact.transact(data_to_add)
    IO.puts "END"
    ImportData.parse(tail, inc + 1)
  end
  end
end

defmodule DatomicImportParse do
  DatomicLink.start
  {:ok, json} = ConvertJson.get_json("output-linted.json")
  IO.puts "starting"
  ImportData.parse(Map.to_list(json), 0)
end
