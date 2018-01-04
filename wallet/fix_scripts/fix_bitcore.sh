#!/usr/bin/env bash

sed 's/throw new Error(message)//g' node_modules/bitcore-lib/index.js
sed 's/throw new Error(message)//g' node_modules/bitcore-mnemonic/node_modules/bitcore-lib/index.js

# HACK for https://github.com/barrysteyn/node-scrypt/issues/162
cp fix_scripts/script.index.js node_modules/scrypt/index.js
