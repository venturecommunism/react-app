# Exmacaroons

**TODO: Add description**

## Installation

  0. sudo apt-get install -y pkg-config
  0.1 install libsodium in a temporary directory
  0.2 cd /tmp
  0.3 wget https://download.libsodium.org/libsodium/releases/libsodium-1.0.10.tar.gz
  0.4 ./configure && make && make check && make install
  0.5 ldconfig

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

