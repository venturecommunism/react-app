run_it () {

wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update && sudo apt-get install -y git curl esl-erlang elixir build-essential docker.io leiningen
echo "***** Finished apt-get update and installed git, curl, erlang, elixir, build-essential (for cmake)"
sudo docker pull akiel/datomic-free:0.9.5544
docker run -d -p 4334-4336:4334-4336 --name datomic-free akiel/datomic-free:0.9.5544
echo "***** Pulled Datomic docker image and started container"
mkdir -p ~/.m2/repository/org/erlang/otp/jinterface
git clone https://github.com/venturecommunism/jinterface-1.5.9.git ~/.m2/repository/org/erlang/otp/jinterface/1.5.9
git clone https://github.com/venturecommunism/react-app.git ~
echo "***** Git cloned repository"
cd ~/react-app
sudo apt-get install -y postgresql postgresql-contrib
mix local.hex --force && mix local.rebar --force
cd apps/auth
su - postgres -c "psql -U postgres -d postgres -c \"alter user postgres with password 'postgres';\""
echo "***** Set up Postgres"
mix compile
mix ecto.create && mix ecto.migrate
mix run priv/repo/seeds.exs
cd ../..
echo "***** Inserted up seed data"
export LEIN_ROOT=true && mix deps.get && mix compile
cp -r priv/example-keys apps/phoenix_interface/priv/keys
echo "Now run the app!"
echo "cd react-app/apps/phoenix_interface && mix phoenix.server"

}

run_it
