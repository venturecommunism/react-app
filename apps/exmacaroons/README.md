# Exmacaroons

**TODO: Add description**

## Example

Exmacaroons.createtoken('http://www.example.org', 'public identifier 0815', 'your private secret')

## Installation

https://download.libsodium.org/doc/installation/ (libsodium-stable-2018-01-17.tar.gz works)
remember sudo ldconfig after installing libsodium

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

