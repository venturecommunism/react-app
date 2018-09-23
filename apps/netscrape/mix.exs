defmodule Netscrape.Mixfile do
  use Mix.Project

  def project do
    [
      app: :netscrape,
      version: "0.1.0",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.3",
      start_permanent: Mix.env == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :crawlie]
    ]
  end

  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:crawlie, in_umbrella: true},
      # {:crawlie, git: "https://github.com/nietaki/crawlie.git", branch: "better-duplicates"},
      # {:crawlie, path: "/Users/nietaki/repos/crawlie"},
      {:floki, "~> 0.12.0"}, # for HTML parsing
    ]
  end
end
