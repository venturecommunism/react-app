#!/bin/bash

# for stellar-sdk. make sure node-gyp is necessary
sudo apt-get install -y node-gyp g++

# for mentat
# Cargo.toml needs latest mentat, consistent rusqlite
# four argument function stops compile. needs to be made to 3
# _ => panic! (or similar) needed on pattern match

