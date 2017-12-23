defmodule PhoenixInterface.AuthChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:auth", _params, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", %{"body" => %{"email" => email, "password" => password}, "user" => user}, socket) do
    IO.puts "authenticate"
    case Auth.Session.authenticate(%{"email" => email, "password" => password}) do
      {:ok, user} ->
        IO.puts "signing in..."
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)
        IO.inspect jwt
        :ok

      :error ->
        IO.puts "error signing in..."
        IO.puts "Did you remember to do 'mix run priv/repo/seeds.exs' from the apps/auth directory?"
        :error
    end

    push socket, "new:msg", %{jwt: jwt}
    push socket, "join", %{status: "connected"}
    {:reply, {:ok, %{msg: %{"user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", msg, socket) do
    {:noreply, socket}
  end
end
