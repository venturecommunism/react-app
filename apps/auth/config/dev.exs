use Mix.Config

# Configure your database
config :auth, Auth.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "ex_auth_dev",
  hostname: "localhost",
  pool_size: 10
