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

1) On for e.g. Rackspace, Install a 2GB flavor (needed or the Datomic docker container will crash) Ubuntu 14.04 LTS (Trusty Tahr) (PV)

2) Log in as the root user

3)

### Install script

To install you could use the [SERVER install script](https://raw.github.com/venturecommunism/react-app/master/install-server.sh) using Wget:

    wget -qO- https://raw.github.com/venturecommunism/react-app/master/install-server.sh | /bin/bash

or cURL:

    curl https://raw.github.com/venturecommunism/react-app/master/install-server.sh | /bin/bash

Then create a database by uncommenting the relevant part at the bottom of peer.js (inside deps/datomic_gen_server/priv/datomic_gen_server_peer/src/datomic_gen_server/peer.clj) and commenting out most of the rest above.

To use the web agent based acceptance testing run the install-webagent.sh script under apps/web_agent.

#Client side installation

To install you could use the [CLIENT install script](https://raw.github.com/venturecommunism/react-app/master/install-client.sh) using Wget:

    wget -qO- https://raw.github.com/venturecommunism/react-app/master/install-client.sh | /bin/bash

or cURL:

    curl https://raw.github.com/venturecommunism/react-app/master/install-client.sh | /bin/bash

