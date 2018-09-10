#!/bin/bash

cd ~/react-app
MIX_ENV=dev PORT=443 elixir --detached -S mix phoenix.server
