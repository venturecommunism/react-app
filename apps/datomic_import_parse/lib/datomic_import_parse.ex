defmodule ImportData do
  def stringit(arg) when is_list(arg) do
    case Enum.count(arg) do
      1 ->
        [head | _tail] = arg
        ~s("#{head}")
      _ ->
      case Enum.find_value(arg, "no floats", &is_float/1) do
        _ ->
    #      List.to_string Enum.map(arg, fn(x) -> ~s(\"#{x}\") end)
          Enum.join(Enum.map(arg, fn(x) -> ~s("#{x}") end), " ")
        _ ->
          List.to_string Enum.map(arg, fn(x) -> Float.to_string x end)
      end
    end
  end

  def parse([], inc) do
    IO.inspect inc
    IO.puts "stop"
  end

  def parse(list, inc) do
    Process.sleep(10)
    [{id, record} | tail] = list
    IO.puts "the id:"
    IO.inspect id
    IO.puts "the record:"
    list = Enum.map(record, fn({x,y}) -> IO.inspect ~s(:#{x} #{ImportData.stringit y}) end)
    join = Enum.join(list, " ")
    data_to_add = ~s([{ #{join} }])

    IO.inspect "adding data"
    IO.inspect {:ok, _transaction_result} = DatomicTransact.transact(data_to_add)
    IO.puts "END"
    ImportData.parse(tail, inc + 1)
  end
end

defmodule DatomicImportParse do
  DatomicLink.start
  {:ok, json} = ConvertJson.get_json("output-linted.json")
  IO.puts "starting"
  Process.sleep(2000)
  ImportData.parse(Map.to_list(json), 0)
end
