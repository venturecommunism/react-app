# Rihanna (An Umbrella App)

This client side was created with a custom version of **[React App SDK](https://github.com/kriasoft/react-app)** — CLI
tools and templates for authoring React (Redux has been replaced with Datascript) applications with just a single dev dependency and
zero configuration.

In order to compile the app and launch a development web server with "live reload" run:

```sh
$ npm start
```

The app should become available at [http://localhost:3000](http://localhost:3000)

# Server side installation

Tested on Ubuntu 14.04

1) On for e.g. Rackspace, Install a 512MB flavor Ubuntu 14.04 LTS (Trusty Tahr) (PV)

2) Log in as the root user

3)

### Install script

To install you could use the [install script](https://raw.github.com/venturecommunism/meteor-taskwarrior/master/install.sh) using Wget:

    wget -qO- https://raw.github.com/venturecommunism/react-app/master/install-server.sh | /bin/bash

or cURL:

    curl https://raw.github.com/venturecommunism/react-app/master/install-server.sh | /bin/bash

Install like other Elixir projects (TODO: Elixir documentation)

To use the Server side, install Datomic (TODO: document this)

(TODO: Document mix.compile and mix phx.server)

Then create a database by uncommenting the relevant part at the bottom of peer.js (inside deps/datomic_gen_server/priv/datomic_gen_server_peer/src/datomic_gen_server/peer.clj) and commenting out most of the rest above.
