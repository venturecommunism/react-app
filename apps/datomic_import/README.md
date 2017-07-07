# DatomicImport

**TODO: Add description**

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed as:

  1. Add `datomic_import` to your list of dependencies in `mix.exs`:

    ```elixir
    def deps do
      [{:datomic_import, "~> 0.1.0"}]
    end
    ```

  2. Ensure `datomic_import` is started before your application:

    ```elixir
    def application do
      [applications: [:datomic_import]]
    end
    ```
  3. Put in the database name you want.

   Doing

   '''
   mix run
   '''

     should now throw the error:

   '''
   Could not find [your-database-name] in catalog
   '''

  4. In the groovy shell http://docs.datomic.com/groovysh.html

import datomic.Peer

uri = "datomic:free://localhost:4334/your-database-name"
Peer.createDatabase(uri)
conn = Peer.connect(uri)
