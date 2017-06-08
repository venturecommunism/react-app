defmodule PhoenixInterface.PageController do
  use PhoenixInterface.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
