#!/bin/bash

cd ~/react-app/apps/browser/priv
mkdir goon
cd goon
wget https://github.com/alco/goon/releases/download/v1.1.1/goon_linux_amd64.tar.gz
tar xvf goon_linux_amd64.tar.gz
ln -s /root/react-app/apps/browser/priv/goon/goon /usr/bin/goon
cd ~

