#!/bin/bash

if ls ~/react-app/deps/datomic_gen_server/priv/datomic-pro* 1> /dev/null 2>&1; then
  echo "Starting install..."
else
  echo "Please install a unzip a version of datomic-pro to ~/react-app/deps/datomic_gen_server/priv"
  exit 1
fi

sudo add-apt-repository -y ppa:openjdk-r/ppa
sudo apt-get update
sudo apt-get install -y openjdk-8-jdk
sudo update-alternatives --config java
sudo update-alternatives --config javac

cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro*
psql -f bin/sql/postgres-db.sql --host=localhost --username=postgres
psql -f bin/sql/postgres-table.sql -U postgres -d datomic --host=localhost --username=postgres
psql -f bin/sql/postgres-user.sql -U postgres -d datomic --host=localhost --username=postgres

cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro*
cp config/samples/sql-transactor-template.properties transactor.properties

##
## check if this is necessary
##
# cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro*
# sed -i -e s/host=localhost/host=0.0.0.0\\nalt-host=127.0.0.1/i transactor.properties

cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro*
sudo apt-get install -y maven
bin/maven-install

cd ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/
rm -r target
lein install
lein compile

echo "nano ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/project.clj"
echo 'remove              [com.datomic/datomic-free "0.9.5544"]'
echo 'add                 [com.datomic/datomic-pro "0.9.5656"]'
echo 'add                 [org.postgresql/postgresql "9.3-1102-jdbc41"]'
echo ""
echo "install the license key at deps/datomic_gen_server/priv/datomic-pro*/transactor.properties"
echo ""
echo "cd ~/react-app/deps/datomic_gen_server/priv/datomic-pro* && bin/transactor transactor.properties"

# possibly a better way to install leiningen but we do already have one way from the main install script
# wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
# mv lein /usr/bin/
# chmod a+x /usr/bin/lein
