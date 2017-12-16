run_it () {

wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
sudo apt-get update && sudo apt-get install -y git curl esl-erlang elixir build-essential erlang-dev
echo "***** finished apt-get update and installed git, curl, erlang, elixir, build-essential (for cmake), erlang-dev"
git clone https://github.com/venturecommunism/react-app.git
echo "***** git cloned repository"
cd react-app
mix local.hex --force && mix local.rebar --force
mix deps.get && mix compile

}

run_it
