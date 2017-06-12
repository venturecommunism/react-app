defmodule Auth.User do
  use Ecto.Schema

#  import Ecto
  import Ecto.Changeset
#  import Ecto.Query, only: [from: 1, from: 2]

  @derive {Poison.Encoder, only: [:id, :first_name, :last_name, :email]}

  schema "users" do
#    field :first_name, :string
#    field :last_name, :string
    field :email, :string
    field :encrypted_password, :string
    field :password, :string, virtual: true

    timestamps
  end

  @required_fields ~w(first_name last_name email password)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:email, :password, :encrypted_password])
    |> validate_required([:email, :password])
    |> validate_format(:email, ~r/@/)
    |> validate_length(:password, min: 5)
    |> validate_confirmation(:password, message: "Password does not match")
    |> unique_constraint(:email, message: "Email already taken")
    |> generate_encrypted_password
  end

  defp generate_encrypted_password(current_changeset) do
    case current_changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: password}} ->
        put_change(current_changeset, :encrypted_password, Comeonin.Bcrypt.hashpwsalt(password))
      _ ->
        current_changeset
    end
  end
end
