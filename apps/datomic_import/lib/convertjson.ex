defmodule ConvertJson do
  def get_json(filename) do
    with {:ok, body} <- File.read(filename),
         json <- Poison.Parser.parse!(body), do: {:ok, json}
    else
      err -> IO.inspect err
  end
end

