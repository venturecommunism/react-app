defmodule PhoenixInterface.UserChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:lobby", _params, socket) do
    Datomic.Channel.join(socket)
  end

  def handle_in("new:msg", %{"body" => %{"email" => email, "password" => password}, "user" => user}, socket) do
    IO.puts "EMAIL & PASSWORD"
    IO.inspect email
    IO.inspect password

    case Auth.Session.authenticate(%{"email" => email, "password" => password}) do
      {:ok, user} ->
        IO.puts "signing in.."
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)

      :error ->
        IO.puts "error signing in..."
        :error
    end

    push socket, "join", %{status: "connected"}
    push socket, "new:msg", %{user: user, body: %{"user": user, "jwt": jwt}}
    broadcast! socket, "new:msg", %{user: user, body: %{"user": user}}
    {:reply, {:ok, %{msg: %{"user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", %{"body" => %{"id" => id}, "user" => user}, socket) do
  end

  def handle_in("new:msg", %{"body" => %{"syncpoint" => "none"}, "user" => user}, socket) do
  end

  def handle_in("new:msg", %{"body" => %{"data" => data, "meta" => meta}, "user" => user}, socket) do
  end

  def handle_in("new:msg", msg, socket) do
  end
end
