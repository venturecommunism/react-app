defmodule PhoenixInterface.UserChannel do
  use PhoenixInterface.Web, :channel

  def join("rooms:lobby", _params, socket) do
    Datomic.Channel.join(socket)
  end

  def handle_in("new:msg", %{"body" => %{"email" => email, "password" => password}, "user" => user}, socket) do
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
