run_it () {

wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update && sudo apt-get install -y git curl esl-erlang elixir build-essential docker.io leiningen
echo "***** Finished apt-get update and installed git, curl, erlang, elixir, build-essential (for cmake)"
sudo docker pull akiel/datomic-free:0.9.5544
docker run -d -p 4334-4336:4334-4336 --name datomic-free akiel/datomic-free:0.9.5544
echo "***** Pulled Datomic docker image and started container"
git clone https://github.com/venturecommunism/react-app.git
echo "***** Git cloned repository"
cd react-app
sudo apt-get install -y postgresql postgresql-contrib
mix local.hex --force && mix local.rebar --force
mix deps.get && mix compile
echo "sudo -u postgres psql postgres"
echo "ALTER USER 'postgres' WITH PASSWORD 'postgres';"
echo "\q"
echo "cd apps/auth"
echo "mix run priv/repo/seeds.exs"
echo "cd ../.."
echo "cd react-app && mix phx.server"

}

run_it
