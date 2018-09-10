# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
use Mix.Config

# By default, the umbrella project as well as each child
# application will require this configuration file, ensuring
# they all use the same configuration. While one could
# configure all applications here, we prefer to delegate
# back to each application for organization purposes.
import_config "../apps/*/config/config.exs"

# Sample configuration (overrides the imported configuration above):
#
#     config :logger, :console,
#       level: :info,
#       format: "$date $time [$level] $metadata$message\n",
#       metadata: [:user_id]

config :phoenix_interface, ecto_repos: []

# the connection string probably looks weird because of the \\ being used to escape
config :datomic, database: "datomic:sql://" <> System.get_env("DATOMIC_DB") <> "?jdbc:postgresql://localhost:5432/?user=" <> System.get_env("DATOMIC_USERNAME") <> "\\&password=" <> System.get_env("DATOMIC_PASSWORD")
