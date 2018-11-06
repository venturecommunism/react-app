defmodule Datomic.Mixfile do
  use Mix.Project

  def project do
    [app: :datomic,
     version: "0.1.0",
     build_path: "../../_build",
     config_path: "../../config/config.exs",
     deps_path: "../../deps",
     lockfile: "../../mix.lock",
     elixir: "~> 1.3",
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     deps: deps()]
  end

  # Configuration for the OTP application
  #
  # Type "mix help compile.app" for more information
  def application do
    [applications:
      [
        :logger,
        :tzdata,
        :gproc
      ],
     mod: {Datomic, []}]
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
      {:calendar, "~> 0.17.4", override: true},
      {:datomic_gen_server, github: "venturecommunism/datomic_gen_server"},
      {:exdn, github: "venturecommunism/exdn"},
      {:gproc, "0.3.1"},
      {:datomic_query_translator, [path: "../datomic_query_translator", from_umbrella: true, env: :dev, manager: :mix]}
    ]
  end
end
