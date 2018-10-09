defmodule PhoenixInterface.DatomicChannel do
  use PhoenixInterface.Web, :channel
  import Guardian.Phoenix.Socket
  require Logger

  def join("datomic:" <> user_unique_id, params = %{"guardian_token" => jwt}, socket) do
    # might want to add :claims and :resource back in to the pattern match
    # this nil key should be the default based on Guardian.Channel (guardian/lib/guardian/channel.ex)
    # decide what you want to do with the join_params
    case sign_in(socket, jwt, params, key: nil) do
      {:ok, authed_socket, guardian_params} ->
        _join_params = params
        |> Map.drop(["guardian_token"])
        |> Map.merge(guardian_params)

        Datomic.Channel.join(authed_socket, user_unique_id)
      {:error, reason} -> handle_guardian_auth_failure(reason)
    end
  end

  def join("datomic:" <> _user_unique_id, _params, _socket) do
    {:error, %{reply: "missing JWT"}}
  end

  def handle_guardian_auth_failure(reason), do: {:error, %{error: reason}}

  defoverridable [handle_guardian_auth_failure: 1]

  def handle_in("new:msg", %{"body" => %{"syncpoint" => latest_tx, "subscription" => subscription}, "user" => user}, socket) do
    Logger.debug "latest_tx: " <> latest_tx

    Datomic.Channel.sync(latest_tx, Enum.at(subscription,0), socket)
    |> Enum.sort_by(fn(datom) ->
      datom
    end)
    |> Enum.each(fn({_, x}) ->
      push socket, "new:msg", %{"user" => "system", "body" => x}
      Process.sleep(60)
      IO.puts Enum.random([1,2,3,4,5,6,7,8,9])
    end)

    push socket, "join", %{status: "connected"}
    broadcast! socket, "new:msg", %{user: user, body: %{"syncpoint": false, "user": user}}
    {:reply, {:ok, %{msg: %{"syncpoint": false, "user": user}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", %{"body" => %{"data" => data, "meta" => meta}, "user" => user}, socket) do
    %{topic: topic} = socket
    _msg = %{"body" => %{"data" => data, "meta" => meta}, "user" => user}
    %{"confirmationid" => confirmationid} = meta
    some_data = Datomic.ParseDatascriptTransaction.first(data)

    _data_to_add = """
      [ { :db/id #db/id[:db.part/db]
          :db/ident :person/name
          :db/valueType :db.type/string
          :db/cardinality :db.cardinality/one
          :db/doc \"A person's name\"
          :db.install/_attribute :db.part/db}]
    """
    {:ok, transaction_result} = DatomicGenServer.transact({:via, :gproc, {:n, :l, {:topic, topic}}}, some_data, [:options, {:client_timeout, 100_000}])

    IO.puts transaction_result

    # push socket, "join", %{status: "connected"}
    # broadcast! socket, "new:msg", %{user: user, body: %{"syncpoint": false, "user": user}}
     {:reply, {:ok, %{msg: %{"syncpoint": false, "user": user, "confirmationid": confirmationid}}}, assign(socket, :user, user)}
  end

  def handle_in("new:msg", _msg, socket) do
    IO.inspect "no message"
    {:noreply, socket}
  end
end
