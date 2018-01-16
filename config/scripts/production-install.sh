#!/bin/bash

if ls ~/react-app/priv/datomic-pro* 1> /dev/null 2>&1; then
  echo "Starting install..."
else
  echo "Please install a unzip a version of datomic-pro to ~/react-app/priv"
  exit 1
fi

sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk unzip
sudo update-alternatives --config java
sudo update-alternatives --config javac

cd ~/react-app/priv
unzip datomic-pro*.zip
mv datomic-pro*.zip zipfile-datomic-pro.zip

cd ~/react-app/priv/datomic-pro*
psql -f bin/sql/postgres-db.sql --host=localhost --username=postgres
psql -f bin/sql/postgres-table.sql -U postgres -d datomic --host=localhost --username=postgres
psql -f bin/sql/postgres-user.sql -U postgres -d datomic --host=localhost --username=postgres

cd ~/react-app/priv/datomic-pro*
cp config/samples/sql-transactor-template.properties transactor.properties

##
## check if this is necessary
##
# cd ~/react-app/priv/datomic-pro*
# sed -i -e s/host=localhost/host=0.0.0.0\\nalt-host=127.0.0.1/i transactor.properties

cd ~/react-app/priv/datomic-pro*
sudo apt-get install -y maven
bin/maven-install

cd ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/
rm -r target
lein install
lein compile

echo "No suitable driver means you may have used the wrong leiningen"
echo "Either way, Should not store datomic-pro under deps"
echo "Unsupported protocol sql means you're still running the free version"
echo "Not the following:"
echo "Tried changing the connection strings in Elixir (including with \\)"
echo "Tried restarting postgresql service"
echo "Tried uncommenting data-dir and log-dir in transactor.properties"
echo ""
echo "At any rate must automate db creation"
echo "Remember, two backslashes for connection string is only in Elixir, not when creating db in Clojure"
echo "Remember the password for postgres user is postgres"
echo ""
echo "Make sure lein install and lein compile worked on the clojure peer inside deps/datomic_gen_server/priv/datomic_gen_server_peer"
echo ""
echo "Stop the datomic docker container as we won't be using that anymore"
echo ""
echo "nano ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/project.clj"
echo 'remove              [com.datomic/datomic-free "0.9.5544"]'
echo 'add                 [com.datomic/datomic-pro "0.9.5656"]'
echo 'add                 [org.postgresql/postgresql "9.3-1102-jdbc41"]'
echo ""
echo "install the license key at deps/datomic_gen_server/priv/datomic-pro*/transactor.properties"
echo ""
echo "Install a database"
echo ""
echo "Use a special connection string:"
echo 'e.g. "datomic:sql://test?jdbc:postgresql://localhost:5432/datomic?user=datomic\\&password=datomic"'
echo "NOTICE THE TWO BACKSLASHES \\ BEFORE THE AMPERSAND &"
echo ""
echo "cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro* && bin/transactor transactor.properties"

