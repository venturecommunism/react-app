#!/bin/bash

if ls ~/react-app/priv/datomic-pro* 1> /dev/null 2>&1; then
  echo "Starting install..."
else
  echo "First make sure you have installed the development version of the Umbrella app (Rihanna)"
  echo "Then put 1) the datomic-pro zip file and 2) license in ~/react-app/priv"
  echo "Then run part one of the install script"
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
echo "The password is 'postgres'"
psql -f bin/sql/postgres-db.sql --host=localhost --username=postgres
echo "The password is 'postgres'"
psql -f bin/sql/postgres-table.sql -U postgres -d datomic --host=localhost --username=postgres
echo "The password is 'postgres'"
psql -f bin/sql/postgres-user.sql -U postgres -d datomic --host=localhost --username=postgres

cd ~/react-app/priv/datomic-pro*
cp config/samples/sql-transactor-template.properties transactor.properties

echo ""
echo ""
echo ""
echo "Unsupported protocol sql means you're still running the free version"
echo "Tried changing the connection strings in Elixir (including with \\)"
echo "Tried restarting postgresql service"
echo "Tried uncommenting data-dir and log-dir in transactor.properties"
echo ""
echo "nano ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/project.clj"
echo 'remove              [com.datomic/datomic-free "0.9.5544"]'
echo 'add                 [com.datomic/datomic-pro "0.9.5656"]'
echo 'add                 [org.postgresql/postgresql "9.3-1102-jdbc41"]'
echo ""
echo "install the license key at deps/datomic_gen_server/priv/datomic-pro*/transactor.properties"

