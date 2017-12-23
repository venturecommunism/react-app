run_it() {
echo "***** Doing apt-get update and apt-getting git and curl"
sudo apt-get update && sudo apt-get install -y git curl
echo "***** Installing nvm"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
[[ -s ~/.nvm/nvm.sh ]] && . ~/.nvm/nvm.sh
nvm install 8.9.3
nvm alias default 8.9.3
nvm use 8.9.3
echo "***** Installing phantomjs"
git clone https://github.com/Medium/phantomjs && cd phantomjs && npm i && node install.js && cd .. && cp phantomjs/lib/phantom/bin/phantomjs /bin/phantomjs && rm -r phantomjs
}

run_it
