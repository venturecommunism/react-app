run_it () {
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y git curl yarn
git clone https://github.com/venturecommunism/react-app.git ~
cd ~/react-app
yarn install
cd apps/phoenix_interface
yarn install
}

run_it
