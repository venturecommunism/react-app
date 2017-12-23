run_it () {
sudo apt-get install -y curl
curl https://raw.github.com/venturecommunism/react-app/master/config/scripts/install-server.sh | /bin/bash
curl https://raw.github.com/venturecommunism/react-app/master/config/scripts/install-client.sh | /bin/bash
curl https://raw.github.com/venturecommunism/react-app/master/config/scripts/install-webagent.sh | /bin/bash
}

run_it
