run_it () {

###
### server
###

cd ~
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update && sudo apt-get install -y git curl esl-erlang elixir build-essential docker.io inotify-tools
echo "***** Finished apt-get update and installed git, curl, erlang, elixir, build-essential (for cmake), inotify-tools (for :watcher / FileSystem)"

sudo docker pull akiel/datomic-free:0.9.5544
docker run -d -p 4334-4336:4334-4336 --name datomic-free akiel/datomic-free:0.9.5544
echo "***** Pulled Datomic docker image and started container"

mkdir -p ~/.m2/repository/org/erlang/otp/jinterface
git clone https://github.com/venturecommunism/jinterface-1.5.9.git ~/.m2/repository/org/erlang/otp/jinterface/1.5.9
git clone https://github.com/venturecommunism/react-app.git ~/react-app
echo "***** Git cloned repository"

###
### Install goon for browser
###

cd ~/react-app/apps/browser/priv
mkdir goon
cd goon
wget https://github.com/alco/goon/releases/download/v1.1.1/goon_linux_amd64.tar.gz
tar xvf goon_linux_amd64.tar.gz
ln -s /root/react-app/apps/browser/priv/goon/goon /usr/bin/goon
cd ~

###
### phantomjs for :web_agent
###

echo "***** Installing nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
[[ -s ~/.nvm/nvm.sh ]] && . ~/.nvm/nvm.sh
nvm install 8.9.3
nvm alias default 8.9.3
nvm use 8.9.3
echo "***** Installing phantomjs"
cd ~/react-app
git clone https://github.com/Medium/phantomjs && cd phantomjs && npm i && node install.js && cd .. && cp phantomjs/lib/phantom/bin/phantomjs /bin/phantomjs && rm -r phantomjs

###
### make sure a good leiningen is installed
###

wget https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein
mv lein /usr/bin/
chmod a+x /usr/bin/lein


###
### the app itself
###

cd ~/react-app
mix local.hex --force && mix local.rebar --force

export LEIN_ROOT=true && mix deps.get && mix compile
cp -r priv/example-keys apps/phoenix_interface/priv/keys

sudo apt-get install -y postgresql postgresql-contrib
su - postgres -c "psql -U postgres -d postgres -c \"alter user postgres with password 'postgres';\""
echo "***** Set up Postgres"

mix ecto.create && mix ecto.migrate
mix run apps/auth/priv/repo/seeds.exs
echo "***** Inserted up seed data"

# memcached for datomic
sudo apt-get install -y memcached

# should also sed the transactor.properties to use memcached

###
### client
###

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y git curl yarn
git clone https://github.com/venturecommunism/react-app.git ~
cd ~/react-app
echo "***** Setting IP in config config/config.js"
cp ~/react-app/config/example-config.js ~/react-app/config/config.js
OUTPUT=`ifconfig eth0 |grep 'inet addr' |awk '{print $2}' |awk -F: '{print $2}'`
sed -i "/xx.xxx.xxx.xxx/c\const url='wss://$OUTPUT:443/socket'" ~/react-app/config/config.js

###
### final
###

echo "NPM may not show up until you log out of the terminal."
echo "Open one terminal and do:"
echo "cd react-app && mix phoenix.server"
echo "Then, open a second terminal and do:"
echo "cd react-app && yarn install"
echo "cd apps/phoenix_interface && yarn install"
echo "cd ../.."
echo "npm start"
}

run_it

