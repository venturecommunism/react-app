MIX_ENV=prod PORT=4001 iex -S mix phoenix.server (for production)
MIX_ENV=dev PORT=443 elixir --detached -S mix phoenix.server (works for dev)
