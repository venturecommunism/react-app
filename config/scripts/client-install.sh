#!/bin/bash

# for stellar-sdk. make sure node-gyp is necessary
sudo apt-get install -y node-gyp g++

# for mentat
# Cargo.toml needs latest mentat, consistent rusqlite
# four argument function stops compile. needs to be made to 3
# _ => panic! (or similar) needed on pattern match

# create-react-app needs config/scripts/create-react-app.patch applied from node_modules/react-scripts directory with 
# (first copy config/scripts/create-react-app.patch to node_modules/react-scripts)
# 'git apply create-react-app.patch'

# install node v8.9.4 as default
