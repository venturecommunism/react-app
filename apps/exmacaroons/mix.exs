defmodule Exmacaroons.Mixfile do
  use Mix.Project

  def project do
    [app: :exmacaroons,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     compilers: [:rustler] ++ Mix.compilers(),
     rustler_crates: rustler_crates(),
     deps: deps()]
  end

  def rustler_crates do
    [
      rustmacaroons: [
        path: "native/rustmacaroons",
        cargo: :system,
        default_features: false,
        features: [],
        mode: :release,
        # mode: (if Mix.env == :prod, do: :release, else: :debug),
      ]
    ]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications: [:logger]]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # To depend on another app inside the umbrella:
  #
  #   {:myapp, in_umbrella: true}
  #
  # Type "mix help deps" for more examples and options
  defp deps do
    [
      {:rustler, "~> 0.10.1"}
    ]
  end
end
