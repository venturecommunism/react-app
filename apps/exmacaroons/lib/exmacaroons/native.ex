defmodule NifNotLoadedError do
  defexception message: "nif not loaded"
end

defmodule RustMacaroons do
  use Rustler, otp_app: :exmacaroons, crate: "rustmacaroons"

  def add(_a,_b), do: err()

  def createtoken(_a,_b,_c), do: err()

  defp err() do
    throw NifNotLoadedError
  end
end

