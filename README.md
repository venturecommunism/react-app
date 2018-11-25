# Rihanna (An Umbrella App)

This client side was created with a custom version of **[React App SDK](https://github.com/kriasoft/react-app)** — CLI
tools and templates for authoring React applications with just a single dev dependency and
zero configuration.

Redux has been replaced with Datascript. The server runs Elixir and Datomic.

# Installation

For the server side, this is tested on Ubuntu 14.04

1) On for e.g. Rackspace, Install a 2GB flavor (needed or the Datomic docker container will crash) Ubuntu 14.04 LTS (Trusty Tahr) (PV)

2) Log in as the root user

3)

### Install script (~7 minutes)

To install you could use the [install script](https://raw.github.com/venturecommunism/react-app/master/config/scripts/install.sh) using Wget:

    wget -qO- https://raw.github.com/venturecommunism/react-app/master/config/scripts/install.sh | /bin/bash

or cURL:

    curl https://raw.github.com/venturecommunism/react-app/master/config/scripts/install.sh | /bin/bash

Then create a database by uncommenting the relevant part at the bottom of peer.js (inside deps/datomic_gen_server/priv/datomic_gen_server_peer/src/datomic_gen_server/peer.clj) and commenting out most of the rest above.

4) In the same terminal you did the install:

    cd react-app
    mix phoenix.server

You can stop the Elixir server by hitting Ctrl-C.

5) In a new terminal (since npm won't be picked up yet until you log back in again):

    cd react-app/apps/phoenix_interface
    yarn install
    cd ../..
    yarn install
    npm start

You can stop the NodeJS server that serves the client by hitting Ctrl-C.

6) First you will want to navigate to [https://your-ip-address](https://your-ip-address) and set a temporary or permanent security exception. This is necessary unless you create your own signed certificate (TODO: link to one of the many good sources on how to do this).

7) The app should become available at [http://your-ip-address:3000](http://your-ip-address:3000). If you skipped step 6 this may look like it works but actually it can't connect to the server. This has to do with self-signed security certificates.

8) To make the red warning that appears when you start the server go away next time you run it:

    cd apps/phoenix_interface
    yarn install

9) The connection string to a production datomic should look something like:

    "datomic:sql://test?jdbc:postgresql://localhost:5432/datomic?user=datomic\\&password=datomic"

Make sure to have the two backslashes \\ in front of the ampersand &

To add and delete users from the command line:

psql -U postgres -d ex_auth_dev -h localhost
-- show all tables
\dt

### WARNING. THE NEXT COMMAND PERMANENTLY DELETES USER DATABASE
psql -U postgres -h localhost -c "drop database ex_auth_dev"

cd apps/auth
mix ecto.create && mix ecto.migrate
mix run apps/auth/priv/repo/seeds.exs

# Documentation

Check the docs folder for documentation
