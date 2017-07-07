{:ok, json} = ConvertJson.get_json("test.json")
[{_id, record}] = Map.to_list(json)

# IO.inspect record

stringit = fn arg when is_list(arg) ->
  case Enum.find_value(arg, "no floats", &is_float/1) do
    "no floats" ->
      List.to_string arg
    _ ->
      List.to_string Enum.map(arg, fn(x) -> Float.to_string x end)
  end
end

Enum.map(record, fn({x,y}) -> IO.inspect ":"<>x<>" ["<>stringit.(y)<>"]" end)

