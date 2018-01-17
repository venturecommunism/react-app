#!/bin/bash

if ls ~/react-app/priv/datomic/datomic-pro* 1> /dev/null 2>&1; then
  echo "Starting install part 2..."
else
  echo "This is part 2 of a multi-part script"
  exit 1
fi

##
## check if this is necessary
##
# cd ~/react-app/priv/datomic/datomic-pro*
# sed -i -e s/host=localhost/host=0.0.0.0\\nalt-host=127.0.0.1/i transactor.properties

cd ~/react-app/priv/datomic/datomic-pro*
sudo apt-get install -y maven
bin/maven-install

cd ~/react-app/deps/datomic_gen_server/priv/datomic_gen_server_peer/
rm -r target
lein install
lein compile

echo ""
echo ""
echo ""
echo "Don't forget mix deps.compile datomic_gen_server from the top level of the umbrella"
echo "No suitable driver means you may have used the wrong leiningen"
echo "Unsupported protocol sql means you're still running the free version"
echo ""
echo "Unable to validate user could mean you still have the docker running"
echo "Remember, two backslashes for connection string is only in Elixir, not when creating db in Clojure"
echo ""
echo "Make sure lein install and lein compile worked on the clojure peer inside deps/datomic_gen_server/priv/datomic_gen_server_peer"
echo ""
echo "Stop the datomic docker container as we won't be using that anymore"
echo ""
echo "Install a database using comments in the clojure app"
echo ""
echo "Use a special connection string:"
echo 'e.g. "datomic:sql://test?jdbc:postgresql://localhost:5432/datomic?user=datomic\\&password=datomic"'
echo "NOTICE THE TWO BACKSLASHES \\ BEFORE THE AMPERSAND &"
echo ""
echo "cd ~/react-app/priv/datomic/datomic-pro* && bin/transactor transactor.properties"

