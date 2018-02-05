#!/bin/bash

cp config/scripts/stellar-patch.patch node_modules/js-xdr
cd node_modules/js-xdr/
git init
git apply stellar-patch.patch
