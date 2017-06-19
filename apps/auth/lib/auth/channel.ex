defmodule Auth.Channel do
  defmacro __using__(opts) do
    key = Keyword.get(opts, :key, :default)

    quote do
      import Guardian.Phoenix.Socket

      def join(room, params = %{"guardian_token" => jwt}, socket) do
        case sign_in(socket, jwt, params, key: unquote(key)) do
          {:ok, authed_socket, guardian_params} ->
            join_params = params
            |> Map.drop(["guardian_token"])
            |> Map.merge(guardian_params)

            __MODULE__.join(room, join_params, authed_socket)
          {:error, reason} -> handle_guardian_auth_failure(reason)
        end
      end
 
      def join(room, _params, socket) do
        {:error, %{error: "missing JWT"}}
      end

      def handle_guardian_auth_failure(reason), do: {:error, %{error: reason}}

      defoverridable [handle_guardian_auth_failure: 1]
    end
  end
end
