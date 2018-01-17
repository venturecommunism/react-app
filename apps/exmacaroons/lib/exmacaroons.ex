defmodule Exmacaroons do
  def add(a,b) do
    case RustMacaroons.add(a,b) do
      {:ok, result} ->
        {:ok, result}
      {:error, err} ->
        {:error, err}
    end
  end

  def createtoken(a,b,c) do
    case RustMacaroons.createtoken(a,b,c) do
      {:ok, result} ->
        {:ok, result}
      {:error, err} ->
        {:error, err}
    end
  end
end
