defmodule PhoenixInterface.AuthChannel do
  use PhoenixInterface.Web, :channel
  use Auth.Channel

  def join("rooms:auth", _params, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", %{"body" => %{"email" => email, "password" => password}, "user" => user}, socket) do
    IO.puts "authenticate"
    case Auth.Session.authenticate(%{"email" => email, "password" => password}) do
      {:ok, user} ->
        IO.puts "signing in.."
        :ok

      :error ->
        IO.puts "error signing in..."
        :error
    end

    push socket, "join", %{status: "connected"}
    {:reply, {:ok, %{msg: %{"user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", msg, socket) do
    {:noreply, socket}
  end
end
