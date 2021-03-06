alias Auth.{Repo, User}

[
  %{
    email: "user@example.com",
    password: "12345678"
  },
]
|> Enum.map(&User.changeset(%User{}, &1))
|> Enum.each(&Repo.insert!(&1))
