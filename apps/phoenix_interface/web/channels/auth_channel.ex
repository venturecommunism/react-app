defmodule PhoenixInterface.AuthChannel do
  use PhoenixInterface.Web, :channel
  require Logger

  def join("auth:" <> _user_unique_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("new:msg", %{"body" => %{"email" => email, "password" => password}, "user" => _user}, socket) do
    Logger.debug "authenticate"
    case Auth.Session.authenticate(%{"email" => email, "password" => password}) do
      {:ok, user} ->
        Logger.info "signing in..."
        {:ok, jwt, _full_claims} = user |> Guardian.encode_and_sign(:token)
        Logger.debug fn -> jwt end
        push socket, "new:msg", %{jwt: jwt}
        push socket, "join", %{status: "connected"}
        {:reply, {:ok, %{msg: %{"user": user}}}, assign(socket, :user, user)}

      :error ->
        Logger.warn "error signing in..."
        Logger.warn "Did you remember to do 'mix run priv/repo/seeds.exs' from the apps/auth directory?"
        {:reply, {:error, %{msg: %{}}}, socket}
    end
  end

  def handle_in("new:msg", _msg, socket) do
    {:noreply, socket}
  end
end
