defmodule NifNotLoadedError do
  defexception message: "nif not loaded"
end

defmodule RustMacaroons do
  use Rustler, otp_app: :exmacaroons, crate: "rustmacaroons"

  def add(_a,_b), do: err()

  defp err() do
    throw NifNotLoadedError
  end
end

