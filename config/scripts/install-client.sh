run_it () {
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y git curl yarn
git clone https://github.com/venturecommunism/react-app.git ~
cd ~/react-app
yarn install
cd apps/phoenix_interface
yarn install
echo "***** Setting IP in config config/url.js"
cp ~/react-app/config/example-url.js ~/react-app/config/url.js
OUTPUT=`ifconfig eth0 |grep 'inet addr' |awk '{print $2}' |awk -F: '{print $2}'`
sed -i "/xx.xxx.xxx.xxx/c\const url='wss://$OUTPUT:443/socket'" ~/react-app/config/url.js
}

run_it
