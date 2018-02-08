defmodule ReactApp.Mixfile do
  use Mix.Project

  def project do
    [apps_path: "apps",
     apps: [:phoenix_interface, :auth, :datomic, :web_agent, :browser, :exmacaroons],
     build_embedded: Mix.env == :prod,
     start_permanent: Mix.env == :prod,
     rustler_crates: rustler_crates(),
     deps: deps()]
  end

  # Dependencies can be Hex packages:
  #
  #   {:mydep, "~> 0.3.0"}
  #
  # Or git/path repositories:
  #
  #   {:mydep, git: "https://github.com/elixir-lang/mydep.git", tag: "0.1.0"}
  #
  # Type "mix help deps" for more examples and options.
  #
  # Dependencies listed here are available only for this project
  # and cannot be accessed from applications inside the apps folder

  # need calendar dependency pinned since exdn has an older incompatible version of calendar. might want to pull that in to a repo at some point 
  defp deps do
    [
      {:calendar, "~> 0.17.4", override: true}
    ]
  end

  def rustler_crates do
    [
      rustmacaroons: [
        path: "apps/exmacaroons/native/rustmacaroons",
        cargo: :system,
        default_features: false,
        features: [],
        # mode: :release,
        mode: (if Mix.env == :prod, do: :release, else: :debug),
      ]
    ]
  end
end
