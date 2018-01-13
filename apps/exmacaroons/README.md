# Exmacaroons

**TODO: Add description**

## Installation

This commit used to be good I thought but no longer works:
https://github.com/venturecommunism/react-app/tree/47862fd551543827f3d5cdf59d6de060135afec8/apps/exmacaroons

From macaroons-rs (not sure if this is useful?):
https://github.com/cryptosphere/macaroons-rs/blob/fcd4c1e6b6f604827aa30cd2767bc0abf78d4c79/.travis.yml

Installing rust:
curl -sSf https://static.rust-lang.org/rustup.sh | sh

Some notes on potential libsodium installation (which didn't work):
sudo apt-get install -y pkg-config

https://askubuntu.com/questions/330589/how-to-compile-and-install-dnscrypt#330611
https://download.libsodium.org/doc/installation/
remember ldconfig after installing libsodium


If [available in Hex](https://hex.pm/docs/publish), the package can be installed as:

  1. Add `exmacaroons` to your list of dependencies in `mix.exs`:

    ```elixir
    def deps do
      [{:exmacaroons, "~> 0.1.0"}]
    end
    ```

  2. Ensure `exmacaroons` is started before your application:

    ```elixir
    def application do
      [applications: [:exmacaroons]]
    end
    ```

