# Rihanna (An Umbrella App)

This client side was created with a custom version of **[React App SDK](https://github.com/kriasoft/react-app)** — CLI
tools and templates for authoring React (Redux has been replaced with Datascript) applications with just a single dev dependency and
zero configuration.

In order to compile the app and launch a development web server with "live reload" run:

```sh
$ npm start
```

The app should become available at [http://localhost:3000](http://localhost:3000)

# Server side

Install like other Elixir projects (TODO: Elixir documentation)

To use the Server side, then install Datomic (TODO: document this)

Compile different parts individually for now (TODO: remove rust module)

Then create a database my uncommenting part at the bottom of peer.js (inside deps/datomic_gen_server/priv/datomic_gen_server_peer/src/datomic_gen_server/peer.clj) and commenting out most of the rest above.
